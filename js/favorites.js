// Système de Favoris pour PoE2 Craft Helper
// Gère la sauvegarde locale des crafts favoris et de l'historique

class FavoritesManager {
    constructor() {
        this.storageKey = 'poe2_craft_favorites';
        this.historyKey = 'poe2_craft_history';
        this.maxHistorySize = 50;
        this.maxFavorites = 20;
    }

    // ==========================================
    // FAVORIS
    // ==========================================

    /**
     * Ajoute un craft aux favoris
     * @param {Object} craftData - Données du craft à sauvegarder
     * @returns {boolean} Succès de l'opération
     */
    addFavorite(craftData) {
        try {
            const favorites = this.getFavorites();

            // Vérifier si pas déjà dans les favoris
            const exists = favorites.some(fav =>
                JSON.stringify(fav.metadata) === JSON.stringify(craftData.metadata)
            );

            if (exists) {
                return false; // Déjà en favoris
            }

            // Limiter le nombre de favoris
            if (favorites.length >= this.maxFavorites) {
                favorites.shift(); // Retirer le plus ancien
            }

            const favorite = {
                id: this.generateId(),
                timestamp: Date.now(),
                craftData: craftData
            };

            favorites.push(favorite);
            localStorage.setItem(this.storageKey, JSON.stringify(favorites));
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris:', error);
            return false;
        }
    }

    /**
     * Retire un craft des favoris
     * @param {string} favoriteId - ID du favori à retirer
     * @returns {boolean} Succès de l'opération
     */
    removeFavorite(favoriteId) {
        try {
            let favorites = this.getFavorites();
            const initialLength = favorites.length;
            favorites = favorites.filter(fav => fav.id !== favoriteId);

            if (favorites.length < initialLength) {
                localStorage.setItem(this.storageKey, JSON.stringify(favorites));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erreur lors de la suppression du favori:', error);
            return false;
        }
    }

    /**
     * Récupère tous les favoris
     * @returns {Array} Liste des favoris
     */
    getFavorites() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
            return [];
        }
    }

    /**
     * Vérifie si un craft est en favoris
     * @param {Object} craftMetadata - Métadonnées du craft
     * @returns {boolean} True si en favoris
     */
    isFavorite(craftMetadata) {
        const favorites = this.getFavorites();
        return favorites.some(fav =>
            JSON.stringify(fav.craftData.metadata) === JSON.stringify(craftMetadata)
        );
    }

    /**
     * Efface tous les favoris
     */
    clearFavorites() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'effacement des favoris:', error);
            return false;
        }
    }

    // ==========================================
    // HISTORIQUE
    // ==========================================

    /**
     * Ajoute un craft à l'historique
     * @param {Object} craftData - Données du craft
     */
    addToHistory(craftData) {
        try {
            let history = this.getHistory();

            // Limiter la taille de l'historique
            if (history.length >= this.maxHistorySize) {
                history.shift(); // Retirer le plus ancien
            }

            const entry = {
                id: this.generateId(),
                timestamp: Date.now(),
                craftData: craftData
            };

            history.push(entry);
            localStorage.setItem(this.historyKey, JSON.stringify(history));
        } catch (error) {
            console.error('Erreur lors de l\'ajout à l\'historique:', error);
        }
    }

    /**
     * Récupère l'historique
     * @param {number} limit - Nombre max d'entrées à retourner
     * @returns {Array} Liste des entrées d'historique
     */
    getHistory(limit = null) {
        try {
            const data = localStorage.getItem(this.historyKey);
            let history = data ? JSON.parse(data) : [];

            // Trier par date (plus récent en premier)
            history.sort((a, b) => b.timestamp - a.timestamp);

            if (limit) {
                return history.slice(0, limit);
            }
            return history;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique:', error);
            return [];
        }
    }

    /**
     * Retire une entrée de l'historique
     * @param {string} entryId - ID de l'entrée à retirer
     */
    removeFromHistory(entryId) {
        try {
            let history = this.getHistory();
            history = history.filter(entry => entry.id !== entryId);
            localStorage.setItem(this.historyKey, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'historique:', error);
            return false;
        }
    }

    /**
     * Efface tout l'historique
     */
    clearHistory() {
        try {
            localStorage.removeItem(this.historyKey);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'effacement de l\'historique:', error);
            return false;
        }
    }

    // ==========================================
    // STATISTIQUES
    // ==========================================

    /**
     * Récupère des statistiques d'utilisation
     * @returns {Object} Statistiques
     */
    getStats() {
        const history = this.getHistory();
        const favorites = this.getFavorites();

        // Compter les types d'items les plus craftés
        const itemTypes = {};
        history.forEach(entry => {
            const type = entry.craftData.metadata.itemType;
            itemTypes[type] = (itemTypes[type] || 0) + 1;
        });

        // Trouver le type le plus fréquent
        const mostCrafted = Object.entries(itemTypes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        // Compter les stratégies utilisées
        const strategies = {};
        history.forEach(entry => {
            const strategy = entry.craftData.strategy.name;
            strategies[strategy] = (strategies[strategy] || 0) + 1;
        });

        return {
            totalCrafts: history.length,
            totalFavorites: favorites.length,
            mostCraftedTypes: mostCrafted,
            strategiesUsed: strategies,
            oldestCraft: history.length > 0 ? new Date(history[0].timestamp) : null,
            newestCraft: history.length > 0 ? new Date(history[history.length - 1].timestamp) : null
        };
    }

    // ==========================================
    // EXPORT / IMPORT
    // ==========================================

    /**
     * Exporte tous les favoris et l'historique en JSON
     * @returns {string} JSON stringifié
     */
    exportData() {
        return JSON.stringify({
            favorites: this.getFavorites(),
            history: this.getHistory(),
            exportDate: new Date().toISOString(),
            version: '2.0.0'
        }, null, 2);
    }

    /**
     * Importe des données depuis JSON
     * @param {string} jsonData - Données JSON à importer
     * @returns {boolean} Succès de l'opération
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);

            if (data.favorites) {
                localStorage.setItem(this.storageKey, JSON.stringify(data.favorites));
            }

            if (data.history) {
                localStorage.setItem(this.historyKey, JSON.stringify(data.history));
            }

            return true;
        } catch (error) {
            console.error('Erreur lors de l\'import:', error);
            return false;
        }
    }

    // ==========================================
    // UTILITAIRES
    // ==========================================

    /**
     * Génère un ID unique
     * @returns {string} ID unique
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Formate une date de manière lisible
     * @param {number} timestamp - Timestamp à formater
     * @returns {string} Date formatée
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        // Il y a moins d'une heure
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        }

        // Il y a moins d'un jour
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        }

        // Il y a moins d'une semaine
        if (diff < 604800000) {
            const days = Math.floor(diff / 86400000);
            return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        }

        // Date complète
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Vérifie si localStorage est disponible
     * @returns {boolean} True si disponible
     */
    isLocalStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Obtient la taille utilisée par les données en KB
     * @returns {number} Taille en KB
     */
    getStorageSize() {
        try {
            const favorites = localStorage.getItem(this.storageKey) || '';
            const history = localStorage.getItem(this.historyKey) || '';
            const totalBytes = (favorites.length + history.length) * 2; // Rough estimate (UTF-16)
            return (totalBytes / 1024).toFixed(2);
        } catch (error) {
            return 0;
        }
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FavoritesManager;
}
