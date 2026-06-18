const fs = require('fs');
const path = require('path');

const {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    SOURCE_FILE_ORDER,
    getSourceFiles,
    buildSourceCss,
    buildBundleFromTheme,
} = require('./lib/build-theme');

function fail(message) {
    console.error(`[sibnight] check failed: ${message}`);
    process.exit(1);
}

function ensureFilesExist(filePaths) {
    for (const filePath of filePaths) {
        if (!fs.existsSync(filePath)) {
            fail(`missing file: ${path.relative(rootDir, filePath)}`);
        }
    }
}

function ensureDeclaredOrderIsValid() {
    const knownFiles = new Set(fs.readdirSync(srcDir).filter((fileName) => fileName.endsWith('.css')));

    for (const fileName of SOURCE_FILE_ORDER) {
        if (!knownFiles.has(fileName)) {
            fail(`SOURCE_FILE_ORDER references a missing file: src/${fileName}`);
        }
    }
}

function ensureSingleBuildImport() {
    const themeCss = fs.readFileSync(themeFile, 'utf8');
    const importMatches = themeCss.match(/@import\s+url\(/g) || [];

    if (importMatches.length !== 1) {
        fail(`themes/sibnight.theme.css should contain exactly one @import, found ${importMatches.length}`);
    }
}

function ensureBuildOutputLooksHealthy() {
    const compiledCss = buildSourceCss();
    const bundledCss = buildBundleFromTheme(compiledCss);

    if (!compiledCss.includes('/* main.css */')) {
        fail('compiled build is missing main.css');
    }

    if (!bundledCss.includes('@name sibnight-discord')) {
        fail('bundled CSS is missing the theme header');
    }

    if (bundledCss.includes('https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibnight.css')) {
        fail('bundled CSS still contains the remote build import');
    }

    if (!fs.existsSync(buildFile)) {
        fail('build/sibnight.css was not written');
    }
}

function logDiscoveredSources() {
    console.log('[sibnight] project check passed');
    for (const filePath of getSourceFiles()) {
        console.log(`  src/${path.basename(filePath)}`);
    }
}

function main() {
    ensureFilesExist([srcDir, themeFile]);
    ensureDeclaredOrderIsValid();
    ensureSingleBuildImport();
    ensureBuildOutputLooksHealthy();
    logDiscoveredSources();
}

main();
