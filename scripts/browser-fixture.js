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
        frame.srcdoc = '<!doctype html><style>' + css + '</style><body style="--animations:off;--panel-blur:on"><div id="app-mount"><div class="modeUnreadImportant__2ea32"><span class="unread__2ea32">Unread</span><a class="link__2ea32">Channel</a></div><button class="iconWrapper__9293f">Menu</button><div class="layerContainer__59d0d"></div><div class="menu_c1e9c4">Popover</div><div class="outer_c0bea0 custom-user-profile-theme" style="--profile-gradient-modal-background-color:#12141e;--profile-gradient-overlay-color:rgba(0,0,0,.6);--white:#fff;--white-500:#fff"><div class="inner_c0bea0"><div class="card_e1364f" style="color:var(--white)">Custom profile widget</div></div></div><a class="anchor__14d82" href="#">Link</a></div></body>';
        document.body.append(frame); await ready;
        const doc = frame.contentDocument, win = frame.contentWindow;
        const style = (selector, pseudo) => win.getComputedStyle(doc.querySelector(selector), pseudo);
        const canvas = doc.createElement('canvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const rgba = (color) => {
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = color;
            context.fillRect(0, 0, 1, 1);
            return Array.from(context.getImageData(0, 0, 1, 1).data);
        };
        const token = (name) => {
            const probe = doc.createElement('span');
            probe.style.color = 'var(' + name + ')';
            doc.body.append(probe);
            const value = rgba(win.getComputedStyle(probe).color);
            probe.remove();
            return value;
        };
        // Muted copy belongs on panel surfaces, not pressed/colored button fills.
        const surfaces = ['--sibnight-bg-2', '--sibnight-bg-3', '--sibnight-bg-4'].map(token);
        const mutedContrast = Math.min(...surfaces.map(bg => contrast(token('--sibnight-text-5'), bg)));
        const focusContrast = Math.min(...surfaces.map(bg => contrast(token('--sibnight-focus-ring'), bg)));
        const button = doc.querySelector('button');
        button.focus();
        // Minimal native flex layout; theme controls must fit inside its reserved bar.
        const historyBar = doc.createElement('div');
        historyBar.className = 'bar_c38106';
        historyBar.style.cssText = 'display:flex;align-items:center;height:var(--custom-app-top-bar-height)';
        historyBar.innerHTML = '<div class="leading_c38106"><div class="backForwardButtons__63abb"><button class="button__63abb">Back</button></div></div>';
        doc.body.append(historyBar);
        const historyBounds = historyBar.getBoundingClientRect();
        const historyButton = historyBar.querySelector('button').getBoundingClientRect();
        const checks = {
            historyControlsInset: historyButton.top - historyBounds.top >= 4 && historyBounds.bottom - historyButton.bottom >= 4 && historyButton.left - historyBounds.left >= 8,
            historyHitArea: historyButton.width >= 24 && historyButton.height >= 24,
            unreadVisible: style('.unread__2ea32').display !== 'none',
            overlayTransparent: style('.layerContainer__59d0d').backgroundColor === 'rgba(0, 0, 0, 0)',
            animationsOff: style('button').transitionDuration === '0s',
            menuDecorationClickThrough: style('.menu_c1e9c4', '::before').pointerEvents === 'none',
            mutedTextContrast: mutedContrast >= 4.5,
            focusContrast: focusContrast >= 3,
            keyboardFocusVisible: style('button').outlineStyle === 'solid' && style('button').outlineWidth === '2px',
            customProfileContrast: contrast(rgba(style('.card_e1364f').color), rgba(style('.inner_c0bea0').backgroundColor)) >= 4.5,
            linkContrast: Math.min(...surfaces.map(bg => contrast(rgba(style('.anchor__14d82').color), bg))) >= 4.5,
        };
        const motionProbe = doc.createElement('div');
        motionProbe.className = 'messageListItem__5126c';
        doc.querySelector('#app-mount').append(motionProbe);
        doc.body.style.setProperty('--animations', 'on');
        await new Promise(resolve => win.requestAnimationFrame(() => win.requestAnimationFrame(resolve)));
        const motionEnabled = win.getComputedStyle(motionProbe).transitionDuration !== '0s';
        doc.documentElement.classList.add('reduce-motion');
        const motionDisabled = win.getComputedStyle(motionProbe).transitionDuration === '0s';
        checks.discordReducedMotion = motionEnabled && motionDisabled;
        if (/north-(snow|aurora-light)/.test(name)) {
            const syntaxTokens = ['--text-code', '--text-code-addition', '--text-code-builtin', '--text-code-comment', '--text-code-bullet', '--text-code-deletion', '--text-code-section', '--text-code-keyword', '--text-code-string', '--text-code-tag', '--text-code-title', '--text-code-variable'];
            checks.lightStatusPaletteContrast = Math.min(...['--sibnight-green-1', '--sibnight-green-2'].flatMap(name => surfaces.map(bg => contrast(token(name), bg)))) >= 4.5;
            checks.lightSyntaxPaletteContrast = Math.min(...syntaxTokens.flatMap(name => surfaces.map(bg => contrast(token(name), bg)))) >= 4.5;
        }
        results.push({name, mutedContrast, focusContrast, linkColor: style('.anchor__14d82').color, checks, pass: Object.values(checks).every(Boolean)});
        frame.remove();
    }
    document.querySelector('#results').textContent = JSON.stringify(results, null, 2);
})();
</script>`;
fs.mkdirSync('output', { recursive: true });
fs.writeFileSync('output/browser-fixture.html', html);
console.log('Serve output/browser-fixture.html on loopback; inspect the nine result rows in a browser.');
