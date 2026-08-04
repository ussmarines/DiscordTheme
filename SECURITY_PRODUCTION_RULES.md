# Règles de production — secrets, identité et agents

Ces règles s’appliquent au développement, aux tests, à la CI, aux releases et à tout agent automatisé travaillant sur ce dépôt.

## 1. Secrets hors du contexte des agents

- Aucun secret en clair ne doit apparaître dans un prompt, une transcription, une sortie, un rapport, une capture, un ticket ou un commentaire de pull request.
- Les secrets sont conservés dans un coffre adapté et injectés uniquement à l’exécution, avec la portée et la durée minimales.
- Un agent ne doit pas ouvrir, lire, copier ou résumer un fichier `.env`, un fichier de credentials ou un magasin de secrets sans nécessité exacte et autorisation explicite.
- Pour vérifier une configuration sensible, contrôler le chemin, les permissions, le schéma ou les noms de variables sans afficher les valeurs.
- Ne jamais transmettre un secret en argument de ligne de commande, dans une URL, dans un nom de fichier, dans le code client ou dans une variable destinée au navigateur.

## 2. Cibles à haute valeur

- `~/.codex/auth.json`, les clés SSH, les jetons GitHub, les clés cloud, les comptes de service, les certificats privés et les fichiers `.env` sont des cibles à haute valeur.
- Ils ne doivent jamais être suivis par Git, copiés dans le workspace du projet, joints à un artefact ou rendus accessibles à une tâche qui n’en a pas besoin.
- Les permissions de fichiers et de coffres appliquent le moindre privilège.

## 3. Journaux et diagnostics

- Les journaux masquent les valeurs sensibles avant écriture.
- Les diagnostics ne contiennent ni contenu utilisateur, ni credentials, ni en-têtes d’authentification, ni chaînes de connexion complètes.
- Les outils de scan produisent uniquement le chemin, la ligne, la règle et un identifiant expurgé. Aucun rapport brut contenant une valeur détectée ne doit être publié.

## 4. GitHub Actions et chaîne de production

- Épingler les actions tierces par SHA complet et documenter la version correspondante.
- Utiliser `permissions` au niveau minimal, `persist-credentials: false` pour les tâches en lecture seule et ne jamais exécuter du code non fiable avec des secrets.
- Interdire `pull_request_target` pour toute tâche qui checkout ou exécute le code d’une contribution.
- Les secrets de CI sont référencés par leur nom uniquement et ne sont jamais affichés, exportés dans un artefact ou passés à un processus non nécessaire.
- Les dépendances, actions et images de build sont revues avant mise à jour. Les releases ne contiennent aucun fichier local, cache, sauvegarde, base, log ou credential.

## 5. Identité publique

- Utiliser uniquement le pseudonyme `ussmarines` et le profil GitHub `https://github.com/ussmarines` dans les métadonnées, exemples, identifiants mainteneur et documentation publique.
- Ne pas introduire de prénom, nom civil, adresse personnelle ou identifiant local nominatif.
- Le contrôle automatisé du dépôt recherche ces références sans afficher les valeurs interdites.

## 6. Réponse à incident

Dès qu’un secret apparaît dans Git, un log, une transcription ou un artefact :

1. arrêter la diffusion et restreindre l’accès au rapport ;
2. révoquer ou faire tourner immédiatement le secret et les sessions associées ;
3. vérifier les journaux d’accès et les usages suspects ;
4. retirer la valeur de l’arbre courant sans la recopier dans un commit ou un rapport ;
5. évaluer séparément une réécriture d’historique, destructive et soumise à autorisation explicite ;
6. documenter la cause, la portée et les contrôles empêchant la récidive.

La suppression d’une valeur dans un commit récent ne remplace jamais sa rotation.

## 7. Validation avant commit et release

- Exécuter `.github/scripts/security_guard.py`.
- Laisser le workflow `Security and secret guard` analyser le diff et périodiquement l’historique complet avec sortie expurgée.
- Vérifier le contenu exact de l’artefact de release.
- Confirmer qu’aucun fichier sensible n’est suivi avec `git ls-files` et qu’aucune valeur sensible n’apparaît dans le diff.
- Une exception doit être explicite, minimale, documentée et ne peut jamais autoriser l’exposition d’un secret.
