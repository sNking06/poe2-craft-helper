// UI du Simulateur Interactif pour PoE2 Craft Helper v2.1
// Gère l'affichage et l'interaction avec le simulateur de craft

class SimulatorUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.simulator = new CraftSimulator(POE2_DATA_V2 || POE2_DATA);
        this.autoSimRunning = false;
        this.init();
    }

    /**
     * Initialise l'interface du simulateur
     */
    init() {
        this.renderSimulator();
        this.attachEventListeners();
    }

    /**
     * Rend l'interface du simulateur
     */
    renderSimulator() {
        this.container.innerHTML = `
            <div class="simulator-container">
                <!-- Contrôles de création d'item -->
                <div class="simulator-section">
                    <h3>🔨 Créer un Item</h3>
                    <div class="simulator-controls">
                        <div class="form-group">
                            <label>Base Item</label>
                            <select id="sim_baseType">
                                <option value="Regal Sceptre">Regal Sceptre</option>
                                <option value="Gladiator Plate">Gladiator Plate</option>
                                <option value="Diamond Ring">Diamond Ring</option>
                                <option value="Tiger Sword">Tiger Sword</option>
                                <option value="Sorcerer Boots">Sorcerer Boots</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Item Level</label>
                            <input type="number" id="sim_ilvl" value="75" min="1" max="100">
                        </div>
                        <div class="form-group">
                            <button class="btn-primary" id="sim_createItem">Créer l'Item</button>
                        </div>
                    </div>
                </div>

                <!-- Affichage de l'item actuel -->
                <div class="simulator-section">
                    <h3>📦 Item Actuel</h3>
                    <div id="sim_currentItem" class="item-display">
                        <p style="text-align: center; color: var(--color-text-muted);">
                            Aucun item créé. Cliquez sur "Créer l'Item" pour commencer.
                        </p>
                    </div>
                </div>

                <!-- Orbs disponibles -->
                <div class="simulator-section">
                    <h3>⚗️ Currency</h3>
                    <div class="orb-grid" id="sim_orbGrid">
                        ${this.renderOrbButtons()}
                    </div>
                </div>

                <!-- Statistiques de session -->
                <div class="simulator-section">
                    <h3>📊 Statistiques de Session</h3>
                    <div id="sim_stats" class="session-stats">
                        ${this.renderStats()}
                    </div>
                    <div style="margin-top: 1rem;">
                        <button class="btn-secondary" id="sim_resetStats">🔄 Réinitialiser Stats</button>
                    </div>
                </div>

                <!-- Mode Auto-Simulation -->
                <div class="simulator-section">
                    <h3>🤖 Auto-Simulation</h3>
                    <div class="auto-sim-controls">
                        <div class="form-group">
                            <label>Stratégie</label>
                            <select id="sim_autoStrategy">
                                <option value="alt-regal-exalt">Alt-Regal-Exalt</option>
                                <option value="alchemy-spam">Alchemy Spam</option>
                                <option value="essence-spam">Essence Spam</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Nombre de tentatives</label>
                            <select id="sim_autoAttempts">
                                <option value="10">10 tentatives</option>
                                <option value="100" selected>100 tentatives</option>
                                <option value="500">500 tentatives</option>
                                <option value="1000">1000 tentatives</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Mod souhaité (pour test)</label>
                            <input type="text" id="sim_autoMod" placeholder="Ex: maximum Life" value="maximum Life">
                        </div>
                        <div class="form-group">
                            <button class="btn-primary" id="sim_runAuto">🚀 Lancer Auto-Simulation</button>
                        </div>
                    </div>
                    <div id="sim_autoResults" class="auto-sim-results" style="display: none;"></div>
                </div>
            </div>
        `;
    }

    /**
     * Rend les boutons d'orbs
     */
    renderOrbButtons() {
        const orbs = [
            { id: 'transmutation', name: 'Transmutation', icon: '🔷', cost: '1c' },
            { id: 'alteration', name: 'Alteration', icon: '🔄', cost: '3c' },
            { id: 'augmentation', name: 'Augmentation', icon: '➕', cost: '2c' },
            { id: 'regal', name: 'Regal', icon: '👑', cost: '10c' },
            { id: 'alchemy', name: 'Alchemy', icon: '⚗️', cost: '5c' },
            { id: 'exalted', name: 'Exalted', icon: '💎', cost: '80c' },
            { id: 'scouring', name: 'Scouring', icon: '🧹', cost: '5c' },
            { id: 'essence', name: 'Essence (Greed T4)', icon: '✨', cost: '~10c' }
        ];

        return orbs.map(orb => `
            <button class="orb-button" data-orb="${orb.id}">
                <span class="orb-icon">${orb.icon}</span>
                <span class="orb-name">${orb.name}</span>
                <span class="orb-cost">${orb.cost}</span>
            </button>
        `).join('');
    }

    /**
     * Rend les statistiques
     */
    renderStats() {
        const stats = this.simulator.getSessionStats();

        return `
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-label">Tentatives</div>
                    <div class="stat-value">${stats.attempts}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Coût Total</div>
                    <div class="stat-value">${stats.totalCost}c</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Coût Moyen</div>
                    <div class="stat-value">${stats.averageCostPerAttempt}c</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Taux Réussite</div>
                    <div class="stat-value">${stats.successRate}%</div>
                </div>
            </div>
            <div class="currency-breakdown" style="margin-top: 1rem;">
                <h4>Currency Utilisée</h4>
                ${this.renderCurrencyBreakdown(stats.currencySpent)}
            </div>
        `;
    }

    /**
     * Rend le détail de currency utilisée
     */
    renderCurrencyBreakdown(currencySpent) {
        if (Object.keys(currencySpent).length === 0) {
            return '<p style="color: var(--color-text-muted);">Aucune currency utilisée</p>';
        }

        return Object.entries(currencySpent)
            .map(([name, count]) => `
                <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
                    <span>${name}</span>
                    <span style="color: var(--color-accent-gold);">${count}x</span>
                </div>
            `).join('');
    }

    /**
     * Attache les event listeners
     */
    attachEventListeners() {
        // Créer un item
        document.getElementById('sim_createItem').addEventListener('click', () => {
            this.createItem();
        });

        // Boutons d'orbs
        document.querySelectorAll('.orb-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orbType = e.currentTarget.dataset.orb;
                this.useOrb(orbType);
            });
        });

        // Reset stats
        document.getElementById('sim_resetStats').addEventListener('click', () => {
            this.simulator.resetStats();
            this.updateStats();
            this.showNotification('Statistiques réinitialisées', 'success');
        });

        // Auto-simulation
        document.getElementById('sim_runAuto').addEventListener('click', () => {
            this.runAutoSimulation();
        });
    }

    /**
     * Crée un nouvel item
     */
    createItem() {
        const baseType = document.getElementById('sim_baseType').value;
        const ilvl = parseInt(document.getElementById('sim_ilvl').value);

        this.simulator.createNewItem(baseType, ilvl);
        this.updateItemDisplay();
        this.showNotification(`Item créé : ${baseType} (ilvl ${ilvl})`, 'success');
    }

    /**
     * Utilise un orb
     */
    useOrb(orbType) {
        if (!this.simulator.currentItem) {
            this.showNotification('Créez d\'abord un item !', 'error');
            return;
        }

        let result;

        switch(orbType) {
            case 'transmutation':
                result = this.simulator.useTransmutation();
                break;
            case 'alteration':
                result = this.simulator.useAlteration();
                break;
            case 'augmentation':
                result = this.simulator.useAugmentation();
                break;
            case 'regal':
                result = this.simulator.useRegal();
                break;
            case 'alchemy':
                result = this.simulator.useAlchemy();
                break;
            case 'exalted':
                result = this.simulator.useExalted();
                break;
            case 'scouring':
                result = this.simulator.useScouring();
                break;
            case 'essence':
                result = this.simulator.useEssence('Essence of Greed', 4);
                break;
        }

        if (result.success) {
            this.updateItemDisplay();
            this.updateStats();
            this.showNotification(result.message, 'success');
        } else {
            this.showNotification(result.message, 'error');
        }
    }

    /**
     * Met à jour l'affichage de l'item
     */
    updateItemDisplay() {
        const item = this.simulator.currentItem;
        const container = document.getElementById('sim_currentItem');

        if (!item) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">Aucun item créé</p>';
            return;
        }

        const rarityColors = {
            'normal': 'var(--color-normal)',
            'magic': 'var(--color-magic)',
            'rare': 'var(--color-rare)',
            'unique': 'var(--color-unique)'
        };

        const rarityColor = rarityColors[item.rarity] || 'var(--color-text-primary)';

        container.innerHTML = `
            <div class="item-card" style="border-left: 4px solid ${rarityColor};">
                <div class="item-header">
                    <h4 style="color: ${rarityColor}; margin: 0;">${item.baseType}</h4>
                    <span class="item-rarity" style="color: ${rarityColor};">${item.rarity.toUpperCase()}</span>
                </div>
                <div class="item-stats">
                    <p><strong>Item Level:</strong> ${item.itemLevel}</p>
                    <p><strong>Mods:</strong> ${item.mods.length}/6 (${item.prefixes.length}P / ${item.suffixes.length}S)</p>
                </div>
                <div class="item-mods">
                    ${item.mods.length > 0 ? `
                        <h5>Mods:</h5>
                        <ul>
                            ${item.mods.map(mod => `
                                <li style="color: ${mod.type === 'prefix' ? '#8888ff' : '#88ff88'};">
                                    <span class="mod-tier">[${mod.tier.toUpperCase()}]</span>
                                    ${mod.value || mod.name}
                                    ${mod.source === 'essence-guaranteed' ? ' <strong>(Essence)</strong>' : ''}
                                </li>
                            `).join('')}
                        </ul>
                    ` : '<p style="color: var(--color-text-muted);">Aucun mod</p>'}
                </div>
            </div>
        `;
    }

    /**
     * Met à jour les statistiques
     */
    updateStats() {
        document.getElementById('sim_stats').innerHTML = this.renderStats();
    }

    /**
     * Lance l'auto-simulation
     */
    async runAutoSimulation() {
        if (this.autoSimRunning) {
            this.showNotification('Une simulation est déjà en cours', 'warning');
            return;
        }

        const strategy = document.getElementById('sim_autoStrategy').value;
        const attempts = parseInt(document.getElementById('sim_autoAttempts').value);
        const modName = document.getElementById('sim_autoMod').value;

        if (!modName) {
            this.showNotification('Entrez un mod à chercher', 'error');
            return;
        }

        this.autoSimRunning = true;
        const btn = document.getElementById('sim_runAuto');
        btn.disabled = true;
        btn.textContent = '⏳ Simulation en cours...';

        this.showNotification(`Lancement de ${attempts} simulations...`, 'info');

        // Simuler de manière asynchrone pour ne pas bloquer l'UI
        setTimeout(() => {
            const result = this.simulator.autoSimulate(strategy, [modName], attempts);

            this.displayAutoSimResults(result, attempts);
            this.updateStats();

            this.autoSimRunning = false;
            btn.disabled = false;
            btn.textContent = '🚀 Lancer Auto-Simulation';

            if (result.success) {
                this.showNotification(`Simulation terminée ! Objectif atteint en ${result.attempts} tentatives.`, 'success');
            } else {
                this.showNotification(`Simulation terminée. Objectif non atteint en ${attempts} tentatives.`, 'warning');
            }
        }, 100);
    }

    /**
     * Affiche les résultats de l'auto-simulation
     */
    displayAutoSimResults(result, maxAttempts) {
        const container = document.getElementById('sim_autoResults');
        container.style.display = 'block';

        const successRate = result.success ? ((1 / result.attempts) * 100).toFixed(2) : 0;

        container.innerHTML = `
            <div class="auto-sim-summary">
                <h4>${result.success ? '✅ Simulation Réussie !' : '❌ Objectif Non Atteint'}</h4>

                <div class="stats-grid" style="margin-top: 1rem;">
                    <div class="stat-item">
                        <div class="stat-label">Tentatives</div>
                        <div class="stat-value">${result.attempts}/${maxAttempts}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Coût Total</div>
                        <div class="stat-value">${result.totalCost}c</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Taux Réussite</div>
                        <div class="stat-value">${successRate}%</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Résultats Notables</div>
                        <div class="stat-value">${result.results.length}</div>
                    </div>
                </div>

                <div style="margin-top: 1.5rem;">
                    <h5>Currency Utilisée</h5>
                    ${this.renderCurrencyBreakdown(result.currencyUsed)}
                </div>

                ${result.success ? `
                    <div style="margin-top: 1.5rem;">
                        <h5>Item Final</h5>
                        <div class="item-card" style="border-left: 4px solid var(--color-rare);">
                            <p><strong>Base:</strong> ${result.finalItem.baseType}</p>
                            <p><strong>Mods:</strong> ${result.finalItem.mods.length}</p>
                            <ul style="margin-top: 0.5rem;">
                                ${result.finalItem.mods.map(mod => `
                                    <li style="color: ${mod.type === 'prefix' ? '#8888ff' : '#88ff88'};">
                                        ${mod.value || mod.name}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Affiche une notification
     */
    showNotification(message, type = 'info') {
        // Cette fonction sera améliorée avec le système de toast plus tard
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-danger)',
            warning: 'var(--color-warning)',
            info: 'var(--color-accent-gold)'
        };

        // Créer un toast simple
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// CSS pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }

    .simulator-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .simulator-section {
        background: var(--color-bg-tertiary);
        padding: 1.5rem;
        border-radius: var(--border-radius);
        border-left: 4px solid var(--color-accent-gold);
    }

    .simulator-controls,
    .auto-sim-controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .orb-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
    }

    .orb-button {
        background: var(--color-bg-secondary);
        border: 2px solid var(--color-border);
        padding: 1rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .orb-button:hover {
        background: var(--color-bg-tertiary);
        border-color: var(--color-accent-gold);
        transform: translateY(-2px);
    }

    .orb-button:active {
        transform: translateY(0);
    }

    .orb-icon {
        font-size: 2rem;
    }

    .orb-name {
        font-size: 0.9rem;
        color: var(--color-text-primary);
        font-weight: 500;
    }

    .orb-cost {
        font-size: 0.8rem;
        color: var(--color-text-muted);
    }

    .item-display {
        min-height: 200px;
    }

    .item-card {
        background: var(--color-bg-secondary);
        padding: 1.5rem;
        border-radius: var(--border-radius);
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-border);
    }

    .item-stats {
        margin-bottom: 1rem;
    }

    .item-stats p {
        margin: 0.5rem 0;
        color: var(--color-text-secondary);
    }

    .item-mods ul {
        list-style: none;
        padding: 0;
        margin: 0.5rem 0 0 0;
    }

    .item-mods li {
        padding: 0.25rem 0;
        font-size: 0.95rem;
    }

    .mod-tier {
        color: var(--color-accent-gold);
        font-weight: 600;
        margin-right: 0.5rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }

    .stat-item {
        text-align: center;
        background: var(--color-bg-secondary);
        padding: 1rem;
        border-radius: var(--border-radius);
    }

    .stat-label {
        color: var(--color-text-secondary);
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
    }

    .stat-value {
        color: var(--color-accent-gold);
        font-size: 1.5rem;
        font-weight: 600;
        font-family: 'Cinzel', serif;
    }

    .auto-sim-results {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--color-bg-secondary);
        border-radius: var(--border-radius);
        border: 2px solid var(--color-accent-gold);
    }

    .auto-sim-summary h4 {
        margin-top: 0;
        color: var(--color-accent-gold);
    }
`;
document.head.appendChild(style);

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimulatorUI;
}
