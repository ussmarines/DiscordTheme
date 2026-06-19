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

Cette révision prépare une base de release plus propre :
- pipeline de build simplifié
- artefacts de sortie alignés
- flavors conservées dans `themes/flavors`
- fichiers legacy retirés

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

- `npm run check` valide la structure, les flavors, les versions et les artefacts générés
- `npm run build` génère `build/sibnight.css` et `sibnight.css`
- `npm run dev` rebuild automatiquement vers des sorties locales définies dans `.env`
- `npm run serve` lance un serveur local pour l'injection navigateur

### Chargement navigateur local

Le fichier `scripts/sibnight-dev.user.js` permet de charger automatiquement le thème local dans Discord via un userscript, avec `npm run serve` lancé en parallèle.

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
  inject.js
  serve.js
  sibnight-dev.user.js
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

- `themes/sibnight.theme.css` : point d'entrée utilisateur
- `build/sibnight.css` : build compilé depuis `src/`
- `sibnight.css` : bundle distribuable complet
- `src/colors.css` : palette principale
- `src/main.css` : layout visuel principal
- `src/top-bar.css` : topbar, recherche et trailing buttons
- `src/dms-button.css` : bouton des messages privés

## Flavors

Les flavors importent `themes/sibnight.theme.css` puis remplacent uniquement la palette et les surfaces de design, pour garder la même base fonctionnelle et éviter que le thème principal reprenne le dessus.

- `themes/flavors/sibnight-flat.css` — variante full flat du thème Sibnight de base
- `themes/flavors/sibnight-sun.css` — variante Sibylla solaire plus flat
- `themes/flavors/sibnight-north-Polar.css` — variante Nord Polar Night flat
- `themes/flavors/sibnight-north-Snow.css` — variante Nord Snow Storm claire
- `themes/flavors/sibnight-north-Aurora.css` — variante Nord Aurora vive et colorée

## Crédits

- original design inspired by https://github.com/schnensch0/zelk
- theme design inspired by https://github.com/refact0r/midnight-discord
- window controls inspired by https://github.com/Dyzean/Tokyo-Night
