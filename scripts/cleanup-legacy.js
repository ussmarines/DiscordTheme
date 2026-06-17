const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const legacy = [
  'themes/flavors',
  'themes/midnight.theme.css',
  'themes/flavors/midnight-nord.theme.css',
  'themes/flavors/sibylla.theme.css',
  'build/midnight-nord.css',
  'src/base/import.css',
  'src/flavors',
  'src/header-midnight-nord.txt',
];

for (const file of legacy) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`Removed ${file}`);
  }
}
