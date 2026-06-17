const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const baseFile = path.join(__dirname, '..', '/themes/sibylla.theme.css');
const buildFile = path.join(__dirname, '..', '/build/sibylla.css');
const srcDir = path.join(__dirname, '..', '/src');
const outputPaths = process.env.DEV_OUTPUT_PATH ? process.env.DEV_OUTPUT_PATH.split(',') : [];

if (outputPaths.length === 0) {
    console.error('DEV_OUTPUT_PATH is not set in .env file');
    process.exit(1);
}

function sourceFiles() {
    const allFiles = fs
        .readdirSync(srcDir)
        .filter((file) => file.endsWith('.css'))
        .map((file) => path.join(srcDir, file));
    const order = ['main.css', 'colors.css', 'animations.css', 'background-image.css', 'chatbar.css', 'dms-button.css', 'top-bar.css', 'transparency-blur.css', 'user-panel.css', 'window-controls.css', 'sibylla.css'];
    return order.map((name) => allFiles.find((file) => path.basename(file) === name)).filter(Boolean);
}

function combineSourceFiles() {
    let combinedCSS = '';
    for (const file of sourceFiles()) {
        const content = fs.readFileSync(file, 'utf8');
        combinedCSS += `/* ${path.basename(file)} */\n${content.trimEnd()}\n\n`;
    }
    fs.mkdirSync(path.dirname(buildFile), { recursive: true });
    fs.writeFileSync(buildFile, combinedCSS.trimEnd() + '\n');
    return combinedCSS;
}

function processBaseFile(compiledCSS) {
    const baseContent = fs.readFileSync(baseFile, 'utf8');
    const importRegex = /@import\s+url\(['"]?[^'"]+['"]?\);/g;
    const processedContent = baseContent.replace(importRegex, compiledCSS);
    for (const outputPath of outputPaths) {
        fs.writeFileSync(outputPath, processedContent);
        console.log(`Updated ${outputPath}`);
    }
}

function processFiles() {
    try {
        const compiledCSS = combineSourceFiles();
        processBaseFile(compiledCSS);
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

processFiles();

const watcher = chokidar.watch([baseFile, `${srcDir}/**/*.css`], { ignoreInitial: true });
watcher
    .on('change', (filePath) => {
        console.log(`File changed: ${filePath}`);
        processFiles();
    })
    .on('add', (filePath) => {
        console.log(`New file added: ${filePath}`);
        processFiles();
    })
    .on('unlink', (filePath) => {
        console.log(`File deleted: ${filePath}`);
        processFiles();
    })
    .on('error', (error) => console.error(`Watcher error: ${error}`));
