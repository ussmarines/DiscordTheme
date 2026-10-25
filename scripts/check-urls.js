const fs = require('node:fs');
const path = require('node:path');
const { rootDir } = require('./lib/build-theme');
const { FLAVORS } = require('./lib/flavors');
(async () => {
    const catalog = await fetch('https://ussmarines.github.io/Sibylla-Discord-Theme/', { signal: AbortSignal.timeout(20000) });
    if (!catalog.ok) throw new Error(`Catalog: HTTP ${catalog.status}`);
    if (process.argv.includes('--match-local') && await catalog.text() !== fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8')) throw new Error('Published catalog differs from local file');
    for (const flavor of FLAVORS) {
        for (const file of [`build/${flavor.id}.css`, `themes/${flavor.id}.theme.css`, `dist/${flavor.id}.theme.css`]) {
            const response = await fetch(`https://ussmarines.github.io/Sibylla-Discord-Theme/${file}`, { signal: AbortSignal.timeout(20000) });
            if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
            const css = await response.text();
            if (process.argv.includes('--match-local') && css !== fs.readFileSync(path.join(rootDir, file), 'utf8')) throw new Error(`${file}: published CSS differs from local file`);
        }
        console.log(`[${flavor.name}] published build, wrapper and download verified`);
        const previewPath = `assets/previews/${flavor.id}.jpg`;
        const preview = await fetch(`https://ussmarines.github.io/Sibylla-Discord-Theme/${previewPath}`, { signal: AbortSignal.timeout(20000) });
        if (!preview.ok) throw new Error(`${previewPath}: HTTP ${preview.status}`);
        if (process.argv.includes('--match-local') && !Buffer.from(await preview.arrayBuffer()).equals(fs.readFileSync(path.join(rootDir, previewPath)))) throw new Error(`${previewPath}: published preview differs from local file`);
    }
    console.log('[Sibylla] published catalog, 15 theme URLs and five public previews PASS');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
