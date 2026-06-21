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

const LEGACY_FLAVOR_ALIASES = new Map([
    ['sibnight-north-polar', 'sibnight-north-polar'],
    ['sibnight-north-snow', 'sibnight-north-snow'],
    ['sibnight-north-aurora-dark', 'sibnight-north-aurora-dark'],
    ['sibnight-north-aurora-light', 'sibnight-north-aurora-light'],
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
    const baseName = value
        .replace(/\.theme\.css$/iu, '')
        .replace(/\.css$/iu, '')
        .trim();

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
        [`${RAW_BASE}/themes/sibnight.theme.css`, MAIN_THEME_IMPORT],
        [`${PAGES_BASE}/themes/sibnight.theme.css`, MAIN_THEME_IMPORT],

        // Important: flavors must import the wrapper theme, not the raw build.
        [`${RAW_BASE}/build/sibnight.css`, MAIN_THEME_IMPORT],
        [`${PAGES_BASE}/build/sibnight.css`, MAIN_THEME_IMPORT],
    ]);

    updated = updated.replace(
        /@import\s+url\(['"][^'"]*(?:build\/sibnight\.css|themes\/sibnight\.theme\.css)['"]\);/u,
        `@import url('${MAIN_THEME_IMPORT}');`
    );

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
        ['flat', 'sibnight-flat'],
        ['tokyo-night', 'sibnight-tokyo-night'],
        ['sun', 'sibnight-sun'],
        ['space', 'sibnight-space'],
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