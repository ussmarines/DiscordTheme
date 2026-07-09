<p align="center">
  <img width="220" src="./assets/sibylla-logo.svg" alt="Sibylla logo">
</p>

<h1 align="center">sibnight</h1>

<p align="center">
  A dark Discord theme inspired by Sibylla's visual identity.
</p>

<p align="center">
  <img src="./assets/readme/mockup-base-theme.png" alt="Base Sibnight theme preview">
</p>

## Installation

### File installation

For **Vencord**, **BetterDiscord**, or any other client that supports theme files:

1. Download `themes/sibnight.theme.css`.
2. Place the file in your Discord client's themes folder.
3. Enable **sibnight** in your client settings.

### Link installation

Add this link to your client's theme imports:

```text
https://ussmarines.github.io/DiscordTheme/themes/sibnight.theme.css
```

To customize the theme, copy the theme variables into your **QuickCSS**, then edit the values there.

## Flavors

Flavors are predefined variants of **sibnight**. Each flavor is a standalone `.theme.css` file that imports the shared base `build/sibnight-flavor.css`.

To use a flavor, install the matching file from `themes/flavors/` instead of the main theme.

<table>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-flat.theme.css">
        <img src="./assets/readme/mockup-flat.png" alt="sibnight-flat preview">
      </a>
      <br>
      <strong>sibnight-flat</strong>
      <br>
      <code>themes/flavors/sibnight-flat.theme.css</code>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-tokyo-night.theme.css">
        <img src="./assets/readme/mockup-tokyo-night.png" alt="sibnight-tokyo-night preview">
      </a>
      <br>
      <strong>sibnight-tokyo-night</strong>
      <br>
      <code>themes/flavors/sibnight-tokyo-night.theme.css</code>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-sun.theme.css">
        <img src="./assets/readme/mockup-sun.png" alt="sibnight-sun preview">
      </a>
      <br>
      <strong>sibnight-sun</strong>
      <br>
      <code>themes/flavors/sibnight-sun.theme.css</code>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-space.theme.css">
        <img src="./assets/readme/mockup-space.png" alt="sibnight-space preview">
      </a>
      <br>
      <strong>sibnight-space</strong>
      <br>
      <code>themes/flavors/sibnight-space.theme.css</code>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-north-polar.theme.css">
        <img src="./assets/readme/mockup-north-polar.png" alt="sibnight-north-polar preview">
      </a>
      <br>
      <strong>sibnight-north-polar</strong>
      <br>
      <code>themes/flavors/sibnight-north-polar.theme.css</code>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-north-snow.theme.css">
        <img src="./assets/readme/mockup-north-snow.png" alt="sibnight-north-snow preview">
      </a>
      <br>
      <strong>sibnight-north-snow</strong>
      <br>
      <code>themes/flavors/sibnight-north-snow.theme.css</code>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-north-aurora-dark.theme.css">
        <img src="./assets/readme/mockup-north-aurora-dark.png" alt="sibnight-north-aurora-dark preview">
      </a>
      <br>
      <strong>sibnight-north-aurora-dark</strong>
      <br>
      <code>themes/flavors/sibnight-north-aurora-dark.theme.css</code>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="./themes/flavors/sibnight-north-aurora-light.theme.css">
        <img src="./assets/readme/mockup-north-aurora-light.png" alt="sibnight-north-aurora-light preview">
      </a>
      <br>
      <strong>sibnight-north-aurora-light</strong>
      <br>
      <code>themes/flavors/sibnight-north-aurora-light.theme.css</code>
    </td>
  </tr>
</table>

## Remote import links

```text
https://ussmarines.github.io/DiscordTheme/themes/sibnight.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-flat.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-tokyo-night.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-sun.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-space.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-north-polar.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-north-snow.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-north-aurora-dark.theme.css
https://ussmarines.github.io/DiscordTheme/themes/flavors/sibnight-north-aurora-light.theme.css
```

## Development

The project keeps two generated CSS files:

- `build/sibnight.css` for the main theme.
- `build/sibnight-flavor.css` for flavors, with their shared base.

Useful commands:

```bash
npm run build
npm run check
npm run prepare:release
```

Run `npm run build` after changing CSS sources, then `npm run check` before publishing. `npm run prepare:release` runs both steps in the correct order.

## Structure

- `themes/sibnight.theme.css`: main file to install.
- `themes/flavors/`: `.theme.css` files for the eight existing flavors.
- `src/`: source CSS modules used to generate the build.
- `build/`: generated CSS published through GitHub Pages.
- `assets/readme/`: screenshots used in this README.
- `scripts/`: Node scripts for build, development, and checks.

## Credits

- Original design inspired by [Zelk](https://github.com/schnensch0/zelk).
- Theme design inspired by [Midnight](https://github.com/refact0r/midnight-discord).
- Window controls inspired by [Tokyo Night](https://github.com/Dyzean/Tokyo-Night).

The main author of this project is **ussmarines**.
