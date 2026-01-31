export type SegmentType = 'protagonist' | 'psychiatrist' | 'narrator';

export interface TextSegment {
    text: string;
    type?: SegmentType;
}

export const TEXT = {
    UI: {
        RETICLE_CAPTURE: "RECALL",
        RETICLE_LIMIT: "LIMIT",
        BUTTON_RESET: "もう一度思い出す",
        BUTTON_ENDING: "全て思い出す",
        BUTTON_TITLE_BACK: "タイトルへ戻る",
    },
    TITLE_SCREEN: {
        TITLE: "2005年6月13日\n香川県善通寺未解決暴動事件追憶",
        DESCRIPTION: "Global Game Jam @ Okutama - Team B",
        BUTTON_START: "はじめる",
    },
    PROLOGUE: {
        BUTTON_ACTION: "記憶を辿る",
        SEGMENTS: [
            { text: "声を聞かせてください。声を。", type: 'psychiatrist' },
            { text: "安嵜さん\nあなたは今から21年前……\n2005年の、あの日のことを\n思い出せてきています", type: 'psychiatrist' },
            { text: "あの恐ろしい記憶へ\n少しずつ向き会えています。", type: 'psychiatrist' },
            { text: "少しずつで大丈夫です\nゆっくりでいいですよ", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT: {
        TITLE: "記憶の復元完了",
        // Result A: Non-event related (Randomized)
        SCENARIO_A: [
            [ // Pattern 1
                { text: "僕は晴れた日に、\nただ歩いていただけだったんだ", type: 'protagonist' },
                { text: "安嵜さんはこの時、\nいつもと同じ一日だと思っていたんですね。\nゆっくり思い出して大丈夫です", type: 'psychiatrist' }
            ],
            [ // Pattern 2
                { text: "あの頃\n何もない町で\n何も起きないと思っていた", type: 'protagonist' },
                { text: "安嵜さんは29歳の時、\nそう思っていたんですね", type: 'psychiatrist' }
            ],
            [ // Pattern 3
                { text: "6月の暑い日だった\nだけどこの日\nなぜか\n僕は汗もかかなかったんだ", type: 'protagonist' },
                { text: "安嵜さんは\nうすうす不穏なことが起きると\n思っていたのかもしれませんね", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        // Result B: Event related (Placeholder)
        SCENARIO_B: [
            [
                { text: "待ってくれ...これは...", type: 'protagonist' },
                { text: "そうです、安嵜さん。\nあなたはあの日、見てしまったんですね。", type: 'psychiatrist' },
                { text: "真実から目を逸らさないでください。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "鮮明に思い出した！\n\nあの日の夕暮れ、路地裏で見た光景は決して忘れられないものだった。犯人が落としたコインの音が、今でも耳に残っている。そうだ、あれは確かに...",
            MEDIUM: "少しずつ思い出してきた...。\n\n何か重要なことを見落としている気がするが、輪郭は掴めてきた。確か、あの時誰かが叫んでいたはずだ。もう少しで思い出せそうだ。",
            LOW: "まだ記憶が曖昧だ...\n\n霧の中にいるようで、何もかもがぼやけている。ただ、何かが起こったという感覚だけが残っている。もっと集中しなければ...",
        }
    },
    EPISODE: {
        SPOT_A_TITLE: "あの娘",
        SPOT_A_DESC: "あの娘だ。",
        SPOT_B_TITLE: "ぼく",
        SPOT_B_DESC: "これは...ぼくか？",
        SPOT_C_TITLE: "懐かしい風景",
        SPOT_C_DESC: "昔よく遊んだ空き地だ。",
        SPOT_D_TITLE: "奇妙な看板",
        SPOT_D_DESC: "見慣れない看板がある。こんな店あったっけ？",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING: {
        TITLE: "2005年6月13日\n香川県善通寺未解決暴動事件追憶",
        DESCRIPTION: "全ての記憶が繋がり、真実が明らかになった。\n\n6月13日のあの暴動は、偶然ではなく仕組まれたものだったのだ。\nカメラに残された微かな光が、闇に葬られた真実を照らし出す。",
        CREDITS: "Thank you for playing.",
    }
};

