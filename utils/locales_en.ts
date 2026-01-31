import { TextSegment } from './locales';

export const TEXT_EN = {
    UI: {
        RETICLE_CAPTURE: "RECALL",
        RETICLE_LIMIT: "LIMIT",
        BUTTON_RESET: "Recall Again",
        BUTTON_ENDING: "Recall Everything",
        BUTTON_TITLE_BACK: "Return to Title",
    },
    TITLE_SCREEN: {
        TITLE: "June 13, 2005\nMemories of the Zentsuji Riot",
        DESCRIPTION: "Global Game Jam @ Okutama - Team B",
        BUTTON_START: "Start",
    },
    PROLOGUE: {
        BUTTON_ACTION: "Trace Memories",
        SEGMENTS: [
            { text: "Let me hear your voice. Speak to me.", type: 'psychiatrist' },
            { text: "Mr. Anzaki...\nYou are beginning to remember...\nwhat happened that day 21 years ago, in 2005.", type: 'psychiatrist' },
            { text: "You are slowly facing those terrible memories.", type: 'psychiatrist' },
            { text: "Take your time.\nThere is no rush.", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT: {
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
    EPISODE: {
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
    ENDING: {
        TITLE: "June 13, 2005\nMemories of the Zentsuji Riot",
        DESCRIPTION: "All memories are connected, and the truth is revealed.\n\nThe riot on June 13th was not a coincidence, but a setup.\nThe faint light left in the camera illuminates the truth buried in darkness.",
        CREDITS: "Thank you for playing.",
    }
};
