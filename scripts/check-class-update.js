const fs = require('fs');
const { execFileSync } = require('child_process');
const { classUpdateShape } = require('./lib/css-policy');
const base = process.argv[2] || 'HEAD';
if (!/^(?:HEAD|[a-f\d]{40})$/u.test(base)) throw new Error('Use HEAD or a full base commit SHA');
const files = execFileSync('git', ['diff', '--name-only', '-z', base, '--', 'src', 'themes/flavors'], { encoding: 'utf8' }).split('\0').filter(Boolean);
for (const file of files) {
    if (!/^(?:src|themes\/flavors)\/[^/]+\.css$/u.test(file)) throw new Error('Unexpected updater path');
    const oldCss = execFileSync('git', ['show', `${base}:${file}`], { encoding: 'utf8' });
    if (classUpdateShape(oldCss) !== classUpdateShape(fs.readFileSync(file, 'utf8'))) {
        throw new Error(`${file}: updater changed more than class hashes; review manually`);
    }
}
console.log(`[sibnight] class-only update guard passed (${files.length} files)`);
