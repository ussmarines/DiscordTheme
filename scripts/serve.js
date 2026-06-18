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
let version = Date.now();

function rebuild(reason = 'initial build') {
    try {
        const { bundledCss } = buildAll();
        cachedCss = bundledCss;
        version = Date.now();
        console.log(`[sibnight] rebuilt ${reason}`);
    } catch (error) {
        console.error('[sibnight] build failed:', error);
    }
}

rebuild();

const server = http.createServer((req, res) => {
    const pathname = (req.url || '/').split('?')[0];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    if (pathname === '/version') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ version }));
        return;
    }

    if (pathname === '/inject.js') {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        res.end(fs.readFileSync(INJECT_FILE, 'utf8'));
        return;
    }

    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.end(cachedCss);
});

server.listen(PORT, HOST, () => {
    console.log(`sibnight-discord dev server @ http://${HOST}:${PORT}`);
    console.log('  CSS:    /sibnight.css');
    console.log('  loader: /inject.js');
});

chokidar
    .watch(watchTargets, { ignoreInitial: true })
    .on('all', (event, filePath) => rebuild(`${event} ${path.relative(rootDir, filePath)}`));
