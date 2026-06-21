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

const flavorsDir = path.join(rootDir, 'themes', 'flavors');
const readmeFile = path.join(rootDir, 'README.md');

const MAIN_THEME_IMPORT = 'https://ussmarines.github.io/DiscordTheme/themes/sibnight.theme.css';

const EXPECTED_FLAVOR_FILES = [
    'sibnight-flat.theme.css',
    'sibnight-tokyo-night.theme.css',
    'sibnight-sun.theme.css',
    'sibnight-space.theme.css',
    'sibnight-north-polar.theme.css',
    'sibnight-north-snow.theme.css',
    'sibnight-north-aurora-dark.theme.css',
    'sibnight-north-aurora-light.theme.css',
];

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

function getFlavorFiles() {
    if (!fs.existsSync(flavorsDir)) {
        fail('themes/flavors directory is missing');
    }

    return fs
        .readdirSync(flavorsDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right));
}

function ensureFlavorFilesAreNormalized() {
    const flavorFiles = getFlavorFiles();
    const expectedSet = new Set(EXPECTED_FLAVOR_FILES);

    const nonThemeFiles = flavorFiles.filter((fileName) => !fileName.endsWith('.theme.css'));

    if (nonThemeFiles.length > 0) {
        fail(`flavor files must use *.theme.css: ${nonThemeFiles.join(', ')}`);
    }

    const missingFiles = EXPECTED_FLAVOR_FILES.filter((fileName) => !flavorFiles.includes(fileName));
    const unexpectedFiles = flavorFiles.filter((fileName) => !expectedSet.has(fileName));

    if (missingFiles.length > 0) {
        fail(`missing flavor files: ${missingFiles.join(', ')}`);
    }

    if (unexpectedFiles.length > 0) {
        fail(`unexpected flavor files: ${unexpectedFiles.join(', ')}`);
    }

    for (const fileName of EXPECTED_FLAVOR_FILES) {
        const filePath = path.join(flavorsDir, fileName);
        const css = readTextFile(filePath);
        const slug = fileName.replace(/\.theme\.css$/u, '');

        if (!css.includes(`@name ${slug}`)) {
            fail(`${fileName} should have @name ${slug}`);
        }

        if (!css.includes(`themes/flavors/${fileName}`)) {
            fail(`${fileName} should have a matching @source path`);
        }

        if (!css.includes(`@import url('${MAIN_THEME_IMPORT}');`)) {
            fail(`${fileName} should import the main theme wrapper: ${MAIN_THEME_IMPORT}`);
        }

        if (css.includes(REMOTE_BUILD_IMPORT) || css.includes('/build/sibnight.css')) {
            fail(`${fileName} imports the raw build directly. Flavors must import themes/sibnight.theme.css instead.`);
        }

        if (css.includes('raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibnight.theme.css')) {
            fail(`${fileName} still imports the old raw GitHub theme URL`);
        }
    }
}

function ensureReadmeFlavorPathsAreNormalized() {
    if (!fs.existsSync(readmeFile)) {
        return;
    }

    const readme = readTextFile(readmeFile);

    for (const fileName of EXPECTED_FLAVOR_FILES) {
        if (!readme.includes(`themes/flavors/${fileName}`)) {
            fail(`README.md is missing themes/flavors/${fileName}`);
        }
    }

    const invalidTokens = [
        'themes/flavors/flat.theme.css',
        'themes/flavors/tokyo-night.theme.css',
        'themes/flavors/sun.theme.css',
        'themes/flavors/space.theme.css',
        'themes/flavors/sibnight-flat.css',
        'themes/flavors/sibnight-tokyo-night.css',
        'themes/flavors/sibnight-sun.css',
        'themes/flavors/sibnight-space.css',
        'themes/flavors/sibnight-north-Polar',
        'themes/flavors/sibnight-north-Snow',
        'themes/flavors/sibnight-north-Aurora-Dark',
        'themes/flavors/sibnight-north-Aurora-Light',
    ];

    const foundInvalidTokens = invalidTokens.filter((token) => readme.includes(token));

    if (foundInvalidTokens.length > 0) {
        fail(`README.md contains invalid flavor paths/names: ${foundInvalidTokens.join(', ')}`);
    }
}

function logDiscoveredSources() {
    console.log('[sibnight] project check passed');

    for (const filePath of getSourceFiles()) {
        console.log(` src/${path.basename(filePath)}`);
    }

    for (const fileName of EXPECTED_FLAVOR_FILES) {
        console.log(` themes/flavors/${fileName}`);
    }
}

function main() {
    ensureFilesExist([srcDir, themeFile]);
    assertSourceOrderIsStrict();
    ensureSingleRemoteBuildImport();
    ensureFlavorFilesAreNormalized();
    ensureReadmeFlavorPathsAreNormalized();

    const compiledCss = compileSourceCss();

    ensureNoDebugColorPlaceholders(compiledCss);
    ensureGeneratedBuildIsFresh(compiledCss);
    ensureBuildOutputLooksHealthy(compiledCss);
    logDiscoveredSources();
}

main();