import { TextSegment } from './locales';

export type Dictionary = typeof TEXT_EN;

// ==============================================================================
// English Locale Data
//
// Structure Overview:
// - UI: Common UI elements
// - TITLE_SCREEN: Title screen text
// - [SCENARIO_PREFIX]: Blocks for each scenario (Y, E, A, M, X)
//   - PROLOGUE_[KEY]: Intro text
//   - RESULT_[KEY]: Post-gameplay text branches
//   - EPISODE_[KEY]: Map spot descriptions
//   - ENDING_[KEY]: Epilogue text
// ==============================================================================

export const TEXT_EN = {
    // ============================================================
    // Common UI & Title Screen
    // ============================================================
    UI: {
        RETICLE_CAPTURE: "RECALL",
        RETICLE_LIMIT: "LIMIT",
        BUTTON_RESET: "Try to remember more",
        BUTTON_ENDING: "Remember everything",
        BUTTON_TITLE_BACK: "Return to Title",
    },
    TITLE_SCREEN: {
        TITLE: "June 13, 2005\nZentsuji Unsolved Riot Case Recollection",
        DESCRIPTION: "Global Game Jam @ Okutama - Team B",
        BUTTON_START: "Start",
        // Scenario Selection (shown after unlock)
        SCENARIO_A: "FILE A-001: ANZAKI",
        SCENARIO_E: "FILE E-002: ENDO",
        SCENARIO_A2: "FILE A-003: ASHIDA",
        SCENARIO_N: "FILE N-004: NASHIRO",
        SCENARIO_X: "FILE X-XXX",
        COMING_SOON: "[SEALED]",
    },
    // ============================================================
    // Scenario A: Anzaki (The Bystander)
    // ============================================================
    PROLOGUE_A: {
        BUTTON_ACTION: "I understand. Give me a moment.",
        SEGMENTS: [
            { text: "Let me hear your voice. Your voice.", type: 'psychiatrist' },
            { text: "Mr. Anzaki...\nYou are beginning to remember...\nwhat happened that day 21 years ago, in 2005.", type: 'psychiatrist' },
            { text: "You are slowly facing those terrible memories.", type: 'psychiatrist' },
            { text: "Take your time.\nThere is no rush.", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_A: {
        TITLE: "Memory Restoration Complete",
        // Result A: Non-event related (Randomized Failure)
        SCENARIO_A: [
            [ // Pattern 1
                { text: "I was just walking... on a sunny day.", type: 'protagonist' },
                { text: "Mr. Anzaki, at that time,\nyou thought it was just an ordinary day.\nIt's okay to remember slowly.", type: 'psychiatrist' }
            ],
            [ // Pattern 2
                { text: "Back then...\nin that empty town...\nI thought nothing would happen.", type: 'protagonist' },
                { text: "When you were 29,\nthat was what you believed.", type: 'psychiatrist' }
            ],
            [ // Pattern 3
                { text: "It was a hot day in June.\nBut for some reason,\nI wasn't even sweating.", type: 'protagonist' },
                { text: "Perhaps, Mr. Anzaki,\nyou unconsciously sensed something ominous.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        // Incident Scenarios
        SCENARIO_MURDER: [
            [
                { text: "I think I smelled blood...", type: 'protagonist' },
                { text: "Mr. Anzaki, that is a crucial memory.\nDon't be afraid to recall it.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_BICYCLE: [
            [
                { text: "A fallen bicycle... whose was it...?", type: 'protagonist' },
                { text: "Can you remember whose bicycle it was?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "I saw smoke... the mountains were red...", type: 'protagonist' },
                { text: "The fire that day.\nDo you remember it?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        // True Ending (Spot A + Spot B)
        SCENARIO_ENDING: [
            [
                { text: "Wait... this is...", type: 'protagonist' },
                { text: "Yes, Mr. Anzaki.\nYou saw it that day.", type: 'psychiatrist' },
                { text: "Do not look away from the truth.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "I remember vividly!\n\nThe sight I saw in the back alley that evening is something I can never forget. The sound of the coin dropped by the culprit still rings in my ears. Yes, that was definitely...",
            MEDIUM: "I'm remembering bit by bit...\n\nI feel like I'm overlooking something important, but I'm grasping the outline. I'm sure someone was screaming back then. I'm almost there...",
            LOW: "My memory is still vague...\n\nIt's like I'm in a fog, everything is blurry. Only the sensation that something happened remains. I need to concentrate more...",
        }
    },
    EPISODE_A: {
        SPOT_A_TITLE: "That Girl",
        SPOT_A_DESC: "It's that girl.",
        SPOT_B_TITLE: "Me",
        SPOT_B_DESC: "Is this... me?",
        SPOT_MURDER_TITLE: "Ominous Presence",
        SPOT_MURDER_DESC: "I feel something terrible has happened.",
        SPOT_BICYCLE_TITLE: "Abandoned Bicycle",
        SPOT_BICYCLE_DESC: "Where did the owner go?",
        SPOT_WILDFIRE_TITLE: "Rising Smoke",
        SPOT_WILDFIRE_DESC: "The mountain is burning...",
        NOTHING_TITLE: "Vague Memory",
        NOTHING_DESC: "I couldn't remember anything..."
    },
    ENDING_A: {
        TITLE: "June 13, 2005\nMemories of the Zentsuji Riot",
        DESCRIPTION: "All memories are connected, and the truth is revealed.\n\nThe riot on June 13th was not a coincidence, but a setup.\nThe faint light left in the camera illuminates the truth buried in darkness.",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario E: Endo (The Victim)
    // ============================================================
    PROLOGUE_E: {
        BUTTON_ACTION: "...I'll try to remember",
        SEGMENTS: [
            { text: "Let me hear your voice.", type: 'psychiatrist' },
            { text: "Ms. Endo...\nYou are trying to remember\nwhat happened with that person\non that day in 2005.", type: 'psychiatrist' },
            { text: "You are facing memories\nfrom 21 years ago...\nwhen you were 27.", type: 'psychiatrist' },
            { text: "It may be a painful memory.\nBut facing it is important.", type: 'psychiatrist' },
            { text: "The relationship you consulted about...\nwith that person.", type: 'psychiatrist' },
            { text: "Take your time.\nLet's remember bit by bit.", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_E: {
        TITLE: "Memory Restoration Complete",
        SCENARIO_A: [
            [
                { text: "What was I doing that day...", type: 'protagonist' },
                { text: "It was a hot day in June.\nBut I was shivering.", type: 'protagonist' },
                { text: "Ms. Endo, there's no rush.\nLet's remember bit by bit.", type: 'psychiatrist' },
                { text: "What were you afraid of\nback then?", type: 'psychiatrist' }
            ],
            [
                { text: "When I think of that person...\nmy chest tightens...", type: 'protagonist' },
                { text: "I was hurt so many times.\nBut I couldn't leave.", type: 'protagonist' },
                { text: "Ms. Endo, hold onto that feeling.\nCan you remember anything?", type: 'psychiatrist' },
                { text: "It's not your fault.\nPlease don't forget that.", type: 'psychiatrist' }
            ],
            [
                { text: "The town of Zentsuji...\nseemed like nothing would happen.", type: 'protagonist' },
                { text: "But inside me,\na storm was raging.", type: 'protagonist' },
                { text: "When you were 27,\nthat's how you felt.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ANZAKI: [
            [
                { text: "That person... It's Mr. Anzaki.\nHe listened to my problems the day before...", type: 'protagonist' },
                { text: "I told him about\nmy relationship with him.", type: 'protagonist' },
                { text: "I didn't know what to do anymore.", type: 'protagonist' },
                { text: "You spoke with Mr. Anzaki.\nWhat did you discuss?", type: 'psychiatrist' },
                { text: "Did talking to him\nmake you feel better?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ASHIDA: [
            [
                { text: "Mr. Ashida...\nThe one I thought would protect me...", type: 'protagonist' },
                { text: "I wanted to escape from him.\nI thought Mr. Ashida could help.", type: 'protagonist' },
                { text: "But Mr. Ashida wasn't...\nwho I thought he was.", type: 'protagonist' },
                { text: "Can you remember your relationship\nwith Mr. Ashida?", type: 'psychiatrist' },
                { text: "You only asked for help.\nDon't blame yourself for that.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "The mountain was burning...\nMt. Gahaishi was dyed red.", type: 'protagonist' },
                { text: "That day, everything felt like it burned away...\nSomething inside me too.", type: 'protagonist' },
                { text: "The sky was red.\nSmoke was rising.", type: 'protagonist' },
                { text: "When you saw those flames,\nwhat did you feel?", type: 'psychiatrist' },
                { text: "That fire wasn't an accident,\nwas it?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDING: [
            [
                { text: "Did that person... love me?", type: 'protagonist' },
                { text: "But he hurt me.\nAgain and again.", type: 'protagonist' },
                { text: "\"I can't live without you.\"\nHe said that while cornering me.", type: 'protagonist' },
                { text: "There was nowhere to run.\nI wanted someone to help me.", type: 'protagonist' },
                { text: "Mr. Ashida said he would protect me.\nI believed him.", type: 'protagonist' },
                { text: "But Mr. Ashida...\nI never thought he would do such a thing.", type: 'protagonist' },
                { text: "Ms. Endo, it's not your fault.\nYou are a victim.", type: 'psychiatrist' },
                { text: "Asking for help\nwas not wrong.", type: 'psychiatrist' },
                { text: "From now on,\nplease don't blame yourself.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "I remember vividly...",
            MEDIUM: "I'm remembering bit by bit...",
            LOW: "My memory is still vague...",
        }
    },
    EPISODE_E: {
        SPOT_E_A_TITLE: "Me",
        SPOT_E_A_DESC: "Me, on that day... what was I thinking?",
        SPOT_E_B_TITLE: "That Person",
        SPOT_E_B_DESC: "That person... who hurt me.",
        SPOT_E_ANZAKI_TITLE: "Mr. Anzaki",
        SPOT_E_ANZAKI_DESC: "The one who listened to me...",
        SPOT_E_ASHIDA_TITLE: "Mr. Ashida",
        SPOT_E_ASHIDA_DESC: "The one who said he'd protect me...",
        SPOT_E_WILDFIRE_TITLE: "Burning Mountain",
        SPOT_E_WILDFIRE_DESC: "That day, Mt. Gahaishi burned...",
        NOTHING_TITLE: "Vague Memory",
        NOTHING_DESC: "I couldn't remember anything..."
    },
    ENDING_E: {
        TITLE: "June 13, 2005\nEndo's Memory",
        DESCRIPTION: "I was a victim.\nHurt by that person, I sought refuge with Mr. Ashida.\n\nMr. Ashida said he would protect me.\nBut I never thought he would kill him.\n\nThat day, the mountain also burned.\nEverything burned away.\n\nI became forever trapped in this memory.\nBut it's not my fault.\nI only asked for help.",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario A2: Ashida (The Perpetrator/Protector)
    // ============================================================
    PROLOGUE_A2: {
        BUTTON_ACTION: "...I'll try to tell you",
        SEGMENTS: [
            { text: "Let me hear your voice.", type: 'psychiatrist' },
            { text: "Mr. Ashida...\nYou are trying to remember\nwhat you did\non that day in 2005.", type: 'psychiatrist' },
            { text: "You are facing memories\nfrom 21 years ago...\nwhen you were 30.", type: 'psychiatrist' },
            { text: "The person you tried to protect.\nThe person you hurt.", type: 'psychiatrist' },
            { text: "It may be a painful memory.\nBut facing it is important.", type: 'psychiatrist' },
            { text: "Take your time.\nLet's remember bit by bit.", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_A2: {
        TITLE: "Memory Restoration Complete",
        SCENARIO_A: [
            [
                { text: "What was I doing that day...", type: 'protagonist' },
                { text: "I was working at Mt. Gahaishi.\nI thought it was just another day.", type: 'protagonist' },
                { text: "Mr. Ashida, there's no rush.\nLet's remember bit by bit.", type: 'psychiatrist' },
                { text: "What were you thinking\nback then?", type: 'psychiatrist' }
            ],
            [
                { text: "I kept thinking about Endo.\nI had to protect her from him.", type: 'protagonist' },
                { text: "Miura was hurting Endo.\nI couldn't forgive him.", type: 'protagonist' },
                { text: "Mr. Ashida, hold onto that feeling.\nCan you remember anything?", type: 'psychiatrist' }
            ],
            [
                { text: "The town of Zentsuji was quiet.\nBut inside me, a storm was raging.", type: 'protagonist' },
                { text: "I wanted to protect Endo.\nThat was all.", type: 'protagonist' },
                { text: "When you were 30,\nthat's how you felt.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_MIURA: [
            [
                { text: "Miura...\nThinking about him makes my head burn.", type: 'protagonist' },
                { text: "He was hurting Endo.\nI couldn't forgive him.", type: 'protagonist' },
                { text: "\"Stop!\" he screamed.\nBut my hands wouldn't stop.", type: 'protagonist' },
                { text: "Can you remember\nMr. Miura?", type: 'psychiatrist' },
                { text: "What did you feel\nat that moment?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "The mountain burned...\nMt. Gahaishi burned.", type: 'protagonist' },
                { text: "The mountain where I worked.\nThat day, everything burned away.", type: 'protagonist' },
                { text: "Someone set it on fire, they said.\nIt wasn't my fault... was it?", type: 'protagonist' },
                { text: "When you saw those flames,\nwhat did you feel?", type: 'psychiatrist' },
                { text: "Was that fire\nrelated to you?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ANZAKI: [
            [
                { text: "That man... Anzaki.\nHe was watching me.", type: 'protagonist' },
                { text: "A bystander.\nSomeone who did nothing.", type: 'protagonist' },
                { text: "But he could have stopped me.\nIf he wanted to.", type: 'protagonist' },
                { text: "Can you remember\nMr. Anzaki?", type: 'psychiatrist' },
                { text: "He was watching you.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDING: [
            [
                { text: "I wanted to protect Endo.\nThat was all.", type: 'protagonist' },
                { text: "Miura was hurting Endo.\nAgain and again.", type: 'protagonist' },
                { text: "Endo asked me for help.\n\"Protect me,\" she said.", type: 'protagonist' },
                { text: "So I...\nkilled Miura.", type: 'protagonist' },
                { text: "Protecting and killing\nshould be different things.", type: 'protagonist' },
                { text: "Did I protect Endo?\nOr did I destroy her?", type: 'protagonist' },
                { text: "Mr. Ashida, I understand\nyour feelings.", type: 'psychiatrist' },
                { text: "But there might have been\nother ways to protect her.", type: 'psychiatrist' },
                { text: "From now on,\nlet's face this memory together.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "I remember vividly...",
            MEDIUM: "I'm remembering bit by bit...",
            LOW: "My memory is still vague...",
        }
    },
    EPISODE_A2: {
        SPOT_A_A_TITLE: "Me",
        SPOT_A_A_DESC: "Me, on that day... what did I do?",
        SPOT_A_B_TITLE: "Endo",
        SPOT_A_B_DESC: "The woman I wanted to protect.",
        SPOT_A_MIURA_TITLE: "Miura",
        SPOT_A_MIURA_DESC: "The man who was hurting Endo.",
        SPOT_A_WILDFIRE_TITLE: "Burning Mountain",
        SPOT_A_WILDFIRE_DESC: "Mt. Gahaishi, where I worked, burned.",
        SPOT_A_ANZAKI_TITLE: "Anzaki",
        SPOT_A_ANZAKI_DESC: "The bystander who watched me.",
        NOTHING_TITLE: "Vague Memory",
        NOTHING_DESC: "I couldn't remember anything..."
    },
    ENDING_A2: {
        TITLE: "June 13, 2005\nAshida's Memory",
        DESCRIPTION: "I wanted to protect Endo.\nI wanted to save her from Miura.\n\nBut I chose the wrong way to protect her.\nI killed Miura.\n\nWas Endo grateful to me?\nOr was she afraid of me?\n\nI became forever trapped in this memory.\nProtecting and killing should be different things.",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario N: Nashiro (The Avenger)
    // ============================================================
    PROLOGUE_N: {
        BUTTON_ACTION: "...I'll talk",
        SEGMENTS: [
            { text: "Let me hear your voice.", type: 'psychiatrist' },
            { text: "Mr. Nashiro...\nYou are trying to remember\nwhat you did\non that day in 2005.", type: 'psychiatrist' },
            { text: "You are facing memories\nfrom 21 years ago...\nwhen you were 24.", type: 'psychiatrist' },
            { text: "The days you were hurt.\nWhat you burned.", type: 'psychiatrist' },
            { text: "It may be a painful memory.\nBut facing it is important.", type: 'psychiatrist' },
            { text: "Take your time.\nLet's remember bit by bit.", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_N: {
        TITLE: "Memory Restoration Complete",
        SCENARIO_A: [
            [
                { text: "What was I doing that day...", type: 'protagonist' },
                { text: "I was cycling around town.\nNo job, no place to go.", type: 'protagonist' },
                { text: "Mr. Nashiro, there's no rush.\nLet's remember bit by bit.", type: 'psychiatrist' },
                { text: "What were you feeling\nback then?", type: 'psychiatrist' }
            ],
            [
                { text: "Every day was hell.\nWhen I was working at the factory.", type: 'protagonist' },
                { text: "Kicked by Anzaki and the others.\nLaughed at.\nBut I stayed silent.", type: 'protagonist' },
                { text: "Mr. Nashiro, hold onto that feeling.\nCan you remember anything?", type: 'psychiatrist' }
            ],
            [
                { text: "Before I knew it, I had quit the factory.\nOr was I forced out?", type: 'protagonist' },
                { text: "No one helped me.\nNo one even saw me.", type: 'protagonist' },
                { text: "When you were 24,\nthat's how you felt.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_MURDER: [
            [
                { text: "Someone was killed...\nSomething happened in town that day.", type: 'protagonist' },
                { text: "It had nothing to do with me.\nI had my own problems.", type: 'protagonist' },
                { text: "But that day,\neverything was wrong.", type: 'protagonist' },
                { text: "Do you remember\nthat incident?", type: 'psychiatrist' },
                { text: "What were you doing\nat that time?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ANZAKI: [
            [
                { text: "Anzaki...\nThinking about him makes me sick.", type: 'protagonist' },
                { text: "He kicked me.\nIn secret, where no one could see.", type: 'protagonist' },
                { text: "\"Useless,\" he said.\nAgain and again.", type: 'protagonist' },
                { text: "Can you remember\nyour relationship with Mr. Anzaki?", type: 'psychiatrist' },
                { text: "What did he do to you?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDO: [
            [
                { text: "That woman... who was she?\nShe had nothing to do with me.", type: 'protagonist' },
                { text: "I had nothing to do with anyone.\nNo one even saw me.", type: 'protagonist' },
                { text: "Do you remember\nthat person?", type: 'psychiatrist' },
                { text: "You were isolated,\nweren't you?", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDING: [
            [
                { text: "I endured it all.\nEvery day at the factory.", type: 'protagonist' },
                { text: "Even when Anzaki and the others kicked me.\nEven when they laughed.\nI stayed silent.", type: 'protagonist' },
                { text: "But I reached my limit.\nBefore I knew it, I had quit.", type: 'protagonist' },
                { text: "I had nowhere to go.\nEvery day, cycling around town.", type: 'protagonist' },
                { text: "That day, I went to Mt. Gahaishi.\nThe mountain where Anzaki worked.", type: 'protagonist' },
                { text: "I set it on fire.\nI wanted to burn everything.", type: 'protagonist' },
                { text: "Anzaki's things.\nEverything belonging to those who kicked me.", type: 'protagonist' },
                { text: "Mr. Nashiro, you were\nbeing hurt.", type: 'psychiatrist' },
                { text: "But was it right\nto answer violence with violence?", type: 'psychiatrist' },
                { text: "From now on,\nlet's face this memory together.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "I remember vividly...",
            MEDIUM: "I'm remembering bit by bit...",
            LOW: "My memory is still vague...",
        }
    },
    EPISODE_N: {
        SPOT_N_A_TITLE: "Me",
        SPOT_N_A_DESC: "Me, cycling that day.",
        SPOT_N_B_TITLE: "Mt. Gahaishi",
        SPOT_N_B_DESC: "The mountain I burned.",
        SPOT_N_MURDER_TITLE: "Some Incident",
        SPOT_N_MURDER_DESC: "Someone died, they say... Nothing to do with me.",
        SPOT_N_ANZAKI_TITLE: "Anzaki",
        SPOT_N_ANZAKI_DESC: "The one who kicked me.",
        SPOT_N_ENDO_TITLE: "That Woman",
        SPOT_N_ENDO_DESC: "Don't know who... Nothing to do with me.",
        NOTHING_TITLE: "Vague Memory",
        NOTHING_DESC: "I couldn't remember anything..."
    },
    ENDING_N: {
        TITLE: "June 13, 2005\nNashiro's Memory",
        DESCRIPTION: "I was always being hurt.\nKicked, laughed at, forced out by Anzaki and the others.\n\nNo one helped me.\nNo one even saw me.\n\nSo I burned the mountain.\nI wanted to burn everything of Anzaki's.\n\nI became forever trapped in this memory.\nThe one who was hurt became the one who hurts.",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario X: The Player (The Observer)
    // ============================================================
    PROLOGUE_X: {
        BUTTON_ACTION: "...Yes",
        SEGMENTS: [
            { text: "I have been waiting for you.", type: 'psychiatrist' },
            { text: "It seems all the memories\nare now gathered.", type: 'psychiatrist' },
            { text: "Are you ready?", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_X: {
        SCENARIO_MAIN: [
            [
                // Anzaki (安嵜) - Watcher
                { text: "Anzaki was a bystander.\nHe saw the incident but did nothing.", type: 'psychiatrist' },
                // Endo (遠藤) - Victim
                { text: "Endo was a victim.\nShe was hurt and asked for help.", type: 'psychiatrist' },
                // Ashida (芦田) - Perpetrator
                { text: "Ashida was a perpetrator.\nHe tried to protect, and killed.", type: 'psychiatrist' },
                // Nashiro (名城) - Avenger
                { text: "Nashiro was an avenger.\nThe one who was hurt became the one who hurts.", type: 'psychiatrist' },
                { text: "...", type: 'psychiatrist' },
                // You (あなた) - Player
                { text: "And you.", type: 'psychiatrist' },
                { text: "Who... are you?", type: 'psychiatrist' },
                { text: "A photographer?\nOr...?", type: 'psychiatrist' },
                { text: "You cannot interfere here.\nYou can only watch.", type: 'psychiatrist' },
                { text: "But you have learned\nwhat happened in this place.", type: 'psychiatrist' },
                { text: "What does that mean?\nI do not know either.", type: 'psychiatrist' },
                { text: "Just... please don't forget.", type: 'psychiatrist' },
                { text: "That you watched.\nThat you remembered.", type: 'psychiatrist' }
            ]
        ] as TextSegment[][]
    },
    ENDING_X: {
        TITLE: "June 13, 2005\nYour Memory",
        DESCRIPTION: "You watched the memories of four people.\n\nAnzaki, Endo, Ashida, Nashiro.\nTheir fates intertwined and burned out.\n\nWho were you?\nWhy were you watching this?\n\nThe answer lies only within the memories.\nOr perhaps, it never existed at all.",
        CREDITS: "Thank you for playing.",
    }
};

