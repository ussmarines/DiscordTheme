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
    const known = new Set(fs.readdirSync(srcDir).filter((file) => file.endsWith('.css')));
    for (const file of SOURCE_FILE_ORDER) {
        if (!known.has(file)) {
            fail(`SOURCE_FILE_ORDER references a missing file: src/${file}`);
        }
    }
}

function ensureSingleBuildImport() {
    const themeCss = fs.readFileSync(themeFile, 'utf8');
    const matches = themeCss.match(/@import\s+url\(/g) || [];
    if (matches.length !== 1) {
        fail(`themes/sibnight.theme.css should contain exactly one @import, found ${matches.length}`);
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

ensureFilesExist([srcDir, themeFile]);
ensureDeclaredOrderIsValid();
ensureSingleBuildImport();
ensureBuildOutputLooksHealthy();

console.log('[sibnight] project check passed');
for (const filePath of getSourceFiles()) {
    console.log(`  src/${path.basename(filePath)}`);
}
