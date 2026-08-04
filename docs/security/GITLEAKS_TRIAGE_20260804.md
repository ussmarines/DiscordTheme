# Triage Gitleaks du 4 août 2026

## Faux positif historique `private-key`

Le fingerprint suivant est ignoré de manière ciblée :

```text
06d7d0a7865e2886980559b9138aaaf4e1d6a928:.github/scripts/security_guard.py:private-key:10
```

Le contenu détecté dans ce commit historique est le marqueur littéral que
`.github/scripts/security_guard.py` construit pour reconnaître des en-têtes de
clés privées. Il s'agit de la logique du détecteur, et non d'une clé privée.

L'exception porte uniquement sur ce fingerprint historique. Le fichier
`.github/scripts/security_guard.py` reste analysé et la règle Gitleaks
`private-key` reste active pour tous les autres emplacements et commits.
