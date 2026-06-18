# sibnight-discord 2.9.0

## Objectif

Nettoyage interne complet à partir de la build stable `2.8.2`, sans modifier le rendu validé.

## Changements

- suppression de `CLEANUP_NOTES.md`
- ajout de `.editorconfig`
- pipeline de build simplifié et rendu plus explicite
- ordre des fichiers source déclaré clairement dans `scripts/lib/build-theme.js`
- validation projet ajoutée avec `npm run check`
- `README.md` réécrit pour documenter le flux de build et la structure actuelle
- métadonnées harmonisées :
  - thème principal `2.9.0`
  - flavors `1.1.0`

## Garanties visées

- aucun override structurel nouveau
- aucun changement volontaire du layout validé
- aucune retouche CSS risquée sur les sidebars, la topbar ou le panneau droit
