# Règles des agents — DiscordTheme

## Portée

Ce dépôt contient un thème Discord et ses outils de construction. Préserver le comportement, les noms d’assets et les contrats de build existants ; effectuer les changements les plus petits possibles et exécuter les contrôles documentés dans le README.

## Secrets, identité et production

- Lire et appliquer `SECURITY_PRODUCTION_RULES.md` avant toute modification de configuration, CI, build ou publication.
- Ne jamais ouvrir, afficher, copier ou résumer un `.env`, un fichier de credentials, un coffre, une clé privée ou `~/.codex/auth.json` sans nécessité exacte et autorisation explicite.
- Vérifier les chemins, permissions, schémas et noms de variables sans exposer les valeurs.
- Les secrets restent dans un coffre et sont injectés uniquement à l’exécution. Ils ne passent ni dans les prompts, arguments, URL, journaux, captures, artefacts ou rapports.
- Tout secret exposé doit être révoqué ou tourné immédiatement, puis l’incident et sa cause doivent être examinés.
- Utiliser uniquement l’identité publique `ussmarines` et le profil `https://github.com/ussmarines`.
- Ne jamais ajouter de ressource distante, télémétrie ou code tiers non revu sans autorisation explicite.
- Ne jamais publier de cache, fichier local, sauvegarde, base, journal ou credential.

## Git et publication

Les mutations GitHub restent interdites par défaut. Une demande explicite du propriétaire peut autoriser une opération bornée, mais jamais un force-push, une réécriture destructive ou une exposition de secret. Une release exige des validations vertes et un contrôle du contenu exact de l’artefact.
