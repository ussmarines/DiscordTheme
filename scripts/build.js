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
    'settings-pages.css',
    'sibylla.css',
    'compatibility.css',
];

function read(file) {
    return fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').trimEnd();
}

function write(file, content) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content.replace(/\r\n/g, '\n').trimEnd() + '\n');
}

function buildSrc() {
    const chunks = [];
    for (const file of order) {
        const full = path.join(srcDir, file);
        if (!fs.existsSync(full)) throw new Error(`Missing source file: src/${file}`);
        chunks.push(`/* ${file} */\n${read(full)}`);
    }
    const combined = chunks.join('\n\n');
    write(buildFile, combined);
    return combined;
}

function buildTheme() {
    const meta = `/**
 * @name Sibylla Midnight
 * @description Thème Discord custom Sibylla basé sur l'architecture Midnight, compatible Vencord et BetterDiscord.
 * @author Sibylla Corporation
 * @version 1.2.0
 * @invite nz87hXyvcy
 * @website https://github.com/ussmarines/DiscordTheme
 * @source https://github.com/ussmarines/DiscordTheme/blob/main/themes/sibylla.theme.css
 * @updateUrl https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
 * @authorLink https://sibyllasc.fr/
 * @credits refact0r/midnight-discord — MIT License
 */`;
    const importLine = "@import url('https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css');";
    const settings = read(path.join(srcDir, 'settings-template.css'));
    write(themeFile, `${meta}\n\n/* import theme modules from this repository */\n${importLine}\n\n${settings}`);
}

buildSrc();
buildTheme();
console.log('Built build/sibylla.css');
console.log('Built themes/sibylla.theme.css');
