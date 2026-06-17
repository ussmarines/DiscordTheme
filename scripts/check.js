const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const runtimeFiles = ['themes/sibylla.theme.css', 'build/sibylla.css'];
const criticalSelectors = [
    '#app-mount',
    '.appMount__51fd7',
    '.app__160d8',
    '.layers__960e4',
    '.layer__960e4',
    '.wrapper_ef3116',
    '.guilds__5e434',
    '.sidebarList__5e434',
    '.chat_f75fb0',
    '.chatContent_f75fb0',
    '.page__5e434',
];

function read(file) {
    return fs.readFileSync(path.join(root, file), 'utf8');
}

function fail(message) {
    console.error(`CHECK FAILED: ${message}`);
    process.exitCode = 1;
}

function assert(condition, message) {
    if (!condition) fail(message);
}

function walk(dir, out = []) {
    for (const name of fs.readdirSync(dir)) {
        if (name === '.git' || name === 'node_modules') continue;
        const full = path.join(dir, name);
        const rel = path.relative(root, full).replace(/\\/g, '/');
        if (fs.statSync(full).isDirectory()) walk(full, out);
        else out.push(rel);
    }
    return out;
}

function stripComments(content) {
    return content.replace(/\/\*[\s\S]*?\*\//g, '');
}

function checkBalance(file, content) {
    const stripped = stripComments(content);
    for (const [open, close] of [['{', '}'], ['(', ')'], ['[', ']']]) {
        const a = [...stripped].filter((ch) => ch === open).length;
        const b = [...stripped].filter((ch) => ch === close).length;
        assert(a === b, `${file}: unbalanced ${open}${close} (${a}/${b})`);
    }
}

function checkDangerousHides(file, content) {
    const css = stripComments(content);
    const blocks = css.match(/[^{}]+\{[^{}]*\}/g) || [];
    for (const block of blocks) {
        const selector = block.slice(0, block.indexOf('{')).trim();
        const body = block.slice(block.indexOf('{') + 1, block.lastIndexOf('}'));
        const targetsCritical = criticalSelectors.some((critical) => selector.split(',').map((s) => s.trim()).includes(critical));
        if (!targetsCritical) continue;
        assert(!/display\s*:\s*none\s*!?important?/i.test(body), `${file}: critical selector hidden with display:none -> ${selector}`);
        assert(!/visibility\s*:\s*hidden\s*!?important?/i.test(body), `${file}: critical selector hidden with visibility:hidden -> ${selector}`);
        assert(!/opacity\s*:\s*0\s*!?important?/i.test(body), `${file}: critical selector hidden with opacity:0 -> ${selector}`);
    }
}


function readDeclarations(body) {
    const out = new Map();
    for (const declaration of body.split(';')) {
        const index = declaration.indexOf(':');
        if (index === -1) continue;
        const name = declaration.slice(0, index).trim().toLowerCase();
        const value = declaration.slice(index + 1).trim().toLowerCase();
        if (name) out.set(name, value);
    }
    return out;
}

function checkForegroundBackgroundLayer(file, content) {
    const css = stripComments(content);
    const blocks = css.match(/[^{}]+\{[^{}]*\}/g) || [];
    for (const block of blocks) {
        const selector = block.slice(0, block.indexOf('{')).trim();
        const body = block.slice(block.indexOf('{') + 1, block.lastIndexOf('}'));
        const selectors = selector.split(',').map((s) => s.trim());
        if (!selectors.includes('.bg__960e4')) continue;
        const declarations = readDeclarations(body);
        const background = declarations.get('background') || '';
        const backgroundColor = declarations.get('background-color') || '';
        const zIndex = declarations.get('z-index') || '';
        assert(!background || background.startsWith('transparent'), `${file}: .bg__960e4 must not paint an opaque foreground background -> ${selector}`);
        assert(!backgroundColor || backgroundColor.startsWith('transparent'), `${file}: .bg__960e4 must not paint an opaque foreground background-color -> ${selector}`);
        assert(!zIndex || zIndex.startsWith('-1'), `${file}: .bg__960e4 must stay behind the app -> ${selector}`);
    }
}

function checkNoRiskyHasGlobal(file, content) {
    const css = stripComments(content);
    assert(!/body:has\(\*\)\s+\*/i.test(css), `${file}: risky global body:has(*) * selector found`);
}

for (const file of runtimeFiles) {
    const content = read(file);
    assert(content.trim().length > 0, `${file}: empty file`);
    checkBalance(file, content);
    checkDangerousHides(file, content);
    checkForegroundBackgroundLayer(file, content);
    checkNoRiskyHasGlobal(file, content);
    assert(!/refact0r\.github\.io/i.test(content), `${file}: upstream refact0r runtime import found`);
    assert(!/raw\.githubusercontent\.com\/refact0r/i.test(content), `${file}: upstream refact0r raw runtime import found`);
}

const files = walk(root);
assert(!files.some((file) => /themes\/flavors\//i.test(file)), 'Flavor directory/file still exists');
assert(!files.some((file) => /nord/i.test(file)), 'Legacy Nord file/reference still exists in file path');
assert(fs.existsSync(path.join(root, 'assets/icons/sibylla-mark.svg')), 'Missing self-hosted Sibylla SVG icon');
assert(read('themes/sibylla.theme.css').includes('raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css'), 'Theme does not import from ussmarines GitHub raw URL');
assert(read('NOTICE.md').includes('refact0r/midnight-discord'), 'Missing upstream credit notice');
assert(read('build/sibylla.css').includes('.wrapper_ef3116') && read('build/sibylla.css').includes('mask: none'), 'Missing safe wrapper_ef3116 mask fix');

assert(!/#[^{]*#app-mount[^{]*,\s*\.appMount__51fd7[^{]*,\s*\.app__160d8[^{]*,\s*\.bg__960e4/i.test(read('build/sibylla.css')), 'Unsafe app/background grouping found');
assert(read('build/sibylla.css').includes('.bg__960e4') && read('build/sibylla.css').includes('z-index: -1'), 'Missing .bg__960e4 background safety rule');

if (process.exitCode) process.exit(process.exitCode);
console.log('All checks passed.');
