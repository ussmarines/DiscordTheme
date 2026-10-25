const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function markdown(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(dir, entry.name);
        return entry.isDirectory() ? markdown(file) : entry.name.endsWith('.md') ? [file] : [];
    });
}
const files = [
    ...fs.readdirSync(root).filter(name => name.endsWith('.md')).map(name => path.join(root, name)),
    ...markdown(path.join(root, 'docs')),
    ...markdown(path.join(root, 'assets')),
];
let count = 0;
for (const file of files) {
    const text = fs.readFileSync(file, 'utf8').replace(/```[^]*?```/gu, '');
    for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/gu)) {
        const link = match[1].split(/\s+"/u)[0];
        if (/^(?:https?:|mailto:|#)/u.test(link)) continue;
        const target = path.resolve(path.dirname(file), decodeURIComponent(link.split('#')[0]));
        if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) throw new Error(`${path.relative(root, file)}: missing local link ${link}`);
        count++;
    }
}
console.log(`[Docs] ${count} local Markdown links PASS`);
