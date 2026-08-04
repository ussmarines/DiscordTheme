# Procédure d’audit de sécurité

Les workflows de sécurité sont uniquement manuels. Lancer d’abord `full` avec `report`, puis télécharger les rapports JSON expurgés conservés 30 jours.

L’identité publique autorisée est `ussmarines` et `https://github.com/ussmarines`. Le garde analyse l’arbre, les métadonnées et les blobs historiques via des empreintes SHA-256 sans afficher les identifiants civils. Toute nécessité d’identité réelle doit être approuvée avant modification.

Les outils Windows sont partagés dans `%LOCALAPPDATA%\ussmarines-security-tools` et s’installent une seule fois depuis `tools/security/install-security-tools.ps1` d’un dépôt déjà équipé, par exemple SpaceShooter, MailPerch, WP Image Usage Audit, Sibylla Referrals ou Sibylla Laser Flow.

Ne jamais recopier un secret détecté. Le révoquer immédiatement. Une réécriture d’historique exige une autorisation séparée.
