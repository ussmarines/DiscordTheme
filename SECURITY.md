# Politique de sécurité

## Signalement privé

Ne publiez pas de vulnérabilité, secret, jeton, cookie, donnée personnelle ou preuve d’exploitation dans une issue, une discussion, une capture ou un journal public. Utilisez le mécanisme de signalement privé de GitHub lorsqu’il est disponible, ou un canal privé déjà convenu avec `ussmarines`.

Indiquez la version concernée, le fichier, les prérequis, l’impact et la reproduction minimale utilisant des données synthétiques. Ne joignez jamais de credential réel.

## Secrets et chaîne de production

Les règles obligatoires sont définies dans `SECURITY_PRODUCTION_RULES.md`. Les secrets restent dans un coffre et sont injectés uniquement à l’exécution. Les agents et workflows ne lisent pas de fichiers de credentials inutiles et les journaux sont expurgés avant publication.

Une valeur exposée doit être révoquée ou tournée immédiatement, puis l’incident doit être analysé. La suppression de la valeur dans le dépôt ne suffit pas.

## Périmètre

Le thème et ses outils de build doivent rester sans secret embarqué, sans code distant non contrôlé et sans artefact local dans les publications. Toute ressource externe ou dépendance ajoutée doit être documentée et revue avant distribution.
