const fs = require('node:fs');
const path = require('node:path');
const { rootDir, SOURCE_FILE_ORDER, buildPath, themePath, compileSourceCss, validateCss, bundle } = require('./lib/build-theme');
const css = compileSourceCss();
const { FLAVORS } = require('./lib/flavors');
const { version } = require('../package.json');
for (const flavor of FLAVORS) {
    const candidate = compileSourceCss(flavor.id);
    const withoutArt = candidate.replace(/data:image\/(?:png|jpeg);base64,[A-Za-z0-9+/=]+/gu, 'embedded-art');
    if (Buffer.byteLength(withoutArt) > 43008 || Buffer.byteLength(candidate) > 240000) throw new Error(`${flavor.id}: budget exceeded`);
    if (fs.readFileSync(path.join(rootDir, 'build', `${flavor.id}.css`), 'utf8') !== candidate) throw new Error(`${flavor.id}: stale build`);
    if (fs.readFileSync(path.join(rootDir, 'output', `${flavor.id}.theme.css`), 'utf8') !== bundle(candidate, flavor.id)) throw new Error(`${flavor.id}: stale installable`);
    if (fs.readFileSync(path.join(rootDir, 'dist', `${flavor.id}.theme.css`), 'utf8') !== bundle(candidate, flavor.id)) throw new Error(`${flavor.id}: stale published download`);
    const metadata = fs.readFileSync(path.join(rootDir, 'themes', `${flavor.id}.theme.css`), 'utf8');
    validateCss(metadata, flavor.id);
    for (const tag of [`@name ${flavor.name}`, '@author ussmarines', `@version ${version}`]) if (!metadata.includes(tag)) throw new Error(`${flavor.id}: metadata missing ${tag}`);
}
if ((css.match(/:has\(/giu) || []).length > 1) throw new Error('Only one local switch state query is permitted');
// Local SVG masks and bounded call adaptation; no runtime package or icon request.
if (Buffer.byteLength(css) > 36864) throw new Error('Standalone CSS exceeds the reviewed 36 KiB budget');
if (fs.readFileSync(buildPath, 'utf8') !== css) throw new Error('Generated build is stale');
if (fs.readFileSync(path.join(rootDir, 'output/north-polar.theme.css'), 'utf8') !== bundle(css)) throw new Error('Local installable is stale');
const wrapper = fs.readFileSync(themePath, 'utf8');
validateCss(wrapper, 'wrapper');
for (const tag of ['@name North Polar', '@author ussmarines', `@version ${version}`]) if (!wrapper.includes(tag)) throw new Error(`Metadata missing: ${tag}`);
if (/sibnight-flavor|sibnight\.css|flavor-base|--proto-|--sibylla-/u.test(css + wrapper)) throw new Error('Legacy dependency in active theme');
for (const name of SOURCE_FILE_ORDER) {
    const text = fs.readFileSync(path.join(rootDir, 'src', name), 'utf8');
    if (!text.endsWith('\n') || text.endsWith('\n\n') || /\t|[ \t]+$/mu.test(text)) throw new Error(`Whitespace: ${name}`);
}
console.log(`[Sibylla] five builds, wrappers and downloads PASS; North reference ${Buffer.byteLength(css)} bytes`);
