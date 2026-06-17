# Nettoyage V1 vers V2

La V2 ne contient plus l’ancienne flavor et ne doit plus garder les anciens fichiers de la V1.

Après extraction dans ton repo local, lance :

```bash
npm run cleanup:legacy
npm run verify
```

Ou supprime manuellement :

```text
themes/midnight.theme.css
themes/flavors/midnight-nord.theme.css
build/midnight-nord.css
src/base/import.css
src/flavors/nord.css
src/header-midnight-nord.txt
```

Le thème principal devient :

```text
themes/sibylla.theme.css
```
