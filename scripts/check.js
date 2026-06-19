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

const packageJsonFile = path.join(rootDir, 'package.json');
const bundleFile = path.join(rootDir, 'sibnight.css');
const flavorsDir = path.join(rootDir, 'themes', 'flavors');

function fail(message) {
    console.error(`[sibnight] check failed: ${message}`);
    process.exit(1);
}

function readTextFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
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
    const themeCss = readTextFile(themeFile);
    const importMatches = themeCss.match(/@import\s+url\(/g) || [];

    if (importMatches.length !== 1) {
        fail(`themes/sibnight.theme.css should contain exactly one @import, found ${importMatches.length}`);
    }
}

function extractVersion(contents, fileLabel) {
    const match = contents.match(/@version\s+([^\n*]+)/);

    if (!match) {
        fail(`${fileLabel} is missing an @version header`);
    }

    return match[1].trim();
}

function ensureVersionSync() {
    const packageJson = JSON.parse(readTextFile(packageJsonFile));
    const packageVersion = packageJson.version;
    const themeVersion = extractVersion(readTextFile(themeFile), 'themes/sibnight.theme.css');

    if (packageVersion !== themeVersion) {
        fail(`package.json version (${packageVersion}) does not match themes/sibnight.theme.css (${themeVersion})`);
    }

    if (fs.existsSync(bundleFile)) {
        const bundleVersion = extractVersion(readTextFile(bundleFile), 'sibnight.css');

        if (bundleVersion !== packageVersion) {
            fail(`sibnight.css version (${bundleVersion}) does not match package.json (${packageVersion})`);
        }
    }
}

function ensureFlavorSetIsClean() {
    const flavorFiles = fs
        .readdirSync(flavorsDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right));

    if (flavorFiles.includes('sibnight-north-Aurora.css')) {
        fail('obsolete flavor still present: themes/flavors/sibnight-north-Aurora.css');
    }

    if (flavorFiles.length === 0) {
        fail('themes/flavors does not contain any flavor files');
    }
}

function ensureBuildOutputsAreCurrent() {
    const previousBuild = fs.existsSync(buildFile) ? readTextFile(buildFile) : null;
    const previousBundle = fs.existsSync(bundleFile) ? readTextFile(bundleFile) : null;

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

    if (previousBuild !== null && previousBuild !== compiledCss) {
        fail('build/sibnight.css is out of date; run npm run build');
    }

    if (previousBundle !== null && previousBundle !== bundledCss) {
        fail('sibnight.css is out of date; run npm run build');
    }
}

function logDiscoveredSources() {
    console.log('[sibnight] project check passed');
    for (const filePath of getSourceFiles()) {
        console.log(`  src/${path.basename(filePath)}`);
    }
}

function main() {
    ensureFilesExist([srcDir, themeFile, packageJsonFile, flavorsDir]);
    ensureDeclaredOrderIsValid();
    ensureSingleBuildImport();
    ensureVersionSync();
    ensureFlavorSetIsClean();
    ensureBuildOutputsAreCurrent();
    logDiscoveredSources();
}

main();
