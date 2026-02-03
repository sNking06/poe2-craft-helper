# 🚀 Guide de Publication sur GitHub

## Étape 1 : Configuration Git (À faire une seule fois)

Ouvre un terminal et exécute ces commandes (remplace par tes infos) :

```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton-email@example.com"
```

## Étape 2 : Créer le Repository sur GitHub

1. Va sur **https://github.com/new**
2. Nom du repo : `poe2-craft-helper`
3. Description : `🔨 Guide de crafting intelligent pour Path of Exile 2 avec simulateur interactif`
4. **Public** (ou Private si tu préfères)
5. **NE PAS** initialiser avec README, .gitignore ou license (on les a déjà)
6. Cliquer **Create repository**

## Étape 3 : Lier ton Projet Local à GitHub

Copie l'URL de ton repo (sera quelque chose comme `https://github.com/TON-USERNAME/poe2-craft-helper.git`)

Puis exécute ces commandes dans le dossier `poe2-craft-helper` :

```bash
# Se positionner dans le dossier
cd "C:\Users\slebl\PROJET CLAUDE\poe2-craft-helper"

# Le repo est déjà initialisé, on va juste faire le commit
git commit -m "Initial commit - PoE2 Craft Helper v2.1

✨ Features:
- Simulateur de craft interactif avec RNG réaliste
- Graphiques de statistiques (Chart.js)
- Mode Light/Dark theme toggle
- 15 essences documentées (7 tiers chacune)
- Icônes SVG pour currency
- Comparateur de stratégies
- Système de favoris et historique

🎯 Version: 2.1.0
📦 100% vanilla JavaScript
🎨 Thème PoE authentique

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (REMPLACE l'URL par la tienne !)
git remote add origin https://github.com/TON-USERNAME/poe2-craft-helper.git

# Pousser vers GitHub
git push -u origin main
```

## Étape 4 : Activer GitHub Pages

1. Va sur ton repo GitHub
2. **Settings** (en haut à droite)
3. **Pages** (dans le menu de gauche)
4. Source : **Deploy from a branch**
5. Branch : **main** / **(root)**
6. Cliquer **Save**

Attends 2-3 minutes, puis ton site sera disponible à :
```
https://TON-USERNAME.github.io/poe2-craft-helper
```

## Étape 5 : Personnaliser le README

Le README.md contient déjà tout ce qu'il faut, mais tu peux :

1. Ajouter des badges (voir ci-dessous)
2. Mettre des screenshots
3. Ajouter l'URL de ton site GitHub Pages

### Badges à ajouter

Ajoute ça en haut du README.md :

```markdown
![Version](https://img.shields.io/badge/version-2.1.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![PoE2](https://img.shields.io/badge/Path%20of%20Exile-2-red)
![Status](https://img.shields.io/badge/status-stable-green)

**🌐 Live Demo:** [https://TON-USERNAME.github.io/poe2-craft-helper](https://TON-USERNAME.github.io/poe2-craft-helper)
```

## Étape 6 : Mettre à Jour le Projet Plus Tard

Quand tu fais des modifications :

```bash
cd "C:\Users\slebl\PROJET CLAUDE\poe2-craft-helper"

# Voir les fichiers modifiés
git status

# Ajouter les modifications
git add .

# Créer un commit
git commit -m "Description de tes modifications"

# Pousser vers GitHub
git push
```

Le site GitHub Pages se mettra à jour automatiquement en 1-2 minutes.

---

## 🎨 Améliorations Optionnelles

### Ajouter un Fichier .github/workflows/pages.yml

Créer `.github/workflows/pages.yml` avec :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

### Ajouter des Screenshots

1. Prends des screenshots de ton site
2. Créer un dossier `screenshots/`
3. Ajouter les images
4. Les référencer dans README.md

```markdown
## 📸 Screenshots

### Page Principale
![Main Page](screenshots/main.png)

### Simulateur
![Simulator](screenshots/simulator.png)
```

### Ajouter un FUNDING.yml

Si tu veux accepter des donations :

Créer `.github/FUNDING.yml` avec :

```yaml
# GitHub sponsors
github: [TON-USERNAME]

# Ko-fi
ko_fi: TON-USERNAME

# PayPal
custom: ['https://paypal.me/TON-USERNAME']
```

---

## 🐛 Dépannage

### Erreur "Permission denied"

Si tu as une erreur de permission :

```bash
# Utilise HTTPS avec token personnel
# Va sur GitHub Settings → Developer settings → Personal access tokens
# Créé un token avec scope "repo"
# Utilise-le comme mot de passe quand Git le demande
```

### Erreur "Repository not found"

Vérifie que :
1. L'URL du remote est correcte : `git remote -v`
2. Le repo existe bien sur GitHub
3. Tu as les droits d'accès

### Pages ne se met pas à jour

1. Attends 5-10 minutes (peut être lent)
2. Va dans Actions (sur GitHub) pour voir si le déploiement s'est bien passé
3. Vide le cache du navigateur (Ctrl+F5)

---

## ✅ Checklist Finale

Avant de partager ton projet :

- [ ] Git configuré avec ton nom/email
- [ ] Repo créé sur GitHub
- [ ] Code pushé vers GitHub
- [ ] GitHub Pages activé
- [ ] Site accessible et fonctionnel
- [ ] README mis à jour avec l'URL du site
- [ ] .gitignore présent (empêche de commit des fichiers inutiles)
- [ ] LICENSE présent (MIT déjà inclus)

---

## 🎉 Partage ton Projet !

Une fois en ligne, partage-le sur :

- 🎮 **Reddit** : r/pathofexile, r/PathOfExile2
- 💬 **Discord PoE** : Channels outils communautaires
- 🐦 **Twitter/X** : #PathOfExile2 #PoE2
- 📱 **TikTok** : Démo vidéo du simulateur
- 📺 **YouTube** : Tutorial complet

### Message de Partage Suggéré

```
🔨 PoE2 Craft Helper v2.1 - Maintenant avec Simulateur Interactif !

✨ Testez vos crafts AVANT de dépenser de la currency
📊 Graphiques de vos stats de crafting
🌓 Mode dark/light
✨ 15 essences documentées

🌐 Essayez-le : https://TON-USERNAME.github.io/poe2-craft-helper
💻 Open source : https://github.com/TON-USERNAME/poe2-craft-helper

100% gratuit, aucune dépendance, fonctionne offline !
#PathOfExile2 #PoE2 #Crafting
```

---

**Bon craft, et bonne publication ! ⚔️**
