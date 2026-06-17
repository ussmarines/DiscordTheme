/* Loader for Sibylla Midnight browser dev. Served by scripts/serve.js at /inject.js. */
(() => {
    const BASE = document.currentScript && document.currentScript.src ? new URL('.', document.currentScript.src).origin : 'http://127.0.0.1:8765';
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

    function computed(selector) {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!el) return null;
        const s = getComputedStyle(el);
        const props = ['color', 'background-color', 'background-image', 'opacity', 'border', 'border-color', 'border-radius', 'box-shadow', 'padding', 'margin', 'width', 'height', 'display', 'position', 'font-family', 'font-size', 'font-weight', 'line-height', 'transition', 'transform', 'filter', 'backdrop-filter', 'z-index'];
        const out = {};
        for (const p of props) out[p] = s.getPropertyValue(p).trim();
        out._selector = typeof selector === 'string' ? selector : '<element>';
        out._tag = el.tagName.toLowerCase();
        out._classes = el.className && typeof el.className === 'string' ? el.className : '';
        return out;
    }

    function find(text) {
        const needle = String(text).toLowerCase();
        const out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
        let node;
        while ((node = walker.nextNode())) {
            const t = node.textContent;
            if (t && t.toLowerCase().includes(needle) && [...node.children].every((c) => !c.textContent.toLowerCase().includes(needle))) out.push(node);
        }
        return out;
    }

    function cssVar(name) {
        const n = name.startsWith('--') ? name : `--${name}`;
        return getComputedStyle(document.body).getPropertyValue(n).trim() || getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    }

    window.__sibylla = { reload: apply, off, start, stop, computed, find, cssVar, BASE };

    apply()
        .then((n) => {
            lastVer = Date.now();
            start();
            console.log(`[sibylla] injected ${n}b — auto-reload on. helpers: window.__sibylla`);
        })
        .catch((e) => console.error('[sibylla] inject failed:', e));
})();
