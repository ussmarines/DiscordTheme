const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const srcDir = path.join(rootDir, 'src');
const themeFile = path.join(rootDir, 'themes', 'sibnight.theme.css');
const buildFile = path.join(rootDir, 'build', 'sibnight.css');

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

const BUNDLE_OUTPUTS = [
    path.join(rootDir, 'sibnight.css'),
    path.join(rootDir, 'archive', 'sibnight.css'),
];

const BUILD_IMPORT_PATTERN =
    /@import\s+url\(['"]https:\/\/raw\.githubusercontent\.com\/ussmarines\/DiscordTheme\/main\/build\/sibnight\.css['"]\);/;

function listSourceCssFiles() {
    return fs
        .readdirSync(srcDir)
        .filter((file) => file.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right));
}

function getSourceFiles() {
    const discovered = listSourceCssFiles();
    const ordered = [];
    const remaining = new Set(discovered);

    for (const file of SOURCE_FILE_ORDER) {
        if (remaining.has(file)) {
            ordered.push(file);
            remaining.delete(file);
        }
    }

    ordered.push(...Array.from(remaining).sort((left, right) => left.localeCompare(right)));
    return ordered.map((file) => path.join(srcDir, file));
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

function buildSourceCss() {
    const css = getSourceFiles()
        .map((file) => `/* ${path.basename(file)} */\n${readTextFile(file)}\n`)
        .join('');

    writeTextFile(buildFile, css);
    return css;
}

function buildBundleFromTheme(compiledCss) {
    const themeCss = readTextFile(themeFile);
    ensureThemeTemplate(themeCss);
    return themeCss.replace(BUILD_IMPORT_PATTERN, compiledCss);
}

function getBundleOutputs(extraOutputs = []) {
    return [...BUNDLE_OUTPUTS, ...extraOutputs.filter(Boolean)];
}

function buildAll(extraOutputs = []) {
    const compiledCss = buildSourceCss();
    const bundledCss = buildBundleFromTheme(compiledCss);
    const outputs = getBundleOutputs(extraOutputs);

    for (const output of outputs) {
        writeTextFile(output, bundledCss);
    }

    return { compiledCss, bundledCss, outputs };
}

module.exports = {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    SOURCE_FILE_ORDER,
    getSourceFiles,
    getBundleOutputs,
    buildAll,
    buildSourceCss,
    buildBundleFromTheme,
};
