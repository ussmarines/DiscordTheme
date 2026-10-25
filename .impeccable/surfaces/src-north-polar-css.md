---

version: 1

slug: "src-north-polar-css"

primary_target: "src/00-tokens.css"

related_targets: ["src/10-native-colors.css", "src/20-shell.css", "src/30-conversation.css", "src/40-composer.css", "src/50-dock.css", "src/60-overlays.css", "src/70-icons.css", "src/75-motion.css", "src/80-accessibility.css", "scripts/lib/build-theme.js", "themes/north-polar.theme.css"]

---



# North Polar — Cabinet de lecture



Mode: Operate / Read. Discord desktop, sustained reading, long conversations and voice.



## Approved direction



The owner approved `.impeccable/mocks/compositions/reference-desk.png` with the account block from `.impeccable/mocks/decision/assigned.png` on 24 October 2026. These are private synthetic direction studies, not native validation. The owner subsequently rejected the shared Sibnight base and explicitly requested a standalone reconstruction from zero. The user also expressly rejects generic AI visual defaults: decorative nesting, indiscriminate rounded panels, glow, blur and gratuitous motion.



The composition is a continuous dark reading canvas framed by native server navigation, channel index and members. The composer is one surface. The account is integrated into the channel index; the native voice connection retains a distinct bounded surface. Native content and state take priority over literal reproduction of synthetic content.



## Implemented materials



| Ingredient | Current source commitment |

|---|---|

| Palette | Exact sixteen Nord primitives; canvas mixes nord0/nord10/black, index and controls derive from it; readable channel-rest and darkened nord11 attention roles |

| Typography | Existing Figtree import and native fallbacks; body 16px/1.5 and 74ch measure |

| Layout | Rail 72px, combined sidebar 344px and effective channel width 272px; native 40px icons at 48px cadence without zoom; members 272px, reduced to 256px at <=1200px; account remains on one row |

| Conversation | Continuous canvas, 24px message-group separation, native media and profiles |

| Composer | One outer control fill, transparent inner layers, 56px minimum height, 8px corners, 28px circular attachment action |

| Account | Native nameplate retained; 76px minimum height; 10px vertical/4px horizontal padding; 36px avatar; 28px primary commands and 24px option controls |

| Voice | One native container covers status and all four actions; 40px minimum status row, 40px action height, no horizontal action padding, 20px icon flex bases |

| Icons | Eleven pinned licensed local Lucide SVGs, 24px source grid and 2px stroke; pin tilted 35 degrees; messages replaces home emblem; ten active masks (five header/rail and five voice: video, video-off, screen-share, shapes and party-popper); signal stays vendored but unused, preserving native network-quality state |

| Floating UI | Actual component tone/border/shadow, never a painted full-window overlay root |

| Motion | 130ms popup settle guarded by system and Discord reduced-motion settings; no global motion |



Five-block composition contract is persisted in `src/00-tokens.css`: thesis, own-world, story, first viewport and form. No new seed or invented quality threshold is introduced by this documentation.



## Build authority



The active order is `00-tokens`, `10-native-colors`, `20-shell`, `30-conversation`, `40-composer`, `50-dock`, `60-overlays`, `70-icons`, `75-motion`, `80-accessibility`, all CSS files under `src/`. `scripts/lib/build-theme.js` declares this order. Output is `build/north-polar.css`, with the standalone installable bundle under `output/`. No active source imports the retired Sibnight implementation; Git history preserves the old code. All five versions use this composition.



The icon source and licenses are under `assets/icons/lucide/`, pinned to Lucide commit `7faf87628a1ad6175975bc595344337ce14a7db4`. Generated masks come from `scripts/icons.js`; they are not improvised replacements. Native threads actions are styled only where Discord supplies them.



## Evidence and open checks



Current target: dedicated VPS Discord Linux 1.0.166 with Vencord, with only the new theme active. Personal Windows Discord is outside this pass. Targeted corrections and tests were explicitly authorized. Test channels north-lecture (text), north-vocal (voice) and north-forum (forum), a long text with quote/mention and a forum post provide controlled native content. The native form offered Text, Vocal and Forum; community channel types were not tested.



Private evidence under `.impeccable/review/`: `targeted-round1-wide.png`, `targeted-round1-connected.png`, `targeted-round1-unread-message.png`, `targeted-round1-forum-unread.png`, `targeted-round2-input-options.png` and `targeted-round2-audio-keyboard.png`, `targeted-round2-output-options.png` and `targeted-round2-share.png`, `targeted-final-reading-narrow.png` and the updated `targeted-round2-pins-populated.png`. These ignored artifacts must not become published examples. Earlier standalone and historical images do not certify the current source.



Observed native states: Mark Unread produced red server/channel counters showing 1, a Frost new-message bar and an unread separator. Voice reached “Voix connectée” after missing laboratory runtime libraries were installed and the client restarted; the microphone remained muted. Actual Down/Right keyboard navigation opened the input-device submenu with visible Frost focus. The output-device menu was also observed. A real screen share of only the Discord Theme Lab window started with a live preview and a working stop action. These are bounded native observations, not proof of an external viewer, physical audio, camera, general media transfer or all Discord functions.



Current candidate verification: 36 KiB build budget; latest quality run passed four tests and dependency audit reported zero findings. Final generated CSS: 36,797 bytes, 170 rules, six !important declarations and one exact component-local :has() query. The installable bundle SHA-256 matches locally and on the VPS: `21fd38c2c95a913cc0611cbd737b544ab2aecfc181ba359254f1d8a52f94baff`. Final synthetic fixture passed 62/62 assertions at 1600px and 1101px, including the short split regression, all three native quality states with alpha retained, and native legacy checked/unchecked switch states. Synthetic checks remain separate from native evidence. Earlier candidate hashes and byte counts do not identify this source.



The earlier independent review resolved the reviewed continuous canvas/material/composer issues and found legitimate native adaptations and a coherent icon family. No overall fidelity PASS is asserted. History controls now reuse the native base page grid and were observed inline before the channel name at the correct header height. Display-contents wrappers preserve native titleBar/window controls and notice-row layout; the header reserves 112px for history. No anchor-positioning experiment remains. This targeted correction does not establish whole-frame fidelity. Fresh independent review found the narrow account split into two rows with connected text truncated. At that historical checkpoint, keeping the sidebar at 360px and removing account wrapping resolved that bounded finding in the native 1101 × 801 capture; reviewer disposition was ship for that targeted correction. Current compact geometry is recorded below. The extra channel-list bottom reservation was removed, and channels reappeared in native 1280 × 720 evidence. Populated pins now use flat entries and sibling separators. Full matched-frame legibility, complete keyboard traversal and broader unread/mention paths remain partial or open. Connected status and the observed input submenu close only their specific prior gaps. External screen-share reception, hardware audio, camera, broader media, BetterDiscord runtime and Windows accessibility modes remain unvalidated.



The detector ran once (`targeted-detector.json`) and reported three advisory items only: the intentional 2px unread-tip radius, 4px separator-cap radius and black-at-24% popup shadow. Those incumbent values are now recorded in the design system; no detector rerun or zero-advisory result is asserted. Attention badge white foreground contrast is 4.657:1. Active voice actions use nord14-derived fill/border/text.



Theme Lab is persistent by explicit owner instruction: preserve its test channels, messages, forum post and pin; do not reset it. No QUALITY_BAR was supplied and none is invented. The bounded ship disposition is not universal approval.



At the original review the owner requested no publication. On 25 October 2026 the owner tested all five versions and explicitly approved repository publication.


Current compact correction: the owner rejected the gallery rail and selection ring. The 72px rail keeps native 40px icons at a 48px cadence without zoom. Only the native SVG base path becomes an 8px rounded rectangle; badge cutouts remain intact. The selected tab is flat, 56 × 48px, centered at left -8px/top -4px with 8px corners and relative positioning/isolation. Expanded folder track is 56px wide and centered at 8px with neutral index fill; closed preview uses the index tone and its folder glyph uses Frost. The main voice header still reserves 112px for history. Direct native button nth-of-type(1), (2), (3) and soundboard aria mapping preserve hidden spans; active video overrides video-off. No additional runtime fetch or package. Native 1101 × 801 checks verified compact geometry, aligned icons and an open folder; rail-bottom add dialog and pins were accessible, notification options opened. Activities and Soundboard panels and the screen-share selector opened without launching an application, playing a sound or broadcasting. Two folders were expanded simultaneously and scrolled across their boundary. Further native combinations remain untested. Earlier independent reviews do not certify every current state. No publication.


## Native call, settings and anchor correction

At <=1200px, the open voice wrapper keeps a full-width call at `max(284px, 52%)` height. Exact general-sibling selectors from that wrapper position its connected chat portal below in the remaining height; DM and thread panels retain native layout. The named `sibnight-call` container supplies a two-row control-grid fallback at <=560px. Native 1101 × 801 call/chat and menu evidence is recorded in `voice-chat-narrow-stacked.png` and `voice-chat-narrow-menu.png`. Menu labels wrap.

Network quality uses the native 16px SVG with zero padding, retaining Fine/Average/Bad paths. No static Lucide signal mask replaces state. Eleven SVGs remain vendored and ten masks are active: five header/rail and five voice.

Modern switches use semantic Frost tracks and dark thumbs. The only relational query allowed is `#app-mount .container_a28278:has(> .hiddenVisually_b18fe2 > input:checked) > .switchIndicator_a28278`; its nord10 track uses `!important` to override Discord’s inline animated color. `scripts/check.js` caps query count at one; `scripts/lib/build-theme.js` whitelists that exact selector. No global ancestor query is permitted.

The native folder-size variable remains 48px beside 40px avatars; native folder-header negative margins were restored to repair tooltip anchors. No ad hoc tooltip offset is applied. DM/header and Halo tooltip follow-up recorded in docs/VALIDATION.md.

Private native settings evidence: `settings-voice-narrow.png`, `settings-camera-narrow.png`, `settings-appearance-narrow.png`, `settings-notifications-narrow-final.png` and `settings-notification-select.png` and `settings-accessibility-narrow.png` under `.impeccable/review/`. These are bounded observed states, not hardware, whole-client or all-feature approval. Preserve the Nord dark Cabinet de lecture world and Cabinet initial account composition. No publication.


Native final review disposition: bounded SHIP for the observed 1101 × 801 voice layout and recorded settings states. Native ping measured 16 × 16px. Accessibility settings were also observed in `.impeccable/review/settings-accessibility-narrow.png`. DM/header and Halo tooltip follow-up recorded in docs/VALIDATION.md; no publication.

Group member readability: the scoped native offline member row keeps opacity 1 so names are readable; native presence data and profile identity remain intact. Group DM, compact/full profiles and representative popups were observed at 1101 x 801; see docs/VALIDATION.md for exact limits. No publication.

## 25 October correction contract (supersedes fixed geometry above)

Sidebar width follows the native user preference; 344px is an absent-variable fallback only. The theme must not overwrite --custom-guild-sidebar-width. Native avatar, decoration, reply and text-size geometry remain paired; no isolated portrait width/left overrides. Virtualized categories and channel row heights stay native. Member rows are transparent at rest with restrained hover/focus-within; personal banners remain intact. Current bundle: 36813 bytes, 168 rules, six important declarations, one bounded local has query; SHA256 b333d3ce97436ca0e323e35821be78bbca717a32e90e89607e676d19710a3cb2. Quality 4 tests PASS/audit0; fixture72 PASS, baseline detects five new failures at each width. Runtime evidence and limits are in docs/VALIDATION.md; no universal, hardware or FPS claim. No publication.
