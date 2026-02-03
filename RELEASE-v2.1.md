# 🎉 PoE2 Craft Helper v2.1 - Release Notes

**Date de sortie** : 2024-02-02
**Version** : 2.1.0
**Type** : Mise à jour majeure

---

## 🌟 Résumé

La version 2.1 apporte **trois fonctionnalités majeures** tant attendues :

✨ **Simulateur de Craft Interactif** - Testez vos stratégies en temps réel
📊 **Graphiques de Statistiques** - Visualisez vos données avec Chart.js
🌓 **Mode Light/Dark** - Basculez entre les thèmes selon vos préférences

+ **15 essences** documentées (vs 5 en v2.0)

---

## ✨ Nouvelles Fonctionnalités

### 1. 🎲 Simulateur de Craft Interactif

**Enfin disponible !** Testez vos stratégies de craft sans dépenser de currency réelle.

#### Fonctionnalités

✅ **Mode Interactif**
- Créez des items de n'importe quelle base
- Cliquez sur les Orbs pour les utiliser
- Voyez les résultats en temps réel
- Item visuel qui se met à jour instantanément

✅ **Orbs Supportés**
- Orb of Transmutation
- Orb of Alteration
- Orb of Augmentation
- Regal Orb
- Orb of Alchemy
- Exalted Orb
- Orb of Scouring
- Essences (Greed T4 intégrée)

✅ **Auto-Simulation**
- Simulez 10 à 1000 tentatives
- 3 stratégies : Alt-Regal, Alchemy Spam, Essence Spam
- Statistiques détaillées des résultats
- Currency tracking complet

✅ **Statistiques de Session**
- Nombre de tentatives
- Coût total en chaos
- Coût moyen par tentative
- Taux de réussite
- Breakdown de currency utilisée

#### Comment l'utiliser

```
1. Aller sur advanced.html
2. Onglet "Simulateur de Craft"
3. Créer un item (base + ilvl)
4. Cliquer sur les Orbs pour crafter
5. Observer les résultats en temps réel
```

#### Exemple d'utilisation

```javascript
// Le simulateur utilise un RNG réaliste
T1 mods: 5% de chance
T2 mods: 20% de chance
T3 mods: 75% de chance

// Auto-simulation
Strategy: Alt-Regal-Exalt
Mod recherché: "maximum Life"
Tentatives: 100

Résultat:
✅ Objectif atteint en 47 tentatives
💰 Coût: 625 chaos
📊 Currency: 47 Trans, 312 Alt, 47 Regal, 23 Exalt
```

---

### 2. 📊 Graphiques de Statistiques

**Visualisez vos données** avec des graphiques interactifs propulsés par Chart.js.

#### 4 Graphiques Disponibles

**1. Types d'Items Craftés** (Doughnut Chart)
- Top 5 des types les plus craftés
- Distribution en pourcentage
- Couleurs PoE authentiques

**2. Stratégies Utilisées** (Bar Chart)
- Nombre d'utilisations par stratégie
- Comparaison facile
- Identifiez votre stratégie préférée

**3. Évolution des Coûts** (Line Chart)
- 20 derniers crafts
- 3 lignes : Optimiste, Moyen, Pessimiste
- Suivez vos dépenses dans le temps

**4. Distribution des Budgets** (Pie Chart)
- Répartition Limité/Moyen/Élevé/Illimité
- Comprenez vos habitudes de budget

#### Exemple de Stats

```
📊 Vue d'Ensemble

Crafts Totaux: 47
Favoris: 12
Type le Plus Crafté: Arme 1M (18x)
Stratégie Préférée: Alt-Regal-Exalt (22x)
```

#### Comment l'utiliser

```
1. Créez des crafts (index.html ou advanced.html)
2. Allez sur advanced.html
3. Onglet "Statistiques"
4. Les graphiques se génèrent automatiquement
5. Cliquez "Actualiser" pour mettre à jour
```

---

### 3. 🌓 Mode Light/Dark Theme Toggle

**Basculez entre les thèmes** selon vos préférences ou l'heure de la journée.

#### Fonctionnalités

✅ **Bouton Toggle Fixe**
- Positionné en haut à droite
- Accessible sur toutes les pages
- Icônes : ☀️ (Light) / 🌙 (Dark)

✅ **Sauvegarde Automatique**
- Préférence stockée dans localStorage
- Se rappelle entre les sessions
- Sync entre index.html et advanced.html

✅ **Transitions Douces**
- Animations CSS fluides
- Pas de flash brutal
- 300ms de transition

#### Thème Dark (Défaut)
```
Background: #0a0a0a (noir profond)
Accents: #c9a55a (or PoE)
Texte: #e8dcc3 (beige clair)
```

#### Thème Light (Nouveau)
```
Background: #f5f5f5 (blanc cassé)
Accents: #c9a55a (or conservé)
Texte: #2c2416 (brun foncé)
```

#### Comment l'utiliser

```
1. Cliquez sur le bouton en haut à droite
2. Le thème change instantanément
3. Votre choix est sauvegardé
```

---

### 4. ✨ Base d'Essences Étendue

**15 essences** documentées (vs 5 en v2.0)

#### Nouvelles Essences

| Essence | Mod Garanti | Use Case |
|---------|-------------|----------|
| **Anger** | Fire Resistance | Défense élémentaire |
| **Contempt** | Attack Speed | Armes physiques |
| **Torment** | Cast Speed | Armes de caster |
| **Doubt** | Armour | Tank builds |
| **Fear** | Evasion | Builds évasion |
| **Woe** | Energy Shield | CI/Low-Life |
| **Scorn** | Physical Damage | Melee DPS |
| **Dread** | Spell Damage | Casters |
| **Envy** | Chaos Damage | Chaos DoT |
| **Zeal** | All Attributes | Stat-stacking |
| **Anguish** | Crit Chance | Builds critiques |
| **Suffering** | Crit Multi | Burst damage |
| **Loathing** | Chaos Resist | Défense chaos |
| **Misery** | Movement Speed | Mobilité |

#### Tous les Tiers (1-7)

Chaque essence a **7 tiers** documentés avec valeurs exactes.

**Exemple : Essence of Scorn (Physical Damage)**
```
Tier 1: 15-19%
Tier 2: 20-29%
Tier 3: 30-44%
Tier 4: 45-64%
Tier 5: 65-89%
Tier 6: 90-119%
Tier 7: 120-154%
```

---

## 🔧 Améliorations

### Interface Utilisateur

- ✅ Nouvelle page advanced.html avec onglets
- ✅ Design responsive amélioré
- ✅ Animations et transitions fluides
- ✅ Notifications toast pour le simulateur
- ✅ Bouton theme toggle fixe

### Performance

- ✅ Chart.js chargé dynamiquement
- ✅ Graphiques optimisés (Canvas)
- ✅ localStorage pour sauvegardes rapides
- ✅ Pas de ralentissement avec beaucoup de données

### Accessibilité

- ✅ Thème clair pour meilleure lisibilité
- ✅ Contrastes WCAG respectés
- ✅ Labels ARIA sur boutons
- ✅ Navigation clavier améliorée

---

## 📦 Fichiers Ajoutés

```
js/
├── simulator-ui.js       # Interface du simulateur (600+ lignes)
├── charts.js             # Gestionnaire de graphiques (400+ lignes)
├── theme-manager.js      # Système de thèmes (200+ lignes)

data-v2.js                # Base étendue (15 essences)
advanced.html             # Page fonctionnalités avancées
RELEASE-v2.1.md           # Ce fichier
```

---

## 🐛 Corrections de Bugs

- ✅ Fix: Simulateur bloqué après plusieurs utilisations
- ✅ Fix: Stats non mises à jour après craft
- ✅ Fix: Canvas non trouvés si graphiques créés trop tôt
- ✅ Fix: Thème non appliqué sur rechargement
- ✅ Fix: localStorage quota dépassé (optimisé)

---

## 🔄 Changements Breaking

**Aucun !** La v2.1 est **100% rétro-compatible** avec v2.0.

- Tous les crafts v2.0 fonctionnent
- Historique et favoris préservés
- Aucune migration nécessaire

---

## 📊 Statistiques du Projet

| Métrique | v2.0 | v2.1 | Δ |
|----------|------|------|---|
| Fichiers JS | 7 | 10 | +3 |
| Lignes de code | ~4000 | ~5500 | +37% |
| Essences | 5 | 15 | +200% |
| Fonctionnalités | 8 | 11 | +37% |
| Pages HTML | 2 | 2 | = |

---

## 🚀 Migration depuis v2.0

### Étape 1 : Télécharger v2.1

```bash
# GitHub
git pull origin main

# Ou télécharger le ZIP
# Et remplacer les fichiers
```

### Étape 2 : Aucune action requise !

Vos données sont automatiquement compatibles :
- ✅ Favoris préservés
- ✅ Historique intact
- ✅ Préférences conservées

### Étape 3 : Profiter des nouvelles fonctionnalités

```
1. Ouvrir advanced.html
2. Tester le simulateur
3. Explorer les graphiques
4. Essayer le thème light
```

---

## 🎯 Prochaines Étapes (v2.2)

### Court Terme

- [ ] Système de notifications toast avancé
- [ ] Fuzzy search pour l'autocomplétion
- [ ] Export graphiques en PNG
- [ ] Mode impression optimisé

### Moyen Terme

- [ ] PWA (Progressive Web App)
- [ ] Mode offline complet
- [ ] Sync cloud optionnel
- [ ] Intégration Discord webhook

---

## 💡 Exemples d'Utilisation

### Scénario 1 : Tester avant de craft

```
Objectif: Sceptre +2 Chaos Gems

1. Aller sur advanced.html → Simulateur
2. Créer: Regal Sceptre, ilvl 75
3. Stratégie: Alt-Regal-Exalt
4. Lancer auto-simulation (100 tentatives)

Résultat:
✅ Trouvé en moyenne après 234 Alterations
💰 Coût moyen: 125 chaos
📊 Vous savez maintenant à quoi vous attendre !
```

### Scénario 2 : Analyser ses habitudes

```
Vous avez crafté 50 items différents

1. Aller sur advanced.html → Statistiques
2. Observer les graphiques

Découvertes:
- Vous craftez surtout des armes (70%)
- Votre stratégie préférée: Alt-Regal (60%)
- Budget moyen: 150 chaos par craft
- Pics de coût sur les bijoux

→ Ajustez votre approche !
```

### Scénario 3 : Travailler de nuit

```
Il est 2h du matin, vos yeux fatiguent

1. Cliquer sur ☀️ Light Mode en haut à droite
2. Le site devient clair et lisible
3. Continuez à crafter confortablement
```

---

## 🆘 Support & Bugs

### Problème Courant 1 : Graphiques ne s'affichent pas

**Solution** :
```
1. Vérifier la console (F12)
2. Chart.js doit être chargé
3. Rafraîchir la page (Ctrl+F5)
4. Cliquer "Actualiser les Graphiques"
```

### Problème Courant 2 : Simulateur bloqué

**Solution** :
```
1. Rafraîchir la page
2. Cliquer "Réinitialiser Stats"
3. Recréer un item
```

### Problème Courant 3 : Thème ne change pas

**Solution** :
```
1. Vider le cache (Ctrl+Shift+Del)
2. Rafraîchir (Ctrl+F5)
3. Le thème devrait fonctionner
```

### Rapporter un Bug

```
GitHub Issues:
https://github.com/VOTRE-REPO/issues

Inclure:
- Version (v2.1.0)
- Navigateur et OS
- Steps to reproduce
- Screenshots si possible
```

---

## 🙏 Remerciements

Merci à tous ceux qui ont contribué à cette version !

- **Vous** - Pour utiliser l'outil
- **La communauté PoE2** - Pour les feedbacks
- **Chart.js** - Pour les graphiques magnifiques
- **GGG** - Pour Path of Exile 2

---

## 📜 License

MIT License - Open Source

---

## 🎉 Conclusion

La v2.1 est la **plus grande mise à jour** depuis le lancement du projet !

🎲 Simulateur interactif
📊 Graphiques de stats
🌓 Mode light/dark
✨ 15 essences

**Le crafting n'a jamais été aussi accessible !**

---

**Bon craft, Exile ! ⚔️**

*Version : 2.1.0*
*Date : 2024-02-02*
*Build : Stable*
