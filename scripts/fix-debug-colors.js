const fs = require('fs');
const path = require('path');

const { rootDir, srcDir } = require('./lib/build-theme');

const REPLACEMENTS = new Map([
    ['red', 'var(--red-2)'],
    ['yellow', 'var(--yellow-2)'],
    ['lime', 'var(--green-2)'],
    ['blue', 'var(--blue-2)'],
    ['magenta', 'var(--purple-2)'],
]);

const COLOR_PATTERN = /(^|[^-\w])\b(red|yellow|lime|blue|magenta)\b(?![-\w])/giu;

function listCssFiles(directory) {
    return fs
        .readdirSync(directory)
        .filter((fileName) => fileName.endsWith('.css'))
        .map((fileName) => path.join(directory, fileName));
}

function replaceDebugColorsOutsideComments(css) {
    let output = '';
    let index = 0;
    let changed = false;

    while (index < css.length) {
        const commentStart = css.indexOf('/*', index);

        if (commentStart === -1) {
            const tail = replaceInCssChunk(css.slice(index));
            output += tail.text;
            changed = changed || tail.changed;
            break;
        }

        const normalChunk = replaceInCssChunk(css.slice(index, commentStart));
        output += normalChunk.text;
        changed = changed || normalChunk.changed;

        const commentEnd = css.indexOf('*/', commentStart + 2);

        if (commentEnd === -1) {
            output += css.slice(commentStart);
            break;
        }

        output += css.slice(commentStart, commentEnd + 2);
        index = commentEnd + 2;
    }

    return {
        text: output,
        changed,
    };
}

function replaceInCssChunk(chunk) {
    let changed = false;

    const text = chunk.replace(COLOR_PATTERN, (match, prefix, color) => {
        const replacement = REPLACEMENTS.get(color.toLowerCase());

        if (!replacement) {
            return match;
        }

        changed = true;
        return `${prefix}${replacement}`;
    });

    return {
        text,
        changed,
    };
}

function main() {
    const cssFiles = listCssFiles(srcDir);
    const changedFiles = [];

    for (const filePath of cssFiles) {
        const original = fs.readFileSync(filePath, 'utf8');
        const fixed = replaceDebugColorsOutsideComments(original);

        if (!fixed.changed || fixed.text === original) {
            continue;
        }

        fs.writeFileSync(filePath, fixed.text);
        changedFiles.push(path.relative(rootDir, filePath));
    }

    if (changedFiles.length === 0) {
        console.log('[sibnight] no debug color placeholders found');
        return;
    }

    console.log('[sibnight] replaced debug color placeholders in:');

    for (const filePath of changedFiles) {
        console.log(` ${filePath}`);
    }
}

main();