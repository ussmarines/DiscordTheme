const path = require('path');
const chokidar = require('chokidar');
const dotenv = require('dotenv');

const { rootDir, srcDir, themeFile, buildAll } = require('./lib/build-theme');

dotenv.config({ path: path.join(rootDir, '.env') });

const outputPaths = (process.env.DEV_OUTPUT_PATH || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

if (outputPaths.length === 0) {
    console.error('DEV_OUTPUT_PATH is not set in .env');
    process.exit(1);
}

function build(reason = 'initial build') {
    try {
        const { outputs } = buildAll(outputPaths);
        console.log(`[sibnight] ${reason}`);
        outputs.forEach((output) => console.log(`  wrote ${output}`));
    } catch (error) {
        console.error('Build failed:', error);
    }
}

build();

const watcher = chokidar.watch([themeFile, `${srcDir}/**/*.css`], {
    ignoreInitial: true,
});

watcher.on('all', (event, filePath) => {
    build(`${event} ${path.relative(rootDir, filePath)}`);
});
