# Contributing

Le thème reprend le modèle Midnight : les fichiers dans `src/` sont combinés dans `build/sibylla.css`.

Avant chaque commit :

```bash
npm run verify
```

Règles :

- ne pas recréer de flavors ;
- ne pas importer de CSS depuis le repo GitHub d'origine ;
- garder les crédits MIT de `refact0r/midnight-discord` ;
- garder `themes/sibylla.theme.css` comme seul thème installable ;
- garder `build/sibylla.css` comme build public importé depuis ce repo.
