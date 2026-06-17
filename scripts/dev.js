const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const root = path.join(__dirname, '..');
const baseFile = path.join(root, 'themes', 'sibylla.theme.css');
const buildFile = path.join(root, 'build', 'sibylla.css');
const srcDir = path.join(root, 'src');
const outputPaths = process.env.DEV_OUTPUT_PATH ? process.env.DEV_OUTPUT_PATH.split(',').map((s) => s.trim()).filter(Boolean) : [];

if (outputPaths.length === 0) {
    console.error('DEV_OUTPUT_PATH is not set in .env file');
    process.exit(1);
}

function runBuild() {
    delete require.cache[require.resolve('./build.js')];
    require('./build.js');
}

function processBaseFile() {
    const compiledCSS = fs.readFileSync(buildFile, 'utf8');
    const baseContent = fs.readFileSync(baseFile, 'utf8');
    const processedContent = baseContent.replace(/@import\s+url\(['"]?[^'"]+['"]?\);/g, compiledCSS);
    for (const outputPath of outputPaths) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, processedContent);
        console.log(`Updated ${outputPath}`);
    }
}

function processFiles() {
    try {
        runBuild();
        processBaseFile();
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

processFiles();
chokidar.watch([baseFile, `${srcDir}/**/*.css`], { ignoreInitial: true })
    .on('change', (filePath) => { console.log(`File changed: ${filePath}`); processFiles(); })
    .on('add', (filePath) => { console.log(`New file added: ${filePath}`); processFiles(); })
    .on('unlink', (filePath) => { console.log(`File deleted: ${filePath}`); processFiles(); })
    .on('error', (error) => console.error(`Watcher error: ${error}`));
