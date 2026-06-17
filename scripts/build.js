const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const buildFile = path.join(root, 'build', 'sibylla.css');
const themeFile = path.join(root, 'themes', 'sibylla.theme.css');

const order = [
    'main.css',
    'colors.css',
    'animations.css',
    'background-image.css',
    'chatbar.css',
    'dms-button.css',
    'top-bar.css',
    'transparency-blur.css',
    'user-panel.css',
    'window-controls.css',
    'sibylla.css',
];

function combine() {
    const css = order
        .map((name) => {
            const file = path.join(srcDir, name);
            if (!fs.existsSync(file)) throw new Error(`Missing source file: src/${name}`);
            return `/* ${name} */\n${fs.readFileSync(file, 'utf8').trimEnd()}\n`;
        })
        .join('\n');
    fs.mkdirSync(path.dirname(buildFile), { recursive: true });
    fs.writeFileSync(buildFile, css.trimEnd() + '\n');
    return css;
}

function assertThemeImport() {
    const theme = fs.readFileSync(themeFile, 'utf8');
    const expected = "@import url('https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css');";
    if (!theme.includes(expected)) throw new Error('themes/sibylla.theme.css does not import build/sibylla.css from ussmarines/DiscordTheme');
}

combine();
assertThemeImport();
console.log('Built build/sibylla.css');
