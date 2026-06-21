// ==UserScript==
// @name         sibnight-discord dev loader
// @namespace    https://github.com/ussmarines/DiscordTheme
// @version      1.0.1
// @description  Auto-injects the local sibnight-discord dev build into Discord. Requires `npm run serve` running locally.
// @match        https://discord.com/*
// @match        https://canary.discord.com/*
// @match        https://ptb.discord.com/*
// @run-at       document-start
// @grant        none
// @connect      127.0.0.1
// ==/UserScript==

(async () => {
    const BASE = 'http://127.0.0.1:8765';

    try {
        const response = await fetch(`${BASE}/inject.js?t=${Date.now()}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const code = await response.text();

        // eslint-disable-next-line no-eval
        (0, eval)(code);
    } catch (error) {
        console.warn('[sibnight] dev server not reachable at', BASE, '— run `npm run serve` in the repo', error);
    }
})();