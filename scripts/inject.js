(() => {
    const BASE = (document.currentScript && document.currentScript.src)
        ? new URL('.', document.currentScript.src).origin
        : 'http://127.0.0.1:8765';
    const STYLE_ID = 'sibylla-theme-injected';
    const POLL_MS = 800;

    async function fetchCSS() {
        const r = await fetch(`${BASE}/sibylla.css?t=${Date.now()}`);
        return r.text();
    }

    async function apply() {
        const css = await fetchCSS();
        let s = document.getElementById(STYLE_ID);
        if (!s) {
            s = document.createElement('style');
            s.id = STYLE_ID;
            document.head.appendChild(s);
        }
        s.textContent = css;
        return css.length;
    }

    let lastVer = null;
    let poller = null;

    function start() {
        stop();
        poller = setInterval(async () => {
            try {
                const v = (await (await fetch(`${BASE}/version`)).json()).version;
                if (v !== lastVer) {
                    lastVer = v;
                    const n = await apply();
                    console.log(`[sibylla] reloaded ${n}b @ ${new Date().toLocaleTimeString()}`);
                }
            } catch (_) {}
        }, POLL_MS);
    }

    function stop() {
        if (poller) clearInterval(poller);
        poller = null;
    }

    function off() {
        stop();
        document.getElementById(STYLE_ID)?.remove();
    }

    function cssVar(name) {
        const n = name.startsWith('--') ? name : `--${name}`;
        return getComputedStyle(document.body).getPropertyValue(n).trim()
            || getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    }

    function computed(selector) {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!el) return null;
        const s = getComputedStyle(el);
        const props = ['display', 'visibility', 'opacity', 'color', 'background-color', 'background-image', 'border', 'border-color', 'border-radius', 'box-shadow', 'position', 'z-index', 'font-family'];
        const out = {};
        for (const p of props) out[p] = s.getPropertyValue(p).trim();
        return out;
    }

    window.__sibylla = { reload: apply, off, start, stop, cssVar, computed, BASE };
    apply().then((n) => {
        lastVer = Date.now();
        start();
        console.log(`[sibylla] injected ${n}b — auto-reload on. helpers: window.__sibylla`);
    }).catch((e) => console.error('[sibylla] inject failed:', e));
})();
