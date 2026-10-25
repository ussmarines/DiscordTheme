const fs = require('node:fs');
const path = require('node:path');
const { renderIndex, renderGuide } = require('./build-site');
const root = path.resolve(__dirname, '..');
for (const [name, render] of [['index.html', renderIndex], ['installation.html', renderGuide]]) {
    const html = fs.readFileSync(path.join(root, name), 'utf8');
    if (html !== render()) throw new Error(`${name}: stale generated page`);
    if ((html.match(/<h1(?:\s|>)/gu) || []).length !== 1) throw new Error(`${name}: expected one h1`);
    const ids = [...html.matchAll(/\bid="([^"]+)"/gu)].map(m => m[1]);
    if (new Set(ids).size !== ids.length) throw new Error(`${name}: duplicate IDs`);
    let links = 0;
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gu)) {
        const url = match[1];
        if (/^https:\/\//u.test(url)) continue;
        const [file, fragment] = url.split('#');
        const target = path.resolve(root, file || name);
        if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) throw new Error(`${name}: missing link ${url}`);
        if (fragment && !fs.readFileSync(target, 'utf8').includes(`id="${fragment}"`)) throw new Error(`${name}: missing anchor ${url}`);
        links++;
    }
    if (name === 'index.html' && (html.match(/ download="/gu) || []).length !== 5) throw new Error('Expected five download actions');
    console.log(`[Site] ${name}: deterministic HTML and ${links} local links/anchors PASS`);
}
