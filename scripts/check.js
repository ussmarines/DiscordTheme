const fs = require('fs');
const path = require('path');

const {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    REMOTE_BUILD_IMPORT,
    getSourceFiles,
    assertSourceOrderIsStrict,
    compileSourceCss,
    buildBundleFromTheme,
} = require('./lib/build-theme');

const DEBUG_COLOR_PATTERN = /(^|[^-\w])\b(red|yellow|lime|blue|magenta)\b(?![-\w])/giu;

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

function stripCssComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//gu, '');
}

function ensureSingleRemoteBuildImport() {
    const themeCss = readTextFile(themeFile);
    const importMatches = themeCss.match(/@import\s+url\(/gu) || [];

    if (importMatches.length !== 1) {
        fail(`themes/sibnight.theme.css should contain exactly one @import, found ${importMatches.length}`);
    }

    if (!themeCss.includes(REMOTE_BUILD_IMPORT)) {
        fail(`themes/sibnight.theme.css should import ${REMOTE_BUILD_IMPORT}`);
    }
}

function ensureGeneratedBuildIsFresh(compiledCss) {
    if (!fs.existsSync(buildFile)) {
        fail('build/sibnight.css is missing. Run `npm run build`.');
    }

    const currentBuild = readTextFile(buildFile);

    if (currentBuild !== compiledCss) {
        fail('build/sibnight.css is stale. Run `npm run build` and commit the regenerated file.');
    }
}

function ensureNoDebugColorPlaceholders(compiledCss) {
    const cssWithoutComments = stripCssComments(compiledCss);
    const hits = [];
    let match;

    while ((match = DEBUG_COLOR_PATTERN.exec(cssWithoutComments)) !== null) {
        const color = match[2];
        const before = cssWithoutComments.slice(0, match.index);
        const line = before.split('\n').length;

        hits.push(`${color} near compiled line ${line}`);

        if (hits.length >= 12) {
            break;
        }
    }

    if (hits.length > 0) {
        fail(
            'debug color placeholders remain in source CSS: ' +
                hits.join(', ') +
                '. Run `npm run fix:debug-colors`, then `npm run build`.'
        );
    }
}

function ensureBuildOutputLooksHealthy(compiledCss) {
    const bundledCss = buildBundleFromTheme(compiledCss);

    if (!compiledCss.includes('/* main.css */')) {
        fail('compiled build is missing main.css');
    }

    if (!compiledCss.includes('/* hardening.css */')) {
        fail('compiled build is missing hardening.css');
    }

    if (!bundledCss.includes('@name sibnight-discord')) {
        fail('bundled CSS is missing the theme header');
    }

    if (bundledCss.includes(REMOTE_BUILD_IMPORT)) {
        fail('bundled CSS still contains the remote build import');
    }
}

function logDiscoveredSources() {
    console.log('[sibnight] project check passed');

    for (const filePath of getSourceFiles()) {
        console.log(` src/${path.basename(filePath)}`);
    }
}

function main() {
    ensureFilesExist([srcDir, themeFile]);
    assertSourceOrderIsStrict();
    ensureSingleRemoteBuildImport();

    const compiledCss = compileSourceCss();

    ensureNoDebugColorPlaceholders(compiledCss);
    ensureGeneratedBuildIsFresh(compiledCss);
    ensureBuildOutputLooksHealthy(compiledCss);
    logDiscoveredSources();
}

main();