---
name: Sibnight North Polar
description: Cabinet de lecture — quiet Nord surfaces for sustained Discord reading and voice.
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
    lineHeight: 1.55
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
  shell-gap: "12px"
  toolbar-gap: "6px"
  dock-padding: "4px"
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

# Design System: Sibnight North Polar

## Overview

**Creative North Star: "Cabinet de lecture"**

North Polar treats Discord as a continuous reading desk. Quiet indexes frame long conversations; a compact account dock and a distinct voice connection remain close at hand. The approved composition combines reference-desk with the connected-user block from the selected assigned concept.

This document describes the North Polar implementation, not the eight other themes. The opening direction contract in `src/north-polar.css` records the thesis, first viewport, form and finish obligations. Its finish requirement is a review gate, not evidence that review has passed. The implementation is scoped by the North Polar opt-in; shared sources compile before flavor-base and North Polar, in the declared build order.

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

The wrapper requests Figtree through the existing shared font mechanism. Discord retains its native font-size hierarchy and fallback behavior; this theme does not introduce a separate display typeface or fixed body size.

Body text has regular weight and an open line height (see frontmatter), with a reading measure of (74ch) through `--sibnight-reading-width`. Long content wraps without forcing a wider page. Usernames and selected channel labels use weight (650); unread channel labels use weight (750). Timestamps use tabular numerals. Links retain an underline, a Frost underline color and an offset (3px), so recognition does not depend only on hue.

## Layout

The shell uses the existing gap (12px). The header and account row have minimum height (56px). Toolbar targets are square (32px), separated by the toolbar gap in frontmatter. Search starts at minimum width (120px). Message groups have top margin (22px), while the composer text has vertical padding (14px).

At viewport widths of (1150px) or less, toolbar gaps reduce to (2px), search minimum width to (96px), and message-group spacing to (16px). Discord continues to own the actual application columns, panels and interaction layout. This breakpoint is a compact adjustment, not evidence of universal narrow-client compatibility.

The account dock has compact padding and no artificial gap between its native sections. The voice connection remains visually distinct and its connection text retains the positive state color.

## Elevation & Depth

Depth comes from flat tonal surfaces and fine borders. North Polar removes decorative panel shadows, backdrop blur, sheen and glow. Popouts have a quiet nord3 border (1px). Mentions, replies and ephemeral messages use nord1 with a Frost inset edge (1px), preserving their native significance without turning every message into a card.

**The Flat Desk Rule.** Use surface tone and boundaries to separate functions; do not introduce ornamental lifting or shadows to ordinary messages.

## Shapes

Controls, navigation rows, reactions and input fields use the compact radius in frontmatter; larger containers, embeds, popouts and the composer use the surface radius. Messages remain square and borderless. Preserve Discord's native avatar and identity silhouettes.

## Components

### Toolbar

Threads, pins, member-list controls and search use original local outline SVG artwork, drawn on a (24px) viewBox with stroke width (1.75). It is presentation applied to existing controls: native labels, badges and actions remain. The notification bell deliberately stays native because its muted slash communicates functional state. Do not replace or invent a threads action when Discord does not supply one.

Hover and selection use nord2 with Frost foreground. Keep toolbar controls compact and recognizable; preserve the source selectors' actual language/state coverage rather than claiming every Discord locale is supported.

### Conversation and composer

The conversation is a continuous nord0 surface. Embeds and code use supporting nord1 surfaces; reactions use nord2 and selected reactions add a Frost border. The composer uses nord2 and a Frost focus-within outline (1px). Ordinary fields use nord0, nord3 borders and a Frost focus border.

### Navigation

Channel rows have minimum height (34px). Selection uses nord2 and stronger Snow Storm text. Unread rows retain a darker surface, increased text weight and native indicators. Never hide unread or mention markers to simplify the design.

### Account and voice dock

The native account controls and voice controls remain operational. Only the decorative account nameplate in the dock is hidden. The dock name is normalized for readability; public/custom profile cards and their native identity treatments remain intact. Do not generalize this scoped suppression to profile popouts or other identity surfaces.

### Focus and motion

Keyboard focus uses a Frost outline (2px) with inset offset (-2px); forced-colors mode maps the outline to the system Highlight color. Reduced-motion and explicit animation opt-out behavior are inherited from shared sources. Preserve narrow, property-specific transitions and the shared reduced-motion guards.

## Do's and Don'ts

- **Do** reuse existing public tokens and prefix new project tokens with `--sibnight-`.
- **Do** preserve the Sibylla logo, North Polar name and Zelk/Midnight/Tokyo Night credits.
- **Do** edit sources and wrapper, then regenerate builds in the declared order.
- **Do** distinguish static checks, synthetic fixtures and actual Discord observations. Quality checks and six tests passed with audit reporting zero vulnerabilities at the latest checkpoint; 125 Chromium assertions and the local finish review pass; native observations and limits are recorded in docs/MAINTENANCE.md.
- **Don't** paint generic layer containers, hide unread state, remove focus or introduce global expensive transitions.
- **Don't** alter the eight other themes or claim compatibility with all current Discord clients from this implementation alone.
- **Don't** publish private conversations or screenshots as design examples. Historical concepts describe intent, not current rendered proof.
