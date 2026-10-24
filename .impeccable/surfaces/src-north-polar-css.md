---
version: 1
slug: "src-north-polar-css"
primary_target: "src/north-polar.css"
related_targets: ["src/workspace.css", "src/main.css", "themes/flavors/sibnight-north-polar.theme.css", "scripts/lib/build-theme.js"]
---

# North Polar — Cabinet de lecture

Mode: Operate / Read. Long conversations and voice on Discord desktop.

Approved on 24 October 2026 after explicit confirmation: `.impeccable/mocks/compositions/reference-desk.png`, with the connected-account block from `.impeccable/mocks/decision/assigned.png`. Both are synthetic direction studies, not native screenshots. Private comps are ignored local artifacts.

Architecture: the principal theme and `src/workspace.css` own shared structure, typography, account responsiveness and tools. `src/north-polar.css` now contains semantic color bindings only; the wrapper owns the Nord palette. Workspace compiles last in the principal source order, before flavor-base and North Polar.

Composition: native server rail and channel index frame a continuous reading page; members remain available; compact account panel anchors the voice controls. CSS cannot add native actions absent from Discord.

| Ingredient | Medium and commitment |
|---|---|
| Surfaces | Semantic CSS: Nord0 chat, Nord1 indexes/dock, Nord2 controls; flat, no decorative glass |
| Type | Existing Figtree/fallback; 74ch maximum prose, 1rem / line-height 1.5; compact native account name |
| Controls | CSS, 6–8px corners, accessible focus preserved |
| Toolbar | Original SVG masks, 24px grid and 1.75px stroke for threads/pin/members/search; notification glyph stays native to preserve mute state |
| Account | Native avatar/status/mic/headphones/settings; only account nameplate decoration neutralized |
| Imagery | Existing Sibylla logo; native avatars/media/profile decorations outside the account dock preserved |
| Main action | Native composer, Nord2 fill and Frost focus; no rasterized controls or invented actions |
| Motion | Incumbent reduced-motion behavior; no new entrances or heavy effects |

Constraint priority: dark official Nord palette, native behavior and accessibility over synthetic image artifacts (fake member counts, dates, names or decorative gradients). Current local desktop/narrow observations are `.impeccable/review/core-member-desktop.jpg` and `core-member-narrow.jpg` (real narrow window: 1101 × 801); neither constitutes exhaustive validation. The other eight palettes and assets are retained; their visual behavior has not been validated for this shared refactor. Camera and Windows accessibility modes remain outside available runtime evidence.

Shared geometry: rail 72px; border-box sidebar cap 328px and members 264px. At <=1200px: sidebar 288px, members 256px, native account buttons on a second line and automatic account height. Account wrapping is enabled at all widths when required. The voice connection has automatic height, minimum 88px, with text and commands on separate lines. Member internals and native row heights remain intact; the content container has no maximum-width cap, with no experimental name reformatting. Reading measure stays 74ch. Outer panels are contiguous and square; controls retain 6px corners, composer/popouts 8px. No new remote resource.
