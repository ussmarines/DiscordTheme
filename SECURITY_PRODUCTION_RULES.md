# Règles de production — secrets, identité et agents

Ces règles s’appliquent au développement, aux tests, à la CI, aux releases et à tout agent automatisé travaillant sur ce dépôt.

## Secrets hors du contexte des agents

- Aucun secret en clair dans un prompt, une transcription, une sortie, un rapport, une capture, un ticket ou un commentaire.
- Les secrets restent dans un coffre et sont injectés uniquement à l’exécution, avec portée et durée minimales.
- Un agent n’ouvre, ne lit, ne copie et ne résume aucun `.env`, fichier de credentials, coffre, clé privée ou `~/.codex/auth.json` sans nécessité exacte et autorisation explicite.
- Vérifier chemins, permissions, schémas et noms de variables sans afficher les valeurs.
- Ne jamais transmettre un secret dans une URL, un nom de fichier, un argument de commande, le code client, un log ou un artefact.

## Journaux, CI et production

- Masquer les valeurs sensibles avant toute écriture de log ou diagnostic.
- Les scans publient seulement chemin, ligne, règle et identifiant expurgé, jamais la valeur détectée.
- Épingler les actions tierces par SHA complet, limiter `permissions`, utiliser `persist-credentials: false` en lecture seule et interdire `pull_request_target` lorsqu’un workflow exécute du code de contribution.
- Les releases excluent fichiers locaux, caches, sauvegardes, bases, logs et credentials.
- Les workflows `Manual secret and identity guard` et `Manual repository security audit` utilisent uniquement `workflow_dispatch`. Ne pas ajouter `push`, `pull_request` ou `schedule` sans ordre explicite du propriétaire.
- zizmor est exécuté avec `--offline` et ne reçoit aucun jeton GitHub.

## Identité publique

- Utiliser uniquement `ussmarines` et `https://github.com/ussmarines` dans les métadonnées, exemples, identifiants mainteneur et documents publics.
- Ne pas introduire de prénom, nom civil, adresse personnelle ou identifiant local nominatif.
- Le garde contrôle l’arbre courant, les métadonnées et les blobs historiques au moyen d’empreintes, sans afficher les valeurs interdites.
- Toute obligation légale ou de publication exigeant une identité civile doit être signalée et approuvée explicitement avant ajout.

## Réponse à incident

Lorsqu’un secret apparaît dans Git, un log, une transcription ou un artefact : arrêter la diffusion, révoquer ou faire tourner immédiatement le secret et les sessions liées, examiner les journaux d’accès, retirer la valeur de l’arbre courant sans la recopier, puis documenter la cause et les contrôles correctifs. Une réécriture d’historique est destructive et exige une autorisation séparée. Supprimer une valeur ne remplace jamais sa rotation.

## Validation et reprise

- Lire `docs/security/SECURITY_SCANNING.md` avant un audit.
- Lancer localement `.\tools\security\security-scan.ps1 -Profile Full` après installation partagée depuis SpaceShooter-2D-web ou MailPerch.
- Sur GitHub, lancer manuellement les deux workflows en mode `full` et `report` pour le premier diagnostic.
- Télécharger les artefacts JSON expurgés ; ils peuvent être joints à ChatGPT ou placés dans le workspace Codex.
- Un scanner produit un candidat à valider, pas une preuve automatique de vulnérabilité.
- Aucune exception ne peut autoriser l’exposition d’un secret.
