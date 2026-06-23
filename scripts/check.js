const fs = require('fs');
const path = require('path');

const {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    flavorSourceFile,
    flavorBuildFile,
    REMOTE_BUILD_IMPORT,
    REMOTE_FLAVOR_BUILD_IMPORT,
    getSourceFiles,
    assertSourceOrderIsStrict,
    compileSourceCss,
    compileFlavorCss,
    buildBundleFromTheme,
} = require('./lib/build-theme');

const flavorsDir = path.join(rootDir, 'themes', 'flavors');
const readmeFile = path.join(rootDir, 'README.md');
const packageFile = path.join(rootDir, 'package.json');

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
const FLAVOR_LAYOUT_DEFAULTS_START = '/* sibnight flavor layout defaults: start */';
const REQUIRED_METADATA = ['@name', '@description', '@author', '@version', '@source'];
const HAS_SELECTOR_BUDGETS = new Map([
    ['chatbar.css', 1],
    ['colors.css', 2],
    ['main.css', 2],
    ['top-bar.css', 14],
    ['user-panel.css', 1],
]);
const PARTIAL_ATTRIBUTE_SELECTOR_BUDGETS = new Map([
    ['colors.css', 2],
    ['compatibility.css', 2],
    ['flavor-base.css', 6],
    ['hardening.css', 1],
    ['main.css', 9],
    ['top-bar.css', 5],
    ['sibnight-flat.theme.css', 0],
    ['sibnight-north-aurora-dark.theme.css', 29],
    ['sibnight-north-aurora-light.theme.css', 29],
    ['sibnight-north-polar.theme.css', 52],
    ['sibnight-north-snow.theme.css', 29],
    ['sibnight-space.theme.css', 78],
    ['sibnight-sun.theme.css', 29],
    ['sibnight-tokyo-night.theme.css', 1],
]);

function fail(message) {
    console.error(`[sibnight] check failed: ${message}`);
    process.exit(1);
}

function readTextFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function readJsonFile(filePath) {
    return JSON.parse(readTextFile(filePath));
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

function listCssFiles(directory) {
    if (!fs.existsSync(directory)) {
        return [];
    }

    const files = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...listCssFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.css')) {
            files.push(entryPath);
        }
    }

    return files.sort((left, right) => left.localeCompare(right));
}

function ensurePackageScriptsAreAligned() {
    const pkg = readJsonFile(packageFile);
    const scripts = pkg.scripts || {};

    if (scripts['prepare:release'] !== 'npm run build && npm run check') {
        fail('package.json prepare:release should build before checking generated files');
    }
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

function ensureGeneratedBuildsAreFresh(compiledCss, compiledFlavorCss) {
    for (const [filePath, expectedCss] of [
        [buildFile, compiledCss],
        [flavorBuildFile, compiledFlavorCss],
    ]) {
        const relativePath = path.relative(rootDir, filePath);

        if (!fs.existsSync(filePath)) {
            fail(`${relativePath} is missing. Run \`npm run build\`.`);
        }

        if (readTextFile(filePath) !== expectedCss) {
            fail(`${relativePath} is stale. Run \`npm run build\` and commit the regenerated file.`);
        }
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
                '. Replace them with theme variables, then run `npm run build`.'
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

    if (!compiledCss.includes('/* compatibility.css */')) {
        fail('compiled build is missing compatibility.css');
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

        if (!css.includes(`@import url('${REMOTE_FLAVOR_BUILD_IMPORT}');`)) {
            fail(`${fileName} should import the flavor build directly: ${REMOTE_FLAVOR_BUILD_IMPORT}`);
        }

        if (css.includes('/themes/sibnight.theme.css')) {
            fail(`${fileName} imports the main wrapper. Flavors should import build/sibnight.css directly for faster startup.`);
        }

        if (!css.includes(FLAVOR_LAYOUT_DEFAULTS_START)) {
            fail(`${fileName} is missing the flavor layout defaults block.`);
        }

        if (!css.includes('--sibnight-flavor: on;')) {
            fail(`${fileName} must enable the shared flavor rules.`);
        }

        if (css.includes('Flavor autocomplete / shortcut compatibility')) {
            fail(`${fileName} duplicates the shared compatibility rules.`);
        }

        const declarations = [...stripCssComments(css).matchAll(/^\s*(--[\w-]+)\s*:/gmu)].map(
            (match) => match[1]
        );
        const duplicateDeclarations = declarations.filter(
            (property, index) => declarations.indexOf(property) !== index
        );

        if (duplicateDeclarations.length > 0) {
            fail(`${fileName} declares duplicate variables: ${[...new Set(duplicateDeclarations)].join(', ')}`);
        }
    }
}

function ensureThemeMetadataIsValid() {
    const themeFiles = [themeFile, ...getFlavorFiles().map((fileName) => path.join(flavorsDir, fileName))];

    for (const filePath of themeFiles) {
        const css = readTextFile(filePath);
        const relativePath = path.relative(rootDir, filePath);

        if (!css.startsWith('/**')) {
            fail(`${relativePath} must start with a BetterDiscord metadata block`);
        }

        const metadataEnd = css.indexOf('*/');

        if (metadataEnd === -1) {
            fail(`${relativePath} has an unterminated metadata block`);
        }

        const metadata = css.slice(0, metadataEnd);
        const missingFields = REQUIRED_METADATA.filter((field) => !metadata.includes(field));

        if (missingFields.length > 0) {
            fail(`${relativePath} is missing metadata: ${missingFields.join(', ')}`);
        }
    }
}

function ensureCssPerformanceRules() {
    const cssFiles = [...listCssFiles(srcDir), ...listCssFiles(path.join(rootDir, 'themes'))];
    const broadMessageDescendant = /\.(?:message|messageListItem)_[\w-]+\s+\*/u;
    const containedOverscroll = /overscroll-behavior(?:-[xy])?\s*:\s*contain\b/iu;
    const transitionAll = /transition(?:-property)?\s*:[^;{}]*\ball\b/iu;
    const unscopedGuildStack = /^\s*\.stack_dbd263\b/mu;

    for (const filePath of cssFiles) {
        const css = stripCssComments(readTextFile(filePath));
        const relativePath = path.relative(rootDir, filePath);
        const hasSelectorCount = (css.match(/:has\(/gu) || []).length;
        const hasSelectorBudget = HAS_SELECTOR_BUDGETS.get(path.basename(filePath)) || 0;
        const partialAttributeSelectorCount = (css.match(/\[[^\]]+[\^$*]=/gu) || []).length;
        const partialAttributeSelectorBudget =
            PARTIAL_ATTRIBUTE_SELECTOR_BUDGETS.get(path.basename(filePath)) || 0;

        if (css.includes('\t')) {
            fail(`${relativePath} contains tabs; use four spaces`);
        }

        if (broadMessageDescendant.test(css)) {
            fail(`${relativePath} styles every message descendant; target the smallest stable container instead`);
        }

        if (containedOverscroll.test(css)) {
            fail(`${relativePath} blocks wheel-event scroll chaining with overscroll-behavior: contain`);
        }

        if (hasSelectorCount > hasSelectorBudget) {
            fail(`${relativePath} uses ${hasSelectorCount} :has() selectors; the reviewed budget is ${hasSelectorBudget}`);
        }

        if (partialAttributeSelectorCount > partialAttributeSelectorBudget) {
            fail(
                `${relativePath} uses ${partialAttributeSelectorCount} partial attribute selectors; ` +
                    `the reviewed budget is ${partialAttributeSelectorBudget}`
            );
        }

        if (unscopedGuildStack.test(css)) {
            fail(`${relativePath} targets Discord's shared stack class without the guild scroller scope`);
        }

        if (transitionAll.test(css)) {
            fail(`${relativePath} uses transition: all; list only the animated properties`);
        }
    }
}

function ensureFlavorOverlayLayerStaysTransparent() {
    const spaceFile = path.join(flavorsDir, 'sibnight-space.theme.css');
    const css = stripCssComments(readTextFile(spaceFile));
    const overlayBackgroundRule = /(?:\.layerContainer(?:_[\w-]+)?|\[class\*=['"]layerContainer['"]\])[^{}]*\{[^{}]*background(?:-image|-color)?\s*:/iu;

    if (overlayBackgroundRule.test(css)) {
        fail('sibnight-space.theme.css must not paint Discord\'s full-window layerContainer overlay');
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
        'sibnight-sibnight-',
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

function ensureNoExpensiveWillChange() {
    const cssFiles = [
        ...listCssFiles(srcDir),
        ...listCssFiles(path.join(rootDir, 'themes')),
    ];

    const offenders = [];

    for (const filePath of cssFiles) {
        const css = readTextFile(filePath);

        if (/will-change\s*:\s*scroll-position/iu.test(css)) {
            offenders.push(path.relative(rootDir, filePath));
        }
    }

    if (offenders.length > 0) {
        fail(`remove will-change: scroll-position from: ${offenders.join(', ')}`);
    }
}

function ensureReducedMotionExists() {
    const animationsFile = path.join(srcDir, 'animations.css');

    if (!fs.existsSync(animationsFile)) {
        fail('src/animations.css is missing');
    }

    const css = readTextFile(animationsFile);

    if (!css.includes('@media (prefers-reduced-motion: reduce)')) {
        fail('src/animations.css should include @media (prefers-reduced-motion: reduce)');
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
    ensureFilesExist([packageFile, srcDir, themeFile, flavorSourceFile]);
    ensurePackageScriptsAreAligned();
    assertSourceOrderIsStrict();
    ensureSingleRemoteBuildImport();
    ensureFlavorFilesAreNormalized();
    ensureThemeMetadataIsValid();
    ensureReadmeFlavorPathsAreNormalized();
    ensureNoExpensiveWillChange();
    ensureCssPerformanceRules();
    ensureFlavorOverlayLayerStaysTransparent();
    ensureReducedMotionExists();

    const compiledCss = compileSourceCss();
    const compiledFlavorCss = compileFlavorCss(compiledCss);

    ensureNoDebugColorPlaceholders(compiledCss);
    ensureNoDebugColorPlaceholders(compiledFlavorCss);
    ensureGeneratedBuildsAreFresh(compiledCss, compiledFlavorCss);
    ensureBuildOutputLooksHealthy(compiledCss);
    logDiscoveredSources();
}

main();
