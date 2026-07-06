# CODEX Project Status - DiscordTheme / Sibnight

## Résumé du projet

Ce dépôt contient **Sibnight**, un thème Discord sombre inspiré par l'identité visuelle de Sibylla. Le projet publie un thème principal et des flavors installables séparément via fichiers `.theme.css`.

Le dépôt local est `D:\Program Files\Documents\GitHub\DiscordTheme`, sur la branche `main`, avec le remote `https://github.com/ussmarines/DiscordTheme.git`.

## Objectif du thème

Sibnight cherche à proposer une interface Discord sombre, lisible, élégante et personnalisable, avec des surfaces navy profondes, des accents Sibylla, des notifications visibles et des flavors cohérentes. L'objectif qualité est de garder un thème professionnel sans casser les surfaces Discord critiques.

## Ce que je comprends du projet et des règles passées

- Le projet est un thème Discord nommé **Sibnight**.
- L'auteur principal doit rester **ussmarines**.
- Les crédits légitimes doivent rester présents et propres :
  - design original inspiré de `schnensch0/zelk` ;
  - conception du thème inspirée de `refact0r/midnight-discord` ;
  - contrôles de fenêtre inspirés de `Dyzean/Tokyo-Night`.
- `refact0r` ne doit pas être déclaré comme auteur principal.
- Les références à `midnight` sont légitimes dans les crédits, mais ne doivent pas remplacer le nom du thème ou du projet quand il faut dire `sibnight`.
- Les notifications, pings, badges, mentions, unread bars, boutons, menus, popovers, modals, paramètres, membres et DMs doivent rester lisibles.
- Le flavor `space` a déjà eu un problème critique où Discord n'affichait plus que le fond. Il faut continuer à vérifier qu'il ne peint pas `layerContainer` ou une couche pleine fenêtre qui masquerait l'interface.
- Le README doit rester en français, lister uniquement les flavors réels et pointer vers des fichiers existants.
- Ne pas créer de flavor artificiel comme `sibnight-north-Aurora.css`.
- Ne pas faire de refonte artistique complète sans raison solide.
- Ne pas faire de commit, push, PR, merge ou modification GitHub depuis Codex.

## Structure du dépôt

- `.github/workflows/classUpdate.yml` : workflow de mise à jour des classes Discord, avec build et check.
- `assets/` : logo Sibylla et images de preview README.
- `build/` : CSS généré pour publication.
- `scripts/` : scripts Node de build, dev et vérification.
- `src/` : modules CSS sources.
- `themes/` : wrappers `.theme.css` installables.
- `themes/flavors/` : wrappers `.theme.css` des flavors.

## Fichiers importants

- `themes/sibnight.theme.css` : thème principal installable.
- `build/sibnight.css` : build généré du thème principal.
- `build/sibnight-flavor.css` : build généré partagé par les flavors.
- `src/colors.css` : tokens Discord, palettes, notifications et états.
- `src/main.css` : surfaces principales, layout, profils et polish visuel.
- `src/flavor-base.css` : socle commun des flavors.
- `src/hardening.css` : garde-fous chargés en dernier.
- `scripts/check.js` : validation principale du dépôt.
- `scripts/lib/build-theme.js` : ordre des sources CSS et génération.
- `README.md` : documentation publique.
- `package.json` : scripts npm et métadonnées locales.

## Thèmes et flavors réels

Thème principal :

- `themes/sibnight.theme.css`

Flavors réels :

- `themes/flavors/sibnight-flat.theme.css`
- `themes/flavors/sibnight-tokyo-night.theme.css`
- `themes/flavors/sibnight-sun.theme.css`
- `themes/flavors/sibnight-space.theme.css`
- `themes/flavors/sibnight-north-polar.theme.css`
- `themes/flavors/sibnight-north-snow.theme.css`
- `themes/flavors/sibnight-north-aurora-dark.theme.css`
- `themes/flavors/sibnight-north-aurora-light.theme.css`

## Assets et previews

Assets suivis :

- `assets/sibylla-logo.svg`
- `assets/readme/mockup-base-theme.png`
- `assets/readme/mockup-flat.png`
- `assets/readme/mockup-tokyo-night.png`
- `assets/readme/mockup-sun.png`
- `assets/readme/mockup-space.png`
- `assets/readme/mockup-north-polar.png`
- `assets/readme/mockup-north-snow.png`
- `assets/readme/mockup-north-aurora-dark.png`
- `assets/readme/mockup-north-aurora-light.png`

Le README doit continuer à référencer uniquement ces previews existantes.

## Pipeline de build et vérification

Scripts npm :

- `npm run build` : régénère `build/sibnight.css` et `build/sibnight-flavor.css`.
- `npm run check` : vérifie structure, métadonnées, imports, crédits, flavors, README, budgets CSS et freshness des builds.
- `npm run dev` : watch local vers un chemin `DEV_OUTPUT_PATH` défini dans `.env`.
- `npm run prepare:release` : exécute build puis check.

## Garde-fous importants

- Les flavors importent directement `https://ussmarines.github.io/DiscordTheme/build/sibnight-flavor.css`.
- `themes/sibnight.theme.css` importe `https://ussmarines.github.io/DiscordTheme/build/sibnight.css`.
- `scripts/check.js` protège les crédits, l'auteur, les imports, les paths README, les flavors attendus, les variables de notification des flavors, les budgets `:has()` et les sélecteurs partiels.
- `scripts/check.js` protège spécifiquement `sibnight-space.theme.css` contre les règles de background sur `layerContainer`.
- `src/animations.css` contient un bloc `@media (prefers-reduced-motion: reduce)`.
- `src/hardening.css` doit rester petit et chargé en dernier.

## Points d'attention CSS

- Discord change souvent ses classes hashées. Le workflow `classUpdate` peut modifier `src` et `themes/flavors`.
- Les sélecteurs `:has()` et `[class*='...']` sont parfois nécessaires, mais doivent rester budgétés.
- Éviter `transition: all`, `will-change: scroll-position`, `overscroll-behavior: contain` hors modals et sélecteurs globaux trop larges.
- Les règles `display: none` doivent rester limitées à des éléments décoratifs ou explicitement voulus.
- Les notifications et unread states doivent conserver un contraste fort.
- Les flavors light doivent préserver la lisibilité texte, badges et mentions.

## Suppressions recommandées mais non appliquées

Aucune suppression appliquée pendant cette passe. Les dossiers locaux vides `.agents`, `.codex` et `archive` ne sont pas suivis par Git et ne contiennent pas de fichiers au moment de l'audit. `node_modules/` est ignoré par Git.

## Commandes de référence

```bash
npm run build
npm run check
npm run prepare:release
git status --short --branch
git diff --stat
```

## Tests manuels à faire dans Discord

- Installer `themes/sibnight.theme.css` et vérifier chat, sidebar, membres, DMs, paramètres, popovers, modals et profils.
- Tester chaque flavor réel.
- Vérifier surtout `sibnight-space` sur les modals, popovers, menus, profil utilisateur et settings.
- Vérifier mentions, pings, unread bars, badges et new messages bar.
- Tester un écran étroit avec top bar et window controls.

## Dernier état connu Codex

- `npm run check` passait avant modifications.
- Le dépôt était propre avant modifications.
- Les crédits étaient présents dans README, thème principal et flavors.
- Après cette passe, `npm run prepare:release`, `npm audit --audit-level=moderate` et `git diff --check` passent.
- Aucun commit, push, PR ou changement GitHub n'a été effectué par Codex.
