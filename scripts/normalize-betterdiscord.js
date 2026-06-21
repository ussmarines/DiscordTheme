const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const themesDir = path.join(rootDir, 'themes');
const flavorsDir = path.join(themesDir, 'flavors');
const readmeFile = path.join(rootDir, 'README.md');
const buildThemeFile = path.join(rootDir, 'scripts', 'lib', 'build-theme.js');
const mainThemeFile = path.join(themesDir, 'sibnight.theme.css');

const PAGES_BASE = 'https://ussmarines.github.io/DiscordTheme';
const RAW_BASE = 'https://raw.githubusercontent.com/ussmarines/DiscordTheme/main';

const MAIN_BUILD_IMPORT = `${PAGES_BASE}/build/sibnight.css`;
const MAIN_THEME_IMPORT = `${PAGES_BASE}/themes/sibnight.theme.css`;

const FLAVOR_LAYOUT_DEFAULTS_START = '/* sibnight flavor layout defaults: start */';
const FLAVOR_LAYOUT_DEFAULTS_END = '/* sibnight flavor layout defaults: end */';

const FLAVOR_LAYOUT_DEFAULTS = `${FLAVOR_LAYOUT_DEFAULTS_START}
body {
    /* font options */
    --font: 'figtree';
    --code-font: '';
    font-weight: 400;

    /* sizes */
    --gap: 12px;
    --divider-thickness: 4px;
    --border-thickness: 0px;

    /* animation/transition options */
    --animations: on;
    --list-item-transition: 0.2s ease;
    --dms-icon-svg-transition: 0.4s ease;
    --border-hover-transition: 0.2s ease;

    /* top bar options */
    --top-bar-height: var(--gap);
    --top-bar-button-position: titlebar;
    --top-bar-title-position: off;
    --subtle-top-bar-title: off;

    /* window controls */
    --custom-window-controls: on;
    --window-control-size: 14px;

    /* dms button options */
    --custom-dms-icon: custom;
    --dms-icon-svg-url: url('https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.svg');
    --dms-icon-svg-size: 104%;
    --dms-icon-color-before: var(--icon-subtle);
    --dms-icon-color-after: var(--white);
    --custom-dms-background: off;
    --dms-background-image-url: url('');
    --dms-background-image-size: cover;
    --dms-background-color: linear-gradient(70deg, var(--sibnight-blue-2), var(--sibnight-purple-2), var(--sibnight-red-2));

    /* background image options */
    --background-image: off;
    --background-image-url: url('');

    /* transparency/blur options */
    --transparency-tweaks: off;
    --remove-bg-layer: off;
    --panel-blur: off;
    --blur-amount: 12px;
    --sibnight-bg-floating: var(--sibnight-bg-3);

    /* chatbar options */
    --custom-chatbar: off;
    --chatbar-height: 47px;

    /* other options */
    --small-user-panel: on;
}
${FLAVOR_LAYOUT_DEFAULTS_END}`;

const KNOWN_FLAVOR_SLUGS = [
    'sibnight-flat',
    'sibnight-tokyo-night',
    'sibnight-sun',
    'sibnight-space',
    'sibnight-north-polar',
    'sibnight-north-snow',
    'sibnight-north-aurora-dark',
    'sibnight-north-aurora-light',
];

const FLAVOR_ALIAS_TO_SLUG = new Map();

for (const slug of KNOWN_FLAVOR_SLUGS) {
    FLAVOR_ALIAS_TO_SLUG.set(slug.toLowerCase(), slug);
    FLAVOR_ALIAS_TO_SLUG.set(slug.replace(/^sibnight-/u, '').toLowerCase(), slug);
}

for (const slug of KNOWN_FLAVOR_SLUGS) {
    FLAVOR_ALIAS_TO_SLUG.set(`sibnight-${slug}`.toLowerCase(), slug);
}

const LEGACY_FLAVOR_ALIASES = new Map([
    ['sibnight-north-Polar', 'sibnight-north-polar'],
    ['sibnight-north-Snow', 'sibnight-north-snow'],
    ['sibnight-north-Aurora-Dark', 'sibnight-north-aurora-dark'],
    ['sibnight-north-Aurora-Light', 'sibnight-north-aurora-light'],
]);

for (const [alias, slug] of LEGACY_FLAVOR_ALIASES) {
    FLAVOR_ALIAS_TO_SLUG.set(alias.toLowerCase(), slug);
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, contents) {
    fs.writeFileSync(filePath, contents);
}

function replaceAll(text, replacements) {
    let output = text;

    for (const [from, to] of replacements) {
        output = output.split(from).join(to);
    }

    return output;
}

function normalizeFlavorSlug(value) {
    let baseName = path
        .basename(value)
        .replace(/\.theme\.css$/iu, '')
        .replace(/\.css$/iu, '')
        .trim();

    baseName = baseName.replace(/\s+/gu, '-');

    while (/^sibnight-sibnight-/iu.test(baseName)) {
        baseName = baseName.replace(/^sibnight-sibnight-/iu, 'sibnight-');
    }

    const key = baseName.toLowerCase();

    if (FLAVOR_ALIAS_TO_SLUG.has(key)) {
        return FLAVOR_ALIAS_TO_SLUG.get(key);
    }

    if (key.startsWith('sibnight-')) {
        return key;
    }

    return `sibnight-${key}`;
}

function normalizeFlavorFileName(fileName) {
    return `${normalizeFlavorSlug(fileName)}.theme.css`;
}

function stripFlavorLayoutDefaults(css) {
    const start = css.indexOf(FLAVOR_LAYOUT_DEFAULTS_START);

    if (start === -1) {
        return css;
    }

    const end = css.indexOf(FLAVOR_LAYOUT_DEFAULTS_END, start);

    if (end === -1) {
        return css;
    }

    return `${css.slice(0, start).trimEnd()}\n\n${css.slice(end + FLAVOR_LAYOUT_DEFAULTS_END.length).trimStart()}`;
}

function ensureImportBeforeCss(css, importUrl) {
    const importLine = `@import url('${importUrl}');`;
    const importPattern = /@import\s+url\(['"][^'"]*(?:build\/sibnight\.css|themes\/sibnight\.theme\.css)['"]\);/u;

    if (importPattern.test(css)) {
        return css.replace(importPattern, importLine);
    }

    const metaMatch = css.match(/^\/\*\*[\s\S]*?\*\//u);

    if (!metaMatch) {
        return `${importLine}\n\n${css}`;
    }

    const meta = metaMatch[0];
    const rest = css.slice(meta.length).trimStart();

    return `${meta}\n${importLine}\n\n${rest}`;
}

function insertFlavorLayoutDefaults(css) {
    const withoutOldBlock = stripFlavorLayoutDefaults(css);
    const importPattern = /@import\s+url\(['"]https:\/\/ussmarines\.github\.io\/DiscordTheme\/build\/sibnight\.css['"]\);/u;

    if (!importPattern.test(withoutOldBlock)) {
        return withoutOldBlock;
    }

    return withoutOldBlock.replace(importPattern, (match) => {
        return `${match}\n\n${FLAVOR_LAYOUT_DEFAULTS}`;
    });
}

function normalizeMainTheme() {
    if (!fs.existsSync(mainThemeFile)) {
        throw new Error(`Missing file: ${mainThemeFile}`);
    }

    const original = readFile(mainThemeFile);
    const updated = replaceAll(original, [
        [`${RAW_BASE}/build/sibnight.css`, MAIN_BUILD_IMPORT],
        [`${PAGES_BASE}/build/sibnight.css`, MAIN_BUILD_IMPORT],
    ]);

    if (updated !== original) {
        writeFile(mainThemeFile, updated);
        console.log('[sibnight] updated themes/sibnight.theme.css import');
    }
}

function normalizeBuildThemeScript() {
    if (!fs.existsSync(buildThemeFile)) {
        throw new Error(`Missing file: ${buildThemeFile}`);
    }

    const original = readFile(buildThemeFile);
    const updated = replaceAll(original, [
        [`${RAW_BASE}/build/sibnight.css`, MAIN_BUILD_IMPORT],
    ]);

    if (updated !== original) {
        writeFile(buildThemeFile, updated);
        console.log('[sibnight] updated scripts/lib/build-theme.js import constant');
    }
}

function normalizeFlavorContent(filePath, nextFilePath) {
    const original = readFile(filePath);
    const nextFileName = path.basename(nextFilePath);
    const nextSlug = nextFileName.replace(/\.theme\.css$/u, '');

    let updated = replaceAll(original, [
        [`${RAW_BASE}/themes/sibnight.theme.css`, MAIN_BUILD_IMPORT],
        [`${PAGES_BASE}/themes/sibnight.theme.css`, MAIN_BUILD_IMPORT],
        [`${RAW_BASE}/build/sibnight.css`, MAIN_BUILD_IMPORT],
        [`${PAGES_BASE}/build/sibnight.css`, MAIN_BUILD_IMPORT],
        [MAIN_THEME_IMPORT, MAIN_BUILD_IMPORT],
    ]);

    updated = ensureImportBeforeCss(updated, MAIN_BUILD_IMPORT);
    updated = insertFlavorLayoutDefaults(updated);

    updated = updated.replace(
        /@source\s+https:\/\/github\.com\/ussmarines\/DiscordTheme\/blob\/main\/themes\/flavors\/[A-Za-z0-9-]+(?:\.theme)?\.css/u,
        `@source https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/${nextFileName}`
    );

    updated = updated.replace(
        /@name\s+[A-Za-z0-9-]+/u,
        `@name ${nextSlug}`
    );

    return updated;
}

function normalizeFlavors() {
    if (!fs.existsSync(flavorsDir)) {
        throw new Error(`Missing directory: ${flavorsDir}`);
    }

    const cssFiles = fs
        .readdirSync(flavorsDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .sort((left, right) => left.localeCompare(right));

    for (const fileName of cssFiles) {
        const filePath = path.join(flavorsDir, fileName);
        const nextFileName = normalizeFlavorFileName(fileName);
        const nextFilePath = path.join(flavorsDir, nextFileName);
        const updatedContent = normalizeFlavorContent(filePath, nextFilePath);

        if (nextFilePath !== filePath) {
            if (fs.existsSync(nextFilePath)) {
                fs.unlinkSync(filePath);

                const existingContent = normalizeFlavorContent(nextFilePath, nextFilePath);
                writeFile(nextFilePath, existingContent);

                console.log(`[sibnight] removed duplicate themes/flavors/${fileName}`);
                continue;
            }

            fs.renameSync(filePath, nextFilePath);
            writeFile(nextFilePath, updatedContent);

            console.log(`[sibnight] renamed themes/flavors/${fileName} -> themes/flavors/${nextFileName}`);
            continue;
        }

        if (updatedContent !== readFile(filePath)) {
            writeFile(filePath, updatedContent);
            console.log(`[sibnight] updated themes/flavors/${fileName}`);
        }
    }
}

function normalizeReadme() {
    if (!fs.existsSync(readmeFile)) {
        return;
    }

    const original = readFile(readmeFile);
    let updated = original;

    updated = updated.replace(
        /(\.\/themes\/flavors\/)([A-Za-z0-9-]+)(?:\.theme)?\.css/gu,
        (match, prefix, flavorName) => `${prefix}${normalizeFlavorSlug(flavorName)}.theme.css`
    );

    updated = updated.replace(
        /(themes\/flavors\/)([A-Za-z0-9-]+)(?:\.theme)?\.css/gu,
        (match, prefix, flavorName) => `${prefix}${normalizeFlavorSlug(flavorName)}.theme.css`
    );

    const displayNameReplacements = new Map([
        ['sibnight-sibnight-flat', 'sibnight-flat'],
        ['sibnight-sibnight-tokyo-night', 'sibnight-tokyo-night'],
        ['sibnight-sibnight-sun', 'sibnight-sun'],
        ['sibnight-sibnight-space', 'sibnight-space'],
        ['sibnight-north-Polar', 'sibnight-north-polar'],
        ['sibnight-north-Snow', 'sibnight-north-snow'],
        ['sibnight-north-Aurora-Dark', 'sibnight-north-aurora-dark'],
        ['sibnight-north-Aurora-Light', 'sibnight-north-aurora-light'],
    ]);

    for (const [from, to] of displayNameReplacements) {
        updated = updated.split(from).join(to);
    }

    if (updated !== original) {
        writeFile(readmeFile, updated);
        console.log('[sibnight] updated README.md flavor paths');
    }
}

function main() {
    normalizeMainTheme();
    normalizeBuildThemeScript();
    normalizeFlavors();
    normalizeReadme();

    console.log('[sibnight] BetterDiscord normalization complete');
}

try {
    main();
} catch (error) {
    console.error('[sibnight] normalize failed:', error);
    process.exit(1);
}