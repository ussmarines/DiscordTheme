const fs = require('node:fs');
const path = require('node:path');
const FLAVORS = [
    { id: 'sibylla', name: 'Sibylla', description: 'Sibylla midnight and gold. Shared reading and voice workspace.' },
    { id: 'north-polar', name: 'North Polar', description: 'Standalone dark Nord workspace for reading, discussion and voice.' },
    { id: 'north-snow', name: 'North Snow', description: 'Light Nord workspace. The North Polar composition in Snow Storm.' },
    { id: 'spatial', name: 'Spatial', description: 'Deep-space workspace with the owner-provided orbital background.' },
    { id: 'tokyo-night', name: 'Tokyo-night', description: 'Tokyo Night colors. Shared reading and voice workspace.' },
];
const palettes = {
    sibylla: ['#101019','#1b1b28','#292938','#656578','#dbe8ff','#e8eef7','#f4f5fb','#ffe7a3','#fada7d','#d6b75f','#a88b40','#eb818b','#dca176','#fada7d','#a3ca9b','#bfa2e9'],
    spatial: ['#0c1a27','#172b3c','#253d50','#587386','#d4e2ed','#e4edf4','#f0f5fa','#9ed8db','#8ecde4','#7cabc9','#527fa5','#e58591','#dca581','#e6c88d','#a7c9a3','#b6a9dd'],
    'tokyo-night': ['#1a1b26','#202330','#292e42','#565f89','#a9b1d6','#c0caf5','#d5ddff','#7dcfff','#7aa2f7','#89b4fa','#3d59a1','#f7768e','#ff9e64','#e0af68','#9ece6a','#bb9af7'],
};
function declarations(values) {
    return Object.entries(values).map(([key, value]) => `    --sibnight-${key}: ${value};`).join('\n');
}
function flavorCss(id) {
    if (id === 'north-polar') return '';
    const values = {};
    if (palettes[id]) palettes[id].forEach((color, index) => { values[`nord${index}`] = color; });
    const surfaces = {
        sibylla: { canvas: '#04040b', index: '#101019', header: '#101019', control: '#20202d', raised: '#191923', muted: '#b1bbce', 'channel-rest': '#a4aabd' },
        spatial: { canvas: '#05121d', index: '#0c1a27', header: '#0c1a27', control: '#1a3042', raised: '#122536', muted: '#acbfce', 'channel-rest': '#a1b3c2' },
        'tokyo-night': { canvas: '#1a1b26', index: '#16161e', header: '#1a1b26', control: '#24283b', raised: '#202330', muted: '#a9b1d6', 'channel-rest': '#969fc5' },
        'north-snow': {
            canvas: '#eceff4', index: '#e5e9f0', header: '#e5e9f0', control: '#d8dee9', raised: '#eceff4',
            foreground: '#2e3440', heading: '#2e3440', muted: '#4c566a', 'channel-rest': '#4c566a',
            hover: 'rgb(76 86 106 / 10%)', selected: '#c6d2e1', line: 'rgb(46 52 64 / 20%)', focus: '#5e81ac', attention: '#a83f4b',
            nord7: '#4c6f92', nord8: '#456a94', nord9: '#5e81ac', nord10: '#5e81ac', nord11: '#a83f4b', nord13: '#80631f', nord14: '#46683c',
        },
    };
    Object.assign(values, surfaces[id]);
    let css = `\n/* ${id}: color roles only; geometry belongs to the shared source. */\n:root {\n${declarations(values)}\n    color-scheme: ${id === 'north-snow' ? 'light' : 'dark'};\n}\n`;
    css += '#app-mount :is(.vc-addon-card, .vc-settings-card, .vc-card-base, .vc-settings-quickActions-card) { background: var(--sibnight-index); color: var(--sibnight-foreground); }\n';
    if (id === 'north-snow') css += `
.theme-dark:not(.custom-user-profile-theme), .theme-light:not(.custom-user-profile-theme) {
    --white: #2e3440;
    --primary-100: #2e3440;
    --primary-130: #2e3440;
    --primary-160: #3b4252;
    --primary-200: #3b4252;
    --primary-230: #434c5e;
    --primary-260: #434c5e;
    --primary-300: #4c566a;
    --primary-330: #4c566a;
    --primary-360: #4c566a;
    --primary-400: #5e6a80;
    --primary-430: #8a97ad;
    --primary-460: #aab6ca;
    --primary-500: #c6d2e1;
    --primary-530: #d8dee9;
    --primary-560: #d8dee9;
    --primary-600: #e5e9f0;
    --primary-630: #e5e9f0;
    --primary-660: #eceff4;
    --primary-700: #eceff4;
    --primary-730: #eceff4;
    --primary-760: #eceff4;
    --primary-800: #eceff4;
    --text-default: #2e3440;
    --text-strong: #2e3440;
    --text-subtle: #4c566a;
    --text-tertiary: #4c566a;
    --text-heading-primary: #2e3440;
    --text-heading-secondary: #4c566a;
    --background-mod-subtle: rgb(76 86 106 / 8%);
    --background-mod-normal: rgb(76 86 106 / 12%);
    --background-mod-strong: rgb(76 86 106 / 18%);
    --button-filled-brand-text: #eceff4;
    --control-primary-text-default: #eceff4;
    --control-positive-primary-text-default: #eceff4;
    --control-positive-primary-icon-default: #eceff4;
    --background-surface-highest: #d8dee9;
    --control-secondary-background-hover: #c6d2e1;
    --control-critical-primary-text-default: #eceff4;
    --control-critical-primary-icon-default: #eceff4;
    --background-accent: #d8dee9;
    --background-nested-floating: #e5e9f0;
}
#app-mount .newMessagesBar__0f481 { color: #eceff4; }
#app-mount .mention:hover { color: #2e3440; }
#app-mount ::selection { color: #eceff4; background: #456a94; }
#app-mount :is(.vc-addon-card, .vc-settings-card, .vc-card-base, .vc-settings-quickActions-card) { background: #e5e9f0; color: #2e3440; }
`;
    if (id === 'sibylla' || id === 'spatial') {
        const file = id === 'sibylla' ? 'sibylla.png' : 'spatial.jpg';
        const mime = id === 'sibylla' ? 'image/png' : 'image/jpeg';
        const data = fs.readFileSync(path.join(__dirname, '../../assets/backgrounds', file)).toString('base64');
        const image = `url('data:${mime};base64,${data}')`;
        const background = id === 'sibylla'
            ? `linear-gradient(rgb(4 4 11 / 88%), rgb(4 4 11 / 88%)), ${image}`
            : `linear-gradient(rgb(5 18 29 / 18%), rgb(5 18 29 / 18%)), ${image}`;
        css += `
/* Local embedded art: fixed to the message viewport, never the scrolling list. */
#app-mount .messagesWrapper__36d07 {
    background-image: ${background};
    background-repeat: no-repeat;
    background-position: right top;
    background-size: ${id === 'sibylla' ? 'clamp(180px, 32%, 320px) auto' : 'auto max(320px, 40vh)'};
}
`;
    }
    return css;
}
module.exports = { FLAVORS, flavorCss };
