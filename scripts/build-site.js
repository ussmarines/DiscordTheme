const fs = require('node:fs');
const path = require('node:path');
const { FLAVORS } = require('./lib/flavors');
const { version } = require('../package.json');
const root = path.resolve(__dirname, '..');
const SITE = 'https://ussmarines.github.io/Sibylla-Discord-Theme';
const REPO = 'https://github.com/ussmarines/Sibylla-Discord-Theme';
const arrow = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const download = '<svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg>';
const catalog = {
    sibylla: { label: 'Le thème principal', title: 'Minuit, avec une touche d’or.', description: 'Une base sombre et des repères dorés. Le logo Sibylla reste discret, en haut à droite de la conversation.', colors: ['#04040b', '#fada7d', '#dbe8ff'], names: 'Minuit · Or · Givre', accent: '#fada7d' },
    'north-polar': { label: 'Flavor sombre', title: 'Le calme des nuits du Nord.', description: 'Les gris bleutés de Nord et ses accents Frost. Une palette douce pour les longues discussions.', colors: ['#2e3440', '#434c5e', '#88c0d0'], names: 'Polar Night · Frost', accent: '#88c0d0' },
    'north-snow': { label: 'Flavor claire', title: 'La même interface, en pleine lumière.', description: 'Des surfaces Snow Storm, des textes Polar Night et des repères bleus. La version claire de North.', colors: ['#eceff4', '#d8dee9', '#5e81ac'], names: 'Snow Storm · Polar Night', accent: '#d8dee9' },
    spatial: { label: 'Flavor orbitale', title: 'Un peu d’espace dans la conversation.', description: 'Un fond bleu profond et un vaisseau à l’horizon. L’image accompagne le chat sans remplacer vos contenus.', colors: ['#05121d', '#527fa5', '#8ecde4'], names: 'Nuit orbitale · Bleu glacier', accent: '#8ecde4' },
    'tokyo-night': { label: 'Flavor nocturne', title: 'Les couleurs de Tokyo, la nuit.', description: 'Une base nuit, des bleus lumineux et des nuances violettes, inspirés du thème Tokyo Night.', colors: ['#1a1b26', '#7aa2f7', '#bb9af7'], names: 'Nuit · Bleu · Violet', accent: '#bb9af7' },
};
function head(title, description, page = '') {
    return `<!doctype html>\n<html lang="fr">\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${description}"><meta name="theme-color" content="#08080f"><title>${title}</title><link rel="canonical" href="${SITE}/${page}"><link rel="icon" href="assets/sibylla-logo.svg" type="image/svg+xml"><meta property="og:type" content="website"><meta property="og:locale" content="fr_FR"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="${SITE}/assets/banners/repository-banner.jpg"><meta property="og:url" content="${SITE}/${page}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="assets/site/catalog.css"></head>\n`;
}
function header(guide = false) {
    return `<body id="haut"><a class="skip" href="#contenu">Aller au contenu</a><header class="site-header"><div class="wrap header-inner"><a class="brand" href="index.html" aria-label="Sibylla, accueil"><img src="assets/backgrounds/sibylla.png" alt="" width="34" height="34">Sibylla</a><nav class="site-nav" aria-label="Navigation principale"><a class="theme-nav" href="${guide ? 'index.html' : ''}#themes">Les thèmes</a><a href="installation.html"${guide ? ' aria-current="page"' : ''}>Installation</a><a href="${REPO}">GitHub ${arrow}</a></nav></div></header>`;
}
function footer() {
    return `<footer class="wrap site-footer"><p>Sibylla · par <a href="https://github.com/ussmarines">ussmarines</a> · <span data-theme-version="${version}">v${version}</span></p><nav class="footer-links" aria-label="Autres ressources"><a href="${REPO}/wiki">Wiki</a><a href="${REPO}/issues">Signaler un problème</a><a href="#haut">En haut</a></nav></footer></body></html>\n`;
}
function renderIndex() {
    return head('Sibylla — cinq thèmes, une même interface Discord', 'Découvrez Sibylla, North Polar, North Snow, Spatial et Tokyo-night. Comparez les aperçus, téléchargez votre thème et suivez le guide d’installation.') + header() + `
<main id="contenu"><div class="wrap"><section class="hero" aria-labelledby="titre"><h1 id="titre">Discord,<br><em>à votre couleur.</em></h1><div class="hero-copy"><p>Pour lire, discuter et rester en vocal. Une interface commune, cinq palettes à choisir selon vos envies.</p><a class="text-link" href="#themes">Trouver votre thème ${arrow}</a></div></section>
<nav class="palette-nav" aria-label="Choisir une palette">${FLAVORS.map(f => `<a href="#${f.id}" style="--sibnight-page-palette:${catalog[f.id].accent}">${f.name}<span>${f.id === 'sibylla' ? 'Principal' : f.id === 'north-snow' ? 'Clair' : 'Sombre'}</span></a>`).join('')}</nav>
<div id="themes">${FLAVORS.map((flavor, index) => {
        const c = catalog[flavor.id];
        return `<article class="theme" id="${flavor.id}" style="--sibnight-page-palette:${c.accent}" aria-labelledby="titre-${flavor.id}"><header class="theme-heading"><h2 id="titre-${flavor.id}">${flavor.name}</h2><p>${c.label}</p></header><div class="theme-layout"><figure><a class="preview-link" href="assets/previews/${flavor.id}.jpg" target="_blank" rel="noopener" aria-label="Agrandir l’aperçu ${flavor.name}, nouvel onglet"><img src="assets/previews/${flavor.id}.jpg" alt="Aperçu de ${flavor.name} : ${c.names.toLowerCase()}, avec une conversation et des membres fictifs." width="1600" height="1000" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></a><figcaption class="image-caption"><span>Contenu de démonstration fictif</span><a href="assets/previews/${flavor.id}.jpg" target="_blank" rel="noopener" aria-label="Voir ${flavor.name} en grand, nouvel onglet">Voir en grand ${arrow}</a></figcaption></figure><div class="theme-copy"><h3>${c.title}</h3><p>${c.description}</p><div class="swatches" aria-hidden="true">${c.colors.map(color => `<i style="--sibnight-page-swatch:${color}"></i>`).join('')}</div><p class="palette-label">${c.names}</p><a class="download" href="dist/${flavor.id}.theme.css" download="${flavor.id}.theme.css">${download}Télécharger ${flavor.name}</a><small class="file-note">${flavor.id}.theme.css · v${version}</small></div></div></article>`;
    }).join('')}</div><p class="catalog-note">Les aperçus sont des illustrations du thème avec des données entièrement fictives. Aucune capture de compte personnel n’est utilisée.</p></div>
<section class="installation" id="installation" aria-labelledby="titre-installation"><div class="wrap install-layout"><div><h2 id="titre-installation">Votre thème,<br>en quelques étapes.</h2><p class="intro">Une première installation ? Le guide vous accompagne, clic par clic, avec Vencord ou BetterDiscord.</p><a class="text-link" href="installation.html">Ouvrir le guide complet ${arrow}</a></div><ol class="install-steps"><li><strong>Choisissez votre version.</strong><p>Téléchargez un fichier <code>.theme.css</code> ci-dessus. Rien à décompresser.</p></li><li><strong>Ouvrez le dossier des thèmes.</strong><p>Dans les paramètres de Vencord ou BetterDiscord : Themes → Open Themes Folder. Copiez votre fichier dedans.</p></li><li><strong>Activez le thème.</strong><p>Revenez dans Discord et activez son interrupteur. Gardez une seule version active à la fois.</p></li></ol></div></section>
<section class="wrap compatibility" aria-labelledby="compatibilite"><h2 id="compatibilite">Avant de vous lancer</h2><p>Ces thèmes s’utilisent avec Discord sur ordinateur et un outil de personnalisation. Le rendu a été contrôlé avec Vencord ; un essai natif complet dans BetterDiscord n’est pas revendiqué. Le <a href="installation.html">guide d’installation</a> précise les étapes et le dépannage.</p></section></main><script src="assets/site/catalog.js" defer></script>` + footer();
}
function escape(s) { return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }
function inline(s) {
    return escape(s).replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+|#[^\s)]+)\)/gu, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/gu, '<strong>$1</strong>').replace(/`([^`]+)`/gu, '<code>$1</code>');
}
function slug(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/gu, '').toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, ''); }
// Small, bounded renderer for our authored guide: headings, text, lists, tables and code.
function guideBody(markdown) {
    const lines = markdown.replace(/\r\n/gu, '\n').split('\n');
    const html = [], toc = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        if (line.startsWith('```')) {
            const code = [];
            while (++i < lines.length && !lines[i].startsWith('```')) code.push(lines[i]);
            html.push(`<pre><code>${escape(code.join('\n'))}</code></pre>`); continue;
        }
        const heading = /^(#{2,3}) (.+)$/u.exec(line);
        if (heading) {
            const id = slug(heading[2]);
            if (heading[1].length === 2) toc.push({ id, title: heading[2] });
            html.push(`<h${heading[1].length} id="${id}">${inline(heading[2])}</h${heading[1].length}>`); continue;
        }
        if (line.startsWith('|') && lines[i + 1]?.startsWith('| ---')) {
            const cells = row => row.split('|').slice(1, -1).map(cell => cell.trim());
            html.push(`<div class="table-wrap"><table><thead><tr>${cells(line).map(c => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>`); i++;
            while (lines[i + 1]?.startsWith('|')) html.push(`<tr>${cells(lines[++i]).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`);
            html.push('</tbody></table></div>'); continue;
        }
        if (/^\d+\. /u.test(line) || /^- /u.test(line)) {
            const ordered = /^\d+\. /u.test(line), tag = ordered ? 'ol' : 'ul', pattern = ordered ? /^\d+\. /u : /^- /u;
            html.push(ordered ? `<ol start="${Number(line.match(/^\d+/u)[0])}">` : `<${tag}>`);
            do { html.push(`<li>${inline(lines[i].replace(pattern, ''))}</li>`); } while (pattern.test(lines[++i] || ''));
            i--; html.push(`</${tag}>`); continue;
        }
        html.push(`<p>${inline(line)}</p>`);
    }
    return { html: html.join('\n'), toc };
}
function renderGuide() {
    const md = fs.readFileSync(path.join(root, 'docs/INSTALLATION.md'), 'utf8').replace(/\r\n/gu, '\n');
    const blocks = md.split('\n\n');
    const lead = blocks[1], body = guideBody(blocks.slice(2).join('\n\n'));
    return head('Installer les thèmes Sibylla — guide Vencord et BetterDiscord', 'Un guide pas à pas pour installer Vencord ou BetterDiscord, télécharger un thème Sibylla, l’activer et résoudre les problèmes courants.', 'installation.html') + header(true) + `<main id="contenu" class="wrap"><header class="guide-hero"><h1>Installer votre thème.</h1><p>${inline(lead)}</p><a class="text-link" href="${REPO}/wiki/Installation">Lire aussi dans le wiki ${arrow}</a></header><div class="guide-layout"><nav class="guide-toc" aria-label="Sommaire du guide"><strong>Dans ce guide</strong>${body.toc.map(item => `<a href="#${item.id}">${escape(item.title)}</a>`).join('')}</nav><article class="guide-content" aria-label="Instructions détaillées">${body.html}</article></div></main>` + footer();
}
if (require.main === module) {
    fs.writeFileSync(path.join(root, 'index.html'), renderIndex());
    fs.writeFileSync(path.join(root, 'installation.html'), renderGuide());
    console.log('[Site] catalog and beginner installation guide generated');
}
module.exports = { renderIndex, renderGuide };
