// Gestionnaire de Thème pour PoE2 Craft Helper v2.1
// Permet de basculer entre le mode dark et light

class ThemeManager {
    constructor() {
        this.storageKey = 'poe2_craft_theme';
        this.currentTheme = this.loadTheme();
        this.init();
    }

    /**
     * Initialise le gestionnaire de thème
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.createToggleButton();
    }

    /**
     * Charge le thème depuis localStorage
     */
    loadTheme() {
        const saved = localStorage.getItem(this.storageKey);
        return saved || 'dark'; // Dark par défaut
    }

    /**
     * Sauvegarde le thème
     */
    saveTheme(theme) {
        localStorage.setItem(this.storageKey, theme);
    }

    /**
     * Applique un thème
     */
    applyTheme(theme) {
        if (theme === 'light') {
            this.applyLightTheme();
        } else {
            this.applyDarkTheme();
        }
        this.currentTheme = theme;
        this.saveTheme(theme);
    }

    /**
     * Applique le thème sombre
     */
    applyDarkTheme() {
        document.documentElement.style.setProperty('--color-bg-primary', '#0a0a0a');
        document.documentElement.style.setProperty('--color-bg-secondary', '#1a1410');
        document.documentElement.style.setProperty('--color-bg-tertiary', '#251e18');
        document.documentElement.style.setProperty('--color-text-primary', '#e8dcc3');
        document.documentElement.style.setProperty('--color-text-secondary', '#a89174');
        document.documentElement.style.setProperty('--color-text-muted', '#6b5d4f');
        document.documentElement.style.setProperty('--color-border', '#3a2f23');

        // Update background overlay
        const overlay = document.querySelector('.background-overlay');
        if (overlay) {
            overlay.style.background = `
                radial-gradient(circle at 20% 50%, rgba(201, 165, 90, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(209, 54, 54, 0.05) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #1a1410 100%)
            `;
        }
    }

    /**
     * Applique le thème clair
     */
    applyLightTheme() {
        document.documentElement.style.setProperty('--color-bg-primary', '#f5f5f5');
        document.documentElement.style.setProperty('--color-bg-secondary', '#ffffff');
        document.documentElement.style.setProperty('--color-bg-tertiary', '#fafafa');
        document.documentElement.style.setProperty('--color-text-primary', '#2c2416');
        document.documentElement.style.setProperty('--color-text-secondary', '#5a4d3a');
        document.documentElement.style.setProperty('--color-text-muted', '#8a7d6a');
        document.documentElement.style.setProperty('--color-border', '#d4c9b8');

        // Update background overlay
        const overlay = document.querySelector('.background-overlay');
        if (overlay) {
            overlay.style.background = `
                radial-gradient(circle at 20% 50%, rgba(201, 165, 90, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(209, 54, 54, 0.08) 0%, transparent 50%),
                linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)
            `;
        }
    }

    /**
     * Bascule entre les thèmes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.updateToggleButton();
    }

    /**
     * Crée le bouton de toggle
     */
    createToggleButton() {
        const button = document.createElement('button');
        button.id = 'themeToggle';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Basculer le thème');
        this.updateToggleButtonContent(button);

        button.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Ajouter le bouton au header
        const header = document.querySelector('.main-header .container');
        if (header) {
            header.appendChild(button);
        }

        // Ajouter les styles
        this.addToggleStyles();
    }

    /**
     * Met à jour le contenu du bouton
     */
    updateToggleButtonContent(button) {
        if (this.currentTheme === 'dark') {
            button.innerHTML = '☀️ Light Mode';
        } else {
            button.innerHTML = '🌙 Dark Mode';
        }
    }

    /**
     * Met à jour le bouton existant
     */
    updateToggleButton() {
        const button = document.getElementById('themeToggle');
        if (button) {
            this.updateToggleButtonContent(button);
        }
    }

    /**
     * Ajoute les styles du bouton
     */
    addToggleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 0.75rem 1.25rem;
                background: var(--color-bg-tertiary);
                border: 2px solid var(--color-accent-gold);
                color: var(--color-text-primary);
                border-radius: var(--border-radius);
                cursor: pointer;
                font-family: 'Roboto', sans-serif;
                font-size: 0.95rem;
                font-weight: 500;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: var(--shadow-md);
            }

            .theme-toggle:hover {
                background: var(--color-accent-gold);
                color: var(--color-bg-primary);
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }

            .theme-toggle:active {
                transform: translateY(0);
            }

            @media (max-width: 768px) {
                .theme-toggle {
                    top: 10px;
                    right: 10px;
                    padding: 0.5rem 1rem;
                    font-size: 0.85rem;
                }
            }

            /* Ajustements pour le thème clair */
            [data-theme="light"] .theme-toggle {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            [data-theme="light"] .theme-toggle:hover {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            /* Animations de transition */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }

            /* Désactiver la transition pour certains éléments */
            .chart-container,
            canvas,
            img {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Obtient le thème actuel
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Applique un thème spécifique
     */
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
            this.updateToggleButton();
        }
    }
}

// Auto-initialisation
let themeManager;
document.addEventListener('DOMContentLoaded', function() {
    themeManager = new ThemeManager();
    console.log('Theme Manager initialisé:', themeManager.getCurrentTheme());
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
