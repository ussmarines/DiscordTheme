const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const RUNTIME_FILES = [
  'themes/sibylla.theme.css',
  'themes/flavors/sibylla.theme.css',
  'build/sibylla.css',
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`CHECK FAILED: ${message}`);
    process.exitCode = 1;
  }
}

function checkBalance(file, content) {
  const pairs = [
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
  ];
  for (const [open, close] of pairs) {
    const a = [...content].filter((ch) => ch === open).length;
    const b = [...content].filter((ch) => ch === close).length;
    assert(a === b, `${file}: unbalanced ${open}${close} (${a}/${b})`);
  }
}

for (const file of RUNTIME_FILES) {
  const content = read(file);
  assert(content.trim().length > 0, `${file}: empty file`);
  checkBalance(file, content);
  assert(!/refact0r\.github\.io/i.test(content), `${file}: upstream refact0r runtime import found`);
  assert(!/raw\.githubusercontent\.com\/refact0r/i.test(content), `${file}: upstream refact0r raw runtime import found`);
  assert(!/midnight[-_]?[n]ord/i.test(content), `${file}: legacy flavor reference found`);
}

const allFiles = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (fs.statSync(full).isDirectory()) walk(full);
    else allFiles.push(rel);
  }
}
walk(ROOT);
assert(!allFiles.some((file) => /[n]ord/i.test(file)), 'Legacy flavor file still exists');
assert(fs.existsSync(path.join(ROOT, 'assets/icons/sibylla-moon.svg')), 'Missing self-hosted DM icon asset');
assert(read('themes/sibylla.theme.css').includes('raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css'), 'Theme does not import from ussmarines GitHub raw URL');

if (process.exitCode) process.exit(process.exitCode);
console.log('All checks passed.');
