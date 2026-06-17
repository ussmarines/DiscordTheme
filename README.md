# DiscordTheme — Sibylla Midnight

Thème Discord custom pour **Vencord** et **BetterDiscord**.

Cette version remplace l’ancienne base par une direction artistique **Sibylla** : interface sombre bleu/noir, accents cyan, touches dorées, panneaux sci-fi/corporate, bordures lumineuses et contraste renforcé.

## Important

Les fichiers installables n'appellent plus le GitHub d'origine du thème Midnight.

Le thème public appelle uniquement ce repo :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/build/sibylla.css
```

## Installation

### BetterDiscord

1. Copie ce fichier dans le dossier des thèmes BetterDiscord :

```text
themes/sibylla.theme.css
```

2. Active **Sibylla Midnight**.

### Vencord — Online Theme

Après avoir push le repo sur GitHub, ajoute ce lien dans Vencord :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
```

### Vencord / BetterDiscord — Flavor alias

Un alias existe aussi ici :

```text
themes/flavors/sibylla.theme.css
```

Il pointe vers le même build self-hosted.

## Structure

```text
DiscordTheme/
├─ themes/
│  ├─ sibylla.theme.css
│  └─ flavors/
│     └─ sibylla.theme.css
├─ build/
│  └─ sibylla.css
├─ src/
│  ├─ base/
│  │  └─ layout.css
│  ├─ options/
│  │  └─ settings.css
│  ├─ theme/
│  │  └─ sibylla.css
│  ├─ fixes/
│  │  └─ compat.css
│  └─ header-sibylla.txt
├─ assets/
│  └─ icons/
│     └─ sibylla-moon.svg
├─ scripts/
│  ├─ build.js
│  └─ check.js
├─ .github/workflows/check.yml
├─ CHANGELOG.md
├─ NOTICE.md
├─ LICENSE
├─ package.json
└─ README.md
```

## Développement

Reconstruire le thème :

```bash
npm run build
```

Vérifier le thème :

```bash
npm run check
```

Tout vérifier :

```bash
npm run verify
```

Le script de vérification contrôle notamment :

- absence d'import runtime vers le GitHub d'origine ;
- absence de fichiers ou références à l’ancienne flavor ;
- présence de l'icône DM hébergée dans ce repo ;
- équilibre basique des accolades, parenthèses et crochets CSS.

## Palette Sibylla

```css
--sibylla-bg-0: #04040b;
--sibylla-bg-2: #0a0f18;
--sibylla-text: #dbe8ff;
--sibylla-blue: #37b4ff;
--sibylla-blue-2: #4da3ff;
--sibylla-cyan: #40e0ff;
--sibylla-gold: #fbc900;
--sibylla-red: #ff4d6d;
```

## Crédit

Cette V1 part de l'esprit et de l'organisation du thème Midnight, mais les fichiers runtime de ce repo sont maintenant self-hosted pour le projet `ussmarines/DiscordTheme`.

Voir `NOTICE.md` et `LICENSE`.
