# 🔨 PoE2 Craft Helper

Guide de crafting intelligent pour **Path of Exile 2** - Outil web communautaire pour aider votre guilde à crafter efficacement.

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://snking06.github.io/poe2-craft-helper/)
![PoE2](https://img.shields.io/badge/Path%20of%20Exile-2-gold?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.1.0-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌐 Accès Rapide

**🚀 Utilise l'application en ligne :** [https://snking06.github.io/poe2-craft-helper/](https://snking06.github.io/poe2-craft-helper/)

Aucune installation nécessaire - ouvre directement dans ton navigateur !

---

## 🎯 Fonctionnalités v2.1

### 🔨 Guide de Crafting
✅ **Analyse Intelligente** - Analyse automatique de vos objectifs de craft
✅ **Stratégies Optimisées** - Recommandations basées sur budget, difficulté et RNG
✅ **Estimations de Coûts** - Calculs réalistes (optimiste/moyen/pessimiste)
✅ **Gestion des Risques** - Identification des points critiques et mitigation
✅ **Plan B** - Alternatives en cas d'échec
✅ **Conseils d'Expert** - Tips d'optimisation économique et temporelle
✅ **Export/Partage** - Exportez vos guides en texte ou partagez via lien

### 🎮 Simulateur Interactif (NOUVEAU !)
✅ **Craft en Temps Réel** - Simulez vos crafts avec RNG réaliste
✅ **Orbs Interactifs** - Cliquez sur les icônes pour utiliser les currency
✅ **Auto-Simulation** - Testez 10, 100 ou 1000 crafts automatiquement
✅ **Statistiques Détaillées** - Taux de succès, coûts moyens, graphiques

### 📊 Outils Avancés
✅ **Comparateur de Stratégies** - Comparez toutes les méthodes en un clic
✅ **Graphiques Chart.js** - Visualisez vos coûts et statistiques
✅ **Système de Favoris** - Sauvegardez vos crafts préférés (localStorage)
✅ **Historique Complet** - Suivez vos 50 derniers crafts

### 🎨 Interface
✅ **Mode Dark/Light** - Toggle avec sauvegarde de préférence
✅ **Icônes Currency SVG** - 15+ orbs avec animations authentiques
✅ **UI Immersive** - Thème PoE dark/gold
✅ **100% Responsive** - Fonctionne sur mobile, tablette, desktop

---

## 🚀 Démarrage Rapide

### Option 1 : Ouvrir directement

1. Téléchargez ou clonez ce dossier
2. Ouvrez `index.html` dans votre navigateur
3. C'est tout ! Aucune installation requise.

### Option 2 : Serveur local (recommandé pour développement)

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Puis ouvrez http://localhost:8000
```

---

## 📖 Utilisation

### 1️⃣ Définir votre objectif

Remplissez le formulaire avec :
- **Type d'objet** (Arme, Armure, Bijou)
- **Base item** (ex: Regal Sceptre)
- **Item Level** (ilvl)
- **Budget** (Limité, Moyen, Élevé, Illimité)
- **Contexte** (Early/Mid/End game)
- **Trade autorisé** (Oui/Non)

### 2️⃣ Ajouter les mods souhaités

- Cliquez sur **"+ Ajouter un Mod"**
- Saisissez le nom du mod (autocomplétion disponible)
- Définissez la priorité : **Obligatoire / Souhaité / Optionnel**
- Sélectionnez le tier minimum : **Any / T1 / T2 / T3**

### 3️⃣ Générer le guide

Cliquez sur **"🔨 Générer le Guide de Craft"**

Vous obtiendrez :
- 📊 **Résumé** - Vue d'ensemble de l'objectif
- ✅ **Stratégie** - Étapes détaillées avec justifications
- 💰 **Coûts** - Estimations en Chaos Orbs
- ⚠️ **Risques** - Points critiques et solutions
- 🔁 **Plan B** - Alternatives en cas d'échec
- 🧩 **Conseils** - Optimisations économiques

### 4️⃣ Exporter ou partager

- 📄 **Exporter en texte** - Téléchargez un fichier .txt
- 🔗 **Copier le lien** - Partagez avec votre guilde

---

## 🎨 Captures d'écran

### Interface principale
![Interface](https://via.placeholder.com/800x400/1a1410/c9a55a?text=Interface+PoE2+Craft+Helper)

### Guide généré
![Guide](https://via.placeholder.com/800x400/1a1410/c9a55a?text=Guide+de+Craft+Détaillé)

---

## 🛠️ Structure du Projet

```
poe2-craft-helper/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles (thème PoE dark/gold)
├── js/
│   ├── data.js            # Base de données (mods, bases, méthodes)
│   ├── crafting-engine.js # Moteur de recommandations
│   └── app.js             # Logique UI et interactivité
├── data/                  # (Futur: données JSON externes)
├── assets/                # (Futur: images, icônes)
└── README.md              # Documentation
```

---

## 🧠 Méthodologies de Craft Supportées

| Méthode | Type | Utilisation |
|---------|------|-------------|
| **Alt-Regal-Exalt** | Semi-déterministe | 1-2 mods obligatoires spécifiques |
| **Essence Spam** | Semi-déterministe | Mod difficile à roll, garantie nécessaire |
| **Alchemy Spam** | Haute RNG | Budget limité, mods communs |
| **Trade Base** | Économique | Marché actif, capital disponible |
| **Harvest Craft** | Déterministe | End-game, accès craft bench |

---

## 📊 Données

### Sources de données PoE2

L'application utilise des données issues de :
- [poe2db.tw](https://poe2db.tw/us/) - Base de données communautaire
- [Craft of Exile](https://www.craftofexile.com/?game=poe2) - Calculateur de craft
- [PoE Wiki](https://www.poewiki.net/) - Documentation officielle
- [Path of Exile Developer API](https://www.pathofexile.com/developer/docs) - API officielle GGG

### Mise à jour des données

Les données sont actuellement **statiques** et basées sur la version **Early Access** de PoE2.

Pour mettre à jour :
1. Éditez `js/data.js`
2. Ajoutez/modifiez les bases, mods ou méthodes
3. Rechargez la page

---

## 🔧 Personnalisation

### Ajouter de nouveaux mods

Dans `js/data.js`, section `mods` :

```javascript
mods: {
    prefix: [
        '+# to Level of All Chaos Gems',
        // Ajoutez vos mods ici
    ],
    suffix: [
        '+#% to Fire Resistance',
        // Ajoutez vos mods ici
    ]
}
```

### Ajouter de nouvelles bases

Dans `js/data.js`, section `bases` :

```javascript
bases: {
    'weapon-1h': [
        'Regal Sceptre',
        'Votre Nouvelle Base'
    ]
}
```

### Modifier les stratégies

Dans `js/crafting-engine.js`, méthode `determineStrategy()`.

---

## 🌐 Hébergement

### GitHub Pages (Gratuit)

1. Créez un repo GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans Settings
4. Votre site sera disponible à `https://votre-username.github.io/poe2-craft-helper`

### Netlify / Vercel (Gratuit)

1. Glissez-déposez le dossier sur [netlify.com](https://netlify.com) ou [vercel.com](https://vercel.com)
2. Votre site est en ligne en quelques secondes !

---

## 🤝 Contribution

Ce projet est open-source et accueille les contributions de la communauté !

### Comment contribuer

1. Fork ce projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout de X'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

### Idées de contributions

- 🗂️ **Données** - Ajouter plus de mods, bases, essences
- 🎨 **UI/UX** - Améliorer l'interface, animations
- 🧠 **Logique** - Optimiser le moteur de recommandations
- 🌍 **i18n** - Traductions (anglais, espagnol, etc.)
- 📱 **Mobile** - Améliorer la responsive
- 🔗 **API** - Intégration avec l'API officielle PoE

---

## ⚠️ Disclaimer

Cet outil est **non officiel** et développé par la communauté.
Path of Exile 2 © Grinding Gear Games.

Les données peuvent être incomplètes ou devenir obsolètes avec les mises à jour du jeu.
Consultez toujours les sources officielles pour les informations les plus récentes.

---

## 📝 Changelog

### v1.0.0 (2024)
- 🎉 Version initiale
- ✅ Formulaire de saisie complet
- ✅ 5 stratégies de craft
- ✅ Estimation des coûts
- ✅ Gestion des risques et Plan B
- ✅ Export texte et partage
- ✅ UI thème PoE dark/gold
- ✅ Responsive mobile

---

## 📧 Contact

Pour toute question, suggestion ou bug :
- Ouvrez une **Issue** sur GitHub
- Contactez votre lead guilde

---

## 📜 License

Ce projet est sous licence **MIT**.
Vous êtes libre de l'utiliser, modifier et distribuer.

---

**Bon craft, Exile ! ⚔️**
