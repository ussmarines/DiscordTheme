# Changelog

## 1.0.0 — 2026-06-17

### Added

- Nouveau thème par défaut : **Sibylla Midnight**.
- Build runtime self-hosted : `build/sibylla.css`.
- Thème installable : `themes/sibylla.theme.css`.
- Alias flavor Sibylla : `themes/flavors/sibylla.theme.css`.
- Icône DM hébergée dans le repo : `assets/icons/sibylla-moon.svg`.
- Scripts `npm run build`, `npm run check`, `npm run verify`.
- Workflow GitHub Actions de vérification.

### Changed

- Les imports runtime pointent vers `raw.githubusercontent.com/ussmarines/DiscordTheme`.
- Le thème par défaut utilise désormais la palette Sibylla.
- La DA passe sur une palette Sibylla : noir/bleu profond, cyan, bleu clair, doré.

### Removed

- Suppression de l’ancienne flavor.
- Suppression des fichiers hérités de l’ancienne flavor.
- Suppression des imports runtime vers le GitHub d'origine.
