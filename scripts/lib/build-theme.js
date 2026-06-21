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
    'hardening.css',
];

const BUNDLE_OUTPUTS = [
    path.join(rootDir, 'sibnight.css'),
    path.join(rootDir, 'archive', 'sibnight.css'),
];

const REMOTE_BUILD_IMPORT = 'https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibnight.css';

const BUILD_IMPORT_PATTERN = new RegExp(
    String.raw`@import\s+url\(['"]${REMOTE_BUILD_IMPORT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\);`
);

function listSourceCssFiles() {
    if (!fs.existsSync(srcDir)) {
        throw new Error(`Source directory is missing: ${srcDir}`);
    }

    return fs
        .readdirSync(srcDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right));
}

function assertSourceOrderIsStrict() {
    const discoveredFiles = listSourceCssFiles();
    const discoveredSet = new Set(discoveredFiles);
    const declaredSet = new Set(SOURCE_FILE_ORDER);

    const duplicateDeclarations = SOURCE_FILE_ORDER.filter((fileName, index) => {
        return SOURCE_FILE_ORDER.indexOf(fileName) !== index;
    });

    if (duplicateDeclarations.length > 0) {
        throw new Error(`SOURCE_FILE_ORDER contains duplicates: ${duplicateDeclarations.join(', ')}`);
    }

    const missingFiles = SOURCE_FILE_ORDER.filter((fileName) => !discoveredSet.has(fileName));
    const undeclaredFiles = discoveredFiles.filter((fileName) => !declaredSet.has(fileName));

    if (missingFiles.length > 0) {
        throw new Error(`SOURCE_FILE_ORDER references missing files: ${missingFiles.map((file) => `src/${file}`).join(', ')}`);
    }

    if (undeclaredFiles.length > 0) {
        throw new Error(`SOURCE_FILE_ORDER is missing files: ${undeclaredFiles.map((file) => `src/${file}`).join(', ')}`);
    }
}

function getSourceFiles() {
    assertSourceOrderIsStrict();

    return SOURCE_FILE_ORDER.map((fileName) => path.join(srcDir, fileName));
}

function readTextFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function writeTextFile(filePath, contents) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents);
}

function normalizeCssText(contents) {
    return contents.replace(/\r\n/g, '\n').replace(/\s*$/u, '\n');
}

function ensureThemeTemplate(themeCss) {
    if (!BUILD_IMPORT_PATTERN.test(themeCss)) {
        throw new Error(
            'themes/sibnight.theme.css no longer contains the expected build import. ' +
                'Keep the raw GitHub import so the build step can inline compiled CSS safely.'
        );
    }
}

function compileSourceCss() {
    return getSourceFiles()
        .map((filePath) => {
            const relativeName = path.basename(filePath);
            return `/* ${relativeName} */\n${normalizeCssText(readTextFile(filePath))}\n`;
        })
        .join('');
}

function writeCompiledCss(compiledCss = compileSourceCss()) {
    writeTextFile(buildFile, compiledCss);
    return compiledCss;
}

function buildBundleFromTheme(compiledCss) {
    const themeCss = readTextFile(themeFile);
    ensureThemeTemplate(themeCss);

    return themeCss.replace(BUILD_IMPORT_PATTERN, compiledCss);
}

function getBundleOutputs(extraOutputs = []) {
    const normalizedExtraOutputs = extraOutputs
        .filter(Boolean)
        .map((outputPath) => path.resolve(rootDir, outputPath));

    return [...BUNDLE_OUTPUTS, ...normalizedExtraOutputs];
}

function writeBundleOutputs(bundledCss, extraOutputs = []) {
    const outputs = getBundleOutputs(extraOutputs);

    for (const outputPath of outputs) {
        writeTextFile(outputPath, bundledCss);
    }

    return outputs;
}

function buildAll(extraOutputs = []) {
    const compiledCss = compileSourceCss();
    writeCompiledCss(compiledCss);

    const bundledCss = buildBundleFromTheme(compiledCss);
    const outputs = writeBundleOutputs(bundledCss, extraOutputs);

    return {
        compiledCss,
        bundledCss,
        outputs,
    };
}

module.exports = {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    SOURCE_FILE_ORDER,
    BUNDLE_OUTPUTS,
    REMOTE_BUILD_IMPORT,
    BUILD_IMPORT_PATTERN,
    listSourceCssFiles,
    assertSourceOrderIsStrict,
    getSourceFiles,
    getBundleOutputs,
    compileSourceCss,
    writeCompiledCss,
    buildBundleFromTheme,
    writeBundleOutputs,
    buildAll,
};