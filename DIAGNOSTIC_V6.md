# Diagnostic V6 — écran Discord vide

## Symptôme

Discord charge le fond du thème, mais l’interface complète reste invisible.

## Cause principale identifiée

La V5 appliquait le fond principal sur `.bg__960e4` en même temps que sur `#app-mount`, `.appMount__51fd7` et `.app__160d8`.

Sur certaines versions de Discord/Vencord, `.bg__960e4` peut se comporter comme une couche visuelle placée devant ou au-dessus d’une partie de l’interface. Avec un background opaque en `!important`, cette couche peut masquer toute l’UI.

## Correction V6

- Le fond principal est appliqué uniquement sur `#app-mount` et `.appMount__51fd7`.
- `.app__160d8` reste transparent pour ne pas créer une couche opaque supplémentaire.
- `.bg__960e4` est forcé en transparent, sans événements souris, et placé derrière le contenu.
- Les couches Discord critiques gardent `position: relative` et `z-index: 1`.

## Garde-fous ajoutés

`scripts/check.js` bloque maintenant :

- `display: none`, `visibility: hidden`, `opacity: 0` sur les conteneurs critiques ;
- background opaque sur `.bg__960e4` ;
- `z-index` positif ou neutre sur `.bg__960e4` ;
- sélecteurs globaux dangereux de type `body:has(*) *`.

## Test

Commande validée :

```bash
npm run verify
```

Résultat attendu :

```text
Built build/sibylla.css
Built themes/sibylla.theme.css
All checks passed.
```
