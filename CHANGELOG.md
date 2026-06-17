# Changelog

## 1.3.0 — V6 stabilized

- Fixed the remaining blank Discord screen issue by removing the opaque app background from `.bg__960e4`.
- `.bg__960e4` now stays transparent, pointer-events-free, and behind the app content.
- Added a strict check that prevents `.bg__960e4` from painting a foreground background again.
- Added a strict check against risky global `body:has(*) *` selectors.
- Preserved the Midnight-style architecture: installable theme imports a self-hosted build file, while user-facing options stay in `themes/sibylla.theme.css`.
- Kept all runtime GitHub imports under `ussmarines/DiscordTheme`.

## 1.2.0 — V5 debugged

- Fixed critical Discord invisibility regression: `.wrapper_ef3116` is no longer hidden.
- Added strict safety checks for critical Discord containers.
- Added dedicated settings-page color layer for Discord, Vencord, and BetterDiscord settings.
- Kept Midnight-style build workflow while removing all flavors.
- Kept all runtime imports self-hosted in `ussmarines/DiscordTheme`.
