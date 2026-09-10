const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { rootDir } = require('./lib/build-theme');
const { validateCss, FONT_IMPORT } = require('./lib/css-policy');

async function main() {
    const paths = ['build/sibnight.css', 'build/sibnight-flavor.css', 'themes/sibnight.theme.css',
        ...fs.readdirSync(path.join(rootDir, 'themes/flavors')).filter((f) => f.endsWith('.theme.css')).map((f) => `themes/flavors/${f}`)];
    const exact = process.argv.includes('--match-local');
    const hash = (text) => crypto.createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');
    for (const file of paths) {
        const response = await fetch(`https://ussmarines.github.io/DiscordTheme/${file}`, { redirect: 'error', signal: AbortSignal.timeout(20000) });
        if (response.status !== 200 || !/^text\/css\b/i.test(response.headers.get('content-type') || '')) throw new Error(`${file}: expected HTTP 200 text/css`);
        const css = await response.text();
        // Remote baseline can legitimately predate local safety improvements.
        if (!css.includes('{') || /^\s*</u.test(css)) throw new Error(`${file}: not CSS`);
        if (exact) {
            validateCss(css, file);
            if (hash(css) !== hash(fs.readFileSync(path.join(rootDir, file), 'utf8'))) throw new Error(`${file}: Pages differs from local build`);
        }
        console.log(`PASS 200 text/css ${file}${exact ? ' (exact content)' : ''}`);
    }
    for (const [url, type] of [[FONT_IMPORT, 'text/css'], ['https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.svg', 'image/svg+xml']]) {
        const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(20000) });
        if (response.status !== 200 || !(response.headers.get('content-type') || '').startsWith(type)) throw new Error('Existing external resource unavailable or wrong MIME');
        console.log(`PASS existing resource (${type})`);
    }
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
