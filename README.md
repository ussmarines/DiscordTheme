<p align="center">
  <img width="220" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/sibylla-logo.png" alt="Sibnight Discord logo">
</p>

# sibnight-discord

**sibnight-discord** is a dark Discord theme maintained by **ussmarines** and styled around the Sibylla visual identity.

<img width="800" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/preview.png" alt="sibnight-discord preview">

<img width="800" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/screenshot1.png" alt="sibnight-discord screenshot 1">

<img width="800" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/screenshot2.png" alt="sibnight-discord screenshot 2">

<img width="800" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/screenshot3.png" alt="sibnight-discord screenshot 3">

## install

### BetterDiscord / Vencord

1. Download [`themes/sibnight.theme.css`](https://github.com/ussmarines/DiscordTheme/blob/main/themes/sibnight.theme.css)
2. Move the file to your Discord themes folder
3. Enable the theme
4. Edit the variables inside `themes/sibnight.theme.css` to customize it

### import URL

Use this URL in your theme imports:

```css
@import url("https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibnight.css");
```

## flavors

Preset variants are available in [`themes/flavors`](https://github.com/ussmarines/DiscordTheme/tree/main/themes/flavors):

- [background](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-background.theme.css)
- [catppuccin macchiato](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-catppuccin-macchiato.theme.css)
- [catppuccin mocha](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-catppuccin-mocha.theme.css)
- [lilypichu](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-lilypichu.theme.css)
- [nord](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-nord.theme.css)
- [rose pine](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-rose-pine.theme.css)
- [rose pine moon](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-rose-pine-moon.theme.css)
- [tokyo night](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-tokyo-night.theme.css)
- [vencord](https://github.com/ussmarines/DiscordTheme/blob/main/themes/flavors/sibnight-vencord.theme.css)

## project structure

- `themes/sibnight.theme.css` — main distributable theme file
- `build/sibnight.css` — compiled stylesheet imported by the theme
- `src/` — modular source files used to rebuild `build/sibnight.css`
- `themes/flavors/` — alternate presets
- `assets/` — preview images and theme assets

## local development

1. Install dependencies with `npm install`
2. Create a `.env` file in the project root
3. Point `DEV_OUTPUT_PATH` to your local Discord themes folder
4. Run `npm run dev`

Example:

```env
DEV_OUTPUT_PATH=C:\Users\USERNAME\AppData\Roaming\Vencord\themes\sibnight-dev.theme.css
```

## credits

- original design inspired by https://github.com/schnensch0/zelk
- theme design inspired by https://github.com/refact0r/midnight-discord
- window controls inspired by https://github.com/Dyzean/Tokyo-Night

## license

MIT. The original upstream attribution is preserved in [`LICENSE`](./LICENSE).
