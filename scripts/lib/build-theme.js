const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');
const srcDir = path.join(rootDir, 'src');
const themeFile = path.join(rootDir, 'themes', 'sibnight.theme.css');
const buildFile = path.join(rootDir, 'build', 'sibnight.css');

function getSourceFiles() {
    const files = fs
        .readdirSync(srcDir)
        .filter((file) => file.endsWith('.css'))
        .sort((a, b) => a.localeCompare(b));

    const mainIndex = files.indexOf('main.css');
    if (mainIndex > -1) {
        files.splice(mainIndex, 1);
        files.unshift('main.css');
    }

    return files.map((file) => path.join(srcDir, file));
}

function buildSourceCss() {
    const css = getSourceFiles()
        .map((file) => `/* ${path.basename(file)} */\n${fs.readFileSync(file, 'utf8')}\n`)
        .join('');

    fs.mkdirSync(path.dirname(buildFile), { recursive: true });
    fs.writeFileSync(buildFile, css);
    return css;
}

function buildBundleFromTheme(compiledCss) {
    const theme = fs.readFileSync(themeFile, 'utf8');
    return theme.replace(/@import\s+url\(['"]?[^'"]+['"]?\);/g, compiledCss);
}

function buildAll(extraOutputs = []) {
    const compiledCss = buildSourceCss();
    const bundledCss = buildBundleFromTheme(compiledCss);

    const outputs = [
        path.join(rootDir, 'sibnight.css'),
        path.join(rootDir, 'archive', 'sibnight.css'),
        ...extraOutputs.filter(Boolean),
    ];

    for (const output of outputs) {
        fs.mkdirSync(path.dirname(output), { recursive: true });
        fs.writeFileSync(output, bundledCss);
    }

    return { compiledCss, bundledCss, outputs };
}

module.exports = {
    rootDir,
    srcDir,
    themeFile,
    buildFile,
    buildAll,
    buildSourceCss,
    buildBundleFromTheme,
};
