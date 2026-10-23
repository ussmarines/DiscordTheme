# Checkpoint Sibnight

- Base : main `66270cc`, après fusion de la PR #13 et vérification exacte des 11 CSS Pages.
- Correctif 2.13.3 : barre supérieure 40 px, boutons retour/avance 28 px avec marges ; pastilles de serveur séparées des logos via le DOM courant. North Polar 1.7.4, neuf variantes conservées.
- Vérification ciblée Discord : North Polar actif, flèches et indicateurs blancs visibles ; brouillon et appel existants préservés. Revue Impeccable layout, pas refonte complète de la DA.
- Contrôles : quality, six tests, audit npm sans vulnérabilité et 112 assertions Chromium ; diff-check PASS. Détecteur : seule bordure historique des embeds, conservée.
- Limites historiques : caméra indisponible ; BetterDiscord, préférences Windows et benchmark non exécutés. Détails dans `docs/MAINTENANCE.md`.
- Publication : PR #14 fusionnée dans `ba86d62` ; branche intégrée supprimée. Pages construit, 11 CSS exacts et deux ressources PASS. Wrapper North Polar 1.7.4 installé identique à main ; rendu actif revérifié après remplacement du snapshot. Aucune release.
