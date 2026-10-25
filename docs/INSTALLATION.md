# Installer un thème Sibylla dans Discord

Ce guide vous accompagne depuis un Discord sans modification jusqu’au thème activé. Vous n’avez pas besoin de compte GitHub ni de connaissances en programmation pour installer le fichier du thème.

## Avant de commencer

Un thème est un fichier qui change l’apparence de Discord. Pour le charger dans l’application, il faut d’abord installer **Vencord OU BetterDiscord**. Choisissez un seul de ces outils pour ce guide ; les superposer complique le dépannage.

1. Utilisez un ordinateur Windows, macOS ou Linux et **l’application Discord de bureau**. Ce parcours ne concerne pas les applications Android/iOS ni Discord ouvert dans un navigateur.
2. Si Discord n’est pas installé, téléchargez-le depuis [discord.com/download](https://discord.com/download), installez-le et connectez-vous normalement.
3. Repérez la **roue dentée**, en bas à gauche de Discord, près du micro et du casque : elle ouvre les paramètres utilisateur.
4. Si vous avez déjà Vencord ou BetterDiscord, passez directement à la section « Activer le thème » correspondante. Vous n’avez pas besoin de le réinstaller.

Le thème ne demande jamais votre mot de passe, votre jeton Discord ou une connexion à un autre site. Ne transmettez aucune de ces informations pour obtenir de l’aide.

## Télécharger le thème

1. Ouvrez le [catalogue Sibylla](https://ussmarines.github.io/Sibylla-Discord-Theme/).
2. Regardez les aperçus. Toutes les versions gardent la même disposition ; seules les couleurs et les images de fond changent.
3. Cliquez sur **Télécharger** sous la version choisie. Pour commencer sans hésiter, prenez **Sibylla**, le thème principal.
4. Retrouvez le fichier dans le dossier **Téléchargements** de votre ordinateur. Son nom doit correspondre au tableau ci-dessous.

| Version | Nom exact du fichier |
| --- | --- |
| Sibylla | `sibylla.theme.css` |
| North Polar | `north-polar.theme.css` |
| North Snow | `north-snow.theme.css` |
| Spatial | `spatial.theme.css` |
| Tokyo-night | `tokyo-night.theme.css` |

**Vous devez avoir un fichier `.theme.css`, pas une archive ZIP.** Il n’y a rien à décompresser. N’utilisez pas le bouton GitHub « Code → Download ZIP » : il télécharge les sources du projet, pas le fichier prêt à installer.

### Si une page de texte s’ouvre au lieu du téléchargement

Le texte affiché est le contenu du thème : c’est normal. Utilisez **Enregistrer sous** dans le navigateur (Ctrl+S sur Windows/Linux, Cmd+S sur Mac). Choisissez votre dossier Téléchargements et conservez le nom exact, par exemple `sibylla.theme.css`. Si un type de fichier est demandé, sélectionnez **Tous les fichiers** plutôt qu’un document texte.

### Vérifier l’extension sur Windows

Dans l’Explorateur de fichiers, activez **Affichage → Afficher → Extensions de noms de fichiers** sur Windows 11, ou **Affichage → Extensions de noms de fichiers** sur Windows 10. Le fichier ne doit pas se terminer par `.txt`, `.html` ou `.css.txt`. Renommez-le pour obtenir exactement `sibylla.theme.css` si vous avez enregistré le CSS comme texte.

## Installer Vencord

Ce parcours utilise l’installateur officiel, pas les instructions de compilation pour développeurs.

### Sur Windows

1. Enregistrez ce que vous étiez en train d’écrire dans Discord, puis fermez complètement l’application. Si elle reste près de l’horloge Windows, faites un clic droit sur son icône et choisissez **Quitter Discord**.
2. Ouvrez [la page officielle de téléchargement Vencord](https://vencord.dev/download/), sélectionnez **Windows**, puis téléchargez `VencordInstaller.exe`.
3. Ouvrez ce fichier depuis Téléchargements. **Ne choisissez pas « Exécuter en tant qu’administrateur »** : Vencord demande une exécution normale.
4. Dans l’installateur, sélectionnez votre installation Discord habituelle. Si vous n’utilisez ni PTB ni Canary, choisissez l’installation standard.
5. Cliquez sur **Install**, ou **Install / Repair** selon la version, et attendez la fin de l’opération.
6. Rouvrez Discord. Cliquez sur la roue dentée, puis cherchez la section **Vencord** dans la colonne de gauche. Sa présence confirme que l’outil a été ajouté.

Si Windows ou votre protection empêche l’ouverture, vérifiez d’abord que le fichier provient du lien officiel ci-dessus, puis consultez les indications de Vencord. Ne désactivez pas votre antivirus pour installer un thème.

### Sur macOS

Sur [la page officielle Vencord](https://vencord.dev/download/), choisissez **Mac** et téléchargez l’installateur `.dmg`. Ouvrez-le, puis lancez l’installateur. Sélectionnez Discord, utilisez son action d’installation et rouvrez Discord. Vérifiez ensuite la présence de la section Vencord dans les paramètres. Pour un blocage d’ouverture propre à macOS, suivez la procédure officielle adaptée à votre version du système.

### Sur Linux

1. Fermez Discord, puis ouvrez l’application **Terminal** de votre distribution.
2. Ouvrez aussi [la page officielle Vencord, onglet Linux](https://vencord.dev/download/). Elle fournit la commande d’installation actuelle.
3. Copiez la commande officielle ci-dessous, collez-la dans le terminal (souvent Ctrl+Maj+V sous Linux), puis appuyez sur **Entrée**. Vous pouvez vérifier qu’elle correspond à la page Vencord avant de la lancer.

```sh
sh -c "$(curl -sS https://vencord.dev/install.sh)"
```

4. Suivez le menu de l’installateur, sélectionnez votre Discord et son action d’installation.
5. Rouvrez Discord et vérifiez la présence de **Vencord** dans ses paramètres.

**Discord installé par Snap n’est pas pris en charge par cet installateur.** La page officielle indique les distributions compatibles et propose aussi un installateur à télécharger. Les paquets personnalisés peuvent demander une adaptation ; si votre installation n’est pas détectée, consultez la procédure correspondant à ce paquet plutôt que de modifier des dossiers système au hasard.

### Activer le thème avec Vencord

1. Dans Discord, cliquez sur la **roue dentée** en bas à gauche.
2. Dans la colonne de gauche, descendez jusqu’à **Vencord**, puis cliquez sur **Themes** (Thèmes).
3. Choisissez **Local Themes** (Thèmes locaux), puis **Open Themes Folder** (Ouvrir le dossier des thèmes). Une fenêtre de fichiers s’ouvre : c’est le bon dossier, même s’il est vide.
4. Dans une deuxième fenêtre de fichiers, ouvrez **Téléchargements**. Copiez votre fichier, par exemple `sibylla.theme.css`, puis collez-le dans le dossier des thèmes. Vous pouvez aussi le glisser d’une fenêtre à l’autre.
5. Revenez à Discord. Si le thème n’apparaît pas, cliquez sur **Load missing Themes** (Charger les thèmes manquants), si ce bouton est présent, ou redémarrez Discord.
6. Une fiche **Sibylla**, **North Polar**, **North Snow**, **Spatial** ou **Tokyo-night** doit apparaître. Activez son interrupteur.
7. Désactivez les autres thèmes et quittez les paramètres. Le thème doit être visible immédiatement.

Utilisez bien **Local Themes** pour ce guide. Il n’est pas nécessaire de coller une adresse dans **Online Themes**, d’ouvrir un éditeur CSS ou d’activer un plugin.

## Installer BetterDiscord

1. Enregistrez votre travail dans Discord. Ouvrez [betterdiscord.app](https://betterdiscord.app/) et utilisez son bouton **Download** pour votre système.
2. Ouvrez le fichier téléchargé. L’installateur présente une licence : lisez-la et poursuivez si vous l’acceptez.
3. Choisissez **Install BetterDiscord**, puis **Next** (Suivant).
4. Sélectionnez votre Discord habituel. **Stable** correspond à la version standard ; ne choisissez PTB ou Canary que si vous utilisez réellement cette application.
5. Lancez l’installation et attendez son message de fin. Rouvrez Discord si nécessaire.
6. Ouvrez les paramètres utilisateur : une section **BetterDiscord** doit maintenant apparaître à gauche.

Les écrans peuvent varier selon le système et la version de l’installateur. Pour macOS et Linux, choisissez toujours le téléchargement correspondant à votre système sur le site officiel. La [procédure officielle BetterDiscord](https://docs.betterdiscord.app/users/getting-started/installation) reste la référence si les intitulés diffèrent.

### Activer le thème avec BetterDiscord

1. Téléchargez un des fichiers `.theme.css` du catalogue si ce n’est pas déjà fait.
2. Dans Discord, ouvrez la **roue dentée** en bas à gauche.
3. Descendez jusqu’à **BetterDiscord**, puis sélectionnez **Themes** (Thèmes).
4. Cliquez sur **Open Themes Folder** (Ouvrir le dossier des thèmes).
5. Copiez le fichier de Téléchargements vers le dossier qui vient de s’ouvrir. Mettez le fichier directement dedans, sans sous-dossier.
6. Revenez à la liste Themes de Discord et activez l’interrupteur du thème.
7. Désactivez les autres thèmes. Fermez les paramètres pour regarder le résultat.

Ne mettez pas le fichier dans **Plugins** : c’est un thème, pas un plugin. Aucun plugin supplémentaire n’est nécessaire.

### Si le bouton du dossier est introuvable

Le bouton intégré est préférable, car il ouvre le dossier de la bonne installation. Pour BetterDiscord uniquement, les emplacements standards documentés sont :

| Système | Dossier BetterDiscord |
| --- | --- |
| Windows | `%appdata%\BetterDiscord\themes` |
| macOS | `~/Library/Application Support/BetterDiscord/themes` |
| Linux | `~/.config/BetterDiscord/themes` |

Sur Windows, appuyez sur **Windows+R**, collez le chemin du tableau, puis validez. Si le dossier n’existe pas, vérifiez d’abord l’installation de BetterDiscord plutôt que de créer des dossiers au hasard. Ces chemins ne sont pas ceux de Vencord.

## Vérifier le résultat

1. Le nom du thème doit apparaître dans votre liste et son interrupteur doit être activé.
2. Un seul thème de cette famille doit être actif. Une flavor inclut déjà tout le thème : **n’activez pas Sibylla en plus de North Polar**, par exemple.
3. Ouvrez un salon textuel : Sibylla doit montrer ses tons minuit et or et son logo discret ; Spatial son fond orbital ; North Snow une interface claire.
4. L’icône des messages privés, en haut de la liste des serveurs, reprend la couleur d’accent de la version choisie.
5. Vérifiez que les boutons du micro, du casque et des paramètres restent accessibles.

Les aperçus du site utilisent des noms et messages fictifs. Ils présentent la palette : ils ne créent pas ces salons ni ces membres dans votre compte.

## Changer ou mettre à jour le thème

### Changer de palette

Téléchargez une autre version, placez son fichier dans le même dossier, désactivez l’ancienne et activez la nouvelle. Il n’est pas nécessaire de réinstaller Vencord ou BetterDiscord. Les cinq fichiers peuvent rester dans le dossier, mais un seul doit être actif.

### Mettre à jour un fichier local

1. Téléchargez à nouveau la version souhaitée depuis le catalogue officiel du projet.
2. Si vous avez modifié vous-même le CSS, gardez d’abord une copie de votre ancien fichier hors du dossier actif.
3. Remplacez l’ancien fichier dans le dossier des thèmes par le nouveau fichier du même nom. Acceptez le remplacement demandé par le système.
4. Évitez les doublons tels que `sibylla.theme (1).css`. Gardez un nom clair et une seule copie active de chaque version.
5. Revenez dans Discord ; désactivez/réactivez le thème ou redémarrez l’application si le changement n’est pas encore visible.

Le téléchargement autonome utilisé dans ce guide se met à jour en remplaçant le fichier. Ne supposez pas qu’une nouvelle publication du dépôt met automatiquement à jour votre copie locale.

## Résoudre un problème

### Je ne vois ni Vencord ni BetterDiscord dans les paramètres

Le thème seul ne suffit pas : l’outil de personnalisation n’est probablement pas ajouté à cette installation de Discord. Rouvrez son installateur officiel et vérifiez l’application sélectionnée. Si Discord vient d’être mis à jour, une réparation ou une réinstallation de l’outil peut être nécessaire. Ne réinstallez pas tout Discord en premier recours.

### Le thème ne figure pas dans la liste

Vérifiez le nom complet du fichier, son extension `.theme.css` et sa présence directement dans le dossier ouvert par **Open Themes Folder**. Un fichier `.txt`, une page `.html`, un ZIP ou un dossier contenant les sources ne convient pas. Dans Vencord, essayez **Load missing Themes** ; sinon redémarrez Discord.

### Le thème est activé mais le rendu est étrange

Désactivez temporairement les autres thèmes, les anciens liens de thèmes en ligne et votre CSS personnalisé (**QuickCSS** dans Vencord ou **Custom CSS** dans BetterDiscord). Sauvegardez d’abord vos personnalisations si vous voulez les conserver. Gardez seulement la version Sibylla choisie, puis redémarrez Discord.

### Le fond Spatial ou le logo Sibylla manque

Retéléchargez le fichier autonome depuis le catalogue, puis remplacez votre copie. Les fonds sont déjà inclus dedans : vous n’avez pas à télécharger une image séparée, renseigner un chemin ou activer la transparence.

### Je veux revenir à l’apparence normale de Discord

Désactivez l’interrupteur du thème. Pour le retirer complètement de la liste, déplacez son fichier hors du dossier des thèmes. Vous pouvez garder Vencord ou BetterDiscord sans activer de thème. Pour retirer également l’outil, utilisez son installateur ou sa documentation officielle.

### Cela ne fonctionne toujours pas

Ouvrez une [issue sur le dépôt](https://github.com/ussmarines/Sibylla-Discord-Theme/issues) avec votre système, le nom du thème, la version de Discord, l’outil utilisé et les étapes du problème. Une capture peut aider, mais masquez vos messages, pseudos et serveurs privés. N’envoyez jamais de mot de passe, jeton ou dossier de profil Discord.

## Compatibilité et sources

Les cinq versions ont été approuvées visuellement par le propriétaire. Le contrôle natif du projet a été effectué avec **Vencord sur Discord Linux** ; un essai complet dans BetterDiscord n’est pas revendiqué. Les procédures d’installation ci-dessus suivent les outils officiels, dont les écrans peuvent évoluer.

Sources consultées le 25 octobre 2026 : [Vencord — téléchargement officiel](https://vencord.dev/download/), [BetterDiscord — installation](https://docs.betterdiscord.app/users/getting-started/installation), [BetterDiscord — ajout de thèmes](https://docs.betterdiscord.app/users/guides/installing-addons), [BetterDiscord — dossiers des thèmes](https://docs.betterdiscord.app/themes/introduction/quick-start).
