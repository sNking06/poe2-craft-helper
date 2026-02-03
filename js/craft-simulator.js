// Simulateur Interactif de Craft pour PoE2 Craft Helper
// Permet de simuler des sessions de craft avec RNG réaliste

class CraftSimulator {
    constructor(data) {
        this.data = data;
        this.currentItem = null;
        this.sessionStats = {
            currencySpent: {},
            attempts: 0,
            successfulCrafts: 0,
            totalCost: 0
        };
        this.modWeights = this.generateModWeights();
    }

    // ==========================================
    // INITIALISATION
    // ==========================================

    /**
     * Génère les poids (weights) pour chaque mod
     * Les mods rares (T1) ont des poids plus faibles
     */
    generateModWeights() {
        const weights = {};

        // Poids par défaut selon le tier
        const tierWeights = {
            t1: 50,    // Très rare
            t2: 200,   // Rare
            t3: 500,   // Commun
            any: 1000  // Très commun
        };

        return tierWeights;
    }

    /**
     * Crée un nouvel item vierge
     * @param {string} baseType - Type de base
     * @param {number} itemLevel - Item level
     */
    createNewItem(baseType, itemLevel) {
        this.currentItem = {
            baseType: baseType,
            itemLevel: itemLevel,
            rarity: 'normal',
            mods: [],
            prefixes: [],
            suffixes: [],
            corrupted: false
        };
        return this.currentItem;
    }

    // ==========================================
    // SIMULATION DE CURRENCY
    // ==========================================

    /**
     * Utilise un Orb of Transmutation
     * @returns {Object} Résultat de l'opération
     */
    useTransmutation() {
        if (this.currentItem.rarity !== 'normal') {
            return { success: false, message: 'Item must be normal rarity' };
        }

        this.trackCurrency('Orb of Transmutation', 1);

        // Ajouter 1-2 mods aléatoires
        const modCount = Math.random() < 0.5 ? 1 : 2;

        for (let i = 0; i < modCount; i++) {
            const isPrefix = Math.random() < 0.5;
            this.addRandomMod(isPrefix);
        }

        this.currentItem.rarity = 'magic';

        return {
            success: true,
            message: `Item is now magic with ${this.currentItem.mods.length} mod(s)`,
            item: this.currentItem
        };
    }

    /**
     * Utilise un Orb of Alteration
     * @returns {Object} Résultat de l'opération
     */
    useAlteration() {
        if (this.currentItem.rarity !== 'magic') {
            return { success: false, message: 'Item must be magic rarity' };
        }

        this.trackCurrency('Orb of Alteration', 3);

        // Réroll tous les mods
        this.currentItem.mods = [];
        this.currentItem.prefixes = [];
        this.currentItem.suffixes = [];

        // Ajouter 1-2 nouveaux mods
        const modCount = Math.random() < 0.5 ? 1 : 2;

        for (let i = 0; i < modCount; i++) {
            const isPrefix = Math.random() < 0.5;
            this.addRandomMod(isPrefix);
        }

        return {
            success: true,
            message: `Rerolled with ${this.currentItem.mods.length} mod(s)`,
            item: this.currentItem
        };
    }

    /**
     * Utilise un Orb of Augmentation
     * @returns {Object} Résultat de l'opération
     */
    useAugmentation() {
        if (this.currentItem.rarity !== 'magic') {
            return { success: false, message: 'Item must be magic rarity' };
        }

        if (this.currentItem.mods.length >= 2) {
            return { success: false, message: 'Item already has 2 mods (magic limit)' };
        }

        this.trackCurrency('Orb of Augmentation', 2);

        // Ajouter un mod (préfixe ou suffixe selon ce qui manque)
        const hasPrefix = this.currentItem.prefixes.length > 0;
        const hasSuffix = this.currentItem.suffixes.length > 0;

        let isPrefix;
        if (!hasPrefix && !hasSuffix) {
            isPrefix = Math.random() < 0.5;
        } else if (hasPrefix) {
            isPrefix = false;
        } else {
            isPrefix = true;
        }

        this.addRandomMod(isPrefix);

        return {
            success: true,
            message: `Added 1 mod. Item now has ${this.currentItem.mods.length} mod(s)`,
            item: this.currentItem
        };
    }

    /**
     * Utilise un Regal Orb
     * @returns {Object} Résultat de l'opération
     */
    useRegal() {
        if (this.currentItem.rarity !== 'magic') {
            return { success: false, message: 'Item must be magic rarity' };
        }

        this.trackCurrency('Regal Orb', 10);

        // Ajouter 1 mod aléatoire et passer en rare
        const isPrefix = Math.random() < 0.5;
        this.addRandomMod(isPrefix);

        this.currentItem.rarity = 'rare';

        return {
            success: true,
            message: `Item is now rare with ${this.currentItem.mods.length} mod(s)`,
            item: this.currentItem
        };
    }

    /**
     * Utilise un Orb of Alchemy
     * @returns {Object} Résultat de l'opération
     */
    useAlchemy() {
        if (this.currentItem.rarity !== 'normal') {
            return { success: false, message: 'Item must be normal rarity' };
        }

        this.trackCurrency('Orb of Alchemy', 5);

        // Ajouter 4-6 mods aléatoires
        const modCount = 4 + Math.floor(Math.random() * 3); // 4, 5, ou 6

        for (let i = 0; i < modCount && this.currentItem.mods.length < 6; i++) {
            const isPrefix = this.currentItem.prefixes.length < 3 &&
                           (this.currentItem.suffixes.length >= 3 || Math.random() < 0.5);
            this.addRandomMod(isPrefix);
        }

        this.currentItem.rarity = 'rare';

        return {
            success: true,
            message: `Item is now rare with ${this.currentItem.mods.length} mod(s)`,
            item: this.currentItem
        };
    }

    /**
     * Utilise un Exalted Orb
     * @returns {Object} Résultat de l'opération
     */
    useExalted() {
        if (this.currentItem.rarity !== 'rare') {
            return { success: false, message: 'Item must be rare rarity' };
        }

        if (this.currentItem.mods.length >= 6) {
            return { success: false, message: 'Item already has 6 mods (maximum)' };
        }

        this.trackCurrency('Exalted Orb', 80);

        // Déterminer si on ajoute un préfixe ou suffixe
        const canAddPrefix = this.currentItem.prefixes.length < 3;
        const canAddSuffix = this.currentItem.suffixes.length < 3;

        let isPrefix;
        if (canAddPrefix && !canAddSuffix) {
            isPrefix = true;
        } else if (!canAddPrefix && canAddSuffix) {
            isPrefix = false;
        } else {
            isPrefix = Math.random() < 0.5;
        }

        this.addRandomMod(isPrefix);

        return {
            success: true,
            message: `Added 1 mod. Item now has ${this.currentItem.mods.length} mod(s)`,
            item: this.currentItem
        };
    }

    /**
     * Utilise un Orb of Scouring
     * @returns {Object} Résultat de l'opération
     */
    useScouring() {
        if (this.currentItem.rarity === 'normal') {
            return { success: false, message: 'Item is already normal' };
        }

        this.trackCurrency('Orb of Scouring', 5);

        // Retirer tous les mods
        this.currentItem.mods = [];
        this.currentItem.prefixes = [];
        this.currentItem.suffixes = [];
        this.currentItem.rarity = 'normal';

        return {
            success: true,
            message: 'All mods removed. Item is now normal',
            item: this.currentItem
        };
    }

    /**
     * Utilise une Essence
     * @param {string} essenceName - Nom de l'essence
     * @param {number} tier - Tier de l'essence (1-7)
     * @returns {Object} Résultat de l'opération
     */
    useEssence(essenceName, tier) {
        const essence = this.data.essences?.[essenceName];

        if (!essence) {
            return { success: false, message: 'Essence not found' };
        }

        this.trackCurrency(`${essenceName} (Tier ${tier})`, 5 + tier * 2);

        // Réinitialiser l'item
        this.currentItem.mods = [];
        this.currentItem.prefixes = [];
        this.currentItem.suffixes = [];

        // Ajouter le mod garanti de l'essence
        const guaranteedMod = essence.values[tier];
        const isPrefix = essence.guaranteedMod.includes('maximum Life') ||
                        essence.guaranteedMod.includes('increased');

        this.currentItem.mods.push({
            name: guaranteedMod,
            type: isPrefix ? 'prefix' : 'suffix',
            tier: tier,
            source: 'essence-guaranteed'
        });

        if (isPrefix) {
            this.currentItem.prefixes.push(guaranteedMod);
        } else {
            this.currentItem.suffixes.push(guaranteedMod);
        }

        // Ajouter 3-5 mods aléatoires supplémentaires
        const additionalMods = 3 + Math.floor(Math.random() * 3);

        for (let i = 0; i < additionalMods && this.currentItem.mods.length < 6; i++) {
            const isPrefix = this.currentItem.prefixes.length < 3 &&
                           (this.currentItem.suffixes.length >= 3 || Math.random() < 0.5);
            this.addRandomMod(isPrefix);
        }

        this.currentItem.rarity = 'rare';

        return {
            success: true,
            message: `Used ${essenceName}. Guaranteed mod: ${guaranteedMod}`,
            item: this.currentItem
        };
    }

    // ==========================================
    // SYSTÈME DE MODS
    // ==========================================

    /**
     * Ajoute un mod aléatoire
     * @param {boolean} isPrefix - True pour préfixe, false pour suffixe
     */
    addRandomMod(isPrefix) {
        const modPool = isPrefix ? this.data.mods.prefix : this.data.mods.suffix;

        if (!modPool || modPool.length === 0) return;

        // Sélectionner un mod aléatoire
        const randomMod = modPool[Math.floor(Math.random() * modPool.length)];

        // Déterminer le tier (plus de chance d'avoir des tiers faibles)
        const tierRoll = Math.random() * 1000;
        let tier;
        if (tierRoll < 50) tier = 't1';      // 5% chance
        else if (tierRoll < 250) tier = 't2'; // 20% chance
        else tier = 't3';                     // 75% chance

        const mod = {
            name: randomMod,
            type: isPrefix ? 'prefix' : 'suffix',
            tier: tier,
            value: this.generateModValue(randomMod, tier)
        };

        this.currentItem.mods.push(mod);

        if (isPrefix) {
            this.currentItem.prefixes.push(randomMod);
        } else {
            this.currentItem.suffixes.push(randomMod);
        }
    }

    /**
     * Génère une valeur pour un mod selon son tier
     * @param {string} modName - Nom du mod
     * @param {string} tier - Tier du mod
     * @returns {string} Valeur générée
     */
    generateModValue(modName, tier) {
        // Ranges simplifiés basés sur le tier
        const ranges = {
            't1': { min: 80, max: 100 },
            't2': { min: 60, max: 79 },
            't3': { min: 40, max: 59 }
        };

        const range = ranges[tier];
        const value = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

        // Remplacer le # par la valeur générée
        return modName.replace(/#/g, value.toString());
    }

    /**
     * Vérifie si l'item a un mod spécifique
     * @param {string} modName - Nom du mod à chercher
     * @returns {boolean} True si le mod est présent
     */
    hasModMatching(modName) {
        return this.currentItem.mods.some(mod =>
            mod.name.toLowerCase().includes(modName.toLowerCase())
        );
    }

    /**
     * Compte combien de mods souhaités sont présents
     * @param {Array} desiredMods - Liste des mods souhaités
     * @returns {number} Nombre de mods correspondants
     */
    countMatchingMods(desiredMods) {
        let count = 0;
        desiredMods.forEach(desired => {
            if (this.hasModMatching(desired)) {
                count++;
            }
        });
        return count;
    }

    // ==========================================
    // STATISTIQUES ET TRACKING
    // ==========================================

    /**
     * Track currency usage
     * @param {string} currencyName - Nom de la currency
     * @param {number} cost - Coût en chaos equivalent
     */
    trackCurrency(currencyName, cost) {
        if (!this.sessionStats.currencySpent[currencyName]) {
            this.sessionStats.currencySpent[currencyName] = 0;
        }
        this.sessionStats.currencySpent[currencyName]++;
        this.sessionStats.totalCost += cost;
        this.sessionStats.attempts++;
    }

    /**
     * Obtient les statistiques de la session
     * @returns {Object} Statistiques
     */
    getSessionStats() {
        return {
            ...this.sessionStats,
            averageCostPerAttempt: this.sessionStats.attempts > 0
                ? (this.sessionStats.totalCost / this.sessionStats.attempts).toFixed(2)
                : 0,
            successRate: this.sessionStats.attempts > 0
                ? ((this.sessionStats.successfulCrafts / this.sessionStats.attempts) * 100).toFixed(1)
                : 0
        };
    }

    /**
     * Réinitialise les statistiques
     */
    resetStats() {
        this.sessionStats = {
            currencySpent: {},
            attempts: 0,
            successfulCrafts: 0,
            totalCost: 0
        };
    }

    // ==========================================
    // AUTO-SIMULATION
    // ==========================================

    /**
     * Simule automatiquement une stratégie jusqu'à obtenir le résultat
     * @param {string} strategyName - Nom de la stratégie
     * @param {Array} desiredMods - Mods souhaités
     * @param {number} maxAttempts - Nombre max de tentatives
     * @returns {Object} Résultat de la simulation
     */
    autoSimulate(strategyName, desiredMods, maxAttempts = 1000) {
        this.resetStats();
        const results = [];

        for (let i = 0; i < maxAttempts; i++) {
            this.createNewItem('Regal Sceptre', 75);

            // Simuler selon la stratégie
            if (strategyName === 'alt-regal-exalt') {
                this.simulateAltRegExalt(desiredMods);
            } else if (strategyName === 'alchemy-spam') {
                this.simulateAlchemySpam(desiredMods);
            } else if (strategyName === 'essence-spam') {
                this.simulateEssenceSpam(desiredMods);
            }

            // Vérifier si on a atteint l'objectif
            const matchingMods = this.countMatchingMods(desiredMods);

            if (matchingMods >= desiredMods.length) {
                this.sessionStats.successfulCrafts++;
                results.push({
                    attempt: i + 1,
                    success: true,
                    cost: this.sessionStats.totalCost,
                    item: JSON.parse(JSON.stringify(this.currentItem))
                });
                break;
            }

            // Enregistrer les échecs notables
            if (matchingMods >= desiredMods.length - 1) {
                results.push({
                    attempt: i + 1,
                    success: false,
                    matchingMods: matchingMods,
                    totalMods: desiredMods.length,
                    cost: this.sessionStats.totalCost
                });
            }
        }

        return {
            success: this.sessionStats.successfulCrafts > 0,
            attempts: this.sessionStats.attempts,
            totalCost: this.sessionStats.totalCost,
            currencyUsed: this.sessionStats.currencySpent,
            results: results,
            finalItem: this.currentItem
        };
    }

    /**
     * Simule la stratégie Alt-Regal-Exalt
     * @param {Array} desiredMods - Mods souhaités
     */
    simulateAltRegExalt(desiredMods) {
        // Transmute
        this.useTransmutation();

        // Alt spam jusqu'à obtenir au moins 1 mod désiré
        let attempts = 0;
        while (!this.hasModMatching(desiredMods[0]) && attempts < 200) {
            this.useAlteration();
            attempts++;
        }

        // Aug si un seul mod
        if (this.currentItem.mods.length === 1) {
            this.useAugmentation();
        }

        // Regal
        this.useRegal();

        // Exalts pour remplir
        while (this.currentItem.mods.length < 6) {
            const result = this.useExalted();
            if (!result.success) break;
        }
    }

    /**
     * Simule la stratégie Alchemy Spam
     * @param {Array} desiredMods - Mods souhaités
     */
    simulateAlchemySpam(desiredMods) {
        this.useAlchemy();
    }

    /**
     * Simule la stratégie Essence Spam
     * @param {Array} desiredMods - Mods souhaités
     */
    simulateEssenceSpam(desiredMods) {
        // Utiliser une essence de tier moyen
        this.useEssence('Essence of Greed', 4);
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CraftSimulator;
}
