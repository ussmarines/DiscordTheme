# Checkpoint Sibnight

- Base : `464c996` sur main, synchronisée le 23 octobre 2026.
- Candidat : 2.13.2 sur `codex/maintenance-discord-2026-10-23` ; neuf variantes conservées.
- Changements : Chokidar 6.0.0, PostCSS 8.5.31, deux classes upstream actualisées, focus visible, contrastes renforcés, profils personnalisés et mouvement réduit corrigés, README/maintenance actualisés.
- Validations : quality, six tests Node 24/26, 92 assertions Chromium, neuf snapshots, scan Full/Enforce et diff-check PASS.
- Discord réel : neuf snapshots chargés dans stable 647615 + Vencord ; chat/listes/emoji, permissions, profils complets, zoom et mouvement réduit observés. Limites exactes dans `docs/MAINTENANCE.md`.
- Nettoyage distant : trois branches intégrées supprimées ; deux workflows ponctuels désactivés ; aucune ancienne PR ouverte.
- Publication : candidat en PR brouillon ; CSS publics de main conservés jusqu'à complétion de la checklist Discord. Aucune release déclenchée.
- Reste : forums/threads, édition/envoi et autocomplete, vidéo/partage, popout, focus natif, redimensionnement de fenêtre, préférences système et BetterDiscord. Réponses attendues pour message de test et changement d’appel. Compatibilité exhaustive non confirmée.
- Prochaine action : compléter la checklist regroupée, corriger les écarts reproduits puis intégrer le candidat et vérifier Pages avec `npm run check:urls -- --match-local`.
