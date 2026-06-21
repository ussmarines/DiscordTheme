/*
 * Loader for sibnight-discord browser dev.
 * Served by scripts/serve.js at /inject.js.
 *
 * Eval in the Discord DevTools console once per session, or use
 * scripts/sibnight-dev.user.js with the local dev server.
 */
(() => {
    const BASE =
        document.currentScript && document.currentScript.src
            ? new URL('.', document.currentScript.src).origin
            : 'http://127.0.0.1:8765';

    const STYLE_ID = 'sibnight-theme-injected';
    const POLL_MS = 800;

    let lastVersion = null;
    let poller = null;
    let isSyncing = false;

    async function fetchText(url) {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} while fetching ${url}`);
        }

        return response.text();
    }

    async function fetchJson(url) {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} while fetching ${url}`);
        }

        return response.json();
    }

    async function fetchCSS() {
        return fetchText(`${BASE}/sibnight.css?t=${Date.now()}`);
    }

    async function fetchVersion() {
        const payload = await fetchJson(`${BASE}/version?t=${Date.now()}`);
        return payload.version;
    }

    async function apply() {
        const css = await fetchCSS();
        let styleElement = document.getElementById(STYLE_ID);

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = STYLE_ID;
            styleElement.dataset.source = BASE;
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = css;
        return css.length;
    }

    async function syncTheme() {
        if (isSyncing) {
            return;
        }

        isSyncing = true;

        try {
            const nextVersion = await fetchVersion();

            if (nextVersion === lastVersion) {
                return;
            }

            const byteLength = await apply();
            lastVersion = nextVersion;

            console.log(`[sibnight] reloaded ${byteLength}b @ ${new Date().toLocaleTimeString()}`);
        } catch (error) {
            console.warn('[sibnight] dev sync failed:', error);
        } finally {
            isSyncing = false;
        }
    }

    function start() {
        stop();
        poller = setInterval(syncTheme, POLL_MS);
    }

    function stop() {
        if (poller) {
            clearInterval(poller);
        }

        poller = null;
    }

    function off() {
        stop();
        document.getElementById(STYLE_ID)?.remove();
    }

    function computed(selector) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;

        if (!element) {
            return null;
        }

        const styles = getComputedStyle(element);
        const props = [
            'color',
            'background-color',
            'background-image',
            'opacity',
            'border',
            'border-color',
            'border-radius',
            'box-shadow',
            'padding',
            'margin',
            'width',
            'height',
            'display',
            'position',
            'font-family',
            'font-size',
            'font-weight',
            'line-height',
            'transition',
            'transform',
            'filter',
            'backdrop-filter',
            'z-index',
        ];

        const output = {};

        for (const prop of props) {
            output[prop] = styles.getPropertyValue(prop).trim();
        }

        output._selector = typeof selector === 'string' ? selector : '';
        output._tag = element.tagName.toLowerCase();
        output._classes = typeof element.className === 'string' ? element.className : '';

        return output;
    }

    function find(text) {
        const needle = String(text).toLowerCase();
        const output = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);

        let node;

        while ((node = walker.nextNode())) {
            const textContent = node.textContent;

            if (!textContent || !textContent.toLowerCase().includes(needle)) {
                continue;
            }

            const childContainsNeedle = [...node.children].some((child) => {
                return child.textContent.toLowerCase().includes(needle);
            });

            if (!childContainsNeedle) {
                output.push(node);
            }
        }

        return output;
    }

    function cssVar(name) {
        const variableName = name.startsWith('--') ? name : `--${name}`;

        return (
            getComputedStyle(document.body).getPropertyValue(variableName).trim() ||
            getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
        );
    }

    function splitSelectorList(selectorText) {
        const parts = [];
        let buffer = '';
        let depth = 0;

        for (const char of selectorText) {
            if (char === '(' || char === '[') {
                depth += 1;
            } else if (char === ')' || char === ']') {
                depth -= 1;
            }

            if (char === ',' && depth === 0) {
                parts.push(buffer);
                buffer = '';
            } else {
                buffer += char;
            }
        }

        if (buffer) {
            parts.push(buffer);
        }

        return parts.map((part) => part.trim()).filter(Boolean);
    }

    function rulesFor(element, propertyName) {
        const hits = [];

        function visit(cssRules) {
            for (const rule of cssRules) {
                if (rule.cssRules) {
                    visit(rule.cssRules);
                }

                if (!rule.selectorText || !rule.style) {
                    continue;
                }

                const value = rule.style.getPropertyValue(propertyName);

                if (!value) {
                    continue;
                }

                const matchedSelectors = splitSelectorList(rule.selectorText).filter((selector) => {
                    try {
                        return element.matches(selector);
                    } catch {
                        return false;
                    }
                });

                if (matchedSelectors.length > 0) {
                    hits.push({
                        selector: matchedSelectors.join(', '),
                        value: value.trim(),
                    });
                }
            }
        }

        for (const sheet of document.styleSheets) {
            let rules;

            try {
                rules = sheet.cssRules;
            } catch {
                continue;
            }

            if (rules) {
                visit(rules);
            }
        }

        return hits;
    }

    function trace(selector, propertyName = 'background-color') {
        const startElement = typeof selector === 'string' ? document.querySelector(selector) : selector;

        if (!startElement) {
            return null;
        }

        const chain = [];
        const seen = new Set();

        let cursor = {
            element: startElement,
            propertyName,
            walkAncestors: false,
        };

        while (cursor) {
            const key = `${cursor.element === document.body ? 'body' : `${cursor.element.tagName}:${cursor.element.className}`}|${
                cursor.propertyName
            }`;

            if (seen.has(key)) {
                break;
            }

            seen.add(key);

            let found = null;

            if (cursor.walkAncestors) {
                let ancestor = cursor.element;

                while (ancestor) {
                    const hits = rulesFor(ancestor, cursor.propertyName);

                    if (hits.length > 0) {
                        found = {
                            element: ancestor,
                            ...hits[hits.length - 1],
                        };
                        break;
                    }

                    ancestor = ancestor.parentElement;
                }
            } else {
                const hits = rulesFor(cursor.element, cursor.propertyName);

                if (hits.length > 0) {
                    found = {
                        element: cursor.element,
                        ...hits[hits.length - 1],
                    };
                }
            }

            if (!found) {
                chain.push({
                    from: '(unresolved)',
                    prop: cursor.propertyName,
                });
                break;
            }

            const fromLabel =
                found.element === document.body
                    ? 'body'
                    : found.element === document.documentElement
                      ? ':root'
                      : found.selector;

            const entry = {
                from: fromLabel,
                prop: cursor.propertyName,
                raw: found.value,
            };

            const computedStyles = getComputedStyle(found.element);
            const resolved = computedStyles.getPropertyValue(cursor.propertyName).trim();

            if (resolved && resolved !== found.value) {
                entry.resolved = resolved;
            }

            chain.push(entry);

            const variableMatch = found.value.match(/var\(\s*(--[\w-]+)/u);

            if (!variableMatch) {
                break;
            }

            cursor = {
                element: startElement,
                propertyName: variableMatch[1],
                walkAncestors: true,
            };
        }

        return chain;
    }

    async function boot() {
        try {
            const initialVersion = await fetchVersion();
            const byteLength = await apply();

            lastVersion = initialVersion;
            start();

            console.log(`[sibnight] injected ${byteLength}b — auto-reload on.`);
            console.log('helpers: window.__sibnight');
        } catch (error) {
            console.error('[sibnight] inject failed:', error);
            start();
        }
    }

    window.__sibnight = {
        reload: apply,
        sync: syncTheme,
        off,
        start,
        stop,
        computed,
        find,
        cssVar,
        rulesFor,
        trace,
        BASE,
    };

    boot();
})();