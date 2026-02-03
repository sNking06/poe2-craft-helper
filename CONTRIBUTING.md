# 🤝 Guide de Contribution - PoE2 Craft Helper

Merci de votre intérêt pour contribuer à ce projet ! Ce guide vous aidera à participer efficacement.

---

## 🎯 Comment Contribuer

Il y a plusieurs façons de contribuer :

### 1. 🐛 Signaler des bugs
- Ouvrez une **Issue** sur GitHub
- Décrivez le problème clairement
- Fournissez des captures d'écran si possible
- Indiquez votre navigateur et OS

### 2. 💡 Proposer des améliorations
- Ouvrez une **Issue** avec le tag `enhancement`
- Expliquez votre idée et son utilité
- Discutez avec la communauté

### 3. 📝 Améliorer la documentation
- Corrigez les fautes
- Ajoutez des exemples
- Traduisez en d'autres langues

### 4. 💻 Contribuer du code
- Fork le projet
- Créez une branche
- Soumettez une Pull Request

---

## 🔧 Setup pour Développeurs

### Prérequis
- Un navigateur moderne (Chrome, Firefox, Edge)
- Un éditeur de code (VS Code recommandé)
- Git (optionnel mais recommandé)

### Installation Locale

1. **Cloner le projet**
```bash
git clone https://github.com/VOTRE-USERNAME/poe2-craft-helper.git
cd poe2-craft-helper
```

2. **Ouvrir le projet**
- Ouvrez le dossier dans votre éditeur
- Lancez `index.html` dans un navigateur

3. **Serveur local (optionnel)**
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

---

## 📁 Structure du Code

```
poe2-craft-helper/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles (variables CSS, composants)
├── js/
│   ├── data.js            # Données statiques (mods, bases, stratégies)
│   ├── crafting-engine.js # Logique métier (algorithmes de craft)
│   └── app.js             # UI et interactivité
└── README.md              # Documentation
```

### Responsabilités des fichiers

| Fichier | Responsabilité |
|---------|---------------|
| `data.js` | Contient TOUTES les données (mods, bases, méthodes) |
| `crafting-engine.js` | Analyse et génère les recommandations |
| `app.js` | Gère l'UI, les événements, l'affichage |
| `style.css` | Tout le styling (thème PoE, responsive) |

---

## 🎨 Standards de Code

### HTML
- Utilisez des IDs pour les éléments uniques
- Utilisez des classes pour les styles réutilisables
- Nommage en camelCase pour les IDs (`craftForm`, `itemType`)
- Nommage en kebab-case pour les classes (`mod-input-group`, `btn-primary`)

### CSS
- Utilisez les variables CSS (définies dans `:root`)
- Nommage en kebab-case
- Organisez par sections (avec commentaires)
- Mobile-first approach pour le responsive

### JavaScript
- Utilisez `'use strict'`
- Nommage en camelCase
- Commentaires JSDoc pour les fonctions importantes
- Pas de jQuery (vanilla JS uniquement)
- Code moderne ES6+ accepté

### Exemple de fonction

```javascript
/**
 * Analyse les mods demandés et catégorise leur difficulté
 * @param {Array} mods - Liste des mods souhaités
 * @returns {Object} Analyse structurée des mods
 */
function analyzeMods(mods) {
    // Implémentation...
}
```

---

## 🗂️ Ajouter des Données

### Ajouter un nouveau mod

Dans `js/data.js` :

```javascript
mods: {
    prefix: [
        // Ajoutez ici
        '+# to Level of All Fire Gems',
        'Votre Nouveau Mod',
    ],
    suffix: [
        // Ou ici
        '+#% to Chaos Resistance',
    ]
}
```

### Ajouter une nouvelle base

```javascript
bases: {
    'weapon-1h': [
        'Regal Sceptre',
        'Votre Nouvelle Base',
    ]
}
```

### Ajouter une méthode de craft

```javascript
craftingMethods: {
    'Votre Orbe': {
        name: 'Nom Complet',
        effect: 'Description de l\'effet',
        rarity_from: 'normal/magic/rare',
        rarity_to: 'magic/rare',
        cost_avg: 10, // Coût moyen en chaos
        use_case: 'Quand utiliser'
    }
}
```

---

## 🧪 Tester vos Modifications

### Tests Manuels

1. **Tester le formulaire**
   - Remplissez tous les champs
   - Testez avec différentes combinaisons
   - Vérifiez les validations

2. **Tester la génération de guide**
   - Essayez plusieurs scénarios (voir `EXAMPLES.md`)
   - Vérifiez que les coûts sont cohérents
   - Assurez-vous que les étapes sont claires

3. **Tester le responsive**
   - Redimensionnez le navigateur
   - Testez sur mobile (F12 → Mode mobile)
   - Vérifiez tous les breakpoints

4. **Tester les exports**
   - Export texte
   - Partage de lien
   - Nouveau craft

### Checklist avant PR

- [ ] Le code fonctionne sans erreur console
- [ ] Le design est cohérent avec l'existant
- [ ] Les modifications sont responsive
- [ ] Les nouveaux mods/bases sont valides (PoE2)
- [ ] La documentation est à jour si nécessaire
- [ ] Les commentaires sont clairs

---

## 🎨 Guidelines UI/UX

### Thème et Couleurs

Respectez la palette PoE existante :
- Background : `#0a0a0a`, `#1a1410`
- Accent or : `#c9a55a`
- Accent rouge : `#d13636`
- Texte : `#e8dcc3`

### Typographie

- Titres : `'Cinzel'` (serif, style PoE)
- Corps : `'Roboto'` (sans-serif, lisible)

### Composants

Avant de créer un nouveau composant, vérifiez si un similaire existe :
- `.btn-primary` / `.btn-secondary` (boutons)
- `.result-card` (cartes de résultat)
- `.form-group` (groupes de formulaire)

---

## 🚀 Soumettre une Pull Request

### Processus

1. **Fork le projet**
```bash
# Cliquez sur "Fork" sur GitHub
```

2. **Créez une branche**
```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

3. **Faites vos modifications**
```bash
# Éditez les fichiers
git add .
git commit -m "feat: Ajout de X"
```

4. **Pushez vers votre fork**
```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

5. **Ouvrez une PR sur GitHub**
- Allez sur votre fork
- Cliquez sur "Compare & pull request"
- Décrivez vos changements
- Soumettez !

### Format des commits

Utilisez le format conventionnel :

```
feat: Ajout d'une nouvelle stratégie de craft
fix: Correction du calcul de coût pour Essences
docs: Mise à jour du README avec exemples
style: Amélioration du responsive mobile
refactor: Refactorisation du moteur de craft
```

### Description de PR

```markdown
## Description
Brief description de ce que fait cette PR

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Amélioration UI/UX
- [ ] Documentation
- [ ] Refactorisation

## Checklist
- [ ] Code testé manuellement
- [ ] Pas d'erreur console
- [ ] Documentation mise à jour
- [ ] Responsive vérifié
```

---

## 🎯 Idées de Contributions

### Faciles (Débutants)

- ✅ Ajouter des mods/bases manquantes dans `data.js`
- ✅ Corriger des fautes dans la documentation
- ✅ Améliorer le CSS responsive
- ✅ Ajouter des exemples dans `EXAMPLES.md`

### Moyennes

- 🔶 Créer un thème clair (light mode)
- 🔶 Ajouter des animations CSS
- 🔶 Améliorer le système d'autocomplétion
- 🔶 Ajouter des tooltips explicatifs

### Avancées

- 🔴 Intégration avec l'API officielle PoE2
- 🔴 Système de favoris (localStorage)
- 🔴 Mode comparaison de stratégies
- 🔴 Import/Export de configurations
- 🔴 i18n (internationalisation)
- 🔴 PWA (Progressive Web App)

---

## 📚 Ressources

### Documentation PoE2

- [poe2db.tw](https://poe2db.tw/us/) - Base de données
- [PoE Wiki](https://www.poewiki.net/) - Wiki officiel
- [Craft of Exile](https://www.craftofexile.com/?game=poe2) - Calculateur

### Outils de Développement

- [VS Code](https://code.visualstudio.com/) - Éditeur recommandé
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debug
- [Can I Use](https://caniuse.com/) - Compatibilité navigateur

### Inspiration Design

- Thème PoE officiel : Dark, or, textures
- [Dribbble](https://dribbble.com/tags/dark-ui) - Inspirations UI dark
- [Codepen](https://codepen.io/) - Exemples de composants

---

## 🤝 Code de Conduite

- **Respectueux** : Soyez courtois et constructif
- **Inclusif** : Bienvenue à tous les niveaux
- **Collaboratif** : Aidez les autres contributeurs
- **Patient** : Les reviews prennent du temps

---

## 📬 Contact

Pour toute question :
- Ouvrez une **Discussion** sur GitHub
- Contactez les mainteneurs
- Rejoignez le Discord de la guilde

---

## 🎉 Remerciements

Merci à tous les contributeurs qui rendent ce projet meilleur !

Liste des contributeurs : [Voir sur GitHub](https://github.com/VOTRE-USERNAME/poe2-craft-helper/graphs/contributors)

---

**Happy Crafting & Happy Coding ! ⚔️💻**
