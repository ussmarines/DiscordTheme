# Maintenance de Sibnight

## Maintenance du 23 octobre 2026

Base synchronisée : `464c996` (trois commits distants récupérés par fast-forward). Candidat 2.13.2 : neuf variantes conservées, noms d'assets et crédits inchangés. PostCSS 8.5.31 et Chokidar 6.0.0 sont les versions npm actuelles vérifiées. Chokidar 6 est ESM ; Node 24 et 26 chargent son export `watch` depuis les scripts CommonJS existants via `require(esm)`. Le test réel de changement de fichier passe sur les deux lignes Node. L'ancien choix de conserver Chokidar 4 décrit plus bas est historique.

Le mapping upstream `Changes.txt` consulté le 23 octobre correspond au commit `c110d209bb985d602de3080934a689b518096064`, SHA-256 `1cc00094aa788d0f3a93fc97d77a1844984b11351d838fbf3df08510a8a14fce`. Deux substitutions pertinentes : `grabber_a562c8` → `grabber__4c059` et `defaultColor__4bd52` → `defaultColor_b717a1`. Le mapping n'est ni exécuté ni ajouté aux ressources distribuées ; il ne constitue pas un inventaire exhaustif du DOM.

Revue UI/UX/DA avec Impeccable : conserver les palettes, les surfaces, les rayons et les contrôles natifs ; renforcer la lisibilité plutôt que remplacer l'identité. Le token `--border-focus` utilisait une bordure transparente : il utilise maintenant `--sibnight-focus-ring`, dérivé du texte important. Un outline intérieur de 2px cible les contrôles sémantiques en `:focus-visible`, sans décalage de layout ; en couleurs forcées il utilise `Highlight`. Les textes secondaires suivent la palette sans alpha quasi invisible ; les textes des deux variantes claires et de Tokyo Night sont renforcés. Le détecteur signale seulement la bordure historique de mention de Space : exception fonctionnelle conservée, indicateur d'état, pas bordure de carte décorative.

Validation locale : installation propre sans scripts, `npm run quality`, six tests sur Node 24 et 26, audit npm sans vulnérabilité, neuf snapshots et `git diff --check` PASS. Scan Full/Enforce : identité, Gitleaks, Opengrep, Trivy, SBOM, npm et zizmor PASS. Aucun workflow de sécurité ni release déclenché.

Chromium : 94 assertions PASS (10 × 9 variantes, plus quatre contrôles de palettes de syntaxe et de statut claires). Le texte secondaire a un contraste minimal de 5,10:1 sur les tokens solides bg-2/bg-3/bg-4 ; le focus dépasse 3:1. Ce test exclut les fonds composites, les images, les états de bouton pressé, les couleurs de rôle et les personnalisations utilisateur. Les autres assertions vérifient non-lus, overlays transparents, transitions désactivées, pseudo-éléments non interactifs, liens, profil personnalisé de référence et désactivation d’une transition active via la classe Discord `reduce-motion`. Générer la fixture ne suffit pas : elle a été ouverte et ses résultats lus dans Chromium.

Client observé : Discord stable `647615 (3b26879)`, hôte `1.0.9265 x64 (96160)`, Vencord `b0e636d (Standalone)`, Electron `42.11.15`, Chromium `148.0.7778.280`. Le candidat est testé via un fichier local temporaire contenant le snapshot CSS, sans attendre une publication Pages. La police utilise donc le fallback local. Les messages privés au client ne sont pas exportés dans le dépôt. Les observations visuelles ciblées ne remplacent pas la checklist exhaustive ci-dessous ; version installée et dernier déploiement Discord ne sont pas synonymes.

Observations réelles : les neuf snapshots sont chargés successivement, un seul thème actif. Chat, saisie au repos, liste des salons, membres, réactions existantes, mentions et panneau de l'appel déjà connecté restent visibles. Le sélecteur emoji est ouvert sur le principal puis Space, North Snow, Sun, Flat, Tokyo Night et Aurora Dark/Light : surface distincte et absence de fond plein écran parasite. Les paramètres Vencord et Voix sont lisibles sous North Polar. Aucun message ni réaction n'est envoyé ; aucun appel n'est rejoint, interrompu ou créé. La configuration du thème initial est restaurée après les tests.

Suite de validation du 24 octobre : paramètres du serveur et du salon, rôles et permissions consultés sans modification ; invitations, menu contextuel, préparation/annulation de réponse, profils compact et complet personnalisés inspectés. Zoom 110 % puis retour à 100 %, viewport réduit par les outils de développement : contrôles observés sans découpage gênant. Ce viewport ne prouve pas le redimensionnement de la fenêtre native. Les réglages de mouvement réduit Discord ont été activés puis restaurés (mouvement réduit désactivé, synchronisation système activée, GIF/emoji animés et autocollants toujours animés).

Corrections reproduites dans le client : les profils personnalisés utilisaient un fond clair imposé avec du texte blanc. Le fond modal et les overlays suivent maintenant les tokens natifs du profil ; les alias blancs natifs sont préservés. Profils complets et compacts revérifiés dans Aurora Light et North Snow. Les liens suivent `--text-link` avec fallback public ; Aurora Light, North Snow et Aurora Dark reçoivent un accent lisible. Les deux palettes claires définissent les tokens de syntaxe natifs. La classe réelle `reduce-motion` est désormais couverte explicitement, en complément de la préférence système et du toggle du thème.

Validation complémentaire du 24 octobre : message de test envoyé puis modifié dans le serveur de démonstration autorisé ; texte final exact « Test Sibnight PR #13 — édition validée ». La première saisie a été doublée par l’outil puis corrigée pendant l’édition. Autocomplétion de mention observée sous Space ; brouillon effacé sans envoi. Forum existant et fil avec images/réactions consultés en lecture seule sous principal, North Snow et Space, sans publication. Appel basculé vers le serveur de démonstration avec accord du propriétaire. Partage limité à un Bloc-notes vide : aperçu actif, plein écran et popout 856 × 481 lisibles ; commandes et focus clavier visibles. Partage arrêté, puis appel de test déconnecté. Fenêtre principale réellement réduite à 1101 × 801 (Space et Aurora Light), puis agrandie. Texte et commandes restent accessibles.

Le libellé de connexion vocale était trop pâle sur les variantes claires : leurs tokens verts sont assombris à `#35634a`. Rendu revérifié sous Aurora Light ; les deux palettes sont couvertes par les contrôles de contraste synthétiques. Les 94 assertions ont été exécutées et lues dans Chromium après correction ; quality et diff-check passent. Aucun écart bloquant observé dans les parcours disponibles de la checklist. Ce résultat concerne le client installé, pas chaque combinaison de réglages ou rollout Discord.

**INDISPONIBLE / NON EXÉCUTÉ** : Discord indique « Caméra non disponible » ; aucun flux caméra validé. BetterDiscord absent de la session. Préférence système de mouvement réduit, contraste Windows et benchmark CPU/FPS non exécutés ; réglage de mouvement réduit Discord et contrôles CSS synthétiques validés séparément. Aucun gain de performance mesuré revendiqué. Les captures privées ne sont pas ajoutées au dépôt.

Publication : la PR #13 est préparée pour intégration après les contrôles locaux et les parcours Vencord disponibles, avec les limites ci-dessus conservées. Aucune release déclenchée. Relancer `npm run check:urls -- --match-local` après intégration et déploiement Pages pour vérifier les 11 contenus CSS exacts et les deux ressources existantes.

Nettoyage avant création de la PR #13 : aucune autre PR ouverte. Les branches `release/themes-2026.09.29` et `verify/class-update-2026-09-29` pointaient sur `66df715`, ancêtre de main. La branche maintenance pointait sur `86a4078` : son workflow est identique à celui de main après normalisation des deux pins d'actions, plus récents dans main ; son correctif est donc intégré malgré le squash. Ces trois branches sont supprimées ; le tag de release existant est conservé. Les deux workflows ponctuels du 29 septembre, absents de main mais encore actifs dans GitHub, sont désactivés.

Sources actualisées : [Chokidar 6](https://github.com/paulmillr/chokidar), [mapping upstream](https://github.com/SyndiShanX/Update-Classes/commit/c110d209bb985d602de3080934a689b518096064), [accessibilité BetterDiscord](https://docs.betterdiscord.app/themes/concepts/accessibility), [mise à jour Discord du 22 octobre](https://discord.com/blog/discord-update-october-22-2026). Ces sources décrivent les outils et changements publics, sans garantir la compatibilité complète avec tous les rollouts Discord.

## Organisation et cascade

Le manifeste `scripts/lib/build-theme.js` impose l'ordre des modules. Le socle reste cohérent : `main.css` gère surfaces/layout/profils, `colors.css` les palettes et adaptations des tokens Discord, les modules nommés gèrent navigation, saisie, animations et options. `compatibility.css` puis `hardening.css` terminent le thème principal. `flavor-base.css` ajoute les exceptions partagées ; les wrappers fixent ensuite les palettes et particularités.

Les six variantes sun, space, north-polar, north-snow et north-aurora-dark/light partagent maintenant un seul bloc de surfaces utilitaires, activé par `--sibnight-flat-utilities`. Flat et Tokyo Night ne l'activent pas. Les variables publiques existantes et les crédits sont conservés. Aucun découpage mécanique de `colors.css` ou `main.css` : les séparer sans DOM Discord vérifiable augmenterait le risque de cascade pour peu de gain.

## Contrôles et portée

- `npm run quality` : build déterministe, parseur PostCSS, imports autorisés/placés correctement, métadonnées non vides/uniques, ordre des sources, fraîcheur, crédits, huit flavors, liens locaux, budgets de sélecteurs, protections overlays/non-lus, tests Node et audit des dépendances.
- `npm run format:check` contrôle uniquement les fins de fichier, tabulations et espaces de fin des sources CSS/JS. Ce n'est pas une normalisation stylistique complète.
- `npm run check:urls` : 11 fichiers Pages et les deux ressources externes existantes. `--match-local` exige aussi les mêmes contenus CSS après normalisation CRLF/LF et applique la politique CSS au contenu distant.
- `node scripts/browser-fixture.js` génère `output/browser-fixture.html`. Servir `output/` sur loopback, ouvrir le fichier dans Chromium et vérifier les neuf résultats. C'est une fixture synthétique, pas Discord : non-lus visibles, overlay transparent, transitions désactivées, pseudo-élément de menu non interactif.
- Scanner local : `./tools/security/security-scan.ps1 -Profile Full -Enforce`. Les rapports restent ignorés. Une sortie du scanner en mode rapport ne signifie pas que tous les contrôles passent.

PostCSS est le seul nouvel outil : il remplace l'absence de parseur et permet de vérifier les règles imbriquées. Il ne valide pas toutes les valeurs CSS, le rendu ni l'existence des classes Discord. Chokidar 4.0.3 conserve CommonJS et réduit les dépendances ; le watcher utilise un répertoire filtré, sans glob. La version 5 est ESM uniquement : cette migration n'apporte pas de gain nécessaire ici. Dotenv a été supprimé ; le watcher ne lit plus implicitement de fichier local.

## Mise à jour des classes et publication

L'action `metro420yt/class-update` reste épinglée au commit `24007abb2ae3488d7742270787f4807255ab0d97`, cible vérifiée du tag annoté v1. Le dépôt n'est pas archivé (dernière activité publiée : novembre 2025) ; la source SyndiShanX est active en septembre 2026. Cela ne constitue pas une garantie de maintenance future.

Comparaison : conserver l'action minimise le code maison ; une nouvelle action tierce déplacerait le risque ; un remplaceur maison dupliquerait le traitement du mapping sans connaître le DOM. Le compromis retenu conserve l'action dans un job sans droit d'écriture, fige le mapping pour les deux passes et vérifie que seuls les hashes de classes changent. Aucun changement de déclarations, URL, conditions ou structure de sélecteurs n'est accepté automatiquement. Les invariants historiques contenant des classes dans `check.js` peuvent nécessiter une mise à jour manuelle documentée.

Le workflow produit un patch de 14 jours et **ne publie jamais**. Appliquer le patch sur le SHA du run, vérifier le diff, lancer le gate et la checklist ci-dessous avant commit/push autorisés. Un renommage qui dépasse les hashes est volontairement bloqué pour examen humain. Un patch périmé doit être régénéré, pas appliqué de force.

Le workflow de release est uniquement manuel, exige un nouveau tag et un gate vert ; aucun écrasement d'assets existants. Les archives de release contiennent des wrappers utilisant Pages : elles ne figent pas le CSS distant. `npm run bundle` produit les instantanés CSS pour un retour arrière local ; ils restent ignorés et la police distante est remplacée par le fallback local. Le logo distant reste inchangé. Pour restaurer Pages, créer un commit de revert examiné et validé, puis pousser normalement.

## État des lieux du 10 septembre 2026

Baseline : `219d953`, main propre et aligné sur origin/main, aucune PR ouverte, Pages legacy sur main à la racine. Le check initial échouait à cause de CRLF dans les builds du checkout Windows ; le contenu Git était en LF. `.gitattributes` et la comparaison normalisée corrigent cette divergence.

Les 13 modules CSS et les neuf installables ont été parcourus par analyse AST et recherches ciblées. Corrections : indicateurs non-lus et flèches de navigation restaurés, suppression du masquage global des scrollbars dans hardening, double filtre de bannière réduit, doublon de top-bar supprimé, mutualisation de six blocs utilitaires, priorité de reduced-motion renforcée et désactivation des transitions décoratives via le toggle.

Les anciens tokens, spécificités et exceptions de surfaces sont conservés lorsque leur remplacement exigerait un DOM authentifié. Les sélecteurs partiels et `:has()` restants sont budgétés ; les diminutions de duplication et de dépendances ne prouvent pas un gain CPU/FPS. Aucun benchmark Discord réel n'a été réalisé.

Résultats finaux sur `f15b753` : `npm ci --ignore-scripts`, `npm run quality`, six tests Node (26.7.0 et 24.21.0), neuf instantanés sans import CSS, 36 assertions Chromium synthétiques, `git diff --check` et le scan Full/Enforce sont PASS. Identité, Gitleaks, Opengrep, Trivy, SBOM, npm et zizmor passent ; le faux positif historique Gitleaks est documenté séparément. Les workflows modifiés ont été analysés localement, sans lancer de release ni dépenser des runs de sécurité distants. Leur exécution future sur Linux n'est pas présentée comme testée.

Pages a construit le commit publié et les 11 contenus CSS distants correspondent aux fichiers locaux (HTTP 200, text/css, aucune redirection). Le premier contrôle pendant le déploiement voyait encore l'ancien CSS ; le contrôle après déploiement passe. Les deux ressources existantes, police et logo, sont accessibles. Taille non compressée : build principal 130 811 → 129 195 octets ; socle flavor 139 838 → 140 117 ; somme des huit wrappers 73 698 → 62 941. La mutualisation réduit surtout la duplication des sources ; elle ne réduit pas de 10 Ko le CSS chargé par chaque flavor.

Discord accessible ici redirige vers la connexion. L'inventaire des feuilles publiques chargées par `/app` est partiel : l'absence d'une classe dans ces feuilles n'établit pas qu'elle est obsolète. Aucune substitution de classe n'a été inventée à partir de cette absence. Les versions Chromium évoquées dans certaines pages BetterDiscord sont anciennes et ne servent pas de preuve du moteur actuel.

## Sources primaires consultées

- BetterDiscord : [structure](https://docs.betterdiscord.app/themes/introduction/structure), [guidelines](https://docs.betterdiscord.app/themes/publishing/guidelines), [sélecteurs](https://docs.betterdiscord.app/themes/tutorials/selectors), [variables](https://docs.betterdiscord.app/discord/variables), [accessibilité](https://docs.betterdiscord.app/themes/concepts/accessibility), [performance](https://docs.betterdiscord.app/themes/concepts/performance), [imports](https://docs.betterdiscord.app/themes/tutorials/remote), [distribution](https://docs.betterdiscord.app/themes/publishing/distribution).
- [Vencord FAQ](https://vencord.dev/faq/) et [conditions Discord](https://discord.com/terms). Le thème ne fournit ni automatisation de compte ni contournement.
- [Updater épinglé](https://github.com/Metro420yt/class-update/tree/24007abb2ae3488d7742270787f4807255ab0d97), [mapping](https://github.com/SyndiShanX/Update-Classes), [Chokidar](https://github.com/paulmillr/chokidar), [PostCSS](https://github.com/postcss/postcss).
- Les licences des dépôts [Zelk](https://github.com/schnensch0/zelk), [Midnight](https://github.com/refact0r/midnight-discord) et [Tokyo Night](https://github.com/Dyzean/Tokyo-Night) ont été vérifiées comme MIT via GitHub. Les crédits légitimes sont maintenus.

## Checklist Discord regroupée

Activer un seul thème à la fois, commencer par le principal puis passer les huit flavors, avec priorité à Space, Sun, North Snow et Aurora Light.

1. Navigation : serveurs, salons, DMs, membres, paramètres utilisateur/serveur/salon, permissions, invitations, discovery si disponible ; flèches retour/avance, recherche et contrôles de fenêtre, en fenêtre large puis étroite.
2. Chat : saisie, réponse, édition, mentions, réactions sélectionnées/non sélectionnées, embeds, pièces jointes, images/vidéos, threads et forums ; comparer scroll d'une longue liste avec thème activé/désactivé.
3. Surfaces flottantes : menu contextuel, tooltip, profil compact/complet, bannière personnalisée, modales, emoji/GIF/stickers, inbox et résultats de recherche. Avec Space, aucun écran recouvert par le fond et tous les boutons restent cliquables. Tester aussi le blur optionnel si utilisé.
4. États : notifications, badges, non-lus et nouveau message ; hover, focus clavier/Tab, actif et désactivé ; contraste des textes et mentions sur les flavors clairs, couleurs de rôles et statuts.
5. Voix : connexion/déconnexion, appel, vidéo et partage d'écran, mode plein écran/popout. Aucun contrôle essentiel caché ou superposé.
6. Accessibilité : préférence système de mouvement réduit, `--animations: off`, zoom/échelle habituels. Désactiver puis réactiver le thème ; vérifier qu'un instantané CSS connu permet le retour arrière.

Ces observations humaines restent nécessaires : aucun PASS synthétique ne les remplace.
