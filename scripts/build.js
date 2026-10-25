const fs = require('node:fs');
const path = require('node:path');
const { rootDir, buildPath, compileSourceCss, bundle } = require('./lib/build-theme');
const { FLAVORS } = require('./lib/flavors');
for (const flavor of FLAVORS) {
    const css = compileSourceCss(flavor.id);
    fs.mkdirSync(path.dirname(buildPath), { recursive: true });
    fs.writeFileSync(path.join(rootDir, 'build', `${flavor.id}.css`), css);
    const out = path.join(rootDir, 'output', `${flavor.id}.theme.css`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, bundle(css, flavor.id));
    const download = path.join(rootDir, 'dist', `${flavor.id}.theme.css`);
    fs.mkdirSync(path.dirname(download), { recursive: true });
    fs.writeFileSync(download, bundle(css, flavor.id));
}
console.log('[Sibylla] five standalone themes written');
