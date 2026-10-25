---

name: Sibylla Discord family

description: Five color worlds sharing the approved reading and voice workspace.

colors:

  nord0: "#2e3440"

  nord1: "#3b4252"

  nord2: "#434c5e"

  nord3: "#4c566a"

  nord4: "#d8dee9"

  nord5: "#e5e9f0"

  nord6: "#eceff4"

  nord7: "#8fbcbb"

  nord8: "#88c0d0"

  nord9: "#81a1c1"

  nord10: "#5e81ac"

  nord11: "#bf616a"

  nord12: "#d08770"

  nord13: "#ebcb8b"

  nord14: "#a3be8c"

  nord15: "#b48ead"

  shadow-black: "rgb(0 0 0 / 24%)"

  canvas: "color-mix(in srgb, color-mix(in srgb, var(--sibnight-nord0) 55%, var(--sibnight-nord10)) 45%, #000)"

  index: "color-mix(in srgb, var(--sibnight-nord0) 90%, var(--sibnight-canvas))"

  control: "color-mix(in srgb, var(--sibnight-nord2) 60%, var(--sibnight-canvas))"

  hover: "color-mix(in srgb, var(--sibnight-nord3) 40%, transparent)"

  selected: "color-mix(in srgb, var(--sibnight-nord9) 28%, var(--sibnight-index))"

  line: "color-mix(in srgb, var(--sibnight-nord4) 16%, transparent)"

  attention: "color-mix(in srgb, var(--sibnight-nord11) 85%, #000)"

  channel-rest: "color-mix(in srgb, var(--sibnight-nord4) 55%, var(--sibnight-nord3))"

  muted: "color-mix(in srgb, var(--sibnight-nord4) 76%, var(--sibnight-nord0))"

typography:

  title:

    fontFamily: "Figtree, gg sans, sans-serif"

    fontSize: "18px"

    fontWeight: 650

  body:

    fontFamily: "Figtree, gg sans, sans-serif"

    fontSize: "16px"

    fontWeight: 400

    lineHeight: 1.5

  label:

    fontFamily: "Figtree, gg sans, sans-serif"

    fontSize: "16px"

    fontWeight: 400

  timestamp:

    fontFamily: "Figtree, gg sans, sans-serif"

    fontSize: "12px"

  code:

    fontFamily: "gg mono, Consolas, monospace"

rounded:

  unread-tip: "2px"

  separator-cap: "4px"

  compact: "6px"

  surface: "8px"

  square: "0"

spacing:

  tight: "4px"

  compact: "8px"

  inset: "12px"

  regular: "16px"

  wide: "20px"

  group: "24px"

components:

  composer:

    backgroundColor: "{colors.control}"

    textColor: "{colors.nord4}"

    rounded: "{rounded.surface}"

    height: "56px"

  selected-channel:

    backgroundColor: "{colors.selected}"

    textColor: "{colors.nord6}"

    rounded: "{rounded.compact}"

  popup:

    backgroundColor: "{colors.nord0}"

    rounded: "{rounded.surface}"

---



# Design System: North Polar



## Overview



**Creative North Star: Cabinet de lecture.** A quiet reading room for long Discord discussions and voice sessions. Dark Polar Night planes frame the conversation; Frost marks useful actions and focus. Figtree and a coherent outline icon family keep the interface readable and recognizable.



This documents the implemented standalone North Polar system, extracted from the active numbered source modules. It supersedes the rejected shared Sibnight architecture. The old nine themes are retired from active sources; their Git history and current attribution remain available. Composition-specific decisions and validation limits live in `.impeccable/surfaces/src-north-polar-css.md`.



**Key Characteristics:**



- Continuous conversation canvas with quiet supporting indexes.

- One composer surface and an integrated account area.

- Flat tonal separation, restrained borders and limited popup depth.

- Native Discord content, status, accessible labels and interaction semantics.



## Colors



The exact Nord primitives remain intact. The canvas mixes Polar Night with nord10 and black; indexes and controls derive from that canvas and the Polar Night primitives; they are not the unmodified official palette swatches. Source custom properties retain the `--sibnight-` prefix.



### Primary



Frost (nord8) identifies links, focus, selected reactions and mention accents. Links are underlined; color alone must not communicate interaction.



### Secondary



Aurora colors retain their semantic roles: green for connected/success states, red for danger and yellow for warnings. Other Nord primitives remain available to native semantic bindings. They are not permission to decorate every control with another accent.



### Neutral



The canvas is the darkest continuous reading plane. The index supports navigation, code and embeds. The control fill distinguishes the composer and reactions; nord0 supports headers and floating surfaces. Snow Storm supplies body text and headings; the muted mixture supplies timestamps and secondary text. The line mixture defines quiet boundaries. The channel-rest mixture keeps read channel labels quieter but legible. The attention mixture darkens nord11 for notification counters and critical controls; foreground remains Snow Storm. The measured white badge foreground contrast against attention is 4.657:1. Modern native button, radio, checkbox and focus roles map to the same Nord vocabulary.



**The State Rule.** Preserve native unread, mention, mute and connection distinctions; do not erase them to simplify the palette.



## Typography



Figtree uses the existing font import, with gg sans and sans-serif fallbacks. Code retains gg mono and Consolas fallbacks. No new font service is introduced.



Body text uses a relaxed line height and a bounded reading measure. Names and selected navigation use stronger weight; timestamps are smaller with tabular numerals. The implementation has no separate display headline scale or ornamental type treatment.



## Layout



Native Discord grid tracks remain authoritative. Source tokens supply a server rail (72px), combined sidebar (344px), member area (272px) and prose measure (74ch). The effective channel width remains 272px. At a viewport width of 1200px or less, members become 256px while the sidebar stays 344px. The account remains on one row. Native validation at 1101 × 801 verified this compact geometry, aligned icons and an open folder.



The server rail keeps native 40px icons at a 48px cadence without zoom. Only the native SVG base path becomes an 8px rounded rectangle; badge cutouts and status masks remain intact. Selection is a flat 56 × 48px tonal tab, centered behind the icon at left -8px/top -4px, with 8px corners and relative positioning/isolation; it has no ring. Expanded folders use a neutral index-colored 56px track centered at 8px. Closed previews use the same neutral index tone and the folder glyph uses Frost. The native folder size variable remains 48px beside 40px avatars; native folder-header negative margins remain authoritative for tooltip anchors. Do not compensate with ad hoc tooltip offsets. History controls reuse the native base grid page area and appear inline before the channel name at its header height. Title and window controls retain the native titleBar area. Display-contents wrappers allow notice rows to retain layout ownership; no fixed screen coordinates or anchor positioning are used. Header content reserves 112px for the history controls. The channel index adds no extra bottom margin: native panel reservation already protects its scrollable list. The reading canvas and outer panels meet directly with square boundaries. Message groups have deliberate separation (24px); each message is not a card. Native avatars and content remain intact. Channel and chat headers have a minimum height (60px). The composer has a minimum height defined by its component token, with transparent inner layers. At <=1200px, the open voice call keeps full width with height max(284px, 52%); its connected chat portal occupies the remaining height below. Exact general-sibling selectors start at the voice wrapper, leaving DM and thread panels unaffected. The named call container supplies a two-row control-grid fallback at <=560px. Native 1101 × 801 evidence records the stacked call and chat. Geometry describes source intent, not proof that every viewport has been validated.



## Elevation & Depth



Ordinary layout uses tone and thin boundaries. The composer has no shadow. Actual floating menus and pickers use one restrained shadow, recorded in the sidecar; their full-window layer containers remain transparent. No glow, glass blur or decorative gradients belong to this system.



**The Continuous Canvas Rule.** Separate functions without nesting ornamental containers around the conversation or each message.



## Shapes



Outer panels remain square. Small navigation controls, toolbar targets, reactions and embeds use compact corners. The composer, floating components and distinct native voice connection surface use the surface radius. Unread rail tips intentionally use a 2px corner and separator caps use 4px corners. The attachment action is circular. Rounded geometry marks bounded controls, rather than rounding every available panel.



## Components



### Navigation and toolbar



Native navigation and unread indicators stay visible. Selected channels combine tonal fill and heavier heading text. Toolbar controls have compact targets (32px) and a shared outline vocabulary. Eleven pinned Lucide SVGs are locally vendored with license and source provenance; masks are generated from them. Ten masks are active: five header/rail glyphs and five voice glyphs (video, video-off, screen-share, shapes and party-popper). The vendored signal asset is retained but unused; native network-quality SVG paths remain visible. The pin keeps its source geometry and is tilted (35 degrees). Native notification and voice state remain native; CSS must not invent unavailable actions. No additional runtime fetch or package is introduced.



### Composer



One control-colored outer surface contains transparent editable layers. The circular attachment action (28px) uses foreground against canvas. A Frost outline appears on focus within. Preserve drafts, labels, menus and native actions.



### Account and voice



The account area is integrated below the channel index, with minimum height (76px), padding (10px vertically, 4px horizontally), avatar (36px), main command widths (28px) and input/output option widths (24px). The native account nameplate remains visible behind identity and controls; local name text keeps the reading typography. One bounded voice container covers both connection status and all four native actions. Its status row has a minimum height (40px); action buttons are 40px high, have no horizontal padding and retain 20px icon flex bases. It expands naturally and preserves native controls. Active voice actions use a nord14-derived fill and border with nord14 text. Network quality retains Discord’s native 16px SVG with zero padding and its Fine/Average/Bad paths; no static signal mask replaces state.



### Floating components



Style the actual menu, pins panel, picker or autocomplete rather than its overlay root. Selected menu rows use the selected tone; labels wrap to preserve long options at narrow widths. Populated pinned messages form a flat readable list: entries are transparent, square and borderless, with a thin separator only between siblings. Popup entrances last 130ms with a small vertical settle; they run only when both operating-system and Discord reduced-motion settings allow them. Native positioning transforms remain intact.



### Native settings controls

Modern native switch roles use Frost tracks and dark thumbs. One exact local checked-state query handles the legacy switch: `#app-mount .container_a28278:has(> .hiddenVisually_b18fe2 > input:checked) > .switchIndicator_a28278`. Its nord10 background uses `!important` because Discord animates the track with an inline color. This sole exception does not permit ancestor-wide relational queries; the checker limits the count to one and the validator whitelists only that exact selector.

### Focus and content state



Interactive elements receive a visible Frost outline (2px, inset offset). Forced colors uses the system Highlight color. Composer focus within remains distinct. Selected reactions retain an outline; mentions retain their leading marker. Targeted native checks observed Frost keyboard focus in the input-device submenu, the output-device menu and real unread/mention presentation. Those observations do not establish every keyboard path, state or operating-system accessibility mode.



## Do's and Don'ts



- **Do** reuse existing tokens and prefix new project tokens with `--sibnight-`.

- **Do** preserve native labels, content, focus, unread state, profile identity and voice semantics.

- **Do** edit declared source modules, then regenerate outputs in the explicit build order.

- **Do** distinguish source inspection, synthetic fixtures and observed Discord runtime states.

- **Don't** add decorative nested cards, blanket rounded panels, glow, blur or global motion.

- **Don't** add remote resources, telemetry or unreviewed code.

- **Don't** use partial class selectors, global ancestor `:has()` queries or transitions of all properties. Only the exact local legacy-switch query documented above is permitted.

- **Don't** treat mockups, static checks or historical screenshots as current visual validation.

- **Don't** publish private screenshots or conversation content.



### Current compact rail and voice correction



The owner rejected the earlier gallery rail and selection ring. Current geometry is the compact 72px rail described above. Native folders, badges, unread pills and scrolling remain authoritative. The main voice header reserves 112px for history via its exact headerWrapper/subtitleContainer/headerBar hierarchy; nested chat titles remain unshifted. Earlier native open/close cycles and the text header were observed on the VPS.


Voice masks target direct native buttons nth-of-type(1), (2) and (3), plus the soundboard aria label. Hidden spans remain in the native DOM; active video overrides the inactive video-off mask. The build budget is 36 KiB. Latest quality verification passed four tests with zero dependency audit findings. Final generated CSS: 36,797 bytes, 170 rules, six !important declarations and one exact component-local :has() query. The installable bundle SHA-256 matches locally and on the VPS: `21fd38c2c95a913cc0611cbd737b544ab2aecfc181ba359254f1d8a52f94baff`. Final synthetic fixture passed 62/62 assertions at 1600px and 1101px, including the short split regression, all three native quality states with alpha retained, and native legacy checked/unchecked switch states. Native 1101 × 801 checks verified compact geometry and open-folder alignment; the rail-bottom add dialog and pins were accessible, and notification options opened. Two expanded folders, activities, Soundboard and share-selector access also observed. Other native combinations remain untested. These targeted observations do not establish universal visual or functional approval. No publication.


Current private native evidence: `.impeccable/review/voice-chat-narrow-stacked.png`, `voice-chat-narrow-menu.png`, `settings-voice-narrow.png`, `settings-camera-narrow.png`, `settings-appearance-narrow.png`, `settings-notifications-narrow-final.png` and `settings-notification-select.png` and `settings-accessibility-narrow.png`. These record bounded call/chat and settings observations; DM/header and Halo tooltip follow-up recorded in docs/VALIDATION.md. No publication.


Native final review disposition: bounded SHIP for the observed 1101 × 801 voice layout and recorded settings states. Native ping measured 16 × 16px. Accessibility settings were also observed in `.impeccable/review/settings-accessibility-narrow.png`. DM/header and Halo tooltip follow-up recorded in docs/VALIDATION.md; no publication.

Follow-up contract: sparse folder previews centre both flex axes inside the native 48px anchor. Do not move the tooltip itself. DM search and conversation headers share `--sibnight-header-height: 60px`, including the border-box boundary. Decorative DM-row banners are neutralised in navigation only; the personal account banner remains native. Real narrow DM alignment and Halo closed/open states were observed; private evidence remains ignored. Voice chat was reopened and closed on the final candidate without title/history overlap. No publication.

Group DM follow-up: keep offline member names readable by removing the native whole-row 0.3 opacity. Presence data, profile badges and identity remain native. This is one scoped rule, with no new relational selector or motion. Group, compact/full profiles and representative popups were observed at 1101 × 801; details and remaining loading-state limit are in docs/VALIDATION.md. No publication.

## 25 October correction contract (supersedes fixed geometry above)

Sidebar width follows the native user preference; 344px is an absent-variable fallback only. The theme must not overwrite --custom-guild-sidebar-width. Native avatar, decoration, reply and text-size geometry remain paired; no isolated portrait width/left overrides. Virtualized categories and channel row heights stay native. Member rows are transparent at rest with restrained hover/focus-within; personal banners remain intact. Current bundle: 36813 bytes, 168 rules, six important declarations, one bounded local has query; SHA256 b333d3ce97436ca0e323e35821be78bbca717a32e90e89607e676d19710a3cb2. Quality 4 tests PASS/audit0; fixture72 PASS, baseline detects five new failures at each width. Runtime evidence and limits are in docs/VALIDATION.md; no universal, hardware or FPS claim. No publication.

## Shared family — 25 October 2026

Sibylla is now the main identity; North Polar, North Snow, Spatial and Tokyo-night reuse its exact approved North layout. Colors and backgrounds alone vary. `scripts/lib/flavors.js` owns these roles, applied after the common modules. North Polar has no appended overrides and retains the approved bundle hash. The old Sibnight code is removed from active sources into a private recovery copy. No legacy CSS is imported.

Sibylla uses the website's midnight #04040b, gold #fada7d and cool #dbe8ff text. Its supplied transparent logo is subdued in the upper right of the message viewport. Spatial uses the exact supplied orbital photograph anchored upper right. North Snow uses Snow Storm surfaces and Polar Night typography, with darker Frost/status tones for legibility. Tokyo-night follows the upstream dark editor palette. Preserve all native account nameplates; artwork never replaces the user's own banner. No extra motion or icon redesign belongs to this pass.


Owner approval, 25 October 2026: all five variants were tested and accepted; repository publication is authorized. Historical no-publication statements below earlier checkpoints describe their own dates, not the current scope.
