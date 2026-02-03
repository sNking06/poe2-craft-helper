// Système de Comparaison de Stratégies pour PoE2 Craft Helper
// Compare différentes approches de craft pour un même objectif

class StrategyComparator {
    constructor(craftingEngine, data) {
        this.engine = craftingEngine;
        this.data = data;
    }

    /**
     * Compare toutes les stratégies possibles pour un objectif donné
     * @param {Object} craftGoal - Objectif de craft
     * @returns {Array} Liste des stratégies comparées
     */
    compareAllStrategies(craftGoal) {
        const strategies = [];

        // Générer un guide pour chaque stratégie disponible
        const availableStrategies = Object.keys(this.data.craftingStrategies);

        availableStrategies.forEach(strategyKey => {
            const strategy = this.generateStrategyVariant(craftGoal, strategyKey);
            if (strategy) {
                strategies.push(strategy);
            }
        });

        // Trier par score (meilleur en premier)
        strategies.sort((a, b) => b.score - a.score);

        return strategies;
    }

    /**
     * Génère une variante de guide pour une stratégie spécifique
     * @param {Object} craftGoal - Objectif de craft
     * @param {string} strategyKey - Clé de la stratégie
     * @returns {Object} Guide avec score
     */
    generateStrategyVariant(craftGoal, strategyKey) {
        const strategyData = this.data.craftingStrategies[strategyKey];

        if (!strategyData) return null;

        // Calculer l'adéquation de cette stratégie
        const suitability = this.calculateSuitability(craftGoal, strategyKey);

        // Si la stratégie n'est vraiment pas adaptée, on la skip
        if (suitability.score < 2) return null;

        return {
            key: strategyKey,
            name: strategyData.name,
            description: strategyData.description,
            difficulty: strategyData.difficulty,
            estimatedCost: strategyData.estimated_cost,
            pros: strategyData.pros,
            cons: strategyData.cons,
            suitability: suitability,
            score: suitability.score,
            recommendation: this.getRecommendationLevel(suitability.score)
        };
    }

    /**
     * Calcule l'adéquation d'une stratégie pour un objectif
     * @param {Object} craftGoal - Objectif de craft
     * @param {string} strategyKey - Clé de la stratégie
     * @returns {Object} Score et raisons
     */
    calculateSuitability(craftGoal, strategyKey) {
        let score = 5; // Score de base
        const reasons = [];

        const { budget, mods, tradeAllowed, context } = craftGoal;
        const requiredMods = mods.filter(m => m.priority === 'required');

        // === ALT-REGAL-EXALT ===
        if (strategyKey === 'alt-regal-exalt') {
            if (requiredMods.length === 1) {
                score += 3;
                reasons.push('✅ Idéal pour 1 mod obligatoire spécifique');
            }
            if (requiredMods.length > 2) {
                score -= 2;
                reasons.push('⚠️ Moins efficace avec 3+ mods obligatoires');
            }
            if (budget === 'low') {
                score -= 2;
                reasons.push('❌ Coûteux en Alterations pour petit budget');
            }
            if (budget === 'high' || budget === 'unlimited') {
                score += 1;
                reasons.push('✅ Budget adapté pour cette méthode');
            }
        }

        // === ESSENCE SPAM ===
        if (strategyKey === 'essence-spam') {
            if (requiredMods.length === 1) {
                score += 2;
                reasons.push('✅ Bon pour garantir 1 mod spécifique');
            }
            if (budget === 'low' || budget === 'medium') {
                score += 1;
                reasons.push('✅ Économique avec essences tier bas/moyen');
            }
            if (requiredMods.some(m => m.tier === 't1')) {
                score -= 1;
                reasons.push('⚠️ Essences T1 peuvent être coûteuses');
            }
        }

        // === ALCHEMY SPAM ===
        if (strategyKey === 'alchemy-spam') {
            if (budget === 'low') {
                score += 3;
                reasons.push('✅ Excellent pour budget limité');
            }
            if (requiredMods.length >= 2) {
                score -= 2;
                reasons.push('❌ Très RNG avec 2+ mods obligatoires');
            }
            if (context === 'early') {
                score += 2;
                reasons.push('✅ Parfait pour early game');
            }
            if (mods.some(m => m.tier === 't1')) {
                score -= 1;
                reasons.push('⚠️ Difficile d\'obtenir des T1 par chance');
            }
        }

        // === TRADE BASE ===
        if (strategyKey === 'trade-base') {
            if (!tradeAllowed) {
                score -= 5;
                reasons.push('❌ Trade non autorisé (SSF)');
            }
            if (tradeAllowed && (budget === 'high' || budget === 'unlimited')) {
                score += 3;
                reasons.push('✅ Idéal avec budget et trade disponible');
            }
            if (requiredMods.length >= 2) {
                score += 2;
                reasons.push('✅ Économise du temps sur crafts complexes');
            }
            if (context === 'endgame') {
                score += 1;
                reasons.push('✅ Marché actif en end-game');
            }
        }

        // === HARVEST CRAFT ===
        if (strategyKey === 'harvest-craft') {
            if (context === 'early') {
                score -= 2;
                reasons.push('⚠️ Accès limité aux crafts en early');
            }
            if (context === 'endgame') {
                score += 2;
                reasons.push('✅ Tous les crafts disponibles en end-game');
            }
            if (budget === 'high' || budget === 'unlimited') {
                score += 2;
                reasons.push('✅ Budget adapté pour crafts avancés');
            }
        }

        // === META-CRAFT ===
        if (strategyKey === 'meta-craft') {
            if (budget !== 'unlimited') {
                score -= 3;
                reasons.push('❌ Nécessite budget illimité');
            }
            if (context !== 'endgame') {
                score -= 2;
                reasons.push('❌ Réservé au end-game absolu');
            }
            if (requiredMods.length >= 3 && mods.some(m => m.tier === 't1')) {
                score += 3;
                reasons.push('✅ Justifié pour crafts mirror-tier');
            }
        }

        return {
            score: Math.max(0, score),
            reasons: reasons
        };
    }

    /**
     * Obtient le niveau de recommandation basé sur le score
     * @param {number} score - Score de suitabilité
     * @returns {string} Niveau de recommandation
     */
    getRecommendationLevel(score) {
        if (score >= 8) return 'excellent';
        if (score >= 6) return 'very-good';
        if (score >= 4) return 'good';
        if (score >= 2) return 'acceptable';
        return 'not-recommended';
    }

    /**
     * Compare deux stratégies spécifiques
     * @param {Object} strategy1 - Première stratégie
     * @param {Object} strategy2 - Deuxième stratégie
     * @returns {Object} Comparaison détaillée
     */
    compareTwo(strategy1, strategy2) {
        return {
            winner: strategy1.score > strategy2.score ? strategy1.name : strategy2.name,
            scoreDifference: Math.abs(strategy1.score - strategy2.score),
            costComparison: this.compareCosts(
                strategy1.estimatedCost,
                strategy2.estimatedCost
            ),
            difficultyComparison: this.compareDifficulty(
                strategy1.difficulty,
                strategy2.difficulty
            ),
            recommendation: this.getComparisonRecommendation(strategy1, strategy2)
        };
    }

    /**
     * Compare les coûts de deux stratégies
     * @param {Object} cost1 - Coûts stratégie 1
     * @param {Object} cost2 - Coûts stratégie 2
     * @returns {Object} Comparaison des coûts
     */
    compareCosts(cost1, cost2) {
        const avg1 = cost1.average;
        const avg2 = cost2.average;

        return {
            cheaper: avg1 < avg2 ? 1 : 2,
            difference: Math.abs(avg1 - avg2),
            percentageDiff: ((Math.abs(avg1 - avg2) / Math.max(avg1, avg2)) * 100).toFixed(1)
        };
    }

    /**
     * Compare la difficulté de deux stratégies
     * @param {string} diff1 - Difficulté stratégie 1
     * @param {string} diff2 - Difficulté stratégie 2
     * @returns {Object} Comparaison de difficulté
     */
    compareDifficulty(diff1, diff2) {
        const levels = { easy: 1, medium: 2, hard: 3, very_hard: 4 };
        const level1 = levels[diff1] || 2;
        const level2 = levels[diff2] || 2;

        return {
            easier: level1 < level2 ? 1 : 2,
            difference: Math.abs(level1 - level2)
        };
    }

    /**
     * Génère une recommandation comparative
     * @param {Object} strategy1 - Première stratégie
     * @param {Object} strategy2 - Deuxième stratégie
     * @returns {string} Recommandation
     */
    getComparisonRecommendation(strategy1, strategy2) {
        const scoreDiff = Math.abs(strategy1.score - strategy2.score);

        if (scoreDiff <= 1) {
            return 'Les deux stratégies sont équivalentes. Choisissez selon votre préférence.';
        }

        const better = strategy1.score > strategy2.score ? strategy1 : strategy2;
        const worse = strategy1.score > strategy2.score ? strategy2 : strategy1;

        return `${better.name} est nettement supérieure à ${worse.name} pour cet objectif.`;
    }

    /**
     * Génère un rapport de comparaison complet
     * @param {Object} craftGoal - Objectif de craft
     * @returns {Object} Rapport complet
     */
    generateComparisonReport(craftGoal) {
        const strategies = this.compareAllStrategies(craftGoal);

        if (strategies.length === 0) {
            return {
                error: 'Aucune stratégie adaptée trouvée'
            };
        }

        const best = strategies[0];
        const alternatives = strategies.slice(1, 4); // Top 3 alternatives

        return {
            recommended: best,
            alternatives: alternatives,
            totalStrategiesAnalyzed: strategies.length,
            summary: this.generateSummary(best, alternatives),
            detailedComparison: this.generateDetailedTable(strategies)
        };
    }

    /**
     * Génère un résumé de recommandation
     * @param {Object} best - Meilleure stratégie
     * @param {Array} alternatives - Alternatives
     * @returns {string} Résumé
     */
    generateSummary(best, alternatives) {
        let summary = `🏆 Stratégie Recommandée: ${best.name}\n\n`;
        summary += `Score: ${best.score}/10\n`;
        summary += `Coût moyen: ${best.estimatedCost.average} chaos\n`;
        summary += `Difficulté: ${best.difficulty}\n\n`;

        summary += 'Raisons:\n';
        best.suitability.reasons.forEach(reason => {
            summary += `  ${reason}\n`;
        });

        if (alternatives.length > 0) {
            summary += '\n📋 Alternatives Viables:\n';
            alternatives.forEach((alt, i) => {
                summary += `${i + 1}. ${alt.name} (Score: ${alt.score}/10)\n`;
            });
        }

        return summary;
    }

    /**
     * Génère un tableau de comparaison détaillé
     * @param {Array} strategies - Liste des stratégies
     * @returns {Array} Tableau de données
     */
    generateDetailedTable(strategies) {
        return strategies.map(s => ({
            name: s.name,
            score: s.score,
            recommendation: s.recommendation,
            costLow: s.estimatedCost.low,
            costAvg: s.estimatedCost.average,
            costHigh: s.estimatedCost.high,
            difficulty: s.difficulty,
            pros: s.pros,
            cons: s.cons
        }));
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StrategyComparator;
}
