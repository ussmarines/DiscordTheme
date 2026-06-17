# Browser Dev

Cette page reprend le principe du workflow navigateur de Midnight, adapté au thème Sibylla.

## Lancer le serveur

```bash
npm install
npm run serve
```

Endpoints :

```text
GET http://127.0.0.1:8765/sibylla.css
GET http://127.0.0.1:8765/version
GET http://127.0.0.1:8765/inject.js
```

## Injecter dans Discord navigateur

Ouvre Discord dans un navigateur, ouvre les DevTools, puis exécute :

```js
fetch('http://127.0.0.1:8765/inject.js').then(r => r.text()).then(eval)
```

Des helpers sont disponibles dans :

```js
window.__sibylla
```
