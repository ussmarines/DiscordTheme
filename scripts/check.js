const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    bundleFile,
    flavorsDir,
    SOURCE_FILE_ORDER,
    getSourceFiles,
    getFlavorFiles,
    buildSourceCss,
    buildBundleFromTheme,
    validateFlavorFiles,
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

function extractFirstMetadataVersion(css) {
    const match = css.match(/@version\s+([^\n\r]+)/);

    if (!match) {
        return null;
    }

    return match[1].trim();
}

function ensureVersionConsistency() {
    const themeCss = fs.readFileSync(themeFile, 'utf8');
    const themeVersion = extractFirstMetadataVersion(themeCss);

    if (!themeVersion) {
        fail('themes/sibnight.theme.css is missing @version metadata');
    }

    if (packageJson.version !== themeVersion) {
        fail(
            `package.json version (${packageJson.version}) does not match themes/sibnight.theme.css (${themeVersion})`
        );
    }
}

function ensureBuildOutputsAreCurrent() {
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

    ensureFilesExist([buildFile, bundleFile]);

    if (fs.readFileSync(buildFile, 'utf8') !== compiledCss) {
        fail('build/sibnight.css is out of date; run npm run build');
    }

    if (fs.readFileSync(bundleFile, 'utf8') !== bundledCss) {
        fail('sibnight.css is out of date; run npm run build');
    }
}

function logDiscoveredSources() {
    console.log('[sibnight] project check passed');
    for (const filePath of getSourceFiles()) {
        console.log(`  src/${path.basename(filePath)}`);
    }

    for (const filePath of getFlavorFiles()) {
        console.log(`  themes/flavors/${path.basename(filePath)}`);
    }
}

function main() {
    ensureFilesExist([srcDir, themeFile, flavorsDir]);
    ensureDeclaredOrderIsValid();
    ensureSingleBuildImport();
    validateFlavorFiles();
    ensureVersionConsistency();
    ensureBuildOutputsAreCurrent();
    logDiscoveredSources();
}

main();
