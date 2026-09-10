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

## Maintenance et reprise

- Lire `AGENDA.md` pour le checkpoint et `docs/MAINTENANCE.md` pour les limites de validation.
- Conserver les neuf thèmes, les crédits Zelk/Midnight/Tokyo Night et les noms des assets.
- Modifier `src/` et les wrappers `themes/`, puis régénérer `build/` ; ne pas éditer les builds à la main.
- L'ordre de cascade est explicite dans `scripts/lib/build-theme.js`. Déclarer tout nouveau module ; ne pas réordonner sans preuve.
- Réutiliser les tokens existants. Préfixer les nouveaux tokens propres au projet par `--sibnight-` ; préserver les anciens alias publics.
- Après modification : `npm run quality`, `git diff --check`. Vérifier les URLs après publication avec `npm run check:urls -- --match-local`.
- Ne pas peindre les `layerContainer`, masquer les non-lus, supprimer le focus ou réintroduire des transitions globales coûteuses.
- L'updater ne produit qu'un patch : contrôle statique puis checklist Discord avant publication. Une syntaxe valide ne prouve pas la compatibilité visuelle.
- Commit/push exigent l'autorisation explicite du propriétaire. L'intervention du 10 septembre 2026 autorise la mise à jour bornée de main, sans release ni force-push.
- Maintenir un seul checkpoint compact dans `AGENDA.md`. Ne pas présenter une fixture synthétique comme un test Discord réel.
- Superpowers reste désactivé dans ce dépôt.
