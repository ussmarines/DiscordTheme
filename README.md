# Sibylla Midnight

Thème Discord custom pour Vencord et BetterDiscord, basé sur l'architecture de `refact0r/midnight-discord` et remplacé par une identité visuelle Sibylla.

## Installation Vencord

Utilise ce lien dans **Settings → Vencord → Themes → Online Themes** :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
```

## Installation BetterDiscord

Télécharge `themes/sibylla.theme.css` et place-le dans le dossier `themes` de BetterDiscord.

## Structure

```text
themes/sibylla.theme.css   # fichier installable
build/sibylla.css          # build généré depuis src/
src/*.css                  # modules du thème
scripts/build.js           # génère build + thème
scripts/check.js           # vérifie les imports, flavors, règles dangereuses
scripts/dev.js             # workflow local type Midnight
scripts/serve.js           # serveur de dev local
scripts/inject.js          # injection devtools
assets/icons/              # icônes auto-hébergées
```

## Commandes

```bash
npm install
npm run build
npm run check
npm run verify
```

## Notes importantes

- Aucun flavor n'est conservé.
- Aucun import runtime ne pointe vers `refact0r.github.io` ou `raw.githubusercontent.com/refact0r`.
- Les crédits MIT de Midnight sont conservés dans `NOTICE.md` et `LICENSE`.
- Le check bloque désormais les règles qui masquent les conteneurs critiques de Discord, notamment `.wrapper_ef3116`.
