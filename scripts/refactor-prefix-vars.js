const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const themesDir = path.join(rootDir, 'themes');
const colorsFile = path.join(srcDir, 'colors.css');

const ALIAS_START = '/* sibnight legacy variable aliases: start */';
const ALIAS_END = '/* sibnight legacy variable aliases: end */';

const INTERNAL_VARIABLES = [
    'text-0',
    'text-1',
    'text-2',
    'text-3',
    'text-4',
    'text-5',

    'bg-1',
    'bg-2',
    'bg-3',
    'bg-4',
    'bg-floating',

    'hover',
    'active',
    'active-2',
    'message-hover',

    'accent-1',
    'accent-2',
    'accent-3',
    'accent-4',
    'accent-5',
    'accent-new',

    'mention',
    'mention-hover',
    'reply',
    'reply-hover',

    'online',
    'dnd',
    'idle',
    'streaming',
    'offline',

    'border-light',
    'border',
    'border-hover',
    'button-border',

    'red-1',
    'red-2',
    'red-3',
    'red-4',
    'red-5',

    'green-1',
    'green-2',
    'green-3',
    'green-4',
    'green-5',

    'blue-1',
    'blue-2',
    'blue-3',
    'blue-4',
    'blue-5',

    'yellow-1',
    'yellow-2',
    'yellow-3',
    'yellow-4',
    'yellow-5',

    'purple-1',
    'purple-2',
    'purple-3',
    'purple-4',
    'purple-5',
];

const VARIABLE_MAP = new Map(
    INTERNAL_VARIABLES.map((name) => [`--${name}`, `--sibnight-${name}`])
);

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function listCssFiles(directory) {
    if (!fs.existsSync(directory)) {
        return [];
    }

    const output = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            output.push(...listCssFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.css')) {
            output.push(entryPath);
        }
    }

    return output.sort((left, right) => left.localeCompare(right));
}

function stripAliasBlock(css) {
    const start = css.indexOf(ALIAS_START);

    if (start === -1) {
        return css;
    }

    const end = css.indexOf(ALIAS_END, start);

    if (end === -1) {
        return css;
    }

    return `${css.slice(0, start).trimEnd()}\n${css.slice(end + ALIAS_END.length).trimStart()}`;
}

function replaceVariables(css) {
    let output = css;

    const entries = [...VARIABLE_MAP.entries()].sort((left, right) => {
        return right[0].length - left[0].length;
    });

    for (const [legacyName, prefixedName] of entries) {
        const pattern = new RegExp(`(^|[^\\w-])${escapeRegExp(legacyName)}(?![\\w-])`, 'gu');

        output = output.replace(pattern, `$1${prefixedName}`);
    }

    return output;
}

function createAliasBlock() {
    const lines = [
        ALIAS_START,
        '/* Backwards-compatible aliases for older snippets/flavors.',
        '   Prefer the --sibnight-* variables for new custom CSS. */',
        ':root {',
    ];

    for (const [legacyName, prefixedName] of VARIABLE_MAP.entries()) {
        lines.push(`    ${legacyName}: var(${prefixedName});`);
    }

    lines.push('}', ALIAS_END, '');

    return lines.join('\n');
}

function appendAliasBlockToColors(css) {
    const withoutOldBlock = stripAliasBlock(css).trimEnd();

    return `${withoutOldBlock}\n\n${createAliasBlock()}`;
}

function processFile(filePath) {
    const original = fs.readFileSync(filePath, 'utf8');
    const withoutAliases = stripAliasBlock(original);
    let updated = replaceVariables(withoutAliases);

    if (path.resolve(filePath) === path.resolve(colorsFile)) {
        updated = appendAliasBlockToColors(updated);
    }

    if (updated === original) {
        return false;
    }

    fs.writeFileSync(filePath, updated);
    return true;
}

function main() {
    const files = [
        ...listCssFiles(srcDir),
        ...listCssFiles(themesDir),
    ];

    const changed = [];

    for (const filePath of files) {
        if (processFile(filePath)) {
            changed.push(path.relative(rootDir, filePath));
        }
    }

    if (changed.length === 0) {
        console.log('[sibnight] no variable prefix changes needed');
        return;
    }

    console.log('[sibnight] prefixed internal variables in:');

    for (const filePath of changed) {
        console.log(` ${filePath}`);
    }
}

try {
    main();
} catch (error) {
    console.error('[sibnight] variable refactor failed:', error);
    process.exit(1);
}