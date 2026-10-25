# Correctifs du 25 octobre — retours d'usage Windows

Plan préparé le 24 octobre, exécuté le 25 à la demande du propriétaire. Les sections ci-dessous conservent les constats et critères du plan initial ; les résultats de cette exécution font foi sur son avancement.

## Résultats du 25 octobre

| Point | Correction et preuve |
| --- | --- |
| NP-01 | Surcharges de taille/position du portrait retirées ; géométrie native commune au portrait, à la décoration et aux réponses. Décentrage horizontal mesuré 10 px avant, puis 0 px horizontal/vertical après dans Discord. Réponses et mention observées dans Theme Lab. |
| NP-02 | Hauteurs de catégories et de lignes rendues au virtualiseur. Catégories 48 → 40 px et lignes 36 → 32 px dans le contexte observé. Séquence réelle après correction : scrollTop 1214 → 1934 sur six crans, scrollHeight 3063 inchangé, clientHeight 815. C'est une validation ciblée à la molette, pas une garantie sur tous les changements d'une liste vocale en direct. |
| NP-03 | Largeur forcée retirée ; l'alias public suit la largeur native choisie. Réduction et agrandissement par la poignée observés, puis conservation au changement de salon et après rechargement. Fenêtre native réduite mesurée 1103 × 803 ; en-têtes et commandes accessibles. |
| NP-04 | Fond uniforme des lignes transparent au repos, survol/focus-within discret explicite. Fonds unis retirés dans la liste observée ; bannières personnelles conservées. Focus clavier global et données de présence inchangés. |

Candidat `b333d3ce97436ca0e323e35821be78bbca717a32e90e89607e676d19710a3cb2` installé sur le VPS et dans le fichier du thème Windows, avec sauvegarde de l'ancien fichier local. Quality PASS : quatre tests, audit zéro. Fixture : 72/72 assertions ; l'ancienne feuille correctement chargée échoue exactement sur les cinq nouveaux contrôles à chacune des deux largeurs. Aucun nouveau `:has()` : une exception locale au commutateur reste inchangée. Aucun commit/push/publication.

Limites : pas de nouvelle preuve FPS ou matérielle ; zoom/accessibilité, toutes les décorations et toutes les variations vocales ne sont pas rejoués. La copie Windows est vérifiée par empreinte et activation configurée ; les preuves de rendu de ce lot sont celles du laboratoire VPS. Un message de diagnostic CSS a été envoyé par erreur hors Theme Lab à la suite d'un focus de console perdu, puis retiré après accord du propriétaire, qui confirme sa suppression. Aucun secret dans ce message ; contrôle visuel du focus ajouté avant validation d'une commande.

## Preuves privées

- Capture utilisateur du 24 octobre à 20:52:26 : décorations autour de plusieurs avatars décentrées dans une conversation textuelle, notamment avec réponses et messages mentionnés.
- Vidéo 20:54:38 (110,2 s) : parcours et défilement d'une longue liste de salons, changements de surface et profils. Indicateur de défilement instable signalé par le propriétaire.
- Vidéo 20:55:06 (10,1 s) : tentative de déplacement de la séparation entre liste de salons et conversation ; redimensionnement contrarié et variations visibles de la liste.
- Fichiers originaux laissés sur le Bureau du propriétaire. Planches d'analyse échantillonnées sous `.impeccable/review/user-scroll-205438-contact.jpg` et `user-resize-205506-contact.jpg`, ignorées par Git. Les dimensions des vidéos sont celles des captures recadrées, pas une mesure de la fenêtre Discord entière.
- Ne publier ni ces médias, ni leur contenu, ni les noms des interlocuteurs. Ne pas confondre l'examen de ces pièces avec une reproduction en direct.

## NP-01 — Décorations d'avatar décentrées

**Constat :** l'effet ne partage plus le centre du portrait. Ne pas masquer l'effet pour faire disparaître le défaut.

**Piste source forte, à confirmer sur le client courant :** `src/30-conversation.css` impose à `.avatar_c19a55` 44 × 44 px et `left:24px`, ainsi qu'un padding de message spécifique. Le CSS natif de référence calcule séparément `.avatarDecoration_c19a55` avec `--custom-message-margin-horizontal`, `--custom-message-avatar-size`, `--custom-message-avatar-decoration-size` et le rapport décoration/avatar. Modifier le portrait seul désynchronise les deux boîtes. Le cache CSS local est une référence antérieure, pas une nouvelle mesure Windows.

**Correction à préparer :** partager les dimensions et l'ancrage natifs via les variables du composant, dans la portée des messages concernés. Préserver le rapport de décoration, les zones cliquables, les masques, le comportement compact et les réglages de taille de texte. Éviter des décalages arbitraires propres à un utilisateur.

**Acceptation :** centres du portrait et de la décoration concordants ; pas de rognage. Vérifier avatar simple/décoré, plusieurs décorations, réponse, mention, début/suite de groupe, survol et clic, ainsi que tailles de texte normale/agrandie. Le texte et les marques de mention doivent garder leur place.

## NP-02 — Indicateur de défilement qui saute

**Constat signalé et à reproduire précisément :** défilement instable dans la liste des salons. Distinguer le déplacement de la poignée, le changement de sa taille et un saut réel de la position de lecture.

**Cause non établie :** examiner la virtualisation Discord et ses dimensions attendues, les hauteurs/marges de lignes et catégories personnalisées, les listes vocales dépliées et la réservation du dock. Les règles `.containerDefault__29444`, `.link__2ea32`, `.scroller__629e4` et les panneaux de `src/50-dock.css` sont des points d'entrée, pas des causes prouvées.

**Diagnostic demain :** reproduire sur une longue liste de test dans Theme Lab, avec catégories et membres vocaux dépliés. Relever à des positions contrôlées `scrollTop`, `scrollHeight`, `clientHeight` et les dimensions des lignes/poignée, thème actif puis temporairement inactif. Mesures de géométrie seulement, sans authentification. Regrouper les observations dans une passe.

**Correction conditionnelle :** si les hauteurs CSS contredisent le calcul du virtualiseur, employer les tokens de densité/hauteur natifs ou retirer la surcharge concernée. Ne pas ajouter de gestionnaire de scroll, d'animation, de requête globale `:has()` ou de désactivation globale de l'ancrage sans preuve.

**Acceptation :** pas de saut inattendu à la molette ni par glissement de la poignée ; position conservée à l'ouverture/fermeture des catégories et lors d'une variation du contenu vocal. Haut et bas restent atteignables, dock et notifications accessibles.

## NP-03 — Redimensionnement natif de la colonne contrarié

**Constat :** la séparation ne laisse pas librement agrandir/réduire la liste des salons et donc la largeur disponible pour la conversation.

**Piste source forte :** `src/20-shell.css` force `--custom-guild-sidebar-width` et `width` avec `--sibnight-sidebar:344px`. Comparer ces règles avec la variable réellement écrite par la poignée native. Une largeur esthétique initiale ne doit pas annuler le choix de l'utilisateur.

**Correction à préparer :** restituer au redimensionneur natif la maîtrise de la largeur, garder 344 px comme valeur de départ/fallback uniquement si nécessaire. Auditer les dépendances : grille, réserve des flèches d'historique, en-têtes, largeur du dock, identité et commandes audio, salon vocal avec chat. Ne pas créer de faux redimensionneur.

**Acceptation :** glissement continu dans les deux sens, sans retour forcé à 344 px, dans les limites natives. Vérifier persistance au changement de salon et après réouverture. Aux largeurs étroite/intermédiaire/large, aucun chevauchement d'en-tête, aucune commande audio ou notification inaccessible. Recontrôler NP-02 pendant le redimensionnement.

## NP-04 — Fonds sombres derrière les membres

**Retour ajouté par le propriétaire :** capture du 24 octobre à 21:02:17. Dans la liste des membres à droite, les lignes de pseudos forment des blocs sombres arrondis jugés inesthétiques. Retirer ces fonds au repos pour retrouver une liste continue, sans cartes derrière chaque membre.

**Périmètre :** liste des membres, pas les cartes d'activité au-dessus ni le bloc du compte connecté. Distinguer le fond uniforme des lignes et les décorations/bannières personnalisées natives ; cette demande vise explicitement le fond sombre. Ne pas supprimer une identité personnalisée par extension sans vérifier son rôle.

**Diagnostic demain :** identifier le composant natif qui peint le fond (ligne, contenu interne ou état), puis le neutraliser dans cette portée uniquement. Ne pas peindre ou rendre transparents tous les panneaux de l'application.

**Acceptation :** aucune plaque sombre au repos derrière les membres ; séparation par espacement et titres de rôles. Conserver un survol discret, le focus clavier visible, la sélection utile, les avatars, pseudos/couleurs de rôle, badges et indicateurs de présence. Contrôler les membres en ligne/hors ligne, statuts longs et fenêtre étroite. Respecter la correction de lisibilité des membres hors ligne.

**Preuve privée :** original laissé sur le Bureau du propriétaire ; ne pas publier son contenu. État : **NOTÉ / À CORRIGER DEMAIN**, sans modification du thème installé aujourd'hui.

## Ordre et limites de la reprise

1. Lire AGENDA.md ; relancer uniquement le laboratoire isolé et son tunnel privé. Ne pas restaurer l'archive par-dessus le profil existant ni reconnecter un appel automatiquement.
2. Reproduire les quatre défauts sur le candidat exact, puis appliquer un lot cohérent avec Impeccable (harden/adapt/optimize selon le défaut). Conserver la DA Nord sombre validée et les fonctions natives.
3. Faire une confirmation groupée après correction. Exécuter les contrôles locaux documentés sur le nouveau build, puis vérifier son empreinte et son rendu dans Discord réel. Ne pas présenter la fixture comme une preuve de défilement natif.
4. Mettre à jour le checkpoint avec les résultats et les éventuelles limites. Aucune publication, aucun commit/push ni déploiement Windows de remplacement sans instruction correspondante. Ensuite seulement reprendre la suite du thème demandée par le propriétaire.

État courant : **CORRECTIONS APPLIQUÉES / CONTRÔLES CIBLÉS PASS** selon les résultats ci-dessus. Les mentions « demain » dans le plan décrivent sa préparation du 24. Laboratoire relancé ; thème local mis à jour le 25. Limites conservées explicitement.
