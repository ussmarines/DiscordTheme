const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const runtimeFiles = ['themes/sibylla.theme.css', 'build/sibylla.css'];

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
        const full = path.join(dir, name);
        const rel = path.relative(root, full).replace(/\\/g, '/');
        if (fs.statSync(full).isDirectory()) walk(full, out);
        else out.push(rel);
    }
    return out;
}

function checkBalance(file, content) {
    for (const [open, close] of [
        ['{', '}'],
        ['(', ')'],
        ['[', ']'],
    ]) {
        const a = [...content].filter((ch) => ch === open).length;
        const b = [...content].filter((ch) => ch === close).length;
        assert(a === b, `${file}: unbalanced ${open}${close} (${a}/${b})`);
    }
}

for (const file of runtimeFiles) {
    const content = read(file);
    assert(content.trim().length > 0, `${file}: empty file`);
    checkBalance(file, content);
    assert(!/refact0r\.github\.io/i.test(content), `${file}: upstream refact0r runtime import found`);
    assert(!/raw\.githubusercontent\.com\/refact0r/i.test(content), `${file}: upstream refact0r raw runtime import found`);
}

const files = walk(root);
assert(!files.some((file) => /themes\/flavors\//i.test(file)), 'Flavor directory/file still exists');
assert(!files.some((file) => /nord/i.test(file)), 'Legacy Nord file/reference still exists in file path');
assert(fs.existsSync(path.join(root, 'assets/icons/sibylla-mark.svg')), 'Missing self-hosted Sibylla SVG icon');
assert(read('themes/sibylla.theme.css').includes('raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css'), 'Theme does not import from ussmarines GitHub raw URL');
assert(read('NOTICE.md').includes('refact0r/midnight-discord'), 'Missing upstream credit notice');

if (process.exitCode) process.exit(process.exitCode);
console.log('All checks passed.');
