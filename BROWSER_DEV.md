# Browser Dev Workflow

```bash
npm install
npm run serve
```

Then evaluate this in Discord DevTools:

```js
fetch('http://127.0.0.1:8765/inject.js').then(r => r.text()).then(eval)
```
