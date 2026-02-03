# 🚀 PoE2 Craft Helper v2.0 - Nouvelles Fonctionnalités

Bienvenue dans la version 2.0 de PoE2 Craft Helper ! Cette mise à jour majeure apporte des outils avancés pour maîtriser le crafting dans Path of Exile 2.

---

## 📋 Table des Matières

1. [Base de Données Étendue](#1-base-de-données-étendue)
2. [Comparateur de Stratégies](#2-comparateur-de-stratégies)
3. [Simulateur de Craft](#3-simulateur-de-craft)
4. [Système de Favoris et Historique](#4-système-de-favoris-et-historique)
5. [Statistiques d'Utilisation](#5-statistiques-dutilisation)
6. [Essences et Craft Bench](#6-essences-et-craft-bench)
7. [Combinaisons Populaires](#7-combinaisons-populaires)

---

## 1. 📚 Base de Données Étendue

### Nouveautés

**200+ bases d'items** (vs 80+ en v1.0)
- Armes 1M : +12 nouvelles bases (Dagues, variations)
- Armes 2M : +8 nouvelles bases (Polearms)
- Armures : +15 nouvelles bases
- Bijoux : +8 nouvelles bases

**150+ mods** (vs 60+ en v1.0)
- 70+ préfixes
- 80+ suffixes
- Mods de gems étendus (Projectile, Melee, Duration, AoE)
- Mods DoT (Burning, Poison)
- Nouveau : Spirit mods

### Catégorisation des Mods

Les mods sont maintenant organisés par catégorie :

| Catégorie | Exemples |
|-----------|----------|
| **Offensive** | Physical Damage, Critical Strike, Attack Speed |
| **Defensive** | Life, Energy Shield, Resistances |
| **Utility** | Movement Speed, Attributes, Spirit |
| **Special** | Gem Levels, Conversions, Minions |

### Tags de Mods

Système de tags pour filtrage avancé :
```javascript
{
  '+# to maximum Life': ['defense', 'life', 'prefix', 'essential'],
  '#% increased Movement Speed': ['utility', 'speed', 'suffix']
}
```

---

## 2. 🔀 Comparateur de Stratégies

### Qu'est-ce que c'est ?

Le Comparateur de Stratégies analyse **toutes** les méthodes de craft disponibles et les classe selon leur pertinence pour votre objectif.

### Comment l'utiliser ?

1. Accédez à la page **Fonctionnalités Avancées**
2. Onglet **Comparateur de Stratégies**
3. Entrez votre objectif de craft
4. Cliquez sur **Comparer les Stratégies**

### Ce que vous obtenez

📊 **Tableau de Comparaison**
- Classement par score (0-10)
- Coût estimé pour chaque stratégie
- Niveau de difficulté
- Badge de recommandation (Excellent/Bon/Acceptable)

🎯 **Analyse de Pertinence**
- Raisons pour/contre chaque stratégie
- Score basé sur : budget, nombre de mods, trade, contexte
- Recommandation personnalisée

### Exemple

```
Objectif: Arme 1M, 2 mods obligatoires, budget moyen

Résultat:
1. Alt-Regal-Exalt     (8/10) - Excellent ✅
2. Essence Spam        (7/10) - Bon ✅
3. Trade Base          (6/10) - Bon ✅
4. Alchemy Spam        (4/10) - Acceptable ⚠️
5. Meta-Craft          (2/10) - Non recommandé ❌
```

### Algorithme de Scoring

Le score est calculé selon :
- **Budget** : Adéquation coût/budget disponible
- **Mods requis** : Nombre et tier des mods obligatoires
- **Trade** : Disponibilité du marché
- **Contexte** : Early/Mid/End game
- **Difficulté** : Complexité de la méthode

---

## 3. 🎲 Simulateur de Craft

### Qu'est-ce que c'est ?

Le Simulateur permet de **tester** vos stratégies de craft sans dépenser de currency réelle. Utilise un RNG réaliste basé sur les probabilités réelles de PoE2.

### Modes Disponibles

#### Mode Interactif
- Cliquez sur les Orbs pour les utiliser
- Voyez les résultats en temps réel
- Item visuel qui se met à jour
- Track de la currency dépensée

#### Mode Auto-Simulation
- Simule 100, 500 ou 1000 tentatives
- Statistiques de réussite
- Coût moyen, min, max
- Distribution des résultats

### Fonctionnalités

✅ **Orbs Supportés**
- Orb of Transmutation
- Orb of Alteration
- Orb of Augmentation
- Regal Orb
- Orb of Alchemy
- Exalted Orb
- Orb of Scouring
- Essences (tous tiers)
- Veiled Chaos Orb

✅ **RNG Réaliste**
- Poids de mods (T1 = rare, T3 = commun)
- Probabilités basées sur PoE2
- Résultats imprévisibles comme en jeu

✅ **Tracking**
- Currency totale dépensée
- Nombre de tentatives
- Taux de réussite
- Meilleur/pire résultat

### Exemple d'Utilisation

```javascript
const simulator = new CraftSimulator(POE2_DATA_V2);

// Créer un item
simulator.createNewItem('Regal Sceptre', 75);

// Utiliser des Orbs
simulator.useTransmutation();
simulator.useAlteration();  // Réroll
simulator.useAlteration();  // Réroll
simulator.useAugmentation(); // Ajouter mod
simulator.useRegal();        // → Rare

// Auto-simulation
const result = simulator.autoSimulate(
    'alt-regal-exalt',
    ['+# to Level of All Chaos Gems'],
    1000 // tentatives max
);

console.log(result);
// → { success: true, attempts: 234, totalCost: 1250 chaos }
```

### Statistiques Générées

```
📊 Résultats de Simulation (1000 tentatives)

Réussite: 87.3%
Tentatives moyennes: 234
Coût moyen: 1250 chaos
Coût min: 450 chaos
Coût max: 3800 chaos

Currency utilisée:
- Orb of Transmutation: 234
- Orb of Alteration: 1850
- Regal Orb: 234
- Exalted Orb: 156
```

---

## 4. ⭐ Système de Favoris et Historique

### Favoris

**Sauvegardez vos crafts** pour y revenir plus tard.

✅ **Fonctionnalités**
- Sauvegarde locale (localStorage)
- Max 20 favoris
- Nom personnalisé
- Tags/catégories
- Chargement rapide

**Actions**
- ⭐ Ajouter aux favoris
- 📋 Charger un favori
- ✏️ Renommer
- 🗑️ Supprimer

### Historique

**Historique automatique** de tous vos crafts.

✅ **Fonctionnalités**
- Sauvegarde automatique
- Max 50 entrées (FIFO)
- Horodatage
- Recherche/filtrage
- Export

**Affichage**
- Date : "Il y a 2 heures", "Il y a 3 jours"
- Aperçu : Type d'item, mods, stratégie
- Actions : Charger, Supprimer

### Import/Export

**Partagez vos crafts** avec votre guilde.

```json
{
  "favorites": [...],
  "history": [...],
  "exportDate": "2024-02-02T10:30:00Z",
  "version": "2.0.0"
}
```

**Actions**
- 📤 Exporter → Fichier JSON
- 📥 Importer → Charger JSON
- 🔗 Partager → URL

---

## 5. 📊 Statistiques d'Utilisation

### Métriques Trackées

📈 **Globales**
- Nombre total de crafts
- Nombre de favoris
- Utilisation de l'outil (jours actifs)

🎯 **Par Type**
- Types d'items les plus craftés
- Stratégies les plus utilisées
- Mods les plus populaires

💰 **Économiques**
- Currency moyenne dépensée
- Craft le plus cher
- Craft le moins cher

### Visualisations

**Graphiques** (prévus v2.1)
- Courbe d'utilisation dans le temps
- Distribution des stratégies
- Évolution des coûts

**Tableaux**
- Top 5 items craftés
- Top 5 stratégies
- Top 10 mods utilisés

---

## 6. 🧪 Essences et Craft Bench

### Base de Données d'Essences

**5 essences documentées** avec tous les tiers (1-7)

| Essence | Mod Garanti | Use Case |
|---------|-------------|----------|
| **Greed** | +Life | Defensive items |
| **Hatred** | +Cold Resist | Resistances |
| **Wrath** | +Lightning Resist | Resistances |
| **Rage** | +Attack Speed | Weapons |
| **Sorrow** | +Mana | Caster items |

### Valeurs par Tier

```javascript
Essence of Greed:
  Tier 1: +8-9 to maximum Life
  Tier 2: +10-14 to maximum Life
  ...
  Tier 7: +66-80 to maximum Life
```

### Craft Bench Recipes

**Recettes déterministes** (données limitées pour v2.0)

```
+# to maximum Life (prefix)
  - Tier 1: +30 Life (ilvl 1+)
  - Tier 2: +40 Life (ilvl 36+)
  - Tier 3: +50 Life (ilvl 60+)
```

---

## 7. 🧩 Combinaisons Populaires

### Qu'est-ce que c'est ?

Combinaisons de mods **testées et approuvées** par la communauté.

### Combos Disponibles

#### 1. Chaos Caster Weapon
```
+# to Level of All Chaos Gems
#% increased Chaos Damage
#% increased Cast Speed
+#% to Chaos Damage over Time Multiplier
```
**Idéal pour** : Chaos DoT builds

#### 2. Life + Resist Armor
```
+# to maximum Life
+#% to Fire Resistance
+#% to Cold Resistance
+#% to Lightning Resistance
```
**Idéal pour** : Survie générale

#### 3. Physical DPS Weapon
```
#% increased Physical Damage
Adds # to # Physical Damage
#% increased Attack Speed
+#% to Critical Strike Multiplier
```
**Idéal pour** : Melee DPS

#### 4. ES Caster Armor
```
+# to maximum Energy Shield
#% increased Energy Shield
+# to maximum Mana
#% increased Spell Damage
```
**Idéal pour** : CI/Low-Life casters

#### 5. Speed Boots
```
#% increased Movement Speed
+# to maximum Life
+#% to Fire Resistance
+#% to Cold Resistance
```
**Idéal pour** : Mobilité + survie

### Comment les utiliser ?

1. Consultez les combos dans `data-v2.js`
2. Utilisez-les comme modèle pour vos crafts
3. Adaptez selon votre build

---

## 🔧 Fonctions Utilitaires

### POE2_UTILS

Nouvelles fonctions helper :

```javascript
// Trouver essences pour un mod
POE2_UTILS.findEssencesForMod('Life')
// → [{essence: 'Essence of Greed', mod: '+# to maximum Life'}]

// Suggérer combo populaire
POE2_UTILS.suggestPopularCombo('weapon-1h')
// → ['Physical DPS Weapon' combo]

// Calculer difficulté
POE2_UTILS.calculateCraftDifficulty([...mods])
// → 'hard'
```

---

## 🚀 Roadmap v2.1+

### Prochaines Fonctionnalités

**v2.1 (Court Terme)**
- ✅ Intégration complète du simulateur dans l'UI
- ✅ Graphiques de statistiques
- ✅ Mode light theme toggle
- ✅ Plus d'essences (15+ total)
- ✅ Craft bench complet

**v2.2 (Moyen Terme)**
- 🔜 API publique pour intégrations
- 🔜 Système de comptes (optionnel)
- 🔜 Partage guilde amélioré
- 🔜 Mode collaborative crafting

**v3.0 (Long Terme)**
- 🔮 Intégration API officielle PoE2
- 🔮 Données en temps réel depuis poe2db.tw
- 🔮 ML/AI pour recommandations
- 🔮 PWA avec mode offline

---

## 📖 Migration v1.0 → v2.0

### Compatibilité

✅ **100% rétro-compatible**
- Tous les crafts v1.0 fonctionnent en v2.0
- Pas de breaking changes
- Migration transparente

### Nouvelles Dépendances

```html
<!-- Ajouter ces fichiers -->
<script src="js/data-v2.js"></script>
<script src="js/favorites.js"></script>
<script src="js/strategy-comparator.js"></script>
<script src="js/craft-simulator.js"></script>
```

### localStorage

v2.0 utilise localStorage pour :
- `poe2_craft_favorites` : Favoris
- `poe2_craft_history` : Historique

**Taille estimée** : < 500 KB pour usage normal

---

## 💡 Conseils d'Utilisation

### 1. Utilisez le Comparateur

Avant de crafter, **comparez toujours** les stratégies.
Vous économiserez du temps et de la currency.

### 2. Testez dans le Simulateur

**Simulez d'abord** vos stratégies coûteuses.
Comprenez les probabilités avant de craft en vrai.

### 3. Sauvegardez vos Favoris

Crafts réussis ? **Ajoutez-les aux favoris** !
Vous pourrez les réutiliser ou les partager.

### 4. Consultez l'Historique

**Apprenez de vos erreurs**.
L'historique montre ce qui a fonctionné ou non.

### 5. Explorez les Combos

**Inspirez-vous** des combinaisons populaires.
Elles sont testées par la communauté.

---

## 🆘 Support

### Questions Fréquentes

**Q: Le simulateur est-il précis ?**
R: Oui, basé sur les probabilités réelles de PoE2. Mais c'est une approximation.

**Q: Mes favoris sont-ils sauvegardés en ligne ?**
R: Non, tout est local (localStorage). Exportez pour sauvegarder.

**Q: Puis-je contribuer des combinaisons ?**
R: Oui ! Ouvrez une PR sur GitHub avec vos combos.

**Q: Le comparateur prend-il en compte le marché ?**
R: Partiellement. Il suppose un marché "normal". Ajustez selon votre league.

### Bugs & Suggestions

- GitHub Issues : [github.com/VOTRE-REPO/issues](https://github.com)
- Discord Guilde : [Votre Discord](#)
- Email : votre@email.com

---

## 🎉 Merci !

Merci d'utiliser **PoE2 Craft Helper v2.0** !

N'oubliez pas de ⭐ star le projet sur GitHub si vous l'aimez.

**Bon craft, Exile ! ⚔️**

---

*Version : 2.0.0*
*Date : 2024-02-02*
*Auteur : Votre Guilde*
