// Moteur de recommandations de craft pour PoE2
// Ce module analyse les inputs utilisateur et génère des guides de craft optimisés

class CraftingEngine {
    constructor(data) {
        this.data = data;
    }

    /**
     * Analyse l'objectif de craft et génère un guide complet
     * @param {Object} craftGoal - Objectif de craft de l'utilisateur
     * @returns {Object} Guide de craft structuré
     */
    generateCraftGuide(craftGoal) {
        const {
            itemType,
            baseItem,
            itemLevel,
            budget,
            context,
            tradeAllowed,
            mods
        } = craftGoal;

        // Analyser les mods demandés
        const modsAnalysis = this.analyzeMods(mods);

        // Déterminer la meilleure stratégie
        const strategy = this.determineStrategy(modsAnalysis, budget, tradeAllowed);

        // Calculer les coûts
        const costs = this.calculateCosts(strategy, modsAnalysis, budget);

        // Identifier les risques
        const risks = this.identifyRisks(strategy, modsAnalysis);

        // Générer un plan B
        const planB = this.generatePlanB(strategy, modsAnalysis, budget);

        // Conseils d'optimisation
        const tips = this.generateTips(craftGoal, strategy);

        return {
            summary: this.generateSummary(craftGoal, strategy),
            strategy: strategy,
            costs: costs,
            risks: risks,
            planB: planB,
            tips: tips,
            metadata: {
                itemType,
                baseItem,
                itemLevel,
                budget,
                context,
                tradeAllowed
            }
        };
    }

    /**
     * Analyse les mods demandés et catégorise leur difficulté
     */
    analyzeMods(mods) {
        const required = mods.filter(m => m.priority === 'required');
        const desired = mods.filter(m => m.priority === 'desired');
        const optional = mods.filter(m => m.priority === 'optional');

        return {
            required: required,
            desired: desired,
            optional: optional,
            totalCount: mods.length,
            requiredCount: required.length,
            difficulty: this.assessDifficulty(mods)
        };
    }

    /**
     * Évalue la difficulté du craft
     */
    assessDifficulty(mods) {
        const requiredCount = mods.filter(m => m.priority === 'required').length;
        const t1Count = mods.filter(m => m.tier === 't1').length;

        if (requiredCount >= 3 || t1Count >= 2) return 'very_hard';
        if (requiredCount >= 2 || t1Count >= 1) return 'hard';
        if (requiredCount >= 1) return 'medium';
        return 'easy';
    }

    /**
     * Détermine la meilleure stratégie de craft
     */
    determineStrategy(modsAnalysis, budget, tradeAllowed) {
        const { required, difficulty } = modsAnalysis;

        // Si un seul mod obligatoire
        if (required.length === 1) {
            return this.strategySingleMod(required[0], budget, tradeAllowed);
        }

        // Si plusieurs mods obligatoires
        if (required.length >= 2) {
            return this.strategyMultipleMods(required, budget, tradeAllowed);
        }

        // Si aucun mod obligatoire (craft flexible)
        return this.strategyFlexible(budget);
    }

    /**
     * Stratégie pour un seul mod obligatoire
     */
    strategySingleMod(mod, budget, tradeAllowed) {
        const method = budget === 'low' ? 'essence-spam' : 'alt-regal-exalt';
        const strategyData = this.data.craftingStrategies[method];

        return {
            name: strategyData.name,
            type: 'semi-deterministic',
            description: `Méthode optimale pour obtenir: ${mod.name}`,
            steps: this.generateStepsForSingleMod(mod, method, tradeAllowed),
            pros: strategyData.pros,
            cons: strategyData.cons,
            method: method
        };
    }

    /**
     * Génère les étapes pour un craft à mod unique
     */
    generateStepsForSingleMod(mod, method, tradeAllowed) {
        if (method === 'alt-regal-exalt') {
            return [
                {
                    step: 1,
                    action: 'Obtenir la base',
                    detail: tradeAllowed
                        ? 'Acheter une base blanche (normal) avec le bon ilvl sur le trade, OU la farmer'
                        : 'Farmer une base blanche (normal) avec le bon ilvl',
                    why: 'Une base propre permet de contrôler entièrement le craft'
                },
                {
                    step: 2,
                    action: 'Utiliser un Orb of Transmutation',
                    detail: 'Transformer la base en objet magique (1-2 mods aléatoires)',
                    why: 'Démarrer le craft en mode magique pour contrôler les mods'
                },
                {
                    step: 3,
                    action: `Spammer des Orbs of Alteration`,
                    detail: `Réroll jusqu'à obtenir "${mod.name}" ${mod.tier !== 'any' ? `en tier ${mod.tier.toUpperCase()}` : ''}`,
                    why: 'Les Alterations permettent de chercher un mod spécifique de manière semi-déterministe',
                    rng: 'Peut nécessiter entre 10 et 500+ Alterations selon la rareté du mod'
                },
                {
                    step: 4,
                    action: 'Vérifier le deuxième mod (optionnel)',
                    detail: 'Si l\'objet n\'a qu\'un seul mod, utiliser un Orb of Augmentation pour en ajouter un',
                    why: 'Maximiser les chances d\'avoir un bon résultat après le Regal'
                },
                {
                    step: 5,
                    action: 'Utiliser un Regal Orb',
                    detail: 'Transformer l\'objet magique en rare (ajoute 1 mod aléatoire)',
                    why: 'Passage en rare pour pouvoir ajouter plus de mods ensuite',
                    rng: 'Le mod ajouté par le Regal est aléatoire - peut être bon ou mauvais'
                },
                {
                    step: 6,
                    action: 'Évaluer le résultat',
                    detail: 'Si l\'objet a au moins 2 bons mods, continuer. Sinon, recommencer ou passer au Plan B',
                    why: 'Investir dans un objet qui a du potentiel'
                },
                {
                    step: 7,
                    action: 'Compléter avec Exalted Orbs (si budget permet)',
                    detail: 'Ajouter 1-3 mods supplémentaires avec des Exalted Orbs',
                    why: 'Remplir les slots vides pour maximiser l\'objet',
                    rng: 'Chaque Exalt ajoute un mod complètement aléatoire'
                }
            ];
        }

        if (method === 'essence-spam') {
            return [
                {
                    step: 1,
                    action: 'Obtenir la base',
                    detail: tradeAllowed
                        ? 'Acheter ou farmer une base blanche avec le bon ilvl'
                        : 'Farmer une base blanche avec le bon ilvl',
                    why: 'Point de départ du craft'
                },
                {
                    step: 2,
                    action: 'Identifier l\'essence appropriée',
                    detail: `Trouver l'essence qui garantit un mod similaire à "${mod.name}"`,
                    why: 'Les essences donnent un mod garanti, réduisant le RNG',
                    note: 'Consultez poe2db.tw pour voir quelle essence donne quel mod'
                },
                {
                    step: 3,
                    action: 'Spammer l\'essence',
                    detail: 'Utiliser l\'essence répétitivement jusqu\'à obtenir de bons mods complémentaires',
                    why: 'Le mod principal est garanti, on cherche de la chance sur les autres',
                    rng: 'Les 3-5 autres mods sont complètement aléatoires'
                },
                {
                    step: 4,
                    action: 'Évaluer et compléter',
                    detail: 'Si l\'objet a moins de 6 mods et du potentiel, ajouter avec Exalted Orbs',
                    why: 'Maximiser l\'utilité de l\'objet'
                }
            ];
        }

        return [];
    }

    /**
     * Stratégie pour plusieurs mods obligatoires
     */
    strategyMultipleMods(mods, budget, tradeAllowed) {
        if (tradeAllowed && budget !== 'low') {
            return {
                name: 'Trade Base + Completion',
                type: 'semi-deterministic',
                description: 'Acheter une base avec certains mods puis compléter',
                steps: [
                    {
                        step: 1,
                        action: 'Chercher sur le trade',
                        detail: `Trouver un objet qui a déjà 1-2 des mods obligatoires: ${mods.map(m => m.name).join(', ')}`,
                        why: 'Économiser de la currency en achetant le travail déjà fait',
                        note: 'Utilisez le site officiel de trade PoE2'
                    },
                    {
                        step: 2,
                        action: 'Acheter la base',
                        detail: 'Négocier et acheter l\'objet partiellement crafté',
                        why: 'Investissement initial pour gagner du temps'
                    },
                    {
                        step: 3,
                        action: 'Compléter avec Exalted Orbs',
                        detail: 'Si l\'objet a des slots libres, ajouter des mods avec Exalted Orbs',
                        why: 'Remplir l\'objet pour maximiser son potentiel',
                        rng: 'Les Exalts ajoutent des mods aléatoires'
                    },
                    {
                        step: 4,
                        action: 'Utiliser le craft bench (si disponible)',
                        detail: 'Ajouter un mod déterministe via le craft bench',
                        why: 'Contrôle total sur au moins un mod supplémentaire'
                    }
                ],
                pros: 'Économise du temps et réduit le RNG',
                cons: 'Nécessite du capital initial, dépend du marché',
                method: 'trade-base'
            };
        }

        // Sinon, méthode Alchemy spam
        return {
            name: 'Alchemy Spam',
            type: 'high-rng',
            description: 'Spam d\'Orbs of Alchemy jusqu\'à obtenir une bonne combinaison',
            steps: [
                {
                    step: 1,
                    action: 'Obtenir plusieurs bases',
                    detail: 'Farmer ou acheter 10-20 bases blanches identiques',
                    why: 'Avoir du stock pour spammer efficacement'
                },
                {
                    step: 2,
                    action: 'Spammer des Orbs of Alchemy',
                    detail: 'Utiliser des Alchemies sur toutes les bases',
                    why: 'Chercher une bonne combinaison de mods par volume',
                    rng: 'Très aléatoire - peut nécessiter 50-200+ Alchemies'
                },
                {
                    step: 3,
                    action: 'Identifier les meilleurs résultats',
                    detail: `Garder les objets qui ont au moins 2 des mods souhaités: ${mods.map(m => m.name).join(', ')}`,
                    why: 'Trier les objets pour identifier les candidats'
                },
                {
                    step: 4,
                    action: 'Compléter le meilleur objet',
                    detail: 'Ajouter des mods avec Exalted Orbs ou craft bench si possible',
                    why: 'Finaliser l\'objet le plus prometteur'
                }
            ],
            pros: 'Accessible en currency, simple',
            cons: 'Très RNG, peut coûter cher si malchanceux',
            method: 'alchemy-spam'
        };
    }

    /**
     * Stratégie flexible (pas de mods obligatoires)
     */
    strategyFlexible(budget) {
        return {
            name: 'Alchemy Spam Flexible',
            type: 'flexible',
            description: 'Chercher n\'importe quelle bonne combinaison de mods',
            steps: [
                {
                    step: 1,
                    action: 'Spammer des Orbs of Alchemy',
                    detail: 'Utiliser des Alchemies jusqu\'à obtenir un objet avec 3-4 bons mods',
                    why: 'Approche simple et économique'
                },
                {
                    step: 2,
                    action: 'Compléter si nécessaire',
                    detail: 'Ajouter des mods avec Exalted Orbs selon le budget',
                    why: 'Améliorer l\'objet si le budget le permet'
                }
            ],
            pros: 'Simple, flexible, peu coûteux',
            cons: 'Résultat moins contrôlé',
            method: 'alchemy-spam'
        };
    }

    /**
     * Calcule les coûts estimés
     */
    calculateCosts(strategy, modsAnalysis, budget) {
        const method = strategy.method;
        const difficulty = modsAnalysis.difficulty;

        let baseCost = {
            low: 0,
            average: 0,
            high: 0
        };

        // Calculs basés sur la méthode
        if (method === 'alt-regal-exalt') {
            baseCost = {
                low: 20,
                average: 100,
                high: 500
            };
        } else if (method === 'essence-spam') {
            baseCost = {
                low: 30,
                average: 80,
                high: 300
            };
        } else if (method === 'alchemy-spam') {
            baseCost = {
                low: 10,
                average: 50,
                high: 200
            };
        } else if (method === 'trade-base') {
            baseCost = {
                low: 50,
                average: 150,
                high: 500
            };
        }

        // Ajustements selon difficulté
        const multiplier = {
            easy: 0.5,
            medium: 1,
            hard: 2,
            very_hard: 4
        }[difficulty] || 1;

        return {
            low: Math.round(baseCost.low * multiplier),
            average: Math.round(baseCost.average * multiplier),
            high: Math.round(baseCost.high * multiplier),
            currency: 'Chaos Orbs',
            note: 'Ces estimations sont approximatives et dépendent du marché et de votre chance'
        };
    }

    /**
     * Identifie les risques du craft
     */
    identifyRisks(strategy, modsAnalysis) {
        const risks = [];

        if (strategy.method === 'alt-regal-exalt') {
            risks.push({
                type: 'RNG critique',
                description: 'Le Regal Orb peut ajouter un mod inutile',
                severity: 'medium',
                mitigation: 'Avoir plusieurs tentatives de budget prévues'
            });
            risks.push({
                type: 'Coût des Alterations',
                description: 'Peut nécessiter 100-500+ Alterations pour obtenir le bon mod',
                severity: 'medium',
                mitigation: 'Acheter en bulk pour réduire le coût unitaire'
            });
        }

        if (strategy.method === 'alchemy-spam') {
            risks.push({
                type: 'RNG extrême',
                description: 'Peut nécessiter 50-200+ Alchemies sans garantie',
                severity: 'high',
                mitigation: 'Définir un budget maximum et passer au Plan B si dépassé'
            });
        }

        if (modsAnalysis.difficulty === 'very_hard') {
            risks.push({
                type: 'Craft très difficile',
                description: 'Obtenir 3+ mods spécifiques est extrêmement RNG',
                severity: 'high',
                mitigation: 'Considérer réduire les exigences ou augmenter significativement le budget'
            });
        }

        if (!risks.length) {
            risks.push({
                type: 'Risque faible',
                description: 'Ce craft est relativement simple et prévisible',
                severity: 'low',
                mitigation: 'Suivre la stratégie principale'
            });
        }

        return risks;
    }

    /**
     * Génère un plan B
     */
    generatePlanB(strategy, modsAnalysis, budget) {
        const alternatives = [];

        if (strategy.method === 'alt-regal-exalt') {
            alternatives.push({
                title: 'Passer en Essence Spam',
                description: 'Si les Alterations coûtent trop cher, utiliser des Essences pour garantir un mod',
                when: 'Après 200+ Alterations sans succès'
            });
        }

        if (strategy.method === 'alchemy-spam') {
            alternatives.push({
                title: 'Réduire les exigences',
                description: 'Accepter des mods de tier inférieur (T2 au lieu de T1)',
                when: 'Après 100+ Alchemies sans résultat satisfaisant'
            });
        }

        alternatives.push({
            title: 'Acheter sur le trade',
            description: 'Chercher un objet similaire déjà crafté sur le marché',
            when: 'Si le craft personnel devient trop coûteux'
        });

        alternatives.push({
            title: 'Craft progressif',
            description: 'Accepter un objet avec seulement 1-2 des mods souhaités et l\'améliorer plus tard',
            when: 'En cas de budget limité'
        });

        return alternatives;
    }

    /**
     * Génère des conseils d'optimisation
     */
    generateTips(craftGoal, strategy) {
        const tips = [];

        tips.push({
            category: 'Timing économique',
            tip: 'Crafter en début de league coûte plus cher. Attendez 1-2 semaines si possible pour que les prix baissent.'
        });

        tips.push({
            category: 'Achat en bulk',
            tip: 'Achetez la currency en bulk sur le trade (ex: 100+ Alterations) pour économiser 10-20%.'
        });

        if (strategy.method !== 'trade-base') {
            tips.push({
                category: 'Bases alternatives',
                tip: 'Considérez des bases similaires moins populaires qui peuvent être moins chères.'
            });
        }

        tips.push({
            category: 'Vérification des mods',
            tip: 'Utilisez Alt+hover pour voir les tiers de mods. Ne gaspillez pas de currency sur des tiers faibles si vous visez T1/T2.'
        });

        tips.push({
            category: 'PoE2 Spécificité',
            tip: 'Rappelez-vous : pas de Chaos Orb pour reroll dans PoE2. Le crafting est plus progressif et moins "spam-friendly".'
        });

        if (craftGoal.itemLevel < 80) {
            tips.push({
                category: 'Item Level',
                tip: `Votre ilvl est ${craftGoal.itemLevel}. Certains mods T1 nécessitent ilvl 80+. Vérifiez les prérequis sur poe2db.tw.`
            });
        }

        return tips;
    }

    /**
     * Génère un résumé
     */
    generateSummary(craftGoal, strategy) {
        const { itemType, baseItem, mods } = craftGoal;
        const requiredMods = mods.filter(m => m.priority === 'required');

        return {
            goal: `Crafter un ${itemType} (${baseItem || 'base à déterminer'})`,
            requiredMods: requiredMods.map(m => m.name),
            method: strategy.name,
            type: strategy.type,
            complexity: strategy.type === 'semi-deterministic' ? 'Moyen' :
                       strategy.type === 'high-rng' ? 'Élevé' : 'Faible'
        };
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CraftingEngine;
}
