# Sibylla Midnight

Thème Discord custom pour **Vencord** et **BetterDiscord**.

Cette V3 corrige le problème de l'écran vide rencontré avec la V2 :

- le thème principal est maintenant **autoportant** ;
- il n'y a plus de `@import` runtime ;
- le dossier `themes/flavors/` est supprimé ;
- le flavor Sibylla dupliqué est supprimé ;
- les couches décoratives fixes de la V2 sont supprimées pour éviter de couvrir l'interface ;
- les styles destructifs de layout ont été remplacés par une couche visuelle plus sûre.

## Installation Vencord

Utilise directement ce lien dans **Online Themes** après avoir push le repo :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
```

## Installation BetterDiscord

Copie ce fichier dans le dossier des thèmes BetterDiscord :

```text
themes/sibylla.theme.css
```

## Structure

```text
DiscordTheme/
├─ themes/
│  └─ sibylla.theme.css
├─ build/
│  └─ sibylla.css
├─ src/
│  ├─ header-sibylla.txt
│  └─ sibylla.css
├─ scripts/
│  ├─ build.js
│  ├─ check.js
│  └─ cleanup-legacy.js
├─ assets/
│  └─ icons/
│     └─ sibylla-moon.svg
├─ docs/
│  └─ AUDIT_V3.md
├─ CHANGELOG.md
├─ NOTICE.md
├─ LICENSE
├─ package.json
└─ README.md
```

## Commandes

```bash
npm run cleanup:legacy
npm run build
npm run check
npm run verify
```

## Notes

Le thème garde une direction artistique Sibylla : noir bleuté, cyan, bleu clair, doré, panneaux sombres et ambiance corporate sci-fi.

La V3 privilégie la stabilité. Les effets plus agressifs pourront être réintroduits plus tard, un par un, après test dans Vencord.
