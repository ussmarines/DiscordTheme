const fs = require('fs');
const path = require('path');
const { compileSourceCss, compileFlavorCss, buildBundleFromTheme, REMOTE_FLAVOR_BUILD_IMPORT } = require('./lib/build-theme');
const main = compileSourceCss();
const variants = [['sibnight', buildBundleFromTheme(main)]];
for (const file of fs.readdirSync('themes/flavors').filter((f) => f.endsWith('.theme.css')).sort()) {
    variants.push([file, fs.readFileSync(path.join('themes/flavors', file), 'utf8').replace(`@import url('${REMOTE_FLAVOR_BUILD_IMPORT}');`, compileFlavorCss(main))]);
}
const data = variants.map(([name, css]) => [name, css.replace(/@import[^;]+;/g, '').replaceAll('</', '<\\/')]);
const html = `<!doctype html><meta charset="utf-8"><title>Sibnight synthetic regression fixture</title>
<h1>Synthetic CSS checks — not a Discord compatibility test</h1><pre id="results">Running…</pre>
<script>
const variants = ${JSON.stringify(data)};
const results = [];
const luminance = (rgb) => rgb.slice(0, 3).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
    // Composite translucent foregrounds rather than silently treating them as opaque.
    const foreground = a.slice(0, 3).map((v, i) => v * a[3] / 255 + b[i] * (1 - a[3] / 255));
    return (Math.max(luminance(foreground), luminance(b)) + 0.05) / (Math.min(luminance(foreground), luminance(b)) + 0.05);
};
(async () => {
    for (const [name, css] of variants) {
        const frame = document.createElement('iframe');
        frame.style.width = '900px'; frame.style.height = '200px';
        const ready = new Promise(resolve => frame.onload = resolve);
        frame.srcdoc = '<!doctype html><style>' + css + '</style><body style="--animations:off;--panel-blur:on"><div id="app-mount"><div class="modeUnreadImportant__2ea32"><span class="unread__2ea32">Unread</span><a class="link__2ea32">Channel</a></div><button class="iconWrapper__9293f">Menu</button><div class="layerContainer__59d0d"></div><div class="menu_c1e9c4">Popover</div></div></body>';
        document.body.append(frame); await ready;
        const doc = frame.contentDocument, win = frame.contentWindow;
        const style = (selector, pseudo) => win.getComputedStyle(doc.querySelector(selector), pseudo);
        const canvas = doc.createElement('canvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const token = (name) => {
            const probe = doc.createElement('span');
            probe.style.color = 'var(' + name + ')';
            doc.body.append(probe);
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = win.getComputedStyle(probe).color;
            context.fillRect(0, 0, 1, 1);
            probe.remove();
            return Array.from(context.getImageData(0, 0, 1, 1).data);
        };
        // Muted copy belongs on panel surfaces, not pressed/colored button fills.
        const surfaces = ['--sibnight-bg-2', '--sibnight-bg-3', '--sibnight-bg-4'].map(token);
        const mutedContrast = Math.min(...surfaces.map(bg => contrast(token('--sibnight-text-5'), bg)));
        const focusContrast = Math.min(...surfaces.map(bg => contrast(token('--sibnight-focus-ring'), bg)));
        const button = doc.querySelector('button');
        button.focus();
        const checks = {
            unreadVisible: style('.unread__2ea32').display !== 'none',
            overlayTransparent: style('.layerContainer__59d0d').backgroundColor === 'rgba(0, 0, 0, 0)',
            animationsOff: style('button').transitionDuration === '0s',
            menuDecorationClickThrough: style('.menu_c1e9c4', '::before').pointerEvents === 'none',
            mutedTextContrast: mutedContrast >= 4.5,
            focusContrast: focusContrast >= 3,
            keyboardFocusVisible: style('button').outlineStyle === 'solid' && style('button').outlineWidth === '2px',
        };
        results.push({name, mutedContrast, focusContrast, checks, pass: Object.values(checks).every(Boolean)});
        frame.remove();
    }
    document.querySelector('#results').textContent = JSON.stringify(results, null, 2);
})();
</script>`;
fs.mkdirSync('output', { recursive: true });
fs.writeFileSync('output/browser-fixture.html', html);
console.log('Serve output/browser-fixture.html on loopback; inspect the nine result rows in a browser.');
