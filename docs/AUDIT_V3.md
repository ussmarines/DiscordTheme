# Audit V3 — Correction écran vide Vencord

## Diagnostic

Le fichier `themes/sibylla.theme.css` de la V2 ne contenait que le bloc metadata et un `@import` vers `build/sibylla.css`.

Problèmes identifiés :

1. **Dépendance runtime fragile**
   - Si l'import distant échoue, le thème principal ne contient aucun style utile.
   - Vencord Online Themes peut être plus sensible aux imports chaînés.

2. **Flavor inutile**
   - `themes/flavors/sibylla.theme.css` était une copie du thème principal.
   - Le dossier `themes/flavors/` n'a plus d'intérêt tant qu'il n'y a pas de vraie variante.

3. **Base Midnight incomplète**
   - Le repo de référence Midnight utilise un build central beaucoup plus large.
   - La V2 recréait une partie du design, mais pas la base complète.

4. **Risque de couche visuelle couvrante**
   - Les pseudo-éléments fixes `#app-mount::before` et `#app-mount::after` ont été retirés.
   - Même avec `pointer-events:none`, ce type d'overlay est évité dans la V3.

## Corrections

- `themes/sibylla.theme.css` est maintenant autoportant.
- `build/sibylla.css` reste disponible pour développement, mais n'est plus importé par le thème final.
- `themes/flavors/` est supprimé.
- Le script `build.js` ne génère plus de flavor.
- `check.js` bloque :
  - les imports runtime ;
  - les références Nord ;
  - les imports vers `refact0r`;
  - le dossier `themes/flavors`;
  - les overlays fixes à risque.

## Prochaine étape

Tester cette V3 dans Vencord avec :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
```
