# Fonctions Discord — candidat North Polar 3.0.0

Contrôles réels dans le laboratoire VPS : Discord Linux 1.0.166 avec Vencord, North Polar autonome seul actif. Le propriétaire autorise les écritures de test dans Theme Lab uniquement. Les anciens tests Sibnight ne valident pas ce candidat.

| Surface / fonction | Contrôle réel | Limite |
| --- | --- | --- |
| Salons disponibles | Création texte north-lecture, vocal north-vocal et forum north-forum, noms vérifiés | Le formulaire ne propose que Texte/Vocal/Forum ; Annonces et Scène non testés, aucune activation Communauté |
| Réglages du salon texte | Vue d'ensemble ouverte, nom modifié et enregistré, champs/sélecteurs/visibilité lisibles | Toutes les permutations de permissions non rejouées |
| Lecture et rédaction | Textes longs, titre gras et citation envoyés dans north-lecture ; composer vide après envoi | Pas de prétention de couverture de tous les formats Markdown |
| Mention et non-lus | @everyone de test envoyé, Marquer comme non lu exécuté ; compteur 1 serveur+salon, bandeau nouveau message et séparateur observés ; salon lu plus discret | État produit manuellement par une fonction native ; pas une arrivée indépendante depuis un deuxième compte |
| Forum | Post Lecture et navigation créé, ouvert en panneau latéral ; champs/recherche/tri/abonnement visibles | Tags avancés et modération non exécutés |
| Épingles | Message long épinglé après confirmation native ; popup rempli ouvert | Pas de test de très grande liste |
| Navigation | Précédent vers forum/post, puis Suivant vers north-lecture, tous deux exécutés après placement inline dans le header | Autres modes de fenêtre hors tests documentés |
| Serveurs | Géométrie native40px avec masques de 40 px, conteneur agrandi une fois à 48 px ; alignement réel observé avec dossiers | Tous les types de dossiers ouverts non parcourus |
| Compte | Nom complet, bannière native rétablie derrière identité et commandes, micro coupé | Décorations propres à tous les autres comptes non testées |
| Audio entrée | Menu ouvert ; flèches Bas puis Droite ouvrent le sous-menu des périphériques ; focus Frost visible | Aucun changement de périphérique ; pas de microphone matériel |
| Audio sortie | Menu périphérique/volume/réglages ouvert et lisible | Écoute matérielle non validée |
| Vocal | Voix connectée observé durablement dans north-vocal, micro coupé ; quatre actions intégrées et glyphes lisibles | L'indication de connexion ne prouve pas la qualité sonore |
| Partage | Fenêtre Discord affichant Theme Lab sélectionnée ; émission et aperçu natifs observés, puis arrêt vérifié | Aucun autre spectateur ; réception distante et qualité1440p/60 non mesurées |
| Caméra | Commande native conservée, caméra indisponible | NON EXÉCUTÉ |
| Menus et popups | Ajouter, émoji/GIF/autocollants, fils vides, épingles vides/remplies, menus contextuels et confirmation d'épinglage observés | Paiements, applications tierces et achats non exécutés |
| Clavier | Saisie, validation, Échap et sous-menu audio par flèches exécutés ; focus visible | Pas de validation lecteur d'écran ni de parcours exhaustif de toute l'application |
| Fenêtre réduite | Fenêtres 1280 × 720 et 1101 × 801 contrôlées ; largeur gauche de 344 px conservée, compte une ligne et Voix connectée lisibles, liste des salons accessible | Aucun résultat généralisé aux mobiles ou à tous les systèmes |

Le blocage vocal initial a été diagnostiqué par ldd : libatomic.so.1 et libpulse.so.0 manquaient. Installation de11 nouveaux paquets Ubuntu officiels,0 mise à niveau/0 suppression, puis relance du seul laboratoire. Le bandeau installation corrompue a disparu et le vocal est connecté. AI Desk Actor, Caddy et PostgreSQL ont conservé PID et date de démarrage.

Les captures privées restent ignorées. Cette matrice ne constitue ni un PASS universel Discord, ni une approbation de fidélité par le propriétaire. Aucun contenu n'a été publié hors du serveur de test ; aucun commit/push/publication dans cette passe.

## Complément du 24 octobre : voix, MP et paramètres

La scène vocale avec chat ouvert à 1101 × 801 a été corrigée en deux zones verticales ; ses commandes natives sont visibles, sans superposition avec le chat. L'icône réseau conserve les états natifs et mesure 16 px.

Le dossier Halo fermé a été survolé, puis déplié : miniatures centrées sur l'ancre de l'infobulle. Les MP ont été inspectés sans écrire : liste Amis, conversation, en-tête et composer. Les deux en-têtes gauche/droite utilisent 60 px et leur bord inférieur est aligné. Sélection Nord et bannière du compte conservée.

Voix/Vidéo, Caméra indisponible, Apparence, Accessibilité et Notifications ont été inspectés en fenêtre étroite ; le menu déroulant des notifications s'ouvre sans déborder. Aucun réglage personnel modifié. Les interfaces non parcourues et les autres limites de la matrice restent hors preuve. Voir le candidat exact dans [VALIDATION.md](VALIDATION.md). Sans publication.

MP de groupe : conversation existante à cinq membres contrôlée à 1101 × 801 en lecture seule. Noms hors ligne rendus lisibles ; en-tête, liste et composer conservés. Profils personnalisés et tiers (compact/complet), menu de profil, épingles vides, menu contextuel du groupe, pièces jointes et sélecteur d'émojis observés. Aucun message, appel, changement de membres, édition de profil ou fichier envoyé. Une fiche tierce restée en chargement demeure hors preuve de contenu final. Détails et captures privées dans VALIDATION.md.

## Correctifs du 25 octobre

Géométrie native portrait/décoration rétablie (centres mesurés à 0/0 px), hauteurs natives des lignes et catégories restaurées pour la virtualisation, colonne redimensionnable dans les deux sens avec persistance au changement de salon et rechargement, fonds de membres transparents au repos avec survol/focus discret. Rendu étroit observé à une géométrie native 1103 × 803. Les limites des mesures de défilement et l'incident de focus de console (message CSS envoyé par erreur, retiré avec accord et suppression confirmée) sont décrits dans VALIDATION.md. L'ancienne affirmation d'absence d'envoi hors serveur de test ne s'applique donc pas à cet incident. Aucun secret, aucune publication Git.

## Palette-only family validation — 25 October 2026

The shared functional layout is unchanged. All five installables retain the same native control rules and the approved North source. New flavors were exercised in actual Theme Lab conversations, settings and representative popups; see VALIDATION.md for the exact surfaces. This pass does not repeat previous voice/hardware tests because it changes only colors and message backgrounds. No new feature is hidden, no messages or calls were initiated, and the test server is preserved.
