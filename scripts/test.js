const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateCss, classUpdateShape } = require('./lib/css-policy');
const { compileSourceCss, compileFlavorCss, buildBundleFromTheme } = require('./lib/build-theme');
const { getBundleOutputs } = require('./lib/build-theme');

test('build is deterministic and wrapper imports are inlined once', () => {
    const css = compileSourceCss();
    assert.equal(compileSourceCss(), css);
    assert.equal(compileFlavorCss(), compileFlavorCss(css));
    assert.equal((buildBundleFromTheme(css).match(/@import/g) || []).length, 1);
    assert.equal((css.match(/\/\* hardening.css \*\//g) || []).length, 1);
});
test('syntax and import policy reject invalid or hidden imports', () => {
    for (const css of ['a {', '@import "https://example.com/x.css";', '@media all { @import url("x"); }']) {
        assert.throws(() => validateCss(css, 'src/example.css'));
    }
    validateCss('a { color: var(--x); &:hover { opacity: .8 } }', 'src/example.css');
});
test('overlay and unread guards work inside nested conditions and selector groups', () => {
    assert.throws(() => validateCss('@media all { .layerContainer_abcdef, .menu { background: #fff } }', 'src/example.css'));
    assert.throws(() => validateCss('.unread_abcdef { display: none !important }', 'src/example.css'));
    validateCss('.layerContainer_abcdef { background: transparent }', 'src/example.css');
});
test('class updater cannot alter visual values or structural selectors', () => {
    const css = '.message_abcdef { color: var(--text); }';
    assert.equal(classUpdateShape(css), classUpdateShape(css.replace('abcdef', '012345')));
    for (const changed of [css.replace('--text', '--background'), css.replace('.message', '.layerContainer'), css.replace('color:', 'background:')]) {
        assert.notEqual(classUpdateShape(css), classUpdateShape(changed));
    }
});

test('development bundles cannot overwrite repository sources', () => {
    for (const file of ['themes/sibnight.theme.css', 'src/main.css', 'package.json']) {
        assert.throws(() => getBundleOutputs([file]));
    }
    assert.equal(getBundleOutputs(['output/test.theme.css', 'output/test.theme.css']).length, 1);
});

test('Chokidar watches CSS changes with a portable directory target', { timeout: 10000 }, async () => {
    const fs = require('fs');
    const os = require('os');
    const path = require('path');
    const chokidar = require('chokidar');
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sibnight-watch-'));
    const file = path.join(directory, 'test.css');
    fs.writeFileSync(file, 'a {}');
    const watcher = chokidar.watch(directory, { ignoreInitial: true, ignored: (file, stats) => stats?.isFile() && !file.endsWith('.css') });
    try {
        await new Promise((resolve, reject) => { watcher.once('ready', resolve); watcher.once('error', reject); });
        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('CSS change was not observed')), 5000);
            watcher.once('change', (changed) => { clearTimeout(timer); assert.equal(changed, file); resolve(); });
            fs.appendFileSync(file, '\nb {}');
        });
    } finally {
        await watcher.close();
        assert.equal(path.dirname(path.resolve(directory)), path.resolve(os.tmpdir()));
        assert.ok(path.basename(directory).startsWith('sibnight-watch-'));
        fs.rmSync(directory, { recursive: true });
    }
});
