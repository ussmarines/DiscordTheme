---
name: Sibnight — Lecture et repères
description: Shared continuous reading workspace with North Polar as its dark Nord skin.
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
typography:
  body:
    fontFamily: "figtree"
    fontWeight: 400
    fontSize: "1rem"
    lineHeight: 1.5
  metadata:
    fontSize: "0.75rem"
  history-title:
    fontSize: "12px"
  channel:
    fontWeight: 500
  selected-channel:
    fontWeight: 650
  unread-channel:
    fontWeight: 750
rounded:
  control: "6px"
  surface: "8px"
spacing:
  composer-inset: "20px"
  toolbar-gap: "8px"
  dock-padding: "6px 8px"
components:
  toolbar-control:
    rounded: "{rounded.control}"
    width: "32px"
    height: "32px"
  toolbar-control-hover:
    backgroundColor: "{colors.nord2}"
    textColor: "{colors.nord8}"
  composer:
    backgroundColor: "{colors.nord2}"
    rounded: "{rounded.surface}"
  popout:
    backgroundColor: "{colors.nord1}"
    rounded: "{rounded.surface}"
---

# Design System: Sibnight — Lecture et repères

## Overview

**Creative North Star: "Cabinet de lecture"**

North Polar treats Discord as a continuous reading desk. Quiet indexes frame long conversations; a compact account dock and a distinct voice connection remain close at hand. The approved composition combines reference-desk with the connected-user block from the selected assigned concept.

The structure is shared: `src/main.css` supplies the principal theme and `src/workspace.css` supplies the continuous workspace, reading typography, native account layout and toolbar artwork. The build manifest compiles workspace last in the principal sources, then `flavor-base.css` and `north-polar.css` for flavors. North Polar is a palette skin: its wrapper defines the official Nord tokens and `src/north-polar.css` binds native Discord semantic colors. The eight other variants retain their palettes and installable names; their visual behavior has not been reviewed for this refactor. The Nord tokens below describe the North Polar expression, not a mandatory palette for every variant.

**Key Characteristics:**

- Continuous dark reading surface; messages are not individual cards.
- Flat tonal hierarchy, restrained Frost accents and compact rounded controls.
- Native navigation, content, accessible labels, unread indicators and voice semantics.
- Original outline toolbar artwork with functional native state preserved.

## Colors

The normative frontmatter records all sixteen Nord colors exactly; the wrapper exposes them through the corresponding `--sibnight-nord0` through `--sibnight-nord15` properties.

### Primary

Frost nord8 identifies focus, selected toolbar tools, the composer caret, reaction selection and thin mention/reply edges. Frost nord7 and nord9 remain accent aliases; nord10 remains available in the official palette without a newly invented role.

### Secondary

Aurora nord11 carries danger and do-not-disturb, nord13 carries warnings, idle and notifications, nord14 carries positive/online/connected voice states, and nord15 carries streaming. Nord12 remains part of the palette without a newly assigned component role. Preserve textual and native state indicators alongside color.

### Neutral

Polar Night nord0 is the conversation and server rail foundation. Nord1 supports channel/member indexes, headers, popouts, embeds and the account/voice dock. Nord2 supports controls, selection, reactions and the composer; nord3 supplies boundaries and scroll thumbs. Snow Storm nord4 is readable body and secondary text, nord5 is retained through the text aliases, and nord6 provides headings, stronger labels and underlined links.

**The Reading Surface Rule.** Preserve the difference between the continuous reading page and its supporting indexes; do not add gradients, glow or decorative message cards.

## Typography

The wrapper requests Figtree through the existing shared font mechanism. Discord retains its fallback behavior. Cozy message prose explicitly uses the body size in frontmatter; this theme introduces no separate display typeface.

Body text has regular weight and an open line height (see frontmatter), with a reading measure of (74ch) through `--sibnight-reading-width`. Long content wraps without forcing a wider page. Usernames and selected channel labels use weight (650); unread channel labels use weight (750). Timestamps use tabular numerals. Links retain an underline, a Frost underline color and an offset (3px), so recognition does not depend only on hue.

## Layout

The workspace is continuous, with square outer panel edges and no floating shell gaps. The server rail is (72px), with avatars (48px). The sidebar is border-box and capped at (328px), including the rail; the member index is (264px). Native sidebar width preferences can reduce the sidebar within that cap. The top bar is (40px); native window controls remain at its end. The conversation header has minimum height (60px).

Toolbar targets are square (32px). Search uses a width clamped from (128px) to (220px), with height (34px). Message groups have top margin (22px); the composer has horizontal inset from frontmatter, bottom margin (16px), and text vertical padding (12px).

At viewport widths of (1200px) or less, the sidebar cap becomes (288px), member index (256px), toolbar gap (4px), search (128px), and composer inset (12px). The account can wrap at every viewport width: identity and controls occupy distinct lines when space requires it, with automatic height. At this compact breakpoint the controls explicitly occupy the second line; the identity area keeps a minimum width (120px). The account row has minimum height (64px), with (36px) avatar. Voice stays above the account row within the channel column, outside the server rail. The voice connection has automatic height with a minimum (88px), with connection text and commands on separate lines.

An additional compact rule at (1150px) reduces message-group spacing to (16px). These are source-defined adaptations, not a claim of compatibility at every window size. Local current observations are `.impeccable/review/core-member-desktop.jpg` and `core-member-narrow.jpg` (native narrow window: 1101 × 801); they are private evidence, not distributable assets or exhaustive validation.

## Elevation & Depth

Depth comes from flat tonal surfaces and fine borders. The shared workspace removes decorative panel shadows; North Polar also disables backdrop blur, sheen and glow through its wrapper. Popouts have a quiet nord3 border (1px). Mentions, replies and ephemeral messages use nord1 with a Frost inset edge (1px), preserving their native significance without turning every message into a card.

**The Flat Desk Rule.** Use surface tone and boundaries to separate functions; do not introduce ornamental lifting or shadows to ordinary messages.

## Shapes

Controls, navigation rows, reactions and input fields use the compact radius in frontmatter; embeds, popouts and the composer use the surface radius. Outer shell panels and messages remain square; ordinary messages are borderless. Preserve Discord's native avatar and identity silhouettes.

## Components

### Toolbar

Threads, pins, member-list controls and search use original local outline SVG artwork, drawn on a (24px) viewBox with stroke width (1.75). It is presentation applied to existing controls: native labels, badges and actions remain. The notification bell deliberately stays native because its muted slash communicates functional state. Do not replace or invent a threads action when Discord does not supply one.

Hover and selection use nord2 with Frost foreground. Keep toolbar controls compact and recognizable; preserve the source selectors' actual language/state coverage rather than claiming every Discord locale is supported.

### Conversation and composer

The conversation is a continuous nord0 surface. Embeds and code use supporting nord1 surfaces; reactions use nord2 and selected reactions add a Frost border. The composer uses nord2 and a Frost focus-within outline (1px). Ordinary fields use nord0, nord3 borders and a Frost focus border.

### Navigation

Channel rows have minimum height (34px). Selection uses nord2 and stronger Snow Storm text. Unread rows retain a darker surface, increased text weight and native indicators. Never hide unread or mention markers to simplify the design.

### Member index

The wider index reserves space for native names and badges. Member names keep their native internal formatting and row heights; the member content container removes its maximum-width cap. Do not recreate the removed experimental name-reformatting rules.

### Account and voice dock

The native account controls and voice controls remain operational. Only the decorative account nameplate in the dock is hidden. The dock name is normalized for readability; public/custom profile cards and their native identity treatments remain intact. Do not generalize this scoped suppression to profile popouts or other identity surfaces.

### Focus and motion

Keyboard focus uses a Frost outline (2px) with inset offset (-2px); forced-colors mode maps the outline to the system Highlight color. Reduced-motion and explicit animation opt-out behavior are inherited from shared sources. Preserve narrow, property-specific transitions and the shared reduced-motion guards.

## Do's and Don'ts

- **Do** reuse existing public tokens and prefix new project tokens with `--sibnight-`.
- **Do** preserve the Sibylla logo, North Polar name and Zelk/Midnight/Tokyo Night credits.
- **Do** edit sources and wrapper, then regenerate builds in the declared order.
- **Do** distinguish static checks, synthetic fixtures and actual Discord observations. Previous validation counts belong to their recorded checkpoint and do not certify this shared refactor. Current observations and remaining limits belong in docs/MAINTENANCE.md.
- **Don't** paint generic layer containers, hide unread state, remove focus or introduce global expensive transitions.
- **Don't** replace the other eight palettes or claim their visual validation from North Polar observations.
- **Don't** publish private conversations or screenshots as design examples. Historical concepts describe intent, not current rendered proof.
