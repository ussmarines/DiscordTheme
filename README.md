# DiscordTheme — Midnight Nord Base V1

Base de travail pour un thème Discord custom compatible **Vencord** et **BetterDiscord**.

Cette V1 reprend le comportement du flavor **midnight (nord)** de refact0r : même import du build Midnight, mêmes variables principales, même design Nord, mêmes options de customisation.

## Installation rapide

### BetterDiscord

1. Ouvre les paramètres BetterDiscord.
2. Va dans **Themes**.
3. Clique sur **Open Themes Folder**.
4. Copie le fichier suivant dans le dossier :

```text
themes/flavors/midnight-nord.theme.css
```

5. Active le thème dans BetterDiscord.

### Vencord — thème local

1. Ouvre les paramètres Vencord.
2. Va dans **Themes**.
3. Active les thèmes locaux si nécessaire.
4. Copie le fichier suivant dans ton dossier de thèmes :

```text
themes/flavors/midnight-nord.theme.css
```

5. Recharge Discord puis active le thème.

### Vencord — Online Theme

Quand le repo GitHub est à jour, tu peux utiliser ce lien :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/flavors/midnight-nord.theme.css
```

## Structure

```text
DiscordTheme/
├─ themes/
│  ├─ midnight.theme.css
│  └─ flavors/
│     └─ midnight-nord.theme.css
├─ build/
│  └─ midnight-nord.css
├─ src/
│  ├─ base/
│  │  └─ import.css
│  ├─ options/
│  │  └─ settings.css
│  ├─ flavors/
│  │  └─ nord.css
│  └─ header-midnight-nord.txt
├─ scripts/
│  ├─ build.js
│  └─ check.js
├─ assets/
│  └─ README.md
├─ CHANGELOG.md
├─ NOTICE.md
├─ LICENSE
├─ package.json
└─ README.md
```

## Modification du thème

La version installable est générée depuis les fichiers dans `src/`.

Pour modifier les options globales :

```text
src/options/settings.css
```

Pour modifier les couleurs Nord :

```text
src/flavors/nord.css
```

Pour reconstruire les fichiers installables :

```bash
npm run build
npm run check
```

## Objectif de cette V1

Cette version sert de base saine avant une future variante **Sibylla**.

Elle doit rester proche du thème Midnight Nord original pour faciliter les tests :

- même import central `midnight.css` ;
- même layout sombre ;
- mêmes panneaux espacés ;
- mêmes options de top bar ;
- mêmes contrôles de fenêtre custom ;
- même icône DM lune ;
- même petite zone utilisateur ;
- même palette Nord.

## Crédits

Basé sur le projet original :

- midnight-discord par refact0r
- Flavor Nord basé sur Nord Theme

Le projet original est sous licence MIT. Voir `NOTICE.md` et `LICENSE`.
