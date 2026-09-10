const fs = require('fs');
const path = require('path');
const { rootDir, compileSourceCss, compileFlavorCss, buildBundleFromTheme, REMOTE_FLAVOR_BUILD_IMPORT } = require('./lib/build-theme');
const { FONT_IMPORT } = require('./lib/css-policy');

// Frozen CSS snapshots: no remote CSS imports, including the optional webfont.
// The existing logo remains a remote image. Figtree falls back to Discord's font.
const main = compileSourceCss();
const flavor = compileFlavorCss(main);
const output = path.join(rootDir, 'output', 'themes');
fs.mkdirSync(output, { recursive: true });
function write(name, css) {
    css = css.replace(`@import url('${FONT_IMPORT}');`, '/* Offline CSS snapshot: uses locally available fonts. */');
    if (/@import\b/iu.test(css)) throw new Error('Snapshot contains an unexpected import');
    fs.writeFileSync(path.join(output, name), css.replace(/\r\n/g, '\n'));
}
write('sibnight.theme.css', buildBundleFromTheme(main));
for (const file of fs.readdirSync(path.join(rootDir, 'themes/flavors')).filter((file) => file.endsWith('.theme.css')).sort()) {
    write(file, fs.readFileSync(path.join(rootDir, 'themes/flavors', file), 'utf8').replace(`@import url('${REMOTE_FLAVOR_BUILD_IMPORT}');`, flavor));
}
console.log('[sibnight] nine frozen CSS snapshots written to output/themes/');
