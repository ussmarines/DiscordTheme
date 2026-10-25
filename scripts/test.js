const { test } = require('node:test');
const assert = require('node:assert/strict');
const { compileSourceCss, bundle, validateCss, FONT_IMPORT } = require('./lib/build-theme');
const { FLAVORS } = require('./lib/flavors');
test('five palettes preserve the entire shared composition and bounded selectors', () => {
    const north = compileSourceCss();
    for (const flavor of FLAVORS) {
        const css = compileSourceCss(flavor.id);
        assert.ok(css.startsWith(north));
        const ast = validateCss(css.slice(north.length), flavor.id);
        ast.walkDecls(decl => assert.ok(decl.prop.startsWith('--') || /^(color|color-scheme|background.*)$/u.test(decl.prop), `${flavor.id}: geometry mutation ${decl.prop}`));
        assert.equal((css.match(/:has\(/gu) || []).length, 1);
        assert.equal((bundle(css, flavor.id).match(/@import/g) || []).length, 1);
    }
});
test('standalone output is deterministic and has no legacy dependency', () => {
    const first = compileSourceCss();
    assert.equal(compileSourceCss(), first);
    const out = bundle(first);
    assert.equal((out.match(/@import/g) || []).length, 1);
    assert.ok(out.includes(FONT_IMPORT));
    assert.doesNotMatch(out, /sibnight-flavor|sibnight\.css|flavor-base|--proto-/u);
});
test('policy rejects hidden imports, unread suppression and painted overlay roots', () => {
    for (const css of ['a {', '@import url(\'https://example.com/a.css\');', '@media all {.unread_abcdef {display:none}}', '.layerContainer_abcdef {background:#fff}']) assert.throws(() => validateCss(css, 'test'));
});
test('policy rejects lost focus and expensive global transitions', () => {
    for (const css of ['button:focus-visible {outline:none}', '.item {transition:all 1s}', '[class*=card] {background:red}', '.item:has(svg) {color:red}', '.item {backdrop-filter:blur(8px)}']) assert.throws(() => validateCss(css, 'test'));
    validateCss('button:focus-visible {outline:2px solid var(--sibnight-focus)}', 'test');
});
test('the sole relational exception cannot expand to ancestor or global queries', () => {
    const selector = '#app-mount .container_a28278:has(> .hiddenVisually_b18fe2 > input:checked) > .switchIndicator_a28278';
    validateCss(`${selector} {background-color:var(--sibnight-nord10)}`, 'switch');
    for (const selector of ['#app-mount:has(input:checked) .switchIndicator_a28278', '.container_a28278:has(input:checked)', '.item:HAS(svg)']) assert.throws(() => validateCss(`${selector} {color:red}`, 'test'));
});
