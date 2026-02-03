// Système de Graphiques pour PoE2 Craft Helper v2.1
// Utilise Chart.js pour visualiser les statistiques

class ChartsManager {
    constructor(favoritesManager) {
        this.favManager = favoritesManager;
        this.charts = {};
        this.chartColors = {
            primary: 'rgb(201, 165, 90)',
            secondary: 'rgb(209, 54, 54)',
            success: 'rgb(76, 175, 80)',
            warning: 'rgb(255, 152, 0)',
            info: 'rgb(66, 165, 245)',
            backgrounds: [
                'rgba(201, 165, 90, 0.2)',
                'rgba(209, 54, 54, 0.2)',
                'rgba(76, 175, 80, 0.2)',
                'rgba(255, 152, 0, 0.2)',
                'rgba(66, 165, 245, 0.2)'
            ],
            borders: [
                'rgb(201, 165, 90)',
                'rgb(209, 54, 54)',
                'rgb(76, 175, 80)',
                'rgb(255, 152, 0)',
                'rgb(66, 165, 245)'
            ]
        };
    }

    /**
     * Vérifie si Chart.js est chargé
     */
    isChartJsLoaded() {
        return typeof Chart !== 'undefined';
    }

    /**
     * Charge Chart.js dynamiquement si nécessaire
     */
    async loadChartJs() {
        if (this.isChartJsLoaded()) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Crée un graphique des types d'items les plus craftés
     */
    async createItemTypesChart(canvasId) {
        await this.loadChartJs();

        const history = this.favManager.getHistory();
        const itemTypes = {};

        history.forEach(entry => {
            const type = entry.craftData.metadata.itemType;
            itemTypes[type] = (itemTypes[type] || 0) + 1;
        });

        const sortedTypes = Object.entries(itemTypes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const ctx = document.getElementById(canvasId).getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: sortedTypes.map(([type, _]) => this.formatItemType(type)),
                datasets: [{
                    data: sortedTypes.map(([_, count]) => count),
                    backgroundColor: this.chartColors.backgrounds,
                    borderColor: this.chartColors.borders,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e8dcc3',
                            font: {
                                family: 'Roboto',
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Types d\'Items les Plus Craftés',
                        color: '#c9a55a',
                        font: {
                            family: 'Cinzel',
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée un graphique des stratégies utilisées
     */
    async createStrategiesChart(canvasId) {
        await this.loadChartJs();

        const history = this.favManager.getHistory();
        const strategies = {};

        history.forEach(entry => {
            const strategy = entry.craftData.strategy.name;
            strategies[strategy] = (strategies[strategy] || 0) + 1;
        });

        const sortedStrategies = Object.entries(strategies)
            .sort((a, b) => b[1] - a[1]);

        const ctx = document.getElementById(canvasId).getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedStrategies.map(([name, _]) => name),
                datasets: [{
                    label: 'Utilisations',
                    data: sortedStrategies.map(([_, count]) => count),
                    backgroundColor: this.chartColors.backgrounds[0],
                    borderColor: this.chartColors.borders[0],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#e8dcc3',
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#e8dcc3',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Stratégies les Plus Utilisées',
                        color: '#c9a55a',
                        font: {
                            family: 'Cinzel',
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée un graphique de l'évolution des coûts
     */
    async createCostsChart(canvasId) {
        await this.loadChartJs();

        const history = this.favManager.getHistory().slice(0, 20).reverse();

        const ctx = document.getElementById(canvasId).getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: history.map((_, i) => `#${i + 1}`),
                datasets: [
                    {
                        label: 'Coût Optimiste',
                        data: history.map(e => e.craftData.costs.low),
                        borderColor: this.chartColors.borders[2],
                        backgroundColor: this.chartColors.backgrounds[2],
                        tension: 0.4
                    },
                    {
                        label: 'Coût Moyen',
                        data: history.map(e => e.craftData.costs.average),
                        borderColor: this.chartColors.borders[3],
                        backgroundColor: this.chartColors.backgrounds[3],
                        tension: 0.4
                    },
                    {
                        label: 'Coût Pessimiste',
                        data: history.map(e => e.craftData.costs.high),
                        borderColor: this.chartColors.borders[1],
                        backgroundColor: this.chartColors.backgrounds[1],
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#e8dcc3',
                            callback: function(value) {
                                return value + 'c';
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#e8dcc3'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#e8dcc3',
                            font: {
                                family: 'Roboto',
                                size: 11
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Évolution des Coûts (20 derniers crafts)',
                        color: '#c9a55a',
                        font: {
                            family: 'Cinzel',
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée un graphique de distribution des budgets
     */
    async createBudgetDistribution(canvasId) {
        await this.loadChartJs();

        const history = this.favManager.getHistory();
        const budgets = { low: 0, medium: 0, high: 0, unlimited: 0 };

        history.forEach(entry => {
            const budget = entry.craftData.metadata.budget;
            budgets[budget] = (budgets[budget] || 0) + 1;
        });

        const ctx = document.getElementById(canvasId).getContext('2d');

        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Limité', 'Moyen', 'Élevé', 'Illimité'],
                datasets: [{
                    data: [budgets.low, budgets.medium, budgets.high, budgets.unlimited],
                    backgroundColor: this.chartColors.backgrounds,
                    borderColor: this.chartColors.borders,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e8dcc3',
                            font: {
                                family: 'Roboto',
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribution des Budgets',
                        color: '#c9a55a',
                        font: {
                            family: 'Cinzel',
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée tous les graphiques pour la page de statistiques
     */
    async createAllCharts() {
        try {
            await this.loadChartJs();

            const history = this.favManager.getHistory();

            if (history.length === 0) {
                this.displayNoDataMessage();
                return;
            }

            await Promise.all([
                this.createItemTypesChart('chart_itemTypes'),
                this.createStrategiesChart('chart_strategies'),
                this.createCostsChart('chart_costs'),
                this.createBudgetDistribution('chart_budgets')
            ]);

            console.log('Tous les graphiques créés avec succès');
        } catch (error) {
            console.error('Erreur lors de la création des graphiques:', error);
            this.displayErrorMessage(error);
        }
    }

    /**
     * Affiche un message quand il n'y a pas de données
     */
    displayNoDataMessage() {
        const container = document.getElementById('chartsContainer');
        if (container) {
            container.innerHTML = `
                <div class="feature-card" style="text-align: center;">
                    <h3>📊 Aucune Donnée Disponible</h3>
                    <p>Créez des crafts pour voir vos statistiques apparaître ici !</p>
                    <p style="margin-top: 1rem;">
                        <a href="index.html" class="btn-primary" style="display: inline-block; padding: 0.75rem 1.5rem;">
                            Créer mon Premier Craft
                        </a>
                    </p>
                </div>
            `;
        }
    }

    /**
     * Affiche un message d'erreur
     */
    displayErrorMessage(error) {
        const container = document.getElementById('chartsContainer');
        if (container) {
            container.innerHTML = `
                <div class="feature-card" style="border-left-color: var(--color-danger);">
                    <h3>❌ Erreur de Chargement</h3>
                    <p>Impossible de charger les graphiques.</p>
                    <p style="color: var(--color-text-muted); font-size: 0.9rem;">Erreur: ${error.message}</p>
                </div>
            `;
        }
    }

    /**
     * Formate le nom d'un type d'item
     */
    formatItemType(type) {
        const names = {
            'weapon-1h': 'Arme 1M',
            'weapon-2h': 'Arme 2M',
            'bow': 'Arc',
            'crossbow': 'Arbalète',
            'wand': 'Baguette',
            'staff': 'Bâton',
            'helmet': 'Casque',
            'body': 'Armure',
            'gloves': 'Gants',
            'boots': 'Bottes',
            'shield': 'Bouclier',
            'ring': 'Anneau',
            'amulet': 'Amulette',
            'belt': 'Ceinture'
        };
        return names[type] || type;
    }

    /**
     * Détruit tous les graphiques
     */
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartsManager;
}
