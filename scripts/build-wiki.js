const fs = require('node:fs');
const path = require('node:path');
const { FLAVORS } = require('./lib/flavors');
const root = path.resolve(__dirname, '..');
const SITE = 'https://ussmarines.github.io/Sibylla-Discord-Theme';
const WIKI = 'https://github.com/ussmarines/Sibylla-Discord-Theme/wiki';
const out = path.join(root, 'output/wiki');
fs.mkdirSync(out, { recursive: true });
fs.copyFileSync(path.join(root, 'docs/INSTALLATION.md'), path.join(out, 'Installation.md'));
fs.writeFileSync(path.join(out, 'Home.md'), `# Bienvenue dans le guide Sibylla

![Sibylla, thèmes Discord](${SITE}/assets/banners/repository-banner.jpg)

Vous n’avez jamais installé de thème Discord ? Le guide commence avec un Discord sans modification et vous accompagne jusqu’au thème activé.

## Commencer ici

**[Ouvrir le guide complet, étape par étape](${WIKI}/Installation)**

1. Préparer Discord et télécharger le bon fichier.
2. Choisir **Vencord OU BetterDiscord** et suivre le parcours correspondant.
3. Copier le fichier dans le bon dossier et activer son interrupteur.

Le guide comprend aussi les noms des boutons en anglais et en français, les variantes Windows/macOS/Linux, les extensions de fichiers, la mise à jour et le dépannage. Aucune connaissance de programmation n’est nécessaire pour installer le thème.

## Choisir une version

Les cinq versions gardent la même disposition. Une seule doit être active à la fois.

| Version | Téléchargement |
| --- | --- |
${FLAVORS.map(f => `| ${f.name} | [${f.id}.theme.css](${SITE}/dist/${f.id}.theme.css) |`).join('\n')}

[Comparer les aperçus du catalogue](${SITE}/) · [Lire le guide sur le site](${SITE}/installation.html)

## Besoin d’aide ?

[Consulter le dépannage](${WIKI}/Installation#r%C3%A9soudre-un-probl%C3%A8me) avant d’ouvrir une issue. Ne partagez jamais de mot de passe, de jeton ou de contenu de compte privé.

La source du guide est versionnée dans [docs/INSTALLATION.md](https://github.com/ussmarines/Sibylla-Discord-Theme/blob/main/docs/INSTALLATION.md). Le wiki et la page d’installation sont produits à partir de ce même document.
`);
fs.writeFileSync(path.join(out, '_Sidebar.md'), `## Sibylla

[Accueil du wiki](${WIKI})

[Guide complet](${WIKI}/Installation)

[Installer Vencord](${WIKI}/Installation#installer-vencord)

[Installer BetterDiscord](${WIKI}/Installation#installer-betterdiscord)

[Voir et télécharger les thèmes](${SITE}/)

[Signaler un problème](https://github.com/ussmarines/Sibylla-Discord-Theme/issues)
`);
fs.writeFileSync(path.join(out, '_Footer.md'), `Guide maintenu par [ussmarines](https://github.com/ussmarines). Les captures du catalogue utilisent uniquement des données fictives. [Sources et limites](${WIKI}/Installation#compatibilit%C3%A9-et-sources).\n`);
console.log('[Wiki] Home, Installation, sidebar and footer generated from the canonical guide');
