<img width="800" alt="Sibylla Midnight" src="https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/assets/preview.svg">

# Sibylla Midnight

Thème Discord custom pour **Vencord** et **BetterDiscord**, basé sur l'architecture du projet `refact0r/midnight-discord`, puis adapté à la direction artistique de **Sibylla Corporation**.

Cette V4 reprend le fonctionnement complet de Midnight :

- fichier installable dans `themes/` ;
- build compilé dans `build/` ;
- modules CSS séparés dans `src/` ;
- scripts de développement `dev`, `serve`, `build` ;
- loader navigateur `scripts/inject.js` ;
- variables de personnalisation dans le fichier `.theme.css` ;
- compatibilité Vencord et BetterDiscord ;
- aucun flavor conservé.

## Installation

### Vencord / BetterDiscord — fichier local

1. Télécharge ou clone ce repo.
2. Copie ce fichier dans ton dossier de thèmes :

```text
themes/sibylla.theme.css
```

3. Active le thème dans Vencord ou BetterDiscord.

### Vencord — Online Theme

Après avoir push le repo sur GitHub, ajoute ce lien dans Vencord :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
```

Le fichier installable importe uniquement le build hébergé sur ce repo :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css
```

## Structure

```text
DiscordTheme/
├─ assets/
│  └─ icons/
│     └─ sibylla-mark.svg
├─ build/
│  └─ sibylla.css
├─ scripts/
│  ├─ build.js
│  ├─ check.js
│  ├─ clean-flavors.js
│  ├─ dev.js
│  ├─ inject.js
│  └─ serve.js
├─ src/
│  ├─ main.css
│  ├─ colors.css
│  ├─ animations.css
│  ├─ background-image.css
│  ├─ chatbar.css
│  ├─ dms-button.css
│  ├─ top-bar.css
│  ├─ transparency-blur.css
│  ├─ user-panel.css
│  ├─ window-controls.css
│  └─ sibylla.css
├─ test/
│  └─ smoke-check.md
├─ themes/
│  └─ sibylla.theme.css
├─ BROWSER_DEV.md
├─ CHANGELOG.md
├─ CONTRIBUTING.md
├─ LICENSE
├─ NOTICE.md
├─ package.json
└─ README.md
```

## Développement

Installer les dépendances :

```bash
npm install
```

Compiler le build :

```bash
npm run build
```

Vérifier la structure et les imports :

```bash
npm run check
```

Build + check :

```bash
npm run verify
```

Mode dev local, comme Midnight :

1. Crée un fichier `.env` à la racine.
2. Ajoute le chemin vers ton thème local Discord :

```text
DEV_OUTPUT_PATH=C:\Users\USERNAME\AppData\Roaming\Vencord\themes\sibylla-dev.theme.css
```

3. Lance :

```bash
npm run dev
```

## Serveur de test navigateur

```bash
npm run serve
```

Puis dans Discord ouvert dans un navigateur / DevTools :

```js
fetch('http://127.0.0.1:8765/inject.js').then(r => r.text()).then(eval)
```

## Personnalisation

Les options principales sont dans :

```text
themes/sibylla.theme.css
```

La DA Sibylla est dans :

```text
src/sibylla.css
```

Les couleurs principales sont dans le bloc `:root` de :

```text
themes/sibylla.theme.css
```

## Crédits

Ce projet est basé sur l'architecture et le fonctionnement de :

- `refact0r/midnight-discord`

Le projet original est sous licence MIT. Les crédits sont conservés dans `NOTICE.md` et la licence dans `LICENSE`.
