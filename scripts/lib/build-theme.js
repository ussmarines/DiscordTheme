const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const srcDir = path.join(rootDir, 'src');
const themeFile = path.join(rootDir, 'themes', 'sibnight.theme.css');
const buildFile = path.join(rootDir, 'build', 'sibnight.css');
const bundleFile = path.join(rootDir, 'sibnight.css');
const flavorsDir = path.join(rootDir, 'themes', 'flavors');

const SOURCE_FILE_ORDER = [
    'main.css',
    'colors.css',
    'animations.css',
    'background-image.css',
    'chatbar.css',
    'dms-button.css',
    'top-bar.css',
    'transparency-blur.css',
    'user-panel.css',
    'window-controls.css',
];

const REMOTE_BUILD_IMPORT =
    'https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibnight.css';

const BUILD_IMPORT_PATTERN = new RegExp(
    String.raw`@import\s+url\(['"]${REMOTE_BUILD_IMPORT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\);`
);

const THEME_IMPORT_PATTERN =
    /@import\s+url\(['"]https:\/\/raw\.githubusercontent\.com\/ussmarines\/DiscordTheme\/main\/themes\/sibnight\.theme\.css['"]\);/;

function listSourceCssFiles() {
    return fs
        .readdirSync(srcDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right));
}

function resolveSourceFileOrder() {
    const discoveredFiles = listSourceCssFiles();
    const orderedFiles = [];
    const remainingFiles = new Set(discoveredFiles);

    for (const fileName of SOURCE_FILE_ORDER) {
        if (remainingFiles.has(fileName)) {
            orderedFiles.push(fileName);
            remainingFiles.delete(fileName);
        }
    }

    orderedFiles.push(...Array.from(remainingFiles).sort((left, right) => left.localeCompare(right)));
    return orderedFiles;
}

function getSourceFiles() {
    return resolveSourceFileOrder().map((fileName) => path.join(srcDir, fileName));
}

function getFlavorFiles() {
    if (!fs.existsSync(flavorsDir)) {
        return [];
    }

    return fs
        .readdirSync(flavorsDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right))
        .map((fileName) => path.join(flavorsDir, fileName));
}

function readTextFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function writeTextFile(filePath, contents) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents);
}

function ensureThemeTemplate(themeCss) {
    if (!BUILD_IMPORT_PATTERN.test(themeCss)) {
        throw new Error(
            'themes/sibnight.theme.css no longer contains the expected build import. ' +
            'Keep the raw GitHub import so the build step can inline compiled CSS safely.'
        );
    }
}

function ensureFlavorTemplate(flavorCss, filePath) {
    if (!THEME_IMPORT_PATTERN.test(flavorCss)) {
        throw new Error(
            `${path.relative(rootDir, filePath)} must keep the raw GitHub import to themes/sibnight.theme.css.`
        );
    }
}

function buildSourceCss() {
    const compiledCss = getSourceFiles()
        .map((filePath) => `/* ${path.basename(filePath)} */\n${readTextFile(filePath)}\n`)
        .join('');

    writeTextFile(buildFile, compiledCss);
    return compiledCss;
}

function buildBundleFromTheme(compiledCss) {
    const themeCss = readTextFile(themeFile);
    ensureThemeTemplate(themeCss);
    return themeCss.replace(BUILD_IMPORT_PATTERN, compiledCss);
}

function getBundleOutputs(extraOutputs = []) {
    return [bundleFile, ...extraOutputs.filter(Boolean)];
}

function writeBundleOutputs(bundledCss, extraOutputs = []) {
    const outputs = getBundleOutputs(extraOutputs);

    for (const outputPath of outputs) {
        writeTextFile(outputPath, bundledCss);
    }

    return outputs;
}

function validateFlavorFiles() {
    for (const filePath of getFlavorFiles()) {
        ensureFlavorTemplate(readTextFile(filePath), filePath);
    }
}

function buildAll(extraOutputs = []) {
    validateFlavorFiles();

    const compiledCss = buildSourceCss();
    const bundledCss = buildBundleFromTheme(compiledCss);
    const outputs = writeBundleOutputs(bundledCss, extraOutputs);

    return { compiledCss, bundledCss, outputs };
}

module.exports = {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    bundleFile,
    flavorsDir,
    SOURCE_FILE_ORDER,
    REMOTE_BUILD_IMPORT,
    getSourceFiles,
    getFlavorFiles,
    getBundleOutputs,
    buildAll,
    buildSourceCss,
    buildBundleFromTheme,
    validateFlavorFiles,
    writeBundleOutputs,
};
