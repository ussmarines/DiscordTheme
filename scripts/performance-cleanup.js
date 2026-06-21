const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const themesDir = path.join(rootDir, 'themes');

function listCssFiles(directory) {
    if (!fs.existsSync(directory)) {
        return [];
    }

    const files = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...listCssFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.css')) {
            files.push(entryPath);
        }
    }

    return files.sort((left, right) => left.localeCompare(right));
}

function cleanupCss(css) {
    let output = css;

    output = output.replace(
        /\[class\*=(['"])scroll\1\]\s*\{\s*will-change\s*:\s*scroll-position\s*;?\s*\}/giu,
        ''
    );

    output = output.replace(
        /\s*will-change\s*:\s*scroll-position\s*;?/giu,
        ''
    );

    output = output.replace(
        /\n{3,}/gu,
        '\n\n'
    );

    return output.trimEnd() + '\n';
}

function main() {
    const cssFiles = [
        ...listCssFiles(srcDir),
        ...listCssFiles(themesDir),
    ];

    const changedFiles = [];

    for (const filePath of cssFiles) {
        const original = fs.readFileSync(filePath, 'utf8');
        const updated = cleanupCss(original);

        if (updated === original) {
            continue;
        }

        fs.writeFileSync(filePath, updated);
        changedFiles.push(path.relative(rootDir, filePath));
    }

    if (changedFiles.length === 0) {
        console.log('[sibnight] no performance cleanup changes needed');
        return;
    }

    console.log('[sibnight] performance cleanup updated:');

    for (const filePath of changedFiles) {
        console.log(` ${filePath}`);
    }
}

try {
    main();
} catch (error) {
    console.error('[sibnight] performance cleanup failed:', error);
    process.exit(1);
}