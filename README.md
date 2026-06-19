<p align="center">
  <img width="220" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.svg" alt="Sibylla logo">
</p>

<h1 align="center">sibnight-discord</h1>

<p align="center">
  Thème Discord sombre inspiré par l'identité visuelle de Sibylla.
</p>

## À propos

**sibnight-discord** est un thème Discord personnalisé maintenu par **ussmarines**.
Le projet garde la structure native de Discord intacte, puis applique un habillage Sibylla propre, stable et maintenable.

## Installation

### BetterDiscord / Vencord

1. Télécharge `themes/sibnight.theme.css`
2. Place le fichier dans ton dossier de thèmes Discord
3. Active le thème
4. Ajuste les variables dans `themes/sibnight.theme.css` si tu veux personnaliser le rendu

### Import direct

```css
@import url("https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibnight.css");
```

## Développement

```bash
npm install
npm run check
npm run build
npm run dev
npm run serve
```

- `npm run check` valide la structure, la synchro des versions et l'état des builds
- `npm run build` génère `build/sibnight.css` et `sibnight.css`
- `npm run dev` rebuild automatiquement vers des sorties locales définies dans `.env`
- `npm run serve` lance un serveur local pour l'injection navigateur

## Structure du projet

```text
assets/
  sibylla-logo.svg
build/
  sibnight.css
scripts/
  build.js
  check.js
  dev.js
  serve.js
  lib/
src/
  animations.css
  background-image.css
  chatbar.css
  colors.css
  dms-button.css
  main.css
  top-bar.css
  transparency-blur.css
  user-panel.css
  window-controls.css
themes/
  sibnight.theme.css
  flavors/
sibnight.css
```

## Fichiers principaux

- `themes/sibnight.theme.css` : variables exposées aux utilisateurs
- `src/colors.css` : palette principale
- `src/main.css` : layout visuel principal
- `src/top-bar.css` : topbar, recherche et trailing buttons
- `src/dms-button.css` : bouton des messages privés
- `build/sibnight.css` : build importé par le thème
- `sibnight.css` : bundle complet prêt à distribuer

## Flavors

Les flavors importent `themes/sibnight.theme.css` puis remplacent uniquement la palette et les surfaces de design.

- `themes/flavors/sibnight-flat.css`
- `themes/flavors/sibnight-space.css`
- `themes/flavors/sibnight-sun.css`
- `themes/flavors/sibnight-north-Polar.css`
- `themes/flavors/sibnight-north-Snow.css`
- `themes/flavors/sibnight-north-Aurora-Dark.css`
- `themes/flavors/sibnight-north-Aurora-Light.css`
- `themes/flavors/sibnight-tokyo-night.css`

## Crédits

- original design inspired by https://github.com/schnensch0/zelk
- theme design inspired by https://github.com/refact0r/midnight-discord
- window controls inspired by https://github.com/Dyzean/Tokyo-Night
