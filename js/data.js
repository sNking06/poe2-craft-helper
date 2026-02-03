// Base de données statique pour PoE2 Craft Helper
// Données basées sur la version Early Access de Path of Exile 2

const POE2_DATA = {
    // Bases d'items par catégorie
    bases: {
        'weapon-1h': [
            'Regal Sceptre', 'Karui Sceptre', 'Void Sceptre',
            'Corsair Sword', 'Gladius', 'Sabre',
            'Runic Hatchet', 'Cleaver', 'Tomahawk',
            'Dream Mace', 'Petrified Club', 'Ancestral Club'
        ],
        'weapon-2h': [
            'Tiger Sword', 'Lion Sword', 'Exquisite Blade',
            'Poleaxe', 'Headsman Axe', 'Vaal Axe',
            'Spiked Club', 'Sledgehammer', 'Meatgrinder'
        ],
        'bow': [
            'Thicket Bow', 'Compound Bow', 'Decimation Bow',
            'Imperial Bow', 'Harbinger Bow'
        ],
        'crossbow': [
            'Light Crossbow', 'Heavy Crossbow', 'Siege Crossbow'
        ],
        'wand': [
            'Prophecy Wand', 'Profane Wand', 'Imbued Wand'
        ],
        'staff': [
            'Imperial Staff', 'Judgement Staff', 'Eclipse Staff'
        ],
        'helmet': [
            'Royal Burgonet', 'Eternal Burgonet', 'Nightmare Bascinet',
            'Pig-Faced Bascinet', 'Solaris Circlet', 'Bone Circlet'
        ],
        'body': [
            'Glorious Plate', 'Astral Plate', 'Gladiator Plate',
            'Vaal Regalia', 'Exquisite Leather', 'Assassin\'s Garb'
        ],
        'gloves': [
            'Titan Gauntlets', 'Crusader Gloves', 'Sorcerer Gloves',
            'Fingerless Silk Gloves', 'Slink Gloves'
        ],
        'boots': [
            'Titan Greaves', 'Plated Greaves', 'Sorcerer Boots',
            'Silk Slippers', 'Assassin\'s Boots'
        ],
        'shield': [
            'Lacquered Buckler', 'Archon Kite Shield', 'Fossilised Spirit Shield'
        ],
        'ring': [
            'Diamond Ring', 'Two-Stone Ring', 'Amethyst Ring',
            'Ruby Ring', 'Sapphire Ring', 'Topaz Ring'
        ],
        'amulet': [
            'Amber Amulet', 'Jade Amulet', 'Lapis Amulet',
            'Citrine Amulet', 'Turquoise Amulet'
        ],
        'belt': [
            'Leather Belt', 'Heavy Belt', 'Rustic Sash',
            'Chain Belt', 'Studded Belt'
        ]
    },

    // Mods populaires par catégorie
    mods: {
        prefix: [
            '+# to Level of All Chaos Gems',
            '+# to Level of All Fire Gems',
            '+# to Level of All Cold Gems',
            '+# to Level of All Lightning Gems',
            '+# to Level of All Physical Gems',
            '+# to Level of All Spell Gems',
            '+# to Level of All Minion Gems',
            '#% increased Physical Damage',
            '#% increased Elemental Damage',
            '#% increased Spell Damage',
            '#% increased Fire Damage',
            '#% increased Cold Damage',
            '#% increased Lightning Damage',
            '#% increased Chaos Damage',
            'Adds # to # Physical Damage',
            'Adds # to # Fire Damage',
            'Adds # to # Cold Damage',
            'Adds # to # Lightning Damage',
            'Adds # to # Chaos Damage',
            '+# to maximum Life',
            '+# to maximum Mana',
            '+# to maximum Energy Shield',
            '+# to Armour',
            '+# to Evasion Rating',
            '#% increased Armour',
            '#% increased Evasion Rating',
            '#% increased Energy Shield',
            '#% increased Attack Speed',
            '#% increased Cast Speed',
            '#% Critical Strike Chance',
            '+#% to Critical Strike Multiplier',
            '#% increased Rarity of Items found'
        ],
        suffix: [
            '+#% to Fire Resistance',
            '+#% to Cold Resistance',
            '+#% to Lightning Resistance',
            '+#% to Chaos Resistance',
            '+#% to all Elemental Resistances',
            '#% increased Attack Speed',
            '#% increased Cast Speed',
            '#% increased Movement Speed',
            '+# to Strength',
            '+# to Dexterity',
            '+# to Intelligence',
            '+# to all Attributes',
            '#% increased Stun Threshold',
            '#% chance to Avoid Stun',
            '#% chance to Avoid Interruption from Stuns while Casting',
            '+# Life Regeneration per second',
            '+# Mana Regeneration per second',
            '#% of Physical Damage Converted to Fire Damage',
            '#% of Physical Damage Converted to Cold Damage',
            '#% of Physical Damage Converted to Lightning Damage',
            '#% reduced Attribute Requirements',
            '#% increased Magnitude of Ailments inflicted'
        ]
    },

    // Méthodes de craft et leurs effets
    craftingMethods: {
        'Orb of Transmutation': {
            name: 'Orb of Transmutation',
            effect: 'Transforme un objet normal en objet magique avec 1-2 mods aléatoires',
            rarity_from: 'normal',
            rarity_to: 'magic',
            cost_avg: 1,
            use_case: 'Démarrer un craft sur une base blanche'
        },
        'Orb of Alteration': {
            name: 'Orb of Alteration',
            effect: 'Réroll les mods d\'un objet magique',
            rarity_from: 'magic',
            rarity_to: 'magic',
            cost_avg: 3,
            use_case: 'Chercher des mods spécifiques sur un objet magique'
        },
        'Regal Orb': {
            name: 'Regal Orb',
            effect: 'Transforme un objet magique en rare et ajoute 1 mod aléatoire',
            rarity_from: 'magic',
            rarity_to: 'rare',
            cost_avg: 10,
            use_case: 'Passer un bon objet magique en rare'
        },
        'Orb of Alchemy': {
            name: 'Orb of Alchemy',
            effect: 'Transforme un objet normal en rare avec 4-6 mods aléatoires',
            rarity_from: 'normal',
            rarity_to: 'rare',
            cost_avg: 5,
            use_case: 'Obtenir rapidement un objet rare aléatoire'
        },
        'Chaos Orb': {
            name: 'Chaos Orb',
            effect: 'SUPPRIMÉ dans PoE2 - NE PEUT PLUS REROLL UN RARE',
            rarity_from: 'rare',
            rarity_to: 'rare',
            cost_avg: 0,
            use_case: 'OBSOLÈTE dans PoE2',
            deprecated: true
        },
        'Exalted Orb': {
            name: 'Exalted Orb',
            effect: 'Ajoute un mod aléatoire à un objet rare (max 6 mods)',
            rarity_from: 'rare',
            rarity_to: 'rare',
            cost_avg: 80,
            use_case: 'Ajouter un mod sur un bon objet rare avec des slots libres'
        },
        'Orb of Annulment': {
            name: 'Orb of Annulment',
            effect: 'Retire aléatoirement 1 mod d\'un objet',
            rarity_from: 'any',
            rarity_to: 'any',
            cost_avg: 15,
            use_case: 'Retirer un mauvais mod (risque de retirer un bon)'
        },
        'Orb of Augmentation': {
            name: 'Orb of Augmentation',
            effect: 'Ajoute un mod aléatoire à un objet magique (max 2 mods)',
            rarity_from: 'magic',
            rarity_to: 'magic',
            cost_avg: 2,
            use_case: 'Compléter un objet magique à 1 mod'
        },
        'Orb of Scouring': {
            name: 'Orb of Scouring',
            effect: 'Retire tous les mods d\'un objet (le rend normal)',
            rarity_from: 'any',
            rarity_to: 'normal',
            cost_avg: 5,
            use_case: 'Recommencer un craft sur une base'
        },
        'Vaal Orb': {
            name: 'Vaal Orb',
            effect: 'Corrompt un objet de manière imprévisible (IRRÉVÉRSIBLE)',
            rarity_from: 'any',
            rarity_to: 'corrupted',
            cost_avg: 20,
            use_case: 'Tentative de corruption pour mods implicites (très risqué)'
        },
        'Essence (Tier varied)': {
            name: 'Essence',
            effect: 'Transforme un objet en rare avec un mod garanti + autres mods aléatoires',
            rarity_from: 'normal/magic/rare',
            rarity_to: 'rare',
            cost_avg: 5,
            use_case: 'Obtenir un mod spécifique garanti sur un objet rare'
        },
        'Veiled Chaos Orb': {
            name: 'Veiled Chaos Orb',
            effect: 'Réroll un objet rare en gardant un préfixe et un suffixe aléatoires',
            rarity_from: 'rare',
            rarity_to: 'rare',
            cost_avg: 30,
            use_case: 'Réroll partiel en conservant certains mods'
        }
    },

    // Stratégies de craft communes
    craftingStrategies: {
        'alt-regal-exalt': {
            name: 'Alt-Regal-Exalt',
            description: 'Méthode semi-déterministe classique',
            steps: [
                'Utiliser des Orbs of Alteration pour obtenir le mod principal (préfixe ou suffixe)',
                'Ajouter un deuxième mod avec Orb of Augmentation si nécessaire',
                'Utiliser Regal Orb pour passer en rare',
                'Compléter avec Exalted Orbs si le résultat est bon'
            ],
            pros: 'Contrôle sur un mod clé',
            cons: 'Coût élevé en Alterations, risque sur le Regal',
            best_for: 'Objets nécessitant 1-2 mods spécifiques essentiels'
        },
        'essence-spam': {
            name: 'Essence Spam',
            description: 'Utilisation répétée d\'essences pour un mod garanti',
            steps: [
                'Acheter ou farmer des essences du tier souhaité',
                'Spammer l\'essence sur la base jusqu\'à obtenir les mods complémentaires souhaités',
                'Compléter avec Exalted Orbs si besoin'
            ],
            pros: 'Un mod garanti, relativement accessible',
            cons: 'RNG sur les autres mods, coût des essences hautes tiers',
            best_for: 'Obtenir un mod difficile à roll de manière déterministe'
        },
        'alchemy-spam': {
            name: 'Alchemy Spam',
            description: 'Spam d\'Orbs of Alchemy jusqu\'à obtenir un bon résultat',
            steps: [
                'Spammer des Orbs of Alchemy sur la base',
                'Identifier les objets avec au moins 2-3 bons mods',
                'Compléter avec craft bench ou Exalted Orbs'
            ],
            pros: 'Simple, peu coûteux pour démarrer',
            cons: 'Très RNG, peut coûter cher si malchanceux',
            best_for: 'Budget limité ou recherche de combinaisons communes'
        },
        'harvest-craft': {
            name: 'Harvest Craft',
            description: 'Utilisation du craft bench et méthodes déterministes',
            steps: [
                'Obtenir une base avec quelques bons mods',
                'Utiliser le craft bench pour bloquer des affixes',
                'Utiliser des méthodes déterministes (Harvest, craft bench) pour compléter'
            ],
            pros: 'Plus de contrôle, moins RNG',
            cons: 'Nécessite accès aux crafts, plus complexe',
            best_for: 'Crafts end-game optimisés'
        },
        'trade-base': {
            name: 'Trade Base',
            description: 'Acheter une base déjà partiellement craftée',
            steps: [
                'Chercher sur le trade un objet avec 1-2 mods clés déjà présents',
                'Acheter la base',
                'Compléter avec la méthode appropriée'
            ],
            pros: 'Économise du temps et de la currency',
            cons: 'Nécessite du capital, dépend du market',
            best_for: 'Quand le marché propose des bases intéressantes'
        }
    },

    // Warnings et conseils spécifiques à PoE2
    poe2Changes: {
        chaos_orb: 'Les Chaos Orbs ne peuvent PLUS reroll les objets rares dans PoE2. Utilisez d\'autres méthodes.',
        no_reset: 'Dans PoE2, la philosophie est qu\'on ne peut plus "reset" complètement un objet. Le crafting est plus progressif.',
        essences: 'Les essences sont plus importantes dans PoE2 car elles permettent d\'obtenir des mods garantis.',
        crafting_bench: 'Le craft bench est limité mais crucial pour bloquer des affixes ou ajouter des mods déterministes.'
    }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = POE2_DATA;
}
