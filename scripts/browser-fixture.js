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
(async () => {
    for (const [name, css] of variants) {
        const frame = document.createElement('iframe');
        frame.style.width = '900px'; frame.style.height = '200px';
        const ready = new Promise(resolve => frame.onload = resolve);
        frame.srcdoc = '<!doctype html><style>' + css + '</style><body style="--animations:off;--panel-blur:on"><div id="app-mount"><div class="modeUnreadImportant__2ea32"><span class="unread__2ea32">Unread</span><a class="link__2ea32">Channel</a></div><button class="iconWrapper__9293f">Menu</button><div class="layerContainer__59d0d"></div><div class="menu_c1e9c4">Popover</div></div></body>';
        document.body.append(frame); await ready;
        const doc = frame.contentDocument, win = frame.contentWindow;
        const style = (selector, pseudo) => win.getComputedStyle(doc.querySelector(selector), pseudo);
        const checks = {
            unreadVisible: style('.unread__2ea32').display !== 'none',
            overlayTransparent: style('.layerContainer__59d0d').backgroundColor === 'rgba(0, 0, 0, 0)',
            animationsOff: style('button').transitionDuration === '0s',
            menuDecorationClickThrough: style('.menu_c1e9c4', '::before').pointerEvents === 'none',
        };
        results.push({name, checks, pass: Object.values(checks).every(Boolean)});
        frame.remove();
    }
    document.querySelector('#results').textContent = JSON.stringify(results, null, 2);
})();
</script>`;
fs.mkdirSync('output', { recursive: true });
fs.writeFileSync('output/browser-fixture.html', html);
console.log('Serve output/browser-fixture.html on loopback; inspect the nine result rows in a browser.');
