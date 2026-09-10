const path = require('path');
const chokidar = require('chokidar');

const { rootDir, srcDir, themeFile, buildAll } = require('./lib/build-theme');

const watchTargets = [themeFile, srcDir];

function getDevOutputPaths() {
    return (process.env.DEV_OUTPUT_PATH || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .map((value) => path.resolve(rootDir, value));
}

function logWrittenOutputs(outputs) {
    for (const outputPath of outputs) {
        console.log(` wrote ${outputPath}`);
    }
}

function runBuild(outputPaths, reason = 'initial build') {
    try {
        const { outputs } = buildAll(outputPaths);
        console.log(`[sibnight] ${reason}`);
        logWrittenOutputs(outputs);
        return true;
    } catch (error) {
        console.error('[sibnight] build failed:', error.reason || error.message);
        return false;
    }
}

function debounce(callback, delayMs) {
    let timer = null;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delayMs);
    };
}

function main() {
    const outputPaths = getDevOutputPaths();

    if (outputPaths.length === 0) {
        console.error('[sibnight] DEV_OUTPUT_PATH is not set in the process environment');
        console.error('[sibnight] Example: DEV_OUTPUT_PATH="C:/Users/you/AppData/Roaming/BetterDiscord/themes/sibnight.theme.css"');
        process.exit(1);
    }

    if (!runBuild(outputPaths)) process.exit(1);

    const rebuild = debounce((eventName, filePath) => {
        runBuild(outputPaths, `${eventName} ${path.relative(rootDir, filePath)}`);
    }, 80);

    const watcher = chokidar.watch(watchTargets, { ignoreInitial: true, ignored: (file, stats) => stats?.isFile() && !file.endsWith('.css') }).on('all', rebuild);
    watcher.on('error', (error) => {
        console.error('[sibnight] watcher failed:', error.message);
        process.exitCode = 1;
        watcher.close();
    });
}

main();
