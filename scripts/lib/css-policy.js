const postcss = require('postcss');

const FONT_IMPORT = 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap';
const SITE = 'https://ussmarines.github.io/DiscordTheme/build/';

function validateCss(css, file) {
    const ast = postcss.parse(css, { from: file });
    const expected = file === 'themes/sibnight.theme.css' ? `${SITE}sibnight.css`
        : file.startsWith('themes/flavors/') ? `${SITE}sibnight-flavor.css`
        : file === 'src/main.css' || file.startsWith('build/') ? FONT_IMPORT : null;
    let imports = 0;
    let rulesStarted = false;
    ast.each((node) => {
        if (node.type === 'comment') return;
        if (node.type === 'atrule' && node.name.toLowerCase() === 'import') {
            const match = node.params.match(/^url\(['"]([^'"]+)['"]\)$/u);
            if (rulesStarted || !match || match[1] !== expected) throw node.error('Unexpected or late remote import');
            imports++;
        } else {
            rulesStarted = true;
        }
    });
    ast.walkAtRules(/^import$/i, (node) => {
        if (node.parent !== ast) throw node.error('Nested imports are not allowed');
    });
    if (imports !== (expected ? 1 : 0)) throw new Error(`${file}: unexpected import count ${imports}`);
    ast.walkRules((rule) => {
        const overlay = /layerContainer/u.test(rule.selector);
        const unread = /\.unread_\w+/u.test(rule.selector);
        rule.walkDecls((decl) => {
            if (overlay && /^background(?:-color|-image)?$/u.test(decl.prop) && !/^(?:none|transparent)$/u.test(decl.value)) {
                throw decl.error('Do not paint full-window layerContainer overlays');
            }
            if (unread && decl.prop === 'display' && decl.value === 'none') throw decl.error('Keep native unread indicators visible');
        });
    });
    return ast;
}

// Updaters may replace class hashes, but may not change declarations, URLs,
// rule ordering, conditions or selector structure. Visual review is still required.
function classUpdateShape(css) {
    const ast = postcss.parse(css);
    function shape(node) {
        if (node.type === 'comment') return null;
        const result = { type: node.type };
        for (const key of ['name', 'params', 'prop', 'value', 'important']) {
            if (node[key] !== undefined) result[key] = node[key];
        }
        if (node.selector !== undefined) result.selector = node.selector.replace(/(\.[\w-]+?_)[a-f\d]{6}\b/giu, '$1HASH');
        if (node.nodes) result.nodes = node.nodes.map(shape).filter(Boolean);
        return result;
    }
    return JSON.stringify(shape(ast));
}

module.exports = { validateCss, classUpdateShape, FONT_IMPORT };
