<p align="center">
  <img width="220" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.svg" alt="Sibylla logo">
</p>

<h1 align="center">sibnight-discord</h1>

<p align="center">
  Thème Discord sombre inspiré par l'identité visuelle de Sibylla.
</p>

## À propos

**sibnight-discord** est un thème Discord personnalisé maintenu par **ussmarines**.
Le projet part d'une base stable, garde la structure native de Discord intacte, puis applique un habillage Sibylla propre et maintenable.

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

- `npm run check` valide la structure du projet et le pipeline de build
- `npm run build` génère les fichiers distribuables
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
```

## Fichiers principaux

- `themes/sibnight.theme.css` : variables exposées aux utilisateurs
- `src/colors.css` : palette principale
- `src/top-bar.css` : topbar, recherche et trailing buttons
- `src/dms-button.css` : bouton des messages privés
- `src/main.css` : layout visuel principal
- `build/sibnight.css` : build importé par le thème

## Flavors

Les flavors importent `themes/sibnight.theme.css` puis remplacent uniquement la palette et les surfaces de design, pour garder la même base fonctionnelle et éviter que le thème principal reprenne le dessus.

- `themes/flavors/sibnight-sun.css` — variante Sibylla solaire flat, recentrée sur le bleu nuit Sibylla et le vrai jaune du logo
- `themes/flavors/sibnight-space.css` — variante spatiale holographique, plus poussée sur les bots, embeds, MP et cartes
- `themes/flavors/sibnight-north-Polar.css` — version North / Polar Night en full flat design, sans ombres, avec une hiérarchie plus propre
- `themes/flavors/sibnight-north-Snow.css` — Snow Storm + Frost clair, plus net, plus lisible et sans ombres
- `themes/flavors/sibnight-north-Aurora.css` — Aurora dark par défaut, bâtie sur Polar Night + Aurora
- `themes/flavors/sibnight-north-Aurora-Dark.css` — version Aurora sombre
- `themes/flavors/sibnight-north-Aurora-Light.css` — version Aurora claire
- `themes/flavors/sibnight-flat.css` — variante du thème Sibnight de base en full flat design, sans ombres ni dégradés

## Crédits


- original design inspired by https://github.com/schnensch0/zelk
- theme design inspired by https://github.com/refact0r/midnight-discord
- window controls inspired by https://github.com/Dyzean/Tokyo-Night
