const fs = require('fs');
const { execFileSync } = require('child_process');
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0');
const errors = [];
for (const file of files) {
    if (!/^(?:src|themes|scripts)\/.*\.(?:css|js)$/u.test(file) || !fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    if (!text.endsWith('\n') || text.endsWith('\n\n') || /\t|[ \t]+$/mu.test(text)) errors.push(file);
}
if (errors.length) throw new Error(`Whitespace formatting: ${errors.join(', ')}`);
console.log('[sibnight] whitespace format check passed');
