const fs = require('fs');
const http = require('http');
const path = require('path');
const chokidar = require('chokidar');

const { rootDir, srcDir, themeFile, buildAll } = require('./lib/build-theme');

const PORT = Number(process.env.PORT) || 8765;
const HOST = process.env.HOST || '127.0.0.1';
const INJECT_FILE = path.join(__dirname, 'inject.js');
const watchTargets = [themeFile, `${srcDir}/**/*.css`];

let cachedCss = '';
let cachedError = null;
let version = 0;

function getRequestPathname(req) {
    try {
        return new URL(req.url || '/', `http://${req.headers.host || `${HOST}:${PORT}`}`).pathname;
    } catch {
        return '/';
    }
}

function readInjectScript() {
    return fs.readFileSync(INJECT_FILE, 'utf8');
}

function rebuild(reason = 'initial build') {
    try {
        const { bundledCss } = buildAll();

        cachedCss = bundledCss;
        cachedError = null;
        version = Date.now();

        console.log(`[sibnight] rebuilt ${reason}`);
    } catch (error) {
        cachedError = error;
        console.error('[sibnight] build failed:', error);
    }
}

function writeResponse(req, res, statusCode, contentType, body) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'HEAD') {
        res.end();
        return;
    }

    res.end(body);
}

function writeJson(req, res, statusCode, payload) {
    writeResponse(req, res, statusCode, 'application/json; charset=utf-8', JSON.stringify(payload, null, 2));
}

function writeJavaScript(req, res, code) {
    writeResponse(req, res, 200, 'application/javascript; charset=utf-8', code);
}

function writeCss(req, res, css) {
    writeResponse(req, res, 200, 'text/css; charset=utf-8', css);
}

function handleRequest(req, res) {
    const pathname = getRequestPathname(req);

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.end();
        return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        writeJson(req, res, 405, {
            error: 'method_not_allowed',
            method: req.method,
        });
        return;
    }

    if (pathname === '/healthz') {
        writeJson(req, res, cachedError ? 503 : 200, {
            ok: !cachedError,
            version,
            error: cachedError ? cachedError.message : null,
        });
        return;
    }

    if (pathname === '/version') {
        writeJson(req, res, cachedError ? 503 : 200, {
            version,
            ok: !cachedError,
        });
        return;
    }

    if (pathname === '/inject.js') {
        try {
            writeJavaScript(req, res, readInjectScript());
        } catch (error) {
            writeJson(req, res, 500, {
                error: 'inject_read_failed',
                message: error.message,
            });
        }

        return;
    }

    if (pathname === '/' || pathname === '/sibnight.css' || pathname === '/theme.css') {
        if (cachedError) {
            writeJson(req, res, 503, {
                error: 'build_failed',
                message: cachedError.message,
            });
            return;
        }

        writeCss(req, res, cachedCss);
        return;
    }

    writeJson(req, res, 404, {
        error: 'not_found',
        path: pathname,
    });
}

function debounce(callback, delayMs) {
    let timer = null;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delayMs);
    };
}

rebuild();

const server = http.createServer(handleRequest);

server.listen(PORT, HOST, () => {
    console.log(`sibnight-discord dev server @ http://${HOST}:${PORT}`);
    console.log(' CSS: /sibnight.css');
    console.log(' loader: /inject.js');
    console.log(' health: /healthz');
});

const rebuildFromWatcher = debounce((eventName, filePath) => {
    rebuild(`${eventName} ${path.relative(rootDir, filePath)}`);
}, 80);

chokidar.watch(watchTargets, { ignoreInitial: true }).on('all', rebuildFromWatcher);