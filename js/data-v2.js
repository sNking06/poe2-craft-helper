// Base de données étendue pour PoE2 Craft Helper v2.0
// Données basées sur la version Early Access de Path of Exile 2
// Version étendue avec plus de mods, bases, et nouvelles fonctionnalités

const POE2_DATA_V2 = {
    // Version de la base de données
    version: '2.0.0',
    lastUpdate: '2024-02-02',

    // Bases d'items par catégorie (VERSION ÉTENDUE)
    bases: {
        'weapon-1h': [
            // Sceptres
            'Regal Sceptre', 'Karui Sceptre', 'Void Sceptre', 'Oscillating Sceptre',
            // Épées
            'Corsair Sword', 'Gladius', 'Sabre', 'Cutlass', 'Baselard',
            // Haches
            'Runic Hatchet', 'Cleaver', 'Tomahawk', 'War Axe', 'Boarding Axe',
            // Masses
            'Dream Mace', 'Petrified Club', 'Ancestral Club', 'Flanged Mace',
            // Dagues
            'Stiletto', 'Poignard', 'Demon Dagger', 'Imperial Skean'
        ],
        'weapon-2h': [
            // Épées 2M
            'Tiger Sword', 'Lion Sword', 'Exquisite Blade', 'Infernal Sword',
            // Haches 2M
            'Poleaxe', 'Headsman Axe', 'Vaal Axe', 'Fleshripper',
            // Masses 2M
            'Spiked Club', 'Sledgehammer', 'Meatgrinder', 'Great Mallet',
            // Polearms
            'Pike', 'Halberd', 'Partisan'
        ],
        'bow': [
            'Thicket Bow', 'Compound Bow', 'Decimation Bow',
            'Imperial Bow', 'Harbinger Bow', 'Maraketh Bow',
            'Recurve Bow', 'Ranger Bow'
        ],
        'crossbow': [
            'Light Crossbow', 'Heavy Crossbow', 'Siege Crossbow',
            'Arbalest', 'Repeating Crossbow'
        ],
        'wand': [
            'Prophecy Wand', 'Profane Wand', 'Imbued Wand',
            'Opal Wand', 'Demon\'s Horn', 'Tornado Wand'
        ],
        'staff': [
            'Imperial Staff', 'Judgement Staff', 'Eclipse Staff',
            'Vile Staff', 'Lathi', 'Primordial Staff'
        ],
        'helmet': [
            'Royal Burgonet', 'Eternal Burgonet', 'Nightmare Bascinet',
            'Pig-Faced Bascinet', 'Solaris Circlet', 'Bone Circlet',
            'Praetor Crown', 'Hubris Circlet', 'Great Crown'
        ],
        'body': [
            'Glorious Plate', 'Astral Plate', 'Gladiator Plate',
            'Vaal Regalia', 'Exquisite Leather', 'Assassin\'s Garb',
            'Crimson Raiment', 'Carnal Armour', 'Full Dragonscale'
        ],
        'gloves': [
            'Titan Gauntlets', 'Crusader Gloves', 'Sorcerer Gloves',
            'Fingerless Silk Gloves', 'Slink Gloves', 'Vaal Gauntlets',
            'Murder Mitts', 'Dragonscale Gauntlets'
        ],
        'boots': [
            'Titan Greaves', 'Plated Greaves', 'Sorcerer Boots',
            'Silk Slippers', 'Assassin\'s Boots', 'Two-Toned Boots',
            'Murder Boots', 'Dragonscale Boots'
        ],
        'shield': [
            'Lacquered Buckler', 'Archon Kite Shield', 'Fossilised Spirit Shield',
            'Imperial Buckler', 'Pinnacle Tower Shield', 'Harmonic Spirit Shield'
        ],
        'ring': [
            'Diamond Ring', 'Two-Stone Ring', 'Amethyst Ring',
            'Ruby Ring', 'Sapphire Ring', 'Topaz Ring',
            'Moonstone Ring', 'Steel Ring', 'Vermillion Ring',
            'Cerulean Ring', 'Opal Ring'
        ],
        'amulet': [
            'Amber Amulet', 'Jade Amulet', 'Lapis Amulet',
            'Citrine Amulet', 'Turquoise Amulet', 'Onyx Amulet',
            'Marble Amulet', 'Seaglass Amulet', 'Astrolabe Amulet'
        ],
        'belt': [
            'Leather Belt', 'Heavy Belt', 'Rustic Sash',
            'Chain Belt', 'Studded Belt', 'Vanguard Belt',
            'Crystal Belt', 'Stygian Vise'
        ]
    },

    // Mods populaires par catégorie (VERSION ÉTENDUE)
    mods: {
        prefix: [
            // Gems levels
            '+# to Level of All Chaos Gems',
            '+# to Level of All Fire Gems',
            '+# to Level of All Cold Gems',
            '+# to Level of All Lightning Gems',
            '+# to Level of All Physical Gems',
            '+# to Level of All Spell Gems',
            '+# to Level of All Minion Gems',
            '+# to Level of All Projectile Gems',
            '+# to Level of All Melee Gems',
            '+# to Level of All Duration Gems',
            '+# to Level of All AoE Gems',

            // Damage increases
            '#% increased Physical Damage',
            '#% increased Elemental Damage',
            '#% increased Spell Damage',
            '#% increased Fire Damage',
            '#% increased Cold Damage',
            '#% increased Lightning Damage',
            '#% increased Chaos Damage',
            '#% increased Damage over Time',
            '#% increased Burning Damage',
            '#% increased Poison Damage',

            // Flat damage
            'Adds # to # Physical Damage',
            'Adds # to # Fire Damage',
            'Adds # to # Cold Damage',
            'Adds # to # Lightning Damage',
            'Adds # to # Chaos Damage',
            'Adds # to # Physical Damage to Attacks',
            'Adds # to # Fire Damage to Spells',
            'Adds # to # Cold Damage to Spells',
            'Adds # to # Lightning Damage to Spells',

            // Defenses
            '+# to maximum Life',
            '+# to maximum Mana',
            '+# to maximum Energy Shield',
            '+# to Armour',
            '+# to Evasion Rating',
            '#% increased Armour',
            '#% increased Evasion Rating',
            '#% increased Energy Shield',
            '#% increased Armour and Evasion',
            '#% increased Armour and Energy Shield',
            '#% increased Evasion and Energy Shield',

            // Offensive stats
            '#% increased Attack Speed',
            '#% increased Cast Speed',
            '#% Critical Strike Chance',
            '+#% to Critical Strike Multiplier',
            '#% increased Global Critical Strike Chance',
            '#% increased Area of Effect',
            '#% increased Projectile Speed',

            // Utility
            '#% increased Rarity of Items found',
            '#% increased Quantity of Items found',
            '#% increased Movement Speed',
            '+# to Spirit',
            '#% increased Spirit',

            // Minions
            'Minions deal #% increased Damage',
            'Minions have +# to maximum Life',
            'Minions have #% increased Attack Speed',
            'Minions have #% increased Cast Speed'
        ],
        suffix: [
            // Resistances
            '+#% to Fire Resistance',
            '+#% to Cold Resistance',
            '+#% to Lightning Resistance',
            '+#% to Chaos Resistance',
            '+#% to all Elemental Resistances',
            '+#% to Fire and Cold Resistances',
            '+#% to Fire and Lightning Resistances',
            '+#% to Cold and Lightning Resistances',

            // Speed
            '#% increased Attack Speed',
            '#% increased Cast Speed',
            '#% increased Movement Speed',

            // Attributes
            '+# to Strength',
            '+# to Dexterity',
            '+# to Intelligence',
            '+# to all Attributes',
            '+# to Strength and Dexterity',
            '+# to Strength and Intelligence',
            '+# to Dexterity and Intelligence',

            // Defensive suffixes
            '#% increased Stun Threshold',
            '#% chance to Avoid Stun',
            '#% chance to Avoid Interruption from Stuns while Casting',
            '+# Life Regeneration per second',
            '#% of Life Regenerated per second',
            '+# Mana Regeneration per second',
            '#% of Mana Regenerated per second',
            '+# Energy Shield Regeneration per second',

            // Conversions
            '#% of Physical Damage Converted to Fire Damage',
            '#% of Physical Damage Converted to Cold Damage',
            '#% of Physical Damage Converted to Lightning Damage',
            '#% of Physical Damage Converted to Chaos Damage',

            // Utility
            '#% reduced Attribute Requirements',
            '#% increased Magnitude of Ailments inflicted',
            '#% chance to Freeze, Shock and Ignite',
            '#% increased Effect of Chill',
            '#% increased Duration of Ailments on Enemies',
            '+#% to Damage over Time Multiplier',
            '+#% to Chaos Damage over Time Multiplier',

            // Mana
            '#% reduced Mana Cost of Skills',
            '+# to maximum Mana',
            '#% increased Mana Regeneration Rate',
            'Gain #% of Damage as Extra Mana'
        ]
    },

    // Nouvelles catégories de mods (NOUVEAU)
    modCategories: {
        offensive: ['Physical Damage', 'Elemental Damage', 'Spell Damage', 'Critical Strike', 'Attack Speed', 'Cast Speed'],
        defensive: ['Life', 'Energy Shield', 'Armour', 'Evasion', 'Resistances', 'Regeneration'],
        utility: ['Movement Speed', 'Rarity', 'Attributes', 'Spirit', 'Mana'],
        special: ['Gem Levels', 'Conversions', 'Minions', 'Ailments', 'DoT']
    },

    // Essences avec leurs mods garantis (NOUVEAU)
    essences: {
        'Essence of Greed': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+# to maximum Life',
            values: {
                1: '+8-9 to maximum Life',
                2: '+10-14 to maximum Life',
                3: '+15-20 to maximum Life',
                4: '+21-30 to maximum Life',
                5: '+31-45 to maximum Life',
                6: '+46-65 to maximum Life',
                7: '+66-80 to maximum Life'
            }
        },
        'Essence of Hatred': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+#% to Cold Resistance',
            values: {
                1: '+8-10% to Cold Resistance',
                2: '+11-14% to Cold Resistance',
                3: '+15-18% to Cold Resistance',
                4: '+19-24% to Cold Resistance',
                5: '+25-32% to Cold Resistance',
                6: '+33-40% to Cold Resistance',
                7: '+41-48% to Cold Resistance'
            }
        },
        'Essence of Wrath': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+#% to Lightning Resistance',
            values: {
                1: '+8-10% to Lightning Resistance',
                2: '+11-14% to Lightning Resistance',
                3: '+15-18% to Lightning Resistance',
                4: '+19-24% to Lightning Resistance',
                5: '+25-32% to Lightning Resistance',
                6: '+33-40% to Lightning Resistance',
                7: '+41-48% to Lightning Resistance'
            }
        },
        'Essence of Rage': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Attack Speed',
            values: {
                1: '3-4% increased Attack Speed',
                2: '5-6% increased Attack Speed',
                3: '7-8% increased Attack Speed',
                4: '9-11% increased Attack Speed',
                5: '12-14% increased Attack Speed',
                6: '15-17% increased Attack Speed',
                7: '18-20% increased Attack Speed'
            }
        },
        'Essence of Sorrow': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+# to maximum Mana',
            values: {
                1: '+10-14 to maximum Mana',
                2: '+15-20 to maximum Mana',
                3: '+21-30 to maximum Mana',
                4: '+31-45 to maximum Mana',
                5: '+46-65 to maximum Mana',
                6: '+66-85 to maximum Mana',
                7: '+86-100 to maximum Mana'
            }
        },
        'Essence of Anger': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+#% to Fire Resistance',
            values: {
                1: '+8-10% to Fire Resistance',
                2: '+11-14% to Fire Resistance',
                3: '+15-18% to Fire Resistance',
                4: '+19-24% to Fire Resistance',
                5: '+25-32% to Fire Resistance',
                6: '+33-40% to Fire Resistance',
                7: '+41-48% to Fire Resistance'
            }
        },
        'Essence of Contempt': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Attack Speed',
            values: {
                1: '3-4% increased Attack Speed',
                2: '5-6% increased Attack Speed',
                3: '7-8% increased Attack Speed',
                4: '9-11% increased Attack Speed',
                5: '12-14% increased Attack Speed',
                6: '15-17% increased Attack Speed',
                7: '18-20% increased Attack Speed'
            }
        },
        'Essence of Torment': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Cast Speed',
            values: {
                1: '3-4% increased Cast Speed',
                2: '5-6% increased Cast Speed',
                3: '7-8% increased Cast Speed',
                4: '9-11% increased Cast Speed',
                5: '12-14% increased Cast Speed',
                6: '15-17% increased Cast Speed',
                7: '18-20% increased Cast Speed'
            }
        },
        'Essence of Doubt': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+# to Armour',
            values: {
                1: '+20-30 to Armour',
                2: '+31-50 to Armour',
                3: '+51-80 to Armour',
                4: '+81-120 to Armour',
                5: '+121-180 to Armour',
                6: '+181-260 to Armour',
                7: '+261-350 to Armour'
            }
        },
        'Essence of Fear': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+# to Evasion Rating',
            values: {
                1: '+20-30 to Evasion Rating',
                2: '+31-50 to Evasion Rating',
                3: '+51-80 to Evasion Rating',
                4: '+81-120 to Evasion Rating',
                5: '+121-180 to Evasion Rating',
                6: '+181-260 to Evasion Rating',
                7: '+261-350 to Evasion Rating'
            }
        },
        'Essence of Wo': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+# to maximum Energy Shield',
            values: {
                1: '+8-10 to maximum Energy Shield',
                2: '+11-15 to maximum Energy Shield',
                3: '+16-22 to maximum Energy Shield',
                4: '+23-32 to maximum Energy Shield',
                5: '+33-45 to maximum Energy Shield',
                6: '+46-62 to maximum Energy Shield',
                7: '+63-80 to maximum Energy Shield'
            }
        },
        'Essence of Scorn': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Physical Damage',
            values: {
                1: '15-19% increased Physical Damage',
                2: '20-29% increased Physical Damage',
                3: '30-44% increased Physical Damage',
                4: '45-64% increased Physical Damage',
                5: '65-89% increased Physical Damage',
                6: '90-119% increased Physical Damage',
                7: '120-154% increased Physical Damage'
            }
        },
        'Essence of Dread': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Spell Damage',
            values: {
                1: '10-14% increased Spell Damage',
                2: '15-19% increased Spell Damage',
                3: '20-29% increased Spell Damage',
                4: '30-44% increased Spell Damage',
                5: '45-59% increased Spell Damage',
                6: '60-79% increased Spell Damage',
                7: '80-104% increased Spell Damage'
            }
        },
        'Essence of Envy': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Chaos Damage',
            values: {
                1: '10-14% increased Chaos Damage',
                2: '15-19% increased Chaos Damage',
                3: '20-29% increased Chaos Damage',
                4: '30-44% increased Chaos Damage',
                5: '45-59% increased Chaos Damage',
                6: '60-79% increased Chaos Damage',
                7: '80-104% increased Chaos Damage'
            }
        },
        'Essence of Zeal': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+# to all Attributes',
            values: {
                1: '+5-7 to all Attributes',
                2: '+8-10 to all Attributes',
                3: '+11-15 to all Attributes',
                4: '+16-22 to all Attributes',
                5: '+23-30 to all Attributes',
                6: '+31-40 to all Attributes',
                7: '+41-50 to all Attributes'
            }
        },
        'Essence of Anguish': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Critical Strike Chance',
            values: {
                1: '15-20% increased Critical Strike Chance',
                2: '21-30% increased Critical Strike Chance',
                3: '31-45% increased Critical Strike Chance',
                4: '46-65% increased Critical Strike Chance',
                5: '66-90% increased Critical Strike Chance',
                6: '91-120% increased Critical Strike Chance',
                7: '121-150% increased Critical Strike Chance'
            }
        },
        'Essence of Suffering': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+#% to Critical Strike Multiplier',
            values: {
                1: '+8-10% to Critical Strike Multiplier',
                2: '+11-15% to Critical Strike Multiplier',
                3: '+16-22% to Critical Strike Multiplier',
                4: '+23-30% to Critical Strike Multiplier',
                5: '+31-40% to Critical Strike Multiplier',
                6: '+41-52% to Critical Strike Multiplier',
                7: '+53-65% to Critical Strike Multiplier'
            }
        },
        'Essence of Loathing': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '+#% to Chaos Resistance',
            values: {
                1: '+6-8% to Chaos Resistance',
                2: '+9-12% to Chaos Resistance',
                3: '+13-16% to Chaos Resistance',
                4: '+17-21% to Chaos Resistance',
                5: '+22-28% to Chaos Resistance',
                6: '+29-36% to Chaos Resistance',
                7: '+37-45% to Chaos Resistance'
            }
        },
        'Essence of Misery': {
            tier: [1, 2, 3, 4, 5, 6, 7],
            guaranteedMod: '#% increased Movement Speed',
            values: {
                1: '10-15% increased Movement Speed',
                2: '16-20% increased Movement Speed',
                3: '21-25% increased Movement Speed',
                4: '26-30% increased Movement Speed',
                5: '31-35% increased Movement Speed',
                6: '36-40% increased Movement Speed',
                7: '41-50% increased Movement Speed'
            }
        }
    },

    // Tags de mods pour filtrage avancé (NOUVEAU)
    modTags: {
        '+# to Level of All Chaos Gems': ['gem', 'chaos', 'offensive', 'prefix'],
        '+# to maximum Life': ['defense', 'life', 'prefix', 'essential'],
        '#% increased Physical Damage': ['offensive', 'physical', 'prefix'],
        '+#% to Fire Resistance': ['defense', 'resistance', 'suffix', 'elemental'],
        '#% increased Movement Speed': ['utility', 'speed', 'suffix'],
        '#% increased Cast Speed': ['offensive', 'speed', 'suffix']
    },

    // Combinaisons de mods populaires (NOUVEAU)
    popularCombos: {
        'Chaos Caster Weapon': [
            '+# to Level of All Chaos Gems',
            '#% increased Chaos Damage',
            '#% increased Cast Speed',
            '+#% to Chaos Damage over Time Multiplier'
        ],
        'Life + Resist Armor': [
            '+# to maximum Life',
            '+#% to Fire Resistance',
            '+#% to Cold Resistance',
            '+#% to Lightning Resistance'
        ],
        'Physical DPS Weapon': [
            '#% increased Physical Damage',
            'Adds # to # Physical Damage',
            '#% increased Attack Speed',
            '+#% to Critical Strike Multiplier'
        ],
        'ES Caster Armor': [
            '+# to maximum Energy Shield',
            '#% increased Energy Shield',
            '+# to maximum Mana',
            '#% increased Spell Damage'
        ],
        'Speed Boots': [
            '#% increased Movement Speed',
            '+# to maximum Life',
            '+#% to Fire Resistance',
            '+#% to Cold Resistance'
        ]
    },

    // Méthodologies de craft avec coûts détaillés (ÉTENDU)
    craftingMethods: {
        'Orb of Transmutation': {
            name: 'Orb of Transmutation',
            effect: 'Transforme un objet normal en objet magique avec 1-2 mods aléatoires',
            rarity_from: 'normal',
            rarity_to: 'magic',
            cost_avg: 1,
            cost_range: [1, 1],
            use_case: 'Démarrer un craft sur une base blanche',
            success_rate: '100%',
            deprecated: false
        },
        'Orb of Alteration': {
            name: 'Orb of Alteration',
            effect: 'Réroll les mods d\'un objet magique',
            rarity_from: 'magic',
            rarity_to: 'magic',
            cost_avg: 3,
            cost_range: [10, 500],
            use_case: 'Chercher des mods spécifiques sur un objet magique',
            success_rate: 'Variable (dépend de la rareté du mod)',
            deprecated: false
        },
        'Regal Orb': {
            name: 'Regal Orb',
            effect: 'Transforme un objet magique en rare et ajoute 1 mod aléatoire',
            rarity_from: 'magic',
            rarity_to: 'rare',
            cost_avg: 10,
            cost_range: [10, 10],
            use_case: 'Passer un bon objet magique en rare',
            success_rate: '100% (mais mod aléatoire)',
            deprecated: false
        },
        'Orb of Alchemy': {
            name: 'Orb of Alchemy',
            effect: 'Transforme un objet normal en rare avec 4-6 mods aléatoires',
            rarity_from: 'normal',
            rarity_to: 'rare',
            cost_avg: 5,
            cost_range: [5, 5],
            use_case: 'Obtenir rapidement un objet rare aléatoire',
            success_rate: '100% (mais résultat imprévisible)',
            deprecated: false
        },
        'Chaos Orb': {
            name: 'Chaos Orb',
            effect: 'SUPPRIMÉ dans PoE2 - Ne peut PLUS reroll un objet rare',
            rarity_from: 'rare',
            rarity_to: 'rare',
            cost_avg: 0,
            cost_range: [0, 0],
            use_case: 'OBSOLÈTE dans PoE2 - Utilisé comme currency de trade',
            success_rate: 'N/A',
            deprecated: true,
            warning: 'Important: Les Chaos Orbs ne servent plus à crafter dans PoE2!'
        },
        'Exalted Orb': {
            name: 'Exalted Orb',
            effect: 'Ajoute un mod aléatoire à un objet rare (max 6 mods)',
            rarity_from: 'rare',
            rarity_to: 'rare',
            cost_avg: 80,
            cost_range: [50, 150],
            use_case: 'Ajouter un mod sur un bon objet rare avec des slots libres',
            success_rate: 'Variable (1/6 de préfixe/suffixe utile)',
            deprecated: false
        },
        'Orb of Annulment': {
            name: 'Orb of Annulment',
            effect: 'Retire aléatoirement 1 mod d\'un objet',
            rarity_from: 'any',
            rarity_to: 'any',
            cost_avg: 15,
            cost_range: [10, 30],
            use_case: 'Retirer un mauvais mod (risque de retirer un bon)',
            success_rate: 'Variable (risque élevé)',
            deprecated: false
        },
        'Orb of Augmentation': {
            name: 'Orb of Augmentation',
            effect: 'Ajoute un mod aléatoire à un objet magique (max 2 mods)',
            rarity_from: 'magic',
            rarity_to: 'magic',
            cost_avg: 2,
            cost_range: [2, 2],
            use_case: 'Compléter un objet magique à 1 mod',
            success_rate: '100% (mais mod aléatoire)',
            deprecated: false
        },
        'Orb of Scouring': {
            name: 'Orb of Scouring',
            effect: 'Retire tous les mods d\'un objet (le rend normal)',
            rarity_from: 'any',
            rarity_to: 'normal',
            cost_avg: 5,
            cost_range: [3, 8],
            use_case: 'Recommencer un craft sur une base',
            success_rate: '100%',
            deprecated: false
        },
        'Vaal Orb': {
            name: 'Vaal Orb',
            effect: 'Corrompt un objet de manière imprévisible (IRRÉVÉRSIBLE)',
            rarity_from: 'any',
            rarity_to: 'corrupted',
            cost_avg: 20,
            cost_range: [15, 40],
            use_case: 'Tentative de corruption pour mods implicites (très risqué)',
            success_rate: '25% (1/4 résultats possibles)',
            deprecated: false,
            warning: 'ATTENTION: Irrévérsible! Peut détruire l\'item!'
        },
        'Essence (Varied Tier)': {
            name: 'Essence',
            effect: 'Transforme un objet en rare avec un mod garanti + autres mods aléatoires',
            rarity_from: 'normal/magic/rare',
            rarity_to: 'rare',
            cost_avg: 5,
            cost_range: [2, 50],
            use_case: 'Obtenir un mod spécifique garanti sur un objet rare',
            success_rate: '100% pour le mod garanti',
            deprecated: false
        },
        'Veiled Chaos Orb': {
            name: 'Veiled Chaos Orb',
            effect: 'Réroll un objet rare en gardant un préfixe et un suffixe aléatoires',
            rarity_from: 'rare',
            rarity_to: 'rare',
            cost_avg: 30,
            cost_range: [20, 50],
            use_case: 'Réroll partiel en conservant certains mods',
            success_rate: 'Variable',
            deprecated: false
        }
    },

    // Nouvelles idées: Craft Bench recipes (NOUVEAU)
    craftBenchRecipes: {
        'life': {
            name: '+# to maximum Life',
            type: 'prefix',
            values: [30, 40, 50],
            cost: 'Variable (requires unveil or quest)',
            ilvl_required: [1, 36, 60]
        },
        'resist_fire': {
            name: '+#% to Fire Resistance',
            type: 'suffix',
            values: [20, 30, 40],
            cost: 'Variable',
            ilvl_required: [1, 36, 60]
        }
    },

    // Stratégies de craft détaillées (ÉTENDU)
    craftingStrategies: {
        'alt-regal-exalt': {
            name: 'Alt-Regal-Exalt',
            description: 'Méthode semi-déterministe classique pour obtenir un mod clé',
            difficulty: 'medium',
            steps: [
                'Utiliser des Orbs of Alteration pour obtenir le mod principal',
                'Ajouter un deuxième mod avec Orb of Augmentation si nécessaire',
                'Utiliser Regal Orb pour passer en rare',
                'Compléter avec Exalted Orbs si le résultat est bon'
            ],
            pros: 'Contrôle sur un mod clé',
            cons: 'Coût élevé en Alterations, risque sur le Regal',
            best_for: 'Objets nécessitant 1-2 mods spécifiques essentiels',
            estimated_cost: {
                low: 20,
                average: 100,
                high: 500
            }
        },
        'essence-spam': {
            name: 'Essence Spam',
            description: 'Utilisation répétée d\'essences pour un mod garanti',
            difficulty: 'easy',
            steps: [
                'Acheter ou farmer des essences du tier souhaité',
                'Spammer l\'essence sur la base jusqu\'à obtenir les mods complémentaires souhaités',
                'Compléter avec Exalted Orbs si besoin'
            ],
            pros: 'Un mod garanti, relativement accessible',
            cons: 'RNG sur les autres mods, coût des essences hautes tiers',
            best_for: 'Obtenir un mod difficile à roll de manière déterministe',
            estimated_cost: {
                low: 30,
                average: 80,
                high: 300
            }
        },
        'alchemy-spam': {
            name: 'Alchemy Spam',
            description: 'Spam d\'Orbs of Alchemy jusqu\'à obtenir un bon résultat',
            difficulty: 'easy',
            steps: [
                'Spammer des Orbs of Alchemy sur la base',
                'Identifier les objets avec au moins 2-3 bons mods',
                'Compléter avec craft bench ou Exalted Orbs'
            ],
            pros: 'Simple, peu coûteux pour démarrer',
            cons: 'Très RNG, peut coûter cher si malchanceux',
            best_for: 'Budget limité ou recherche de combinaisons communes',
            estimated_cost: {
                low: 10,
                average: 50,
                high: 200
            }
        },
        'harvest-craft': {
            name: 'Harvest Craft',
            description: 'Utilisation du craft bench et méthodes déterministes',
            difficulty: 'hard',
            steps: [
                'Obtenir une base avec quelques bons mods',
                'Utiliser le craft bench pour bloquer des affixes',
                'Utiliser des méthodes déterministes (Harvest, craft bench) pour compléter'
            ],
            pros: 'Plus de contrôle, moins RNG',
            cons: 'Nécessite accès aux crafts, plus complexe',
            best_for: 'Crafts end-game optimisés',
            estimated_cost: {
                low: 50,
                average: 200,
                high: 1000
            }
        },
        'trade-base': {
            name: 'Trade Base',
            description: 'Acheter une base déjà partiellement craftée',
            difficulty: 'easy',
            steps: [
                'Chercher sur le trade un objet avec 1-2 mods clés déjà présents',
                'Acheter la base',
                'Compléter avec la méthode appropriée'
            ],
            pros: 'Économise du temps et de la currency',
            cons: 'Nécessite du capital, dépend du market',
            best_for: 'Quand le marché propose des bases intéressantes',
            estimated_cost: {
                low: 50,
                average: 150,
                high: 500
            }
        },
        'meta-craft': {
            name: 'Meta-Crafting',
            description: 'Utilisation avancée de craft mods pour bloquer/manipuler les affixes',
            difficulty: 'very_hard',
            steps: [
                'Obtenir une base avec 2-3 bons mods',
                'Utiliser craft bench "Cannot roll X" pour bloquer certains mods',
                'Utiliser Exalt ou autre méthode pour ajouter des mods contrôlés',
                'Retirer le craft bench et finaliser'
            ],
            pros: 'Contrôle maximal, résultats optimaux',
            cons: 'Très coûteux, nécessite connaissance avancée',
            best_for: 'Mirror-tier items, crafts end-game absolus',
            estimated_cost: {
                low: 200,
                average: 1000,
                high: 5000
            }
        }
    },

    // Avertissements et conseils spécifiques à PoE2 (ÉTENDU)
    poe2Changes: {
        chaos_orb: {
            title: 'Chaos Orb Change',
            message: 'Les Chaos Orbs ne peuvent PLUS reroll les objets rares dans PoE2. Ils servent uniquement de currency de trade.',
            severity: 'critical'
        },
        no_reset: {
            title: 'Philosophie Progressive',
            message: 'Dans PoE2, la philosophie est qu\'on ne peut plus "reset" complètement un objet. Le crafting est plus progressif et intentionnel.',
            severity: 'info'
        },
        essences: {
            title: 'Importance des Essences',
            message: 'Les essences sont plus importantes dans PoE2 car elles permettent d\'obtenir des mods garantis sur des objets rares.',
            severity: 'info'
        },
        crafting_bench: {
            title: 'Craft Bench Limité',
            message: 'Le craft bench est limité mais crucial pour bloquer des affixes ou ajouter des mods déterministes.',
            severity: 'info'
        },
        spirit: {
            title: 'Nouveau: Spirit',
            message: 'PoE2 introduit "Spirit", une nouvelle ressource pour les auras et compétences permanentes. Certains items peuvent rouler des mods Spirit.',
            severity: 'new'
        }
    }
};

// Fonctions utilitaires (NOUVEAU)
const POE2_UTILS = {
    /**
     * Trouve les essences qui peuvent donner un mod spécifique
     */
    findEssencesForMod: function(modName) {
        const results = [];
        for (const [essenceName, data] of Object.entries(POE2_DATA_V2.essences)) {
            if (data.guaranteedMod.toLowerCase().includes(modName.toLowerCase())) {
                results.push({
                    essence: essenceName,
                    mod: data.guaranteedMod,
                    tiers: data.tier
                });
            }
        }
        return results;
    },

    /**
     * Suggère des combinaisons populaires basées sur le type d'item
     */
    suggestPopularCombo: function(itemType) {
        if (itemType.includes('weapon')) {
            return POE2_DATA_V2.popularCombos['Physical DPS Weapon'];
        } else if (itemType.includes('body') || itemType.includes('helmet')) {
            return POE2_DATA_V2.popularCombos['Life + Resist Armor'];
        } else if (itemType.includes('boots')) {
            return POE2_DATA_V2.popularCombos['Speed Boots'];
        }
        return [];
    },

    /**
     * Calcule la difficulté d'un craft basé sur les mods demandés
     */
    calculateCraftDifficulty: function(mods) {
        let score = 0;
        mods.forEach(mod => {
            if (mod.priority === 'required') score += 2;
            if (mod.tier === 't1') score += 3;
            if (mod.tier === 't2') score += 1;
        });

        if (score >= 8) return 'very_hard';
        if (score >= 5) return 'hard';
        if (score >= 2) return 'medium';
        return 'easy';
    }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { POE2_DATA_V2, POE2_UTILS };
}
