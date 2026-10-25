# North Polar theme references

The active theme is written independently from the archived Sibnight sources. The approved composition remains Lecture et repères with the Cabinet initial account block.

- BetterDiscord theme structure: https://docs.betterdiscord.app/themes/introduction/structure — metadata and a vanilla CSS installable.
- BetterDiscord environment: https://docs.betterdiscord.app/themes/introduction/environment — native Discord variables and component-specific overrides.
- BetterDiscord performance: https://docs.betterdiscord.app/themes/concepts/performance — bounded selector scope, exact attributes where needed, restrained animation.
- BetterDiscord selectors: https://docs.betterdiscord.app/themes/tutorials/selectors — specificity; historical browser-version examples on this page are not used as current client-version evidence.
- Vencord support: https://vencord.dev/support/ — isolate theme and QuickCSS conflicts during diagnosis.
- Nord: https://www.nordtheme.com/docs/colors-and-palettes/ — exact primitive palette; darker neutral surfaces are derived from Polar Night.
- Rune Icons: https://github.com/Runeicons/runeicons — considered as requested; the normal set did not provide the required pushpin at the inspected revision.
- Lucide: https://github.com/lucide-icons/lucide/tree/7faf87628a1ad6175975bc595344337ce14a7db4/icons — eleven SVGs retained locally, with license and immutable provenance under assets/icons/lucide/.

No library JavaScript, website code, analytics or remote icon fetch is shipped. The existing Figtree font import is retained. Controls keep their native semantics, labels, state and permissions; CSS changes presentation and layout.

Skills applied: Impeccable for the approved composition and independent review; UX Pattern Library for native states, overlays, focus and restrained motion; UI UX Pro Max for contrast/readability/interaction checks. Generic landing-page or palette recommendations are not adopted over the approved app composition. Design Taste Frontend's anti-default principles are used only as a relevant editorial check, not as a replacement application framework.

- Discord voice troubleshooting: https://support.discord.com/hc/en-us/articles/115001310031-Voice-Connection-Errors — distinguish native connection states from media proof. Laboratory investigation found missing libatomic/pulse runtime libraries using ldd; this local diagnosis is direct evidence, not inferred from a theme screenshot.

## Color family references — 25 October 2026

- https://sibylla.fr/en/home/ : website source inspected for midnight #04040b, brand gold #fada7d and cool text #dbe8ff. Theme preserves the approved Discord composition rather than reproducing the site's marketing layout/effects.
- https://www.nordtheme.com/docs/colors-and-palettes/ : Polar Night text on Snow Storm light surfaces; deeper Frost/semantic tones for actionable contrast.
- https://github.com/tokyo-night/tokyo-night-vscode-theme and its themes/tokyo-night-color-theme.json : #1a1b26 canvas, #a9b1d6 text, blue/violet/cyan accents; palette inspiration only.
- Owner-provided spatial photograph and transparent Sibylla logo are copied unchanged into assets/backgrounds/. Local data URLs keep the installables self-contained. No public redistribution license is inferred from their provision.
