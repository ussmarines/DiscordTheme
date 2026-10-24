# Checkpoint Sibnight

- Base publiée : PR #16 intégrée dans main `287cefc` ; correctif final Sibnight2.15.1 / North Polar2.1.1.
- Portée : socle principal partagé (main/workspace au manifeste), North Polar skin Nord sombre ; huit autres variantes sans validation visuelle à la demande du propriétaire.
- Direction approuvée : Lecture et repères + Cabinet initial. Colonnes continues, header natif, glyphes fils/pin/membres/recherche ; glyphes natifs à états multiples préservés.
- Revue : reconstruction exigée puis deux lots correctifs. Passe supplémentaire autorisée ; verdict ciblé final PASS : noms membres complets, dock et commandes lisibles en grand et1101×801, aucune régression matérielle visible. Membres288/280px, hauteur native conservée.
- Fonctions : matrice réelle `docs/DISCORD_FUNCTIONS.md` ; recherche, réception, fils, épingles, notifications, membres, menus message, réponse préparée/annulée, profils, médias/applications, paramètres Voix/Vencord. Aucun contenu publié ni réglage vocal modifié ; appel préservé. Pas de certification exhaustive de Discord.
- Contrôles : quality final PASS (six tests, audit zéro), 24 assertions Chromium North-only PASS, y compris le correctif Figtree, diff-check PASS. Détecteur : deux avis typographiques non bloquants, échelle désormais documentée ; aucun deuxième scan.
- Documents README, DESIGN/sidecar/surface, maintenance et matrice actualisés. Captures locales ignorées. Caméra indisponible ; BetterDiscord/autresvariantes/accessibilitéWindows et opérations réseau non rejoués.
- Publication : PR #16 fusionnée, branche intégrée supprimée ; Pages et onze CSS exacts + deux ressources PASS sur `287cefc`. Le wrapper avec Figtree a imposé une largeur membres288/280 ; revue différentielle avec police réelle PASS. Correctif et documentation prêts à pousser normalement sur main. Restant : contrôle du dernier Pages, installation et preuve wrapper final. Aucune release.
