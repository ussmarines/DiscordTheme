const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const themePath = path.join(root, 'themes/flavors/midnight-nord.theme.css');
const css = fs.readFileSync(themePath, 'utf8');

function fail(message) {
  console.error(`check failed: ${message}`);
  process.exit(1);
}

const required = [
  '@name midnight (nord) - base V1',
  "@import url('https://refact0r.github.io/midnight-discord/build/midnight.css')",
  '--custom-window-controls: on',
  '--custom-dms-icon: custom',
  '--small-user-panel: on',
  '--bg-4: #2e3440',
  '--accent-2: var(--blue-2)',
  '--blue-2: #88c0d0',
];

for (const token of required) {
  if (!css.includes(token)) fail(`missing required token: ${token}`);
}

let balance = 0;
for (const char of css) {
  if (char === '{') balance += 1;
  if (char === '}') balance -= 1;
  if (balance < 0) fail('brace balance went negative');
}
if (balance !== 0) fail('unbalanced braces');

console.log('theme check passed');
