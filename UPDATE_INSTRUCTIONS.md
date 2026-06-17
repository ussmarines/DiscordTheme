# Mise à jour depuis V4 vers V5

1. Extrait le ZIP à la racine du repo local `DiscordTheme`.
2. Supprime les anciens fichiers qui ne sont plus dans la V5 si ton explorateur ne les remplace pas automatiquement.
3. Lance :

```bash
npm run cleanup:legacy
npm run verify
```

4. Commit + push.
5. Dans Vencord, recharge le thème avec :

```text
https://raw.githubusercontent.com/ussmarines/DiscordTheme/main/themes/sibylla.theme.css
```

Si Vencord garde une ancienne version en cache, retire le thème de la liste, redémarre Discord, puis ajoute à nouveau l'URL.
