# 🚀 Démarrage Rapide GitHub - 3 Étapes

## ⚡ Étape 1 : Configure Git (1 minute)

Ouvre un terminal dans `poe2-craft-helper` et exécute :

```bash
git config --global user.name "Ton Nom"
git config --global user.email "ton-email@example.com"
```

**Exemple :**
```bash
git config --global user.name "slebl"
git config --global user.email "slebl@example.com"
```

## ⚡ Étape 2 : Crée le Repo sur GitHub (2 minutes)

1. Va sur https://github.com/new
2. Nom du repo : `poe2-craft-helper`
3. Description : `🔨 Guide de crafting intelligent pour Path of Exile 2`
4. **Public**
5. **NE PAS** cocher les options (README, gitignore, license)
6. Cliquer **Create repository**

## ⚡ Étape 3 : Pousse le Code (1 minute)

Copie l'URL de ton nouveau repo (sera du type `https://github.com/TON-USERNAME/poe2-craft-helper.git`)

Puis dans le terminal :

```bash
cd "C:\Users\slebl\PROJET CLAUDE\poe2-craft-helper"

# Crée le commit
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

# Renomme la branche
git branch -M main

# Ajoute le remote (REMPLACE par TON URL !)
git remote add origin https://github.com/TON-USERNAME/poe2-craft-helper.git

# Pousse vers GitHub
git push -u origin main
```

---

## 🌐 Étape 4 : Active GitHub Pages (1 minute)

1. Va sur ton repo GitHub
2. **Settings** → **Pages**
3. Source : **Deploy from a branch**
4. Branch : **main** / **(root)**
5. Cliquer **Save**

Attends 2-3 minutes, ton site sera à :
```
https://TON-USERNAME.github.io/poe2-craft-helper
```

---

## ✅ C'est Tout !

Ton site est maintenant en ligne et prêt à être partagé avec ta guilde ! 🎉

📖 Pour plus de détails : voir **GITHUB-SETUP.md**
