# Current approval — 25 October 2026

The owner tested all five themes, accepted their visual result and explicitly authorized publishing the main Sibylla theme and four flavors with updated documentation. The exact theme CSS is unchanged from that trial. Publication additionally checks deterministic builds, all distribution files, local documentation links and public artifact contents. Public previews are separately authored fictional scenes rendered with current CSS; they are not screenshots of the owner's account or new native compatibility evidence.

The dated sections below retain historical evidence and limits. Statements about pending review or no publication describe those earlier checkpoints, not the current approval.

# Validation — North Polar autonome 3.0.0

Candidat corrigé le 25 octobre 2026, déployé au laboratoire VPS et copié dans le thème Windows déjà actif. Sans publication, commit, push ou release. Main reste inchangé. Les sections du 24 ci-dessous décrivent le candidat précédent.

## Candidat courant — 25 octobre

- SHA-256 installable source/VPS/fichier Windows : `b333d3ce97436ca0e323e35821be78bbca717a32e90e89607e676d19710a3cb2`.
- CSS : 36 813 octets, 168 règles, six déclarations importantes, un `:has()` local inchangé. Pas de nouvelle dépendance, ressource distante, animation ou gestionnaire de défilement.
- Quality PASS : quatre tests, audit sans vulnérabilité connue. Fixture 72/72 PASS à 1600/1101. Comparaison sur l'ancienne feuille complète : les cinq nouvelles régressions échouent à chaque largeur, les autres restent vertes.
- Avatar/décoration : décalage horizontal mesuré 10 px avant, puis 0/0 px horizontal/vertical après. Native géométrie restaurée ; réponse et mention observées.
- Liste : catégories 48 → 40 px, lignes 36 → 32 px dans le contexte observé. Six crans déplacent scrollTop de 1214 à 1934, avec scrollHeight 3063 et clientHeight 815 stables. Preuve ciblée à la molette ; variations des membres vocaux et toutes les interactions ne sont pas certifiées.
- Colonne : poignée native opérationnelle dans les deux sens, largeur conservée au changement de salon et au rechargement. Fenêtre native mesurée 1103 × 803 après réduction ; boutons et titres accessibles. Captures privées `oct25-sidebar-reduced.png`, `oct25-sidebar-enlarged.png`, `oct25-fixed-narrow.png`, `oct25-reply-avatar-narrow.png`.
- Membres : fond de repos transparent, survol/focus-within discret, bannières personnelles conservées. La présence reste native.
- Fichier Windows précédent sauvegardé sous `.local/theme-backups/`, nouveau fichier d'empreinte identique, North Polar toujours seul activé. Pas de nouvelle revue exhaustive du rendu Windows.
- Incident d'exécution : une commande CSS a été envoyée dans un salon hors test à la suite d'une perte de focus de la console. Retrait autorisé par le propriétaire, suppression confirmée par lui et absence du message vérifiée. Aucun secret dans le texte ; validation visuelle du focus imposée avant les commandes suivantes. Cela corrige la portée des anciennes affirmations « aucun contenu hors serveur de test » pour cette passe.

Résultats détaillés et limites : [retours d'usage](NEXT_SESSION_FIXES.md). Aucun PASS universel de Discord, de toutes les décorations ou des performances FPS.

## Historique du 24 — candidat précédent

- CSS : 36,797 octets, 170 règles, six déclarations importantes. Budget 36 KiB incluant onze SVG Lucide locaux (six nouveaux glyphes vocaux et leurs états), sans paquet ou requête d'icônes à l'exécution.
- Installable local : SHA-256 `21fd38c2c95a913cc0611cbd737b544ab2aecfc181ba359254f1d8a52f94baff`. Concordance VPS relue : identique.
- Un seul `:has()` local pour l'état coché du commutateur natif ; toute autre requête relationnelle est rejetée. Aucun sélecteur partiel de classe, flou ou transition globale.
- Rail 72 px, sidebar totale 344 px, largeur utile des salons 272 px ; membres 256 px en fenêtre étroite.
- Icônes serveur 40 px, cadence 48 px, silhouette arrondie 8 px comme le dock. Les masques de badges restent natifs. Onglet plat centré 56 × 48 px, sans anneau. Dossiers ouverts et fermés sur surfaces Nord neutres.

## Vérification du lot compact

| Contrôle | Résultat et limite |
| --- | --- |
| `npm run quality` | PASS : build déterministe, contrôles de politique, quatre tests, audit sans vulnérabilité connue |
| Fixture navigateur | 62/62 assertions PASS sur la dernière recharge à 1600/1101 |
| Détecteur Impeccable layout | Une exécution pour ce lot, aucun signalement ; ne prouve pas la fidélité visuelle |
| Dossier déplié | Observé en Discord natif : fond et icônes centrés, rythme compact, arrondi cohérent |
| Défilement du rail | Haut et bas atteints ; dialogue Ajouter un serveur ouvert sans création ; Découvrir visible |
| Fenêtre 1101 × 801 | Géométrie native relue ; en-tête, composer, identité, quatre actions et épingles accessibles |
| Notifications | Sous-menu natif complet ouvert sans modifier les réglages ; Mark Unread produit barre Frost « 3 nouveaux messages », séparateur Nouveau et repère de salon |
| Dock vocal | Six nouveaux SVG de même famille ; caméra désactivée par absence de matériel ; Soundboard ouvert sans jouer de son. Sélecteur d'activités et sélecteur de partage ouverts sans lancer d'application ni diffuser |
| Revue indépendante | ship sur le lot compact ; captures finales de deux dossiers et du rendu étroit relues |

Deux dossiers simultanément dépliés et leur jonction ont été observés. La sélection d'un serveur à l'intérieur d'un dossier et toutes les combinaisons de badges de mention restent hors preuve. Les compteurs natifs avaient été observés au checkpoint antérieur ; ils ne sont pas revendiqués comme nouvelle preuve pour chaque combinaison.

## Banc persistant et limites

Theme Lab reste conservé : north-lecture, north-vocal, north-forum, post Lecture et navigation, messages de lecture, citation, mention et épingle. Aucun reset. Un message supplémentaire de contrôle a été envoyé puis édité dans Theme Lab ; aucune donnée d'authentification n'y figure.

Au checkpoint précédent, l'ajout de onze paquets Ubuntu officiels sans mise à niveau/suppression a résolu les bibliothèques vocales manquantes. Voix connectée et partage de la seule fenêtre Discord avec aperçu puis arrêt ont été observés. Menus audio et focus clavier ont été contrôlés. Ce sont des preuves historiques bornées, pas de nouveaux tests matériels.

Aucune validation universelle de Discord, approbation intégrale de fidélité par le propriétaire, preuve BetterDiscord réel, rendu Windows personnel, lecteur d'écran, caméra/audio physiques ou réception du partage par un tiers. Annonces/Scène n'ont pas été créés. L'échantillon historique de laboratoire entier (17,89 % d'un cœur, 684,1 MiB sur cinq secondes) n'est ni une mesure FPS ni le coût du CSS seul.

Captures privées ignorées sous `.impeccable/review/` ; ne pas les publier. Les autres variantes sont conservées sous legacy et ne sont pas contrôlées dans cette passe.

## Confirmation voix, MP, infobulles et paramètres — 24 octobre

- Candidat final : 36 797 octets, 170 règles, six déclarations importantes, un seul `:has()` limité au commutateur natif. SHA-256 local et VPS identiques : `21fd38c2c95a913cc0611cbd737b544ab2aecfc181ba359254f1d8a52f94baff`.
- Scène vocale avec chat étroit : deux zones verticales ; commandes natives complètes visibles. Preuves privées `voice-chat-final-narrow.png` et `voice-chat-narrow-menu.png`. Revue indépendante bornée favorable au lot vocal précédent ; les nouvelles corrections MP/Halo ne sont pas incluses dans ce verdict.
- Signal réseau natif mesuré 16 × 16 px, sans masque figé ; états et opacités natifs conservés. Les mauvaises conditions réseau n'ont pas été provoquées.
- Halo : les deux miniatures étaient rangées en haut d'une boîte de 48 px, ce qui décalait leur centre visuel par rapport à l'ancre native. Centrage du contenu flex, sans déplacer les infobulles. Survol fermé et dossier déplié observés à 1101 × 801 ; captures `halo-tooltip-final-narrow.png` et `halo-expanded-final-narrow.png`.
- MP : accueil Amis puis conversation existante inspectés en lecture seule. Appel, vidéo, épingles, groupe, recherche, pièces jointes et commandes du composer visibles ; aucun message ni appel envoyé. La décoration de ligne MP est neutralisée pour conserver la sélection Nord ; la bannière native du compte reste intacte.
- En-têtes MP gauche/droite : même token de hauteur 60 px ; jonction inférieure alignée en Discord réel. Capture privée `dm-header-aligned-narrow.png`. Les captures MP ne sont pas destinées à la publication.
- Confirmation finale : chat vocal rouvert puis fermé à largeur étroite, titre et flèches séparés ; retour en grande fenêtre avec chat latéral et commandes natives visibles. Captures `voice-chat-current-final-narrow.png`, `voice-chat-closed-final-narrow.png` et `voice-chat-current-final-wide.png`. Le bas du rail reste atteignable avec Halo déplié (`halo-expanded-rail-bottom.png`).
- Paramètres natifs : Voix/Vidéo, Caméra, Apparence, Accessibilité et Notifications observés en fenêtre étroite. Notifications et menu déroulant revérifiés ; valeurs conservées. Les réglages de paiement, sécurité et toutes les permutations ne sont pas exécutés.
- North Polar seul activé, aucun lien de thème distant, QuickCSS vide observé dans le DOM. L'inspecteur a été fermé après des mesures de styles ; aucune lecture d'authentification.
- Contrôles locaux finaux : quality PASS, quatre tests, audit zéro vulnérabilité connue. Les 62 assertions synthétiques couvrent une fixture distincte ; elles ne prouvent pas toutes les interfaces Discord ni un coût FPS nul.

Aucun commit, push ou publication. Les preuves matérielles et les autres limites énoncées ci-dessus restent ouvertes.

## MP de groupe, profils et popups — passe complémentaire

Candidat local/VPS `21fd38c2c95a913cc0611cbd737b544ab2aecfc181ba359254f1d8a52f94baff` : 36 797 octets, 170 règles, six déclarations importantes et un seul `:has()` local inchangé. Quality PASS (quatre tests, audit zéro). La correction ajoute une règle de 57 octets ; aucun script, ressource ou effet supplémentaire.

- MP de groupe existant à cinq membres : en-tête, liste, lecture, composer et boutons observés à 1101 × 801, sans message ni appel ni modification du groupe.
- Défaut corrigé : l'opacité native 0,3 de toute la ligne hors ligne rendait les noms trop sombres. L'opacité du composant membre est rétablie à 1, sans changer les données de présence ni les indicateurs natifs. Capture privée `group-members-readable-narrow.png`.
- Profils personnalisés compact et complet observés, ainsi qu'un profil tiers compact/complet et son menu : bannières et identité natives conservées, actions et fermeture accessibles. Captures `profile-rich-popout-narrow.png`, `profile-full-narrow.png`, `profile-peer-popout-narrow.png`, `profile-peer-full-narrow.png`, `profile-menu-narrow.png`. Aucun envoi, ajout, blocage, invitation ni édition effectué.
- Épingles vides du groupe, menu contextuel et menu de pièces jointes ouverts : labels lisibles et menus contenus dans la fenêtre. Sélecteur d'émojis ouvert avec recherche, catégories et focus visibles ; aucune sélection envoyée.
- Onglets GIF et Autocollants également ouverts, contenus et recherche visibles. Formulaire d'ajout au groupe inspecté puis fermé, sans membre sélectionné ni copie de lien. Capture finale du groupe : `group-dm-final-narrow.png` ; aucun nom de membre ni contenu privé n'est ajouté aux documents publics.
- Une première fiche tierce est restée en squelette de chargement ; cet état ne valide pas son contenu final. Les autres profils chargés fournissent une preuve distincte, pas un PASS de tous les comptes.
- Le tunnel SSH local a dû être rétabli sur le même port loopback 6087. Le service du laboratoire était actif ; aucune modification des services AI Desk Actor, Caddy ou PostgreSQL.

Captures MP/profils privées et ignorées ; aucune publication. Les 62 assertions synthétiques du checkpoint précédent restent une preuve antérieure de la géométrie inchangée, pas un nouveau test des profils.

## Acceptation, installation Windows et arrêt du laboratoire

**Retours d'usage après installation :** quatre défauts restent ouverts (décorations d'avatar, défilement de la liste, redimensionnement de la colonne, fonds sombres des membres). Voir [la préparation de reprise](NEXT_SESSION_FIXES.md). L'acceptation pour essai ne constitue pas une validation de ces comportements. Les médias utilisateur ont été examinés hors ligne ; aucune correction ni reproduction live effectuée dans cette préparation.

Le 24 octobre, le propriétaire valide le thème pour une période d'essai sur son PC. La version exacte ci-dessus est copiée dans `%APPDATA%/Vencord/themes/north-polar.theme.css`. Empreinte relue identique, North Polar seul activé dans Vencord, zéro lien de thème distant. Activation et rendu natif observés dans Discord Windows 1.0.9265, sur Theme Lab. Les autres thèmes sont laissés intacts et désactivés. Captures privées `local-north-polar-enabled.png` et `local-north-polar-theme-lab.png`. Cela prouve l'installation et ce rendu, pas un usage prolongé ni tous les états Windows.

À sa demande, le laboratoire VPS a été arrêté : `discord-lab.service` inactive/dead, MainPID 0. Point de reprise privé `/var/backups/discord-lab/discord-lab-20261024T175947Z.tar.gz`, permissions 0600 sous dossier 0700, six fichiers vérifiés et checksum archive OK. Périmètre : thèmes, réglages UI non sensibles, lanceur et unité systemd ; aucun export d'authentification. Le profil original reste intact sur le VPS. Aucun test de restauration complète de session n'est revendiqué. Tunnel graphique local fermé ; les autres services ne sont pas arrêtés. Aucune publication Git.

## Five-theme family — 25 October 2026

Scope: color/background variants only, using the approved North Polar geometry. Sibylla is the main theme; the four standalone flavors are North Polar, North Snow, Spatial and Tokyo-night. Old Sibnight code is removed from active sources into a private recoverable copy. No Git publication, release or personal Windows theme replacement occurred in this pass.

Local checks: five unit/policy tests PASS; dependency audit reports zero known vulnerabilities. The flavor regression test verifies that every variant starts with the entire unchanged North stylesheet, and that appended declarations only change custom properties, color, color-scheme or backgrounds. One exact local :has() remains per theme. CSS without bitmap payload is limited to 42 KiB for flavors; total CSS is limited to 240000 bytes. North Polar retains its 36 KiB budget and approved installable SHA256 b333d3ce97436ca0e323e35821be78bbca717a32e90e89607e676d19710a3cb2.

Synthetic browser palette checks: 65/65 PASS, comprising 60 main/secondary/heading contrast pairs across canvas/index/control/raised surfaces and five bitmap-presence guards. The smallest measured secondary-text surface ratio is 5.31:1 (North Polar control). These measurements are for the solid tokens; they do not certify every pixel of an image, personalized profile, disabled state or external embed.

Native Discord Linux/Vencord: the laboratory remained authenticated. Only one theme was active during each observation. Sibylla, North Snow, Spatial and Tokyo-night were activated and inspected in actual conversations at native window sizes around 1103×803 and maximized 1600×1000. North Polar was observed at session start and is byte-identical to its previously tested candidate. Geometry, text, account artwork, channel navigation, composer actions and header controls remain in their shared positions. No new calls or messages were sent during this color pass.

Representative floating surfaces: Sibylla empty pins popover; Spatial populated pins in the narrow window; Tokyo-night channel context menu including notification options; North Snow populated pins and account/Vencord settings. North Snow initially exposed dark Vencord cards and light labels: corrected its scoped native color aliases and the actual Vencord cards, then verified the resulting readable settings and conversation. Selected text has an explicit light-on-deep-Frost treatment. Personal nameplates remain native.

Spatial uses the exact supplied photograph; its ship was observed in the upper message viewport at both window sizes. The artwork stays attached to that viewport while messages scroll. Sibylla uses the supplied original transparent emblem at the upper right, subdued to preserve reading. Both bitmap sources are embedded locally; existing Figtree remains the only font import. No new runtime package, script, animation or remote image URL was added.

Private captures: .impeccable/review/family-*.png. These are laboratory evidence, not public assets. Source and VPS installable hashes match for all five versions. Hardware audio/camera, BetterDiscord runtime, screen-reader behavior, all zoom values, every notification/account/server state and FPS are NOT EXECUTED in this differential pass. No universal compatibility or zero-lag claim. The new flavors await the owner's visual review.

## Publication packaging — 25 October 2026

After the owner's approval, the builder also writes the five self-contained downloads to tracked `dist/`. Packaging removes one redundant final blank line from each installable; the theme source and declarations are unchanged. North Polar's distributed SHA256 therefore differs from its historical trial bundle, while comparison after EOF normalization proves exact content preservation. The corresponding local `output/` copy matches `dist/` byte-for-byte.

Five public preview JPEGs (1600×1000) were generated with authored fictional members, server, channels and messages. They were visually inspected as a batch; no private capture was used. Each is labeled synthetic, and the preview scaffold never enters installed CSS. Local documentation link checks cover 24 links. The full local security suite reports seven checks passed (identity/history, redacted Gitleaks history, Opengrep, Trivy, SBOM, production dependency audit, offline Zizmor), with zero failed checks. A final newline-only packaging adjustment followed that scan; final quality and identity checks are repeated before commit.

## Published verification — 25 October 2026

[PR #17](https://github.com/ussmarines/Sibylla-Discord-Theme/pull/17) merged the approved family into main at 4e5c981db74c9f4f06f6fb0ba89081924d1d90e4. Both manual GitHub checks completed with no failed scanner steps: [secret/identity guard](https://github.com/ussmarines/Sibylla-Discord-Theme/actions/runs/40198874921), [repository security audit](https://github.com/ussmarines/Sibylla-Discord-Theme/actions/runs/40198877318). Downloaded redacted reports show zero identity, Gitleaks, Opengrep and Zizmor findings. [Pages deployment](https://github.com/ussmarines/Sibylla-Discord-Theme/actions/runs/40198993207) succeeded.

`npm run check:urls -- --match-local` passed against the published catalog, all 15 theme files (five builds, wrappers and installables) and all five public preview JPEGs. The public downloads match local distribution content; preview JPEGs match byte-for-byte. No private screenshots or operational backups were published. Follow-up documentation and line-ending-policy maintenance do not alter the approved CSS or the public previews.

## Repository identity — 25 October 2026

The owner selected `ussmarines/Sibylla-Discord-Theme`. GitHub repository name, description, homepage and eight relevant topics were updated; the existing repository identity and history are preserved. The local origin, five wrapper imports, downloadable metadata, build policy and documentation now use the new canonical URL. The old repository URL redirects to the new one; the README tells users to replace old Pages/wrapper URLs.

The 1280×640 JPEG banner is published in the README and applied as GitHub's custom social preview. The public repository-images asset matches the local banner byte-for-byte. Five public preview files retain identical pixels and bytes but now use their actual `.jpg` format instead of the incorrect `.png` extension. All current links were updated accordingly.

Quality passes five tests and the dependency audit; 25 local documentation links pass. The new Pages catalog, all 15 theme URLs and five preview images match local files; the banner at the new Pages address also matches. The old repository redirect was verified. No source declarations, approved layout or theme palette changed during this rename.

## 3.0.1 — Home icon accent, 25 October 2026

The owner's requested preview detail is now applied to the native direct-message/home SVG: its color uses the existing --sibnight-nord8 accent for every flavor. The generated rule changes only color; shape, size, unread badges, native navigation and focus remain intact. Shared CSS grows by 30 bytes to 36843 bytes, within the existing 36 KiB North limit; no selector or :has() is added.

The synthetic family fixture now checks the actual home SVG under an intentionally white parent, ensuring the accent comes from the theme rather than the preview scaffold. All 70 assertions pass, including this inheritance regression in each of the five flavors. Native Discord on the VPS shows the gold Sibylla home icon. Other current call/session state was preserved. Public illustrations already showed the intended colors and remain valid; private native captures are not published.

## Catalogue et guide — 25 octobre 2026

Revue finale indépendante Impeccable : SHIP, aucun correctif matériel ouvert. Rendu inspecté sur le navigateur à 1440px et dans une iframe de la page réelle à 390×844 (le navigateur de contrôle limite sa fenêtre principale à 1280px). Aucun débordement de page ; ce contrôle responsive ne constitue pas un essai sur téléphone physique. Contrastes du texte secondaire mesurés au-delà de9:1, lien d’évitement visible au clavier et téléchargement Sibylla réellement reçu, identique à dist/.

Génération HTML et ancres contrôlées pour le catalogue et le guide ; wiki publié depuis la même source Markdown, procédures vérifiées avec les documentations officielles. Le détecteur Impeccable a fonctionné une fois en mode regex dégradé :35 avis de rôles typographiques/couleurs, sans contrôle DOM/contraste complet. Ce résultat ne vaut pas un audit automatisé complet. Les rôles propres au site sont documentés séparément du thème Discord.

Les cinq CSS distribués restent inchangés. Le laboratoire VPS a été sauvegardé et retiré ; aucune restauration complète de la sauvegarde n’a été exécutée. Les archives privées excluent les données d’authentification. Le serveur Discord de test reste disponible.
