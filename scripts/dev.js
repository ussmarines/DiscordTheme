const path = require('path');
const chokidar = require('chokidar');
const dotenv = require('dotenv');

const { rootDir, srcDir, themeFile, buildAll } = require('./lib/build-theme');

const envFile = path.join(rootDir, '.env');
const watchTargets = [themeFile, `${srcDir}/**/*.css`];

dotenv.config({ path: envFile });

function getDevOutputPaths() {
    return (process.env.DEV_OUTPUT_PATH || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
}

function logWrittenOutputs(outputs) {
    for (const outputPath of outputs) {
        console.log(`  wrote ${outputPath}`);
    }
}

function runBuild(outputPaths, reason = 'initial build') {
    try {
        const { outputs } = buildAll(outputPaths);
        console.log(`[sibnight] ${reason}`);
        logWrittenOutputs(outputs);
    } catch (error) {
        console.error('[sibnight] build failed:', error);
    }
}

function main() {
    const outputPaths = getDevOutputPaths();

    if (outputPaths.length === 0) {
        console.error('[sibnight] DEV_OUTPUT_PATH is not set in .env');
        process.exit(1);
    }

    runBuild(outputPaths);

    chokidar
        .watch(watchTargets, { ignoreInitial: true })
        .on('all', (eventName, filePath) => {
            runBuild(outputPaths, `${eventName} ${path.relative(rootDir, filePath)}`);
        });
}

main();
