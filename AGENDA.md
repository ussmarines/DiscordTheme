# Checkpoint — famille Sibylla publiée, 25 octobre 2026

- Les cinq thèmes ont été essayés et validés par le propriétaire : Sibylla principal, North Polar, North Snow, Spatial, Tokyo-night. Publication autorisée et réalisée via PR #17, fusionnée dans main (4e5c981db74c9f4f06f6fb0ba89081924d1d90e4).
- CSS et agencement approuvés conservés. Packaging : seule une ligne vide finale redondante a été retirée des installables. Aucun changement des déclarations North Polar. Les anciens correctifs natifs restent documentés dans docs/VALIDATION.md.
- Sources src/ ; palettes/fonds scripts/lib/flavors.js ; build explicite. Cinq sorties build/, wrappers themes/ et téléchargements autonomes dist/. Copies locales output/ ignorées. Catalogue public : https://ussmarines.github.io/DiscordTheme/.
- README français, installation, mise à jour, migration des anciens liens, références et limites actualisés. Ancien code et anciens aperçus retirés de l’arbre actif ; historique Git et copies privées de récupération conservés.
- Cinq aperçus publics 1600×1000 sous assets/previews/, rendus par scripts/previews.js avec contenu entièrement fictif. Aucun serveur, pseudo, bannière ni message du compte personnel. Illustrations explicitement distinctes des tests Discord réels.
- Contrôles locaux PASS : qualité,5tests, audit dépendances0,24liens Markdown,10liens locaux du catalogue, diff sans erreur d’espacement. Audit local complet :7contrôles PASS. Fixtures historiques72géométries et65palettes distinctes du client natif.
- GitHub : garde secrets/identité40198874921 et audit40198877318 terminés avec tous scanners réussis ; rapports expurgés vérifiés, aucun résultat identité/Gitleaks/Opengrep/Zizmor. Déploiement Pages40198993207 réussi. Références cliquables dans docs/VALIDATION.md.
- Contrôle distant check:urls -- --match-local PASS : catalogue,15URL de thèmes et5PNG comparés aux fichiers locaux. Les téléchargements sont prêts à l’emploi ; aucun GitHub Release n’a été créé.
- Dernière maintenance : conserver la politique LF générale existante et ajouter HTML ; enregistrer les preuves de publication. Ces seuls fichiers de maintenance ne modifient pas le CSS ni les aperçus.
- Laboratoire et serveur de test conservés, Sibylla seul actif au dernier contrôle. Aucun remplacement supplémentaire du thème Windows demandé. Accès, médias privés et sauvegardes restent exclus du dépôt.
- Limites : BetterDiscord réel, caméra, matériel audio, lecteurs d’écran, tous zooms/états et FPS ne sont pas certifiés. Superpowers désactivé. Suite : retours d’usage du propriétaire, sans nouvelle refonte implicite.
