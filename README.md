<p align="center">
  <img width="220" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.png" alt="Sibylla logo">
</p>

<h1 align="center">sibnight-discord</h1>

<p align="center">
  Thème Discord sombre inspiré par l'identité visuelle de Sibylla.
</p>

## À propos

**sibnight-discord** est un thème Discord personnalisé maintenu par **ussmarines**.
Le projet adapte une base existante à l'univers graphique de **Sibylla**.

## Installation

### BetterDiscord / Vencord

1. Télécharge `themes/sibnight.theme.css`
2. Place le fichier dans le dossier des thèmes Discord
3. Active le thème
4. Modifie les variables dans `themes/sibnight.theme.css` si tu veux personnaliser le rendu

### Import direct

```css
@import url("https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibnight.css");
```

## Structure utile

```text
assets/
  sibylla-logo.png
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

## Personnalisation

Les fichiers principaux à modifier sont :

- `themes/sibnight.theme.css` pour les variables exposées aux utilisateurs
- `src/colors.css` pour la palette
- `src/dms-button.css` pour le bouton des messages privés
- `build/sibnight.css` pour la version compilée utilisée par le thème



## Flavors

- `themes/flavors/sibnight-blue.css` : variante plus bleue, toujours dans l'univers sibnight
- `themes/flavors/sibnight-space.css` : variante plus spatiale, avec une nébuleuse bleue en fond

Ces fichiers peuvent être utilisés comme variantes prêtes à l'emploi.

## Crédits

- original design inspired by https://github.com/schnensch0/zelk
- theme design inspired by https://github.com/refact0r/midnight-discord
- window controls inspired by https://github.com/Dyzean/Tokyo-Night
