const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const files = [
  'themes/sibylla.theme.css',
  'build/sibylla.css',
  'src/sibylla.css',
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function fail(message) {
  console.error(`CHECK FAILED: ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function stripCommentsAndStrings(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/'(?:\\.|[^'\\])*'/g, "''")
    .replace(/"(?:\\.|[^"\\])*"/g, '""');
}

function checkBalance(file, content) {
  const cleaned = stripCommentsAndStrings(content);
  const pairs = [['{', '}'], ['(', ')'], ['[', ']']];
  for (const [open, close] of pairs) {
    const a = [...cleaned].filter((ch) => ch === open).length;
    const b = [...cleaned].filter((ch) => ch === close).length;
    assert(a === b, `${file}: unbalanced ${open}${close} (${a}/${b})`);
  }
}

for (const file of files) {
  const content = read(file);
  assert(content.trim().length > 0, `${file}: empty file`);
  checkBalance(file, content);
  assert(!/refact0r\.github\.io/i.test(content), `${file}: upstream refact0r runtime import found`);
  assert(!/raw\.githubusercontent\.com\/refact0r/i.test(content), `${file}: upstream refact0r raw runtime import found`);
  assert(!/midnight[-_]?nord/i.test(content), `${file}: legacy Nord flavor reference found`);
  assert(!/position:\s*fixed[\s\S]{0,160}z-index:\s*0/i.test(content), `${file}: risky fixed overlay with z-index 0 found`);
  assert(!/@import\s+url\(/i.test(content), `${file}: runtime @import found; V3 theme must be self-contained`);
}

assert(!fs.existsSync(path.join(ROOT, 'themes', 'flavors')), 'themes/flavors must not exist in V3');
assert(fs.existsSync(path.join(ROOT, 'assets', 'icons', 'sibylla-moon.svg')), 'Missing self-hosted icon asset');

if (process.exitCode) process.exit(process.exitCode);
console.log('All checks passed.');
