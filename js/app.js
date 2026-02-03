// Application principale pour PoE2 Craft Helper
// Gère l'UI, les événements et la génération de guides

(function() {
    'use strict';

    // Initialisation du moteur de crafting
    const craftingEngine = new CraftingEngine(POE2_DATA);

    // Éléments DOM
    const elements = {
        form: document.getElementById('craftForm'),
        itemType: document.getElementById('itemType'),
        baseItem: document.getElementById('baseItem'),
        itemLevel: document.getElementById('itemLevel'),
        budget: document.getElementById('budget'),
        context: document.getElementById('context'),
        tradeAllowed: document.getElementById('tradeAllowed'),
        modsContainer: document.getElementById('modsContainer'),
        addModBtn: document.getElementById('addModBtn'),
        resultSection: document.getElementById('craftResult'),
        summaryContent: document.getElementById('summaryContent'),
        strategyContent: document.getElementById('strategyContent'),
        costContent: document.getElementById('costContent'),
        riskContent: document.getElementById('riskContent'),
        planbContent: document.getElementById('planbContent'),
        tipsContent: document.getElementById('tipsContent'),
        exportBtn: document.getElementById('exportBtn'),
        shareBtn: document.getElementById('shareBtn'),
        newCraftBtn: document.getElementById('newCraftBtn')
    };

    // État de l'application
    let currentGuide = null;

    /**
     * Initialisation de l'application
     */
    function init() {
        setupEventListeners();
        populateBaseItems();
        populateModsList();
        console.log('PoE2 Craft Helper initialisé');
    }

    /**
     * Configuration des event listeners
     */
    function setupEventListeners() {
        // Soumission du formulaire
        elements.form.addEventListener('submit', handleFormSubmit);

        // Changement du type d'objet
        elements.itemType.addEventListener('change', handleItemTypeChange);

        // Ajout de mod
        elements.addModBtn.addEventListener('click', addModInput);

        // Suppression de mod (délégation d'événement)
        elements.modsContainer.addEventListener('click', handleModRemove);

        // Reset du formulaire
        elements.form.addEventListener('reset', handleFormReset);

        // Actions des résultats
        elements.exportBtn.addEventListener('click', exportGuide);
        elements.shareBtn.addEventListener('click', shareGuide);
        elements.newCraftBtn.addEventListener('click', startNewCraft);
    }

    /**
     * Remplit la liste des bases selon le type d'objet
     */
    function populateBaseItems() {
        const itemType = elements.itemType.value;
        const datalist = document.getElementById('baseItemList');
        datalist.innerHTML = '';

        if (itemType && POE2_DATA.bases[itemType]) {
            POE2_DATA.bases[itemType].forEach(base => {
                const option = document.createElement('option');
                option.value = base;
                datalist.appendChild(option);
            });
        }
    }

    /**
     * Remplit la liste des mods disponibles
     */
    function populateModsList() {
        const datalist = document.getElementById('modsList');
        datalist.innerHTML = '';

        const allMods = [...POE2_DATA.mods.prefix, ...POE2_DATA.mods.suffix];
        allMods.forEach(mod => {
            const option = document.createElement('option');
            option.value = mod;
            datalist.appendChild(option);
        });
    }

    /**
     * Gère le changement de type d'objet
     */
    function handleItemTypeChange() {
        populateBaseItems();
        elements.baseItem.value = '';
    }

    /**
     * Ajoute un champ de saisie de mod
     */
    function addModInput() {
        const modGroup = document.createElement('div');
        modGroup.className = 'mod-input-group';
        modGroup.innerHTML = `
            <input type="text" class="mod-input" placeholder="Ex: +2 to Level of Chaos Gems" list="modsList">
            <select class="mod-priority">
                <option value="required">Obligatoire</option>
                <option value="desired">Souhaité</option>
                <option value="optional">Optionnel</option>
            </select>
            <select class="mod-tier">
                <option value="any">Any Tier</option>
                <option value="t1">T1</option>
                <option value="t2">T2</option>
                <option value="t3">T3</option>
            </select>
            <button type="button" class="btn-remove-mod">✕</button>
        `;
        elements.modsContainer.appendChild(modGroup);
    }

    /**
     * Supprime un champ de mod
     */
    function handleModRemove(e) {
        if (e.target.classList.contains('btn-remove-mod')) {
            const modGroup = e.target.closest('.mod-input-group');
            if (elements.modsContainer.children.length > 1) {
                modGroup.remove();
            } else {
                alert('Vous devez garder au moins un mod');
            }
        }
    }

    /**
     * Récupère les mods du formulaire
     */
    function getMods() {
        const modGroups = elements.modsContainer.querySelectorAll('.mod-input-group');
        const mods = [];

        modGroups.forEach(group => {
            const input = group.querySelector('.mod-input');
            const priority = group.querySelector('.mod-priority');
            const tier = group.querySelector('.mod-tier');

            if (input.value.trim()) {
                mods.push({
                    name: input.value.trim(),
                    priority: priority.value,
                    tier: tier.value
                });
            }
        });

        return mods;
    }

    /**
     * Gère la soumission du formulaire
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        const mods = getMods();

        if (mods.length === 0) {
            alert('Veuillez ajouter au moins un mod souhaité');
            return;
        }

        const craftGoal = {
            itemType: elements.itemType.value,
            baseItem: elements.baseItem.value,
            itemLevel: parseInt(elements.itemLevel.value),
            budget: elements.budget.value,
            context: elements.context.value,
            tradeAllowed: elements.tradeAllowed.checked,
            mods: mods
        };

        // Générer le guide
        currentGuide = craftingEngine.generateCraftGuide(craftGoal);

        // Afficher les résultats
        displayResults(currentGuide);

        // Scroll vers les résultats
        elements.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Affiche les résultats du guide
     */
    function displayResults(guide) {
        // Afficher la section
        elements.resultSection.classList.remove('hidden');

        // Remplir chaque section
        renderSummary(guide.summary, guide.metadata);
        renderStrategy(guide.strategy);
        renderCosts(guide.costs);
        renderRisks(guide.risks);
        renderPlanB(guide.planB);
        renderTips(guide.tips);
    }

    /**
     * Affiche le résumé
     */
    function renderSummary(summary, metadata) {
        const html = `
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>🎯 Objectif</strong>
                    <div>${summary.goal}</div>
                </div>
                <div class="summary-item">
                    <strong>⚙️ Méthode</strong>
                    <div>${summary.method}</div>
                </div>
                <div class="summary-item">
                    <strong>📊 Complexité</strong>
                    <div>${summary.complexity}</div>
                </div>
                <div class="summary-item">
                    <strong>📦 Item Level</strong>
                    <div>ilvl ${metadata.itemLevel}</div>
                </div>
            </div>
            ${summary.requiredMods.length > 0 ? `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--color-bg-secondary); border-radius: var(--border-radius);">
                    <strong style="color: var(--color-accent-gold);">Mods Obligatoires:</strong>
                    <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                        ${summary.requiredMods.map(mod => `<li>${mod}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
        elements.summaryContent.innerHTML = html;
    }

    /**
     * Affiche la stratégie
     */
    function renderStrategy(strategy) {
        let html = `
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Type:</strong> ${getStrategyTypeLabel(strategy.type)}</p>
                <p>${strategy.description}</p>
                ${strategy.pros ? `<p style="color: var(--color-success);">✓ <strong>Avantages:</strong> ${strategy.pros}</p>` : ''}
                ${strategy.cons ? `<p style="color: var(--color-warning);">⚠ <strong>Inconvénients:</strong> ${strategy.cons}</p>` : ''}
            </div>
        `;

        strategy.steps.forEach((step, index) => {
            html += `
                <div class="strategy-step" data-step="${step.step}">
                    <h4>${step.action}</h4>
                    <div class="step-detail">${step.detail}</div>
                    <div class="step-why">💡 ${step.why}</div>
                    ${step.rng ? `<div class="step-rng">🎲 ${step.rng}</div>` : ''}
                    ${step.note ? `<div class="step-note">ℹ️ ${step.note}</div>` : ''}
                </div>
            `;
        });

        elements.strategyContent.innerHTML = html;
    }

    /**
     * Affiche les coûts
     */
    function renderCosts(costs) {
        const html = `
            <div class="cost-grid">
                <div class="cost-item">
                    <div class="cost-label">Optimiste</div>
                    <div class="cost-value">${costs.low}</div>
                    <div class="cost-currency">${costs.currency}</div>
                </div>
                <div class="cost-item">
                    <div class="cost-label">Moyen</div>
                    <div class="cost-value">${costs.average}</div>
                    <div class="cost-currency">${costs.currency}</div>
                </div>
                <div class="cost-item">
                    <div class="cost-label">Pessimiste</div>
                    <div class="cost-value">${costs.high}</div>
                    <div class="cost-currency">${costs.currency}</div>
                </div>
            </div>
            <p class="cost-note">${costs.note}</p>
        `;
        elements.costContent.innerHTML = html;
    }

    /**
     * Affiche les risques
     */
    function renderRisks(risks) {
        const html = risks.map(risk => `
            <div class="risk-item">
                <div class="risk-header">
                    <span class="risk-severity ${risk.severity}">${risk.severity}</span>
                    <span class="risk-type">${risk.type}</span>
                </div>
                <div class="risk-description">${risk.description}</div>
                <div class="risk-mitigation">${risk.mitigation}</div>
            </div>
        `).join('');

        elements.riskContent.innerHTML = html;
    }

    /**
     * Affiche le Plan B
     */
    function renderPlanB(planB) {
        const html = planB.map(alt => `
            <div class="planb-item">
                <h4>${alt.title}</h4>
                <p>${alt.description}</p>
                <p class="planb-when">${alt.when}</p>
            </div>
        `).join('');

        elements.planbContent.innerHTML = html;
    }

    /**
     * Affiche les conseils
     */
    function renderTips(tips) {
        const html = tips.map(tip => `
            <div class="tip-item">
                <div class="tip-category">${tip.category}</div>
                <div class="tip-content">${tip.tip}</div>
            </div>
        `).join('');

        elements.tipsContent.innerHTML = html;
    }

    /**
     * Obtient le label du type de stratégie
     */
    function getStrategyTypeLabel(type) {
        const labels = {
            'semi-deterministic': 'Semi-Déterministe',
            'high-rng': 'Haute Aléatoire',
            'flexible': 'Flexible'
        };
        return labels[type] || type;
    }

    /**
     * Exporte le guide en texte
     */
    function exportGuide() {
        if (!currentGuide) return;

        let text = '='.repeat(60) + '\n';
        text += 'PoE2 Craft Helper - Guide de Craft\n';
        text += '='.repeat(60) + '\n\n';

        // Résumé
        text += '📊 RÉSUMÉ\n';
        text += '-'.repeat(60) + '\n';
        text += `Objectif: ${currentGuide.summary.goal}\n`;
        text += `Méthode: ${currentGuide.summary.method}\n`;
        text += `Complexité: ${currentGuide.summary.complexity}\n\n`;

        // Stratégie
        text += '✅ STRATÉGIE PRINCIPALE\n';
        text += '-'.repeat(60) + '\n';
        text += `${currentGuide.strategy.description}\n\n`;
        currentGuide.strategy.steps.forEach(step => {
            text += `Étape ${step.step}: ${step.action}\n`;
            text += `  ${step.detail}\n`;
            text += `  💡 ${step.why}\n\n`;
        });

        // Coûts
        text += '💰 ESTIMATION DES COÛTS\n';
        text += '-'.repeat(60) + '\n';
        text += `Optimiste: ${currentGuide.costs.low} ${currentGuide.costs.currency}\n`;
        text += `Moyen: ${currentGuide.costs.average} ${currentGuide.costs.currency}\n`;
        text += `Pessimiste: ${currentGuide.costs.high} ${currentGuide.costs.currency}\n\n`;

        // Risques
        text += '⚠️ RISQUES\n';
        text += '-'.repeat(60) + '\n';
        currentGuide.risks.forEach(risk => {
            text += `[${risk.severity.toUpperCase()}] ${risk.type}\n`;
            text += `  ${risk.description}\n`;
            text += `  💡 ${risk.mitigation}\n\n`;
        });

        // Plan B
        text += '🔁 PLAN B\n';
        text += '-'.repeat(60) + '\n';
        currentGuide.planB.forEach(alt => {
            text += `${alt.title}\n`;
            text += `  ${alt.description}\n`;
            text += `  ⏰ ${alt.when}\n\n`;
        });

        text += '\n' + '='.repeat(60) + '\n';
        text += 'Généré par PoE2 Craft Helper\n';
        text += '='.repeat(60) + '\n';

        // Télécharger le fichier
        downloadTextFile(text, 'poe2-craft-guide.txt');
    }

    /**
     * Télécharge un fichier texte
     */
    function downloadTextFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Partage le guide (copie un lien)
     */
    function shareGuide() {
        if (!currentGuide) return;

        // Encoder les données dans l'URL
        const params = new URLSearchParams({
            type: currentGuide.metadata.itemType,
            base: currentGuide.metadata.baseItem,
            ilvl: currentGuide.metadata.itemLevel,
            budget: currentGuide.metadata.budget
        });

        const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        // Copier dans le presse-papier
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Lien copié dans le presse-papier !');
        }).catch(() => {
            // Fallback
            prompt('Copiez ce lien:', shareUrl);
        });
    }

    /**
     * Démarre un nouveau craft
     */
    function startNewCraft() {
        elements.resultSection.classList.add('hidden');
        currentGuide = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Réinitialise le formulaire
     */
    function handleFormReset() {
        setTimeout(() => {
            elements.resultSection.classList.add('hidden');
            currentGuide = null;

            // Réinitialiser les mods à un seul champ
            elements.modsContainer.innerHTML = `
                <div class="mod-input-group">
                    <input type="text" class="mod-input" placeholder="Ex: +2 to Level of Chaos Gems" list="modsList">
                    <select class="mod-priority">
                        <option value="required">Obligatoire</option>
                        <option value="desired">Souhaité</option>
                        <option value="optional">Optionnel</option>
                    </select>
                    <select class="mod-tier">
                        <option value="any">Any Tier</option>
                        <option value="t1">T1</option>
                        <option value="t2">T2</option>
                        <option value="t3">T3</option>
                    </select>
                    <button type="button" class="btn-remove-mod">✕</button>
                </div>
            `;
        }, 0);
    }

    /**
     * Charge les paramètres depuis l'URL (si partage)
     */
    function loadFromUrl() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('type')) {
            elements.itemType.value = params.get('type') || '';
            handleItemTypeChange();
        }
        if (params.has('base')) {
            elements.baseItem.value = params.get('base') || '';
        }
        if (params.has('ilvl')) {
            elements.itemLevel.value = params.get('ilvl') || '75';
        }
        if (params.has('budget')) {
            elements.budget.value = params.get('budget') || 'medium';
        }
    }

    // Initialiser l'application au chargement
    document.addEventListener('DOMContentLoaded', function() {
        init();
        loadFromUrl();
    });

})();
