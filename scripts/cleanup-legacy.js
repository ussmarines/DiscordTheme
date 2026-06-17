const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const legacy = [
    'themes/flavors',
    'themes/midnight.theme.css',
    'themes/midnight-nord.theme.css',
    'build/midnight.css',
    'build/midnight-nord.css',
];
for (const rel of legacy) {
    const full = path.join(root, rel);
    if (fs.existsSync(full)) {
        fs.rmSync(full, { recursive: true, force: true });
        console.log(`Removed ${rel}`);
    }
}
