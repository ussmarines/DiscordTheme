const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const { FLAVORS, flavorCss } = require('./flavors');
const rootDir = path.resolve(__dirname, '../..');
const SOURCE_FILE_ORDER = ['00-tokens.css', '10-native-colors.css', '20-shell.css', '30-conversation.css', '40-composer.css', '50-dock.css', '60-overlays.css', '70-icons.css', '75-motion.css', '80-accessibility.css'];
const FONT_IMPORT = 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap';
const BUILD_IMPORT = 'https://ussmarines.github.io/Sibylla-Discord-Theme/build/north-polar.css';
const themePath = path.join(rootDir, 'themes/north-polar.theme.css');
const buildPath = path.join(rootDir, 'build/north-polar.css');
const LOCAL_SWITCH_STATE = '#app-mount .container_a28278:has(> .hiddenVisually_b18fe2 > input:checked) > .switchIndicator_a28278';
function validateCss(css, name) {
    const ast = postcss.parse(css, { from: name });
    let imports = 0;
    ast.walkAtRules(/^import$/i, rule => {
        if (rule.parent !== ast || ![FONT_IMPORT, ...FLAVORS.map(f => `https://ussmarines.github.io/Sibylla-Discord-Theme/build/${f.id}.css`)].some(url => rule.params === `url('${url}')`)) throw rule.error('Unexpected import');
        imports++;
    });
    if (imports > 1) throw new Error(`${name}: repeated import`);
    ast.walkRules(rule => {
        if (/\[class[*^$]=/u.test(rule.selector)) throw rule.error('Use scoped native component selectors');
        if (/:has\(/iu.test(rule.selector) && rule.selector !== LOCAL_SWITCH_STATE) throw rule.error('Only the bounded native switch state query is allowed');
        rule.walkDecls(decl => {
            if (/layerContainer/u.test(rule.selector) && /^background/u.test(decl.prop) && !/^(none|transparent)$/u.test(decl.value)) throw decl.error('Do not paint overlay roots');
            if (/\.unread_\w+/u.test(rule.selector) && decl.prop === 'display' && decl.value === 'none') throw decl.error('Do not hide unread indicators');
            if (decl.prop === 'transition' && /\ball\b/u.test(decl.value)) throw decl.error('Do not transition all properties');
            if (/^(filter|backdrop-filter)$/u.test(decl.prop) && decl.value !== 'none') throw decl.error('No decorative filters');
            if (/:focus-visible/u.test(rule.selector) && decl.prop === 'outline' && /^(none|0)$/u.test(decl.value)) throw decl.error('Do not remove keyboard focus');
        });
    });
    return ast;
}
function compileSourceCss(id = 'north-polar') {
    if (!FLAVORS.some(f => f.id === id)) throw new Error('Unknown flavor');
    const found = fs.readdirSync(path.join(rootDir, 'src')).filter(n => n.endsWith('.css')).sort();
    if (JSON.stringify(found) !== JSON.stringify([...SOURCE_FILE_ORDER].sort())) throw new Error('Source manifest does not match src/');
    const common = SOURCE_FILE_ORDER.map(name => {
        const css = fs.readFileSync(path.join(rootDir, 'src', name), 'utf8').replace(/\r\n/g, '\n').trimEnd();
        validateCss(css, name);
        return `/* ${name} */\n${css}\n`;
    }).join('\n');
    const css = common + flavorCss(id);
    validateCss(css, id);
    return css;
}
function bundle(css = compileSourceCss(), id = 'north-polar') {
    const wrapper = fs.readFileSync(path.join(rootDir, 'themes', `${id}.theme.css`), 'utf8').replace(/\r\n/g, '\n');
    const url = `https://ussmarines.github.io/Sibylla-Discord-Theme/build/${id}.css`;
    if (!wrapper.includes(`@import url('${url}');`)) throw new Error('Standalone wrapper import missing');
    return wrapper.replace(`@import url('${url}');`, css).trimEnd() + '\n';
}
module.exports = { rootDir, SOURCE_FILE_ORDER, FONT_IMPORT, BUILD_IMPORT, themePath, buildPath, validateCss, compileSourceCss, bundle };
