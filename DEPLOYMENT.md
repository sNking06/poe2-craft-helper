# 🚀 Guide de Déploiement - PoE2 Craft Helper

Ce guide vous explique comment déployer votre outil sur Internet pour que votre guilde puisse y accéder.

---

## 🌐 Option 1 : GitHub Pages (Recommandé - Gratuit)

### Étapes

1. **Créer un compte GitHub** (si vous n'en avez pas)
   - Allez sur [github.com](https://github.com)
   - Inscrivez-vous gratuitement

2. **Créer un nouveau repository**
   - Cliquez sur "New repository"
   - Nom : `poe2-craft-helper`
   - Visibilité : Public
   - Cliquez sur "Create repository"

3. **Uploader vos fichiers**

   **Méthode A : Via l'interface web**
   - Cliquez sur "uploading an existing file"
   - Glissez-déposez tous les fichiers de votre dossier `poe2-craft-helper`
   - Commit les changements

   **Méthode B : Via Git (si installé)**
   ```bash
   cd poe2-craft-helper
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/poe2-craft-helper.git
   git push -u origin main
   ```

4. **Activer GitHub Pages**
   - Dans votre repo, allez dans "Settings"
   - Cliquez sur "Pages" dans le menu latéral
   - Source : Sélectionnez "main branch"
   - Cliquez sur "Save"

5. **Accéder à votre site**
   - Attendez 2-3 minutes
   - Votre site sera disponible à :
   ```
   https://VOTRE-USERNAME.github.io/poe2-craft-helper
   ```

### Avantages
✅ Gratuit
✅ Simple
✅ HTTPS automatique
✅ Mise à jour facile (commit = déploiement)

---

## 🚀 Option 2 : Netlify (Gratuit, Très Simple)

### Étapes

1. **Créer un compte Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Inscrivez-vous gratuitement

2. **Déployer**
   - Cliquez sur "Add new site" → "Deploy manually"
   - Glissez-déposez le dossier `poe2-craft-helper` complet
   - Attendez 30 secondes

3. **Personnaliser l'URL (optionnel)**
   - Allez dans "Site settings" → "Change site name"
   - Exemple : `poe2-craft-helper.netlify.app`

### Avantages
✅ Gratuit
✅ Ultra simple (drag & drop)
✅ HTTPS automatique
✅ Builds optimisés
✅ Domaine personnalisé possible

---

## ⚡ Option 3 : Vercel (Gratuit, Performance Max)

### Étapes

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Inscrivez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "New Project"
   - Importez depuis GitHub ou uploadez directement
   - Cliquez sur "Deploy"

3. **Accéder à votre site**
   - URL : `https://poe2-craft-helper.vercel.app`

### Avantages
✅ Gratuit
✅ Performance excellente
✅ CDN mondial
✅ Domaine personnalisé possible

---

## 🖥️ Option 4 : Serveur Personnel

### Avec Apache

Placez les fichiers dans `/var/www/html/poe2-craft-helper/`

Configuration Apache :
```apache
<VirtualHost *:80>
    ServerName poe2craft.votredomaine.com
    DocumentRoot /var/www/html/poe2-craft-helper
    <Directory /var/www/html/poe2-craft-helper>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Avec Nginx

Configuration Nginx :
```nginx
server {
    listen 80;
    server_name poe2craft.votredomaine.com;
    root /var/www/poe2-craft-helper;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Avantages
✅ Contrôle total
✅ Pas de limite
✅ Domaine personnalisé

### Inconvénients
❌ Coût serveur
❌ Configuration nécessaire
❌ Maintenance

---

## 🔐 HTTPS (SSL)

Pour tous les hébergements :

### GitHub Pages / Netlify / Vercel
HTTPS est **activé automatiquement**. Rien à faire !

### Serveur Personnel
Utilisez [Let's Encrypt](https://letsencrypt.org/) (gratuit) :

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-apache

# Obtenir un certificat
sudo certbot --apache -d poe2craft.votredomaine.com

# Renouvellement automatique
sudo certbot renew --dry-run
```

---

## 🔄 Mises à Jour

### GitHub Pages
```bash
# Modifier vos fichiers localement
git add .
git commit -m "Mise à jour X"
git push
# → Le site est automatiquement mis à jour
```

### Netlify
- **Via GitHub** : Push = déploiement auto
- **Manuel** : Glissez-déposez à nouveau le dossier

### Vercel
Même chose que Netlify

---

## 🌍 Domaine Personnalisé

### Acheter un domaine
- [Namecheap](https://namecheap.com) - ~10$/an
- [OVH](https://ovh.com) - ~5€/an
- [Cloudflare](https://cloudflare.com) - ~10$/an

### Configurer le DNS

Pour GitHub Pages :
```
Type: CNAME
Name: @
Value: VOTRE-USERNAME.github.io
```

Pour Netlify/Vercel :
```
Type: CNAME
Name: @
Value: votre-site.netlify.app (ou vercel.app)
```

Puis dans les settings de votre hébergeur, ajoutez le domaine personnalisé.

---

## 📊 Analytics (Optionnel)

### Google Analytics

Ajoutez avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Respectueux de la vie privée)

```html
<script defer data-domain="votredomaine.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🐛 Troubleshooting

### Le site ne se charge pas
- Vérifiez que `index.html` est à la racine
- Attendez 5-10 minutes après déploiement
- Videz le cache du navigateur (Ctrl+F5)

### Les styles ne s'appliquent pas
- Vérifiez les chemins dans `index.html` :
  - `css/style.css` (pas `/css/style.css`)
  - `js/app.js` (pas `/js/app.js`)

### Les scripts ne fonctionnent pas
- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs JavaScript
- Assurez-vous que les 3 fichiers JS sont chargés dans l'ordre

---

## 📱 Tests

Testez votre site sur :
- ✅ Desktop (Chrome, Firefox, Edge)
- ✅ Mobile (Android, iOS)
- ✅ Tablette

Outils de test :
- [BrowserStack](https://browserstack.com) (gratuit pour open-source)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## 🔒 Sécurité

✅ Pas de données sensibles dans le code
✅ Tout est côté client (pas de backend)
✅ HTTPS activé
✅ Pas de cookies ou tracking (sauf si vous ajoutez Analytics)

---

## 💬 Support Guilde

Partagez avec votre guilde :

```
🔨 PoE2 Craft Helper est en ligne !

URL : https://votre-site.netlify.app

🎯 Utilisez cet outil pour :
- Obtenir des guides de craft optimisés
- Estimer les coûts
- Éviter les pièges et risques
- Partager vos stratégies

Bon craft ! ⚔️
```

---

## 🎉 Félicitations !

Votre outil est maintenant accessible à toute votre guilde !

Pour toute question :
- Consultez la documentation de votre hébergeur
- Ouvrez une issue sur GitHub
- Demandez sur Discord

**Bon craft, Exile ! ⚔️**
