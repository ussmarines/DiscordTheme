const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const legacy = [
  'themes/midnight.theme.css',
  'themes/flavors/midnight-nord.theme.css',
  'build/midnight-nord.css',
  'src/base/import.css',
  'src/flavors/nord.css',
  'src/header-midnight-nord.txt',
];

for (const file of legacy) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { force: true });
    console.log(`Removed ${file}`);
  }
}

const maybeDirs = ['src/flavors'];
for (const dir of maybeDirs) {
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full) && fs.statSync(full).isDirectory() && fs.readdirSync(full).length === 0) {
    fs.rmdirSync(full);
    console.log(`Removed empty ${dir}`);
  }
}
