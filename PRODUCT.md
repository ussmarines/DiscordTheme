# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Discord desktop users. The owner prioritizes reading, long discussions and voice conversations, as confirmed on 24 October 2026.

## Product Purpose

North Polar is an installable CSS theme for Discord. It changes presentation while preserving Discord's navigation, content, commands and interaction semantics.

## Operating Context

The current validation environment is Discord desktop with Vencord on Windows. Theme Lab provides demonstration messages for private visual validation. Real client observations and synthetic CSS checks are recorded separately.

## Capabilities and Constraints

- Rebuild the shared principal theme structure and controls, as explicitly requested after the first delivery was rejected for insufficient fidelity. North Polar remains the palette skin and the only current visual validation target. Keep all nine assets/build contracts; other variants are not visually validated in this pass, at the owner's request.
- Preserve unread/mention indicators, native voice controls, keyboard focus, reduced motion and custom profile semantics.
- Preserve the current call and draft during read-only visual inspection. Sending messages or changing calls requires a specific authorized test.
- Do not introduce remote resources, scripts, telemetry or third-party code.
- Camera is unavailable in the current client; BetterDiscord runtime and Windows accessibility modes are not validated here.

## Brand Commitments

The user requires a dark theme using the official Nord colors: Polar Night, Snow Storm, Frost and Aurora. The authoritative palette is https://www.nordtheme.com/docs/colors-and-palettes/.

The North Polar name, Sibylla logo and Zelk/Midnight/Tokyo Night credits remain. Public maintainer identity is ussmarines.

The owner selected Cabinet de lecture and the comp-led build path on 24 October 2026. The selected decision comp is `.impeccable/mocks/decision/assigned.png`; The owner explicitly approved reference-desk with the connected-user block from assigned.png after the composition round.

Use a coherent original SVG icon family. Keep the native threads action beside notifications and pins where Discord provides it; CSS must not invent an inert action or replace accessible labels. The owner authorized either Rune Icons or original artwork; original local SVG avoids an added runtime dependency.

## Evidence on Hand

Existing CSS sources, wrappers, generated builds, demonstration messages and historical mockups. Historical mockups are not proof of the current Discord rendering. Private conversations must not enter public previews.

## Product Principles

- Sustained reading and voice use lead visual decisions.
- Native functions remain immediately recognizable.
- State and hierarchy must remain clear without relying only on color.
- The redesign must be visibly comprehensive, rather than described as a redesign after only local fixes.
- Validation reports distinguish rendered evidence from source analysis and synthetic checks.
- Base Discord functions must stay visible and reachable. Record read-only checks per function and distinguish unavailable or unexecuted operations; do not claim every Discord feature works from screenshots alone.
