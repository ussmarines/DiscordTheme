<p align="center">
  <img width="220" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.svg" alt="Sibylla logo">
</p>

<h1 align="center">sibnight-discord</h1>

<p align="center">
  Thème Discord sombre inspiré par l'identité visuelle de Sibylla.
</p>

## À propos

**sibnight-discord** est un thème Discord personnalisé maintenu par **ussmarines**.
Le projet reprend une base existante, la réoriente vers l'univers graphique de **Sibylla**, et propose plusieurs variantes prêtes à l'emploi.

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

## Structure du projet

```text
assets/
  sibylla-logo.svg
build/
  sibnight.css
src/
  colors.css
  dms-button.css
  main.css
  top-bar.css
  window-controls.css
themes/
  sibnight.theme.css
  flavors/
```

## Fichiers principaux

- `themes/sibnight.theme.css` : variables exposées aux utilisateurs
- `src/colors.css` : palette principale
- `src/dms-button.css` : bouton des messages privés
- `build/sibnight.css` : build utilisé par le thème
- `themes/flavors/` : variantes prêtes à l'emploi

## Flavors

- `themes/flavors/sibnight-blue.css` : variante plus bleue, toujours dans l'univers Sibylla
- `themes/flavors/sibnight-space.css` : variante plus spatiale avec une nébuleuse bleue
- `themes/flavors/sibnight-sun.css` : copie de la version chaude du thème principal
- `themes/flavors/sibnight-north-Polar.css` : variante Nord basée sur Polar Night
- `themes/flavors/sibnight-north-Snow.css` : variante Nord basée sur Snow Storm
- `themes/flavors/sibnight-north-Aurora.css` : variante Nord basée sur Aurora

## Personnalisation

Tu peux modifier directement les variables CSS pour changer :

- les couleurs
- les accents
- l'image de fond
- l'apparence du bouton MP
- les espacements et bordures

## Crédits

- original design inspired by https://github.com/schnensch0/zelk
- theme design inspired by https://github.com/refact0r/midnight-discord
- window controls inspired by https://github.com/Dyzean/Tokyo-Night
