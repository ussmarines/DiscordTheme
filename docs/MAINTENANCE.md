# Maintenance — famille Sibylla

## Contrat actif

Sibylla est le thème principal. North Polar, North Snow, Spatial et Tokyo-night sont quatre flavors complètes. Les cinq versions ont été essayées et validées par le propriétaire le 25 octobre 2026. Conserver leur disposition commune : seules les couleurs et les images de fond diffèrent.

L’ancien socle Sibnight et ses neuf variantes ont été retirés de l’arbre actif. Leur historique Git reste disponible ; les sauvegardes de récupération locales restent privées. Les crédits et noms des assets réutilisés sont conservés.

## Sources et génération

L’ordre des dix modules est défini dans `scripts/lib/build-theme.js`. Modifier `src/` pour le socle, `scripts/lib/flavors.js` pour les palettes et fonds, et `themes/` pour les métadonnées des wrappers. Les primitives historiques `--sibnight-*` restent publiques pour la compatibilité des réglages ; ce préfixe n’introduit aucune dépendance à l’ancien socle.

Exécuter `npm run quality` et `git diff --check`. Le build produit cinq feuilles sous `build/`, cinq téléchargements autonomes sous `dist/` et leurs copies locales ignorées sous `output/`. Ne pas modifier ces sorties à la main. Les images fournies sont embarquées sans requête distante ; la police Figtree existante est conservée.

North Polar sert de référence inchangée pour cette migration. Les tests vérifient que les flavors reprennent sa feuille entière et que leurs ajouts ne déplacent aucun bloc. Les contrôles rejettent les sélecteurs de classe partiels, les transitions globales, les filtres décoratifs, les non-lus masqués et les racines de popup peintes. Une seule requête relationnelle locale exacte reste autorisée pour l’état coché du commutateur natif.

## Régression Discord

Tester le fichier exact, seul actif, sans ancien thème ni QuickCSS en conflit. Regrouper les contrôles : rail, dossiers et infobulles, non-lus/mentions, salons et redimensionnement, messages, zone de rédaction, compte, vocal, membres, MP, recherche, fils, épingles, profils, menus et réglages. Contrôler les tailles large et étroite après une correction matérielle.

Respecter les états, labels, permissions, géométries d’avatar et fonctions natifs. Ne pas ajouter de faux boutons, supprimer le focus ou altérer les niveaux de qualité réseau. Les bannières personnelles restent natives. Un parseur et une fixture synthétique ne prouvent pas le comportement Discord réel ; consigner distinctement les observations et opérations non exécutées.

Le laboratoire de test est persistant. Ne pas réinitialiser ses salons ni lire les données d’authentification ou le presse-papiers. Les tests de message restent limités au serveur autorisé. Les captures et détails d’accès restent privés.

## Publication et liens

La demande du propriétaire du 25 octobre 2026 autorise la publication bornée de la famille validée et la mise à jour du dépôt, sans release automatique ni réécriture d’historique. GitHub Pages sert les fichiers versionnés depuis `main`, sans traitement Jekyll. Le catalogue `index.html` mène aux cinq téléchargements `dist/`.

Avant publication : contrôler le diff exact, les fichiers distribués et les secrets/identités. Ne jamais ajouter sauvegardes, journaux, profils ou captures privées. Après publication, lancer `npm run check:urls -- --match-local` : les quinze URL build/wrapper/téléchargement doivent correspondre aux fichiers locaux. Vérifier aussi le catalogue et ses liens. Les workflows de sécurité restent manuels.

Les anciens liens Sibnight sont retirés : la migration et les nouveaux téléchargements sont indiqués dans le README. Ne pas réintroduire silencieusement les neuf variantes abandonnées.

Voir [validation](VALIDATION.md), [fonctions](DISCORD_FUNCTIONS.md), [références](RESEARCH.md) et [sécurité](../SECURITY_PRODUCTION_RULES.md).
