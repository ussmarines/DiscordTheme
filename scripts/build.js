const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  'src/header-midnight-nord.txt',
  'src/base/import.css',
  'src/options/settings.css',
  'src/flavors/nord.css',
];

const output = files
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8').trimEnd())
  .join('\n\n') + '\n';

const targets = [
  'themes/midnight.theme.css',
  'themes/flavors/midnight-nord.theme.css',
  'build/midnight-nord.css',
];

for (const target of targets) {
  const fullPath = path.join(root, target);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, output, 'utf8');
  console.log(`built ${target}`);
}

if (process.argv.includes('--watch')) {
  console.log('watching src files...');
  for (const file of files) {
    fs.watchFile(path.join(root, file), { interval: 500 }, () => {
      delete require.cache[__filename];
      require(__filename);
    });
  }
}
