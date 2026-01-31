import { TextSegment } from './locales';

export type Dictionary = typeof TEXT_JA;

// ==============================================================================
// Japanese Locale Data (日本語ロケールデータ)
//
// Structure Overview:
// - UI: Common UI elements (buttons, labels)
// - TITLE_SCREEN: Title screen text and scenario names
// - [SCENARIO_PREFIX]: Blocks for each scenario (Y, E, A, M, X)
//   - PROLOGUE_[KEY]: Intro text before gameplay (Psychiatrist dialogue)
//   - RESULT_[KEY]: Post-gameplay text segments based on player choices
//     - SCENARIO_[KEY]: Specific text branches (e.g., specific spots found)
//     - MESSAGES: Generic feedback based on score (High/Med/Low)
//   - EPISODE_[KEY]: Descriptions for map spots (Memory fragments)
//   - ENDING_[KEY]: Epilogue screen text and credits
// ==============================================================================

export const TEXT_JA = {
    // ============================================================
    // Common UI & Title Screen
    // ============================================================
    UI: {
        RETICLE_CAPTURE: "RECALL",
        RETICLE_LIMIT: "LIMIT",
        BUTTON_RESET: "もう少し思い出してみるよ",
        BUTTON_ENDING: "全て思い出す",
        BUTTON_TITLE_BACK: "タイトルへ戻る",
    },
    TITLE_SCREEN: {
        TITLE: "2005年6月13日\n香川県善通寺未解決暴動事件追憶",
        DESCRIPTION: "Global Game Jam @ Okutama - Team B",
        BUTTON_START: "はじめる",
        // Scenario Selection (shown after unlock)
        SCENARIO_Y: "調書 Y-001: 安崎",
        SCENARIO_E: "調書 E-002: 遠藤",
        SCENARIO_A: "調書 A-003: 芦田",
        SCENARIO_M: "調書 M-004: 名城",
        SCENARIO_X: "調書 X-XXX",
        COMING_SOON: "［開封待機］",
    },
    // ============================================================
    // Scenario Y: Yasuzaki (安嵜) - The Bystander (傍観者)
    // ============================================================
    PROLOGUE: {
        BUTTON_ACTION: "わかった。少し待ってほしい",
        SEGMENTS: [
            { text: "声を聞かせてください。声を。", type: 'psychiatrist' },
            { text: "安嵜さん\nあなたは今から21年前……\n2005年の、あの日のことを\n思い出せてきています", type: 'psychiatrist' },
            { text: "あの恐ろしい記憶へ\n少しずつ向き会えています。", type: 'psychiatrist' },
            { text: "少しずつで大丈夫です\nゆっくりでいいですよ", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT: {
        TITLE: "記憶の復元完了",
        // Result A: Non-event related (Randomized Failure)
        SCENARIO_A: [
            [ // A-1
                { text: "僕は晴れた日に、\nただ歩いていただけだったんだ", type: 'protagonist' },
                { text: "安嵜さんはこの時、\nいつもと同じ一日だと思っていたんですね。\nゆっくり思い出して大丈夫です", type: 'psychiatrist' }
            ],
            [ // A-2
                { text: "あの頃\n何もない町で\n何も起きないと思っていた", type: 'protagonist' },
                { text: "安嵜さんは29歳の時、\nそう思っていたんですね\n三浦さんと共に", type: 'psychiatrist' }
            ],
            [ // A-3
                { text: "6月の暑い日だった\nだけどこの日\nなぜか\n僕は汗もかかなかったんだ", type: 'protagonist' },
                { text: "安嵜さんは\nうすうす不穏なことが起きると\n思っていたのかもしれませんね", type: 'psychiatrist' }
            ],
            [ // A-4
                { text: "普段は遠くの風景を見るなんて\n退屈だったが\nこの日は目を離せないことがあった", type: 'protagonist' },
                { text: "安嵜さんが5度目に\nカウンセリングへいらっしゃったとき\nその風景の話をされていましたね", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        // Incident Scenarios
        SCENARIO_MURDER: [
            [
                { text: "血の匂いがした気がする...", type: 'protagonist' },
                { text: "安嵜さん、それは重要な記憶です。\n恐れずに思い出してみましょう。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_BICYCLE: [
            [
                { text: "倒れた自転車...誰かのものだったか...", type: 'protagonist' },
                { text: "誰の自転車だったか、思い出せますか？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "煙が見えた...山の方が赤かった...", type: 'protagonist' },
                { text: "あの日の火事のことですね。\n覚えていますか？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        // True Ending (Spot A + Spot B)
        SCENARIO_ENDING: [
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
        SPOT_MURDER_TITLE: "不穏な気配",
        SPOT_MURDER_DESC: "何か恐ろしいことが起きた気がする。",
        SPOT_BICYCLE_TITLE: "放置された自転車",
        SPOT_BICYCLE_DESC: "持ち主はどこへ行ったのだろう。",
        SPOT_WILDFIRE_TITLE: "立ち昇る煙",
        SPOT_WILDFIRE_DESC: "山が燃えている...",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING: {
        TITLE: "2005年6月13日\n安嵜の記憶", DESCRIPTION: "全ての記憶が繋がり、真実が明らかになった。\n\n6月13日のあの暴動は、偶然ではなく仕組まれたものだったのだ。\nカメラに残された微かな光が、闇に葬られた真実を照らし出す。",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario E: Endo (遠藤) - The Victim (被害者)
    // ============================================================
    PROLOGUE_E: {
        BUTTON_ACTION: "...思い出してみます",
        SEGMENTS: [
            { text: "声を聞かせてください。", type: 'psychiatrist' },
            { text: "遠藤さん\nあなたは2005年のあの日...\nあの人とのことを\n思い出そうとしていますね", type: 'psychiatrist' },
            { text: "あなたは今から21年前...\n27歳だった頃の記憶に\n向き合おうとしています", type: 'psychiatrist' },
            { text: "辛い記憶かもしれません。\nでも、向き合うことが大切です。", type: 'psychiatrist' },
            { text: "あなたが相談してくれた\nあの人との関係のこと", type: 'psychiatrist' },
            { text: "ゆっくりでいいですよ。\n少しずつ思い出していきましょう。", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_E: {
        TITLE: "記憶の復元完了",
        SCENARIO_A: [
            [
                { text: "あの日、私は何をしていたんだろう...", type: 'protagonist' },
                { text: "6月の暑い日だった\nでも、私は寒気がしていた", type: 'protagonist' },
                { text: "遠藤さん、焦らなくて大丈夫です。\n少しずつ思い出しましょう。", type: 'psychiatrist' },
                { text: "あの頃のあなたは\n何を恐れていましたか？", type: 'psychiatrist' }
            ],
            [
                { text: "あの人のことを考えると\n胸が苦しくなる...", type: 'protagonist' },
                { text: "何度も傷つけられた\nでも、離れられなかった", type: 'protagonist' },
                { text: "遠藤さん、その感情を大切に。\n何か思い出せますか？", type: 'psychiatrist' },
                { text: "あなたは悪くない\nそのことを忘れないでください", type: 'psychiatrist' }
            ],
            [
                { text: "善通寺の町は\n何も起きないように見えた", type: 'protagonist' },
                { text: "でも私の中では\n嵐が吹き荒れていた", type: 'protagonist' },
                { text: "遠藤さんは27歳の時\nそう感じていたんですね", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_YASUZAKI: [
            [
                { text: "あの人...安嵜さんだ。\n前の日に相談に乗ってもらった...", type: 'protagonist' },
                { text: "あの人には\n彼との関係のことを話した", type: 'protagonist' },
                { text: "どうしたらいいか\n分からなくなっていたから", type: 'protagonist' },
                { text: "安嵜さんとお話されたんですね。\nどんな相談でしたか？", type: 'psychiatrist' },
                { text: "その相談が\nあなたの気持ちを楽にしましたか？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ASHIDA: [
            [
                { text: "芦田さん...\n私を守ってくれると思っていた人...", type: 'protagonist' },
                { text: "彼から逃げたかった\n芦田さんなら助けてくれると思った", type: 'protagonist' },
                { text: "でも芦田さんは...\n私が思っていたような人じゃなかった", type: 'protagonist' },
                { text: "芦田さんとの関係について\n思い出せますか？", type: 'psychiatrist' },
                { text: "あなたは助けを求めただけです\nそのことを責めないでください", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "山が燃えていた...\n我拝師山が赤く染まっていた", type: 'protagonist' },
                { text: "あの日、全てが燃え尽きた気がした...\n私の中の何かも一緒に", type: 'protagonist' },
                { text: "空が赤かった\n煙が立ち上っていた", type: 'protagonist' },
                { text: "その炎を見たとき\n何を感じましたか？", type: 'psychiatrist' },
                { text: "あの火事は偶然ではなかった\nそうですね？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDING: [
            [
                { text: "あの人は...私のことを好きだったのかな", type: 'protagonist' },
                { text: "でも、あの人は私を傷つけた\n何度も、何度も", type: 'protagonist' },
                { text: "「お前がいないと生きていけない」\nそう言いながら私を追い詰めた", type: 'protagonist' },
                { text: "逃げ場がなかった\n誰かに助けてほしかった", type: 'protagonist' },
                { text: "芦田さんは私を守ってくれると言った\n私は信じた", type: 'protagonist' },
                { text: "でも、芦田さんは...\nあんなことをするなんて", type: 'protagonist' },
                { text: "遠藤さん、あなたは悪くない。\nあなたは被害者なのです。", type: 'psychiatrist' },
                { text: "助けを求めることは\n間違いではありません", type: 'psychiatrist' },
                { text: "これからは\nあなた自身を責めないでください", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "鮮明に思い出した...",
            MEDIUM: "少しずつ思い出してきた...",
            LOW: "まだ記憶が曖昧だ...",
        }
    },
    EPISODE_E: {
        SPOT_E_A_TITLE: "私",
        SPOT_E_A_DESC: "あの日の私...何を考えていたんだろう",
        SPOT_E_B_TITLE: "あの人",
        SPOT_E_B_DESC: "あの人...私を傷つけた人",
        SPOT_E_YASUZAKI_TITLE: "安嵜さん",
        SPOT_E_YASUZAKI_DESC: "相談に乗ってくれた人...",
        SPOT_E_ASHIDA_TITLE: "芦田さん",
        SPOT_E_ASHIDA_DESC: "私を守ってくれると言った人...",
        SPOT_E_WILDFIRE_TITLE: "燃える山",
        SPOT_E_WILDFIRE_DESC: "あの日、我拝師山が燃えた...",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING_E: {
        TITLE: "2005年6月13日\n遠藤の記憶",
        DESCRIPTION: "私は被害者だった。\nあの人に傷つけられ、逃げ場を求めて芦田さんに頼った。\n\n芦田さんは私を守ると言った。\nでも、あの人を殺すなんて思わなかった。\n\nあの日、山も燃えた。\n全てが燃え尽きた。\n\n私は永遠にこの記憶に囚われることになった。\nでも、私は悪くない。\n助けを求めただけだった。",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario A: Ashida (芦田) - The Perpetrator (加害者/守護者)
    // ============================================================
    PROLOGUE_A: {
        BUTTON_ACTION: "...話してみます",
        SEGMENTS: [
            { text: "声を聞かせてください。", type: 'psychiatrist' },
            { text: "芦田さん\nあなたは2005年のあの日...\n何をしてしまったのか\n思い出そうとしていますね", type: 'psychiatrist' },
            { text: "あなたは今から21年前...\n30歳だった頃の記憶に\n向き合おうとしています", type: 'psychiatrist' },
            { text: "あなたが守ろうとした人のこと\nあなたが傷つけた人のこと", type: 'psychiatrist' },
            { text: "辛い記憶かもしれません。\nでも、向き合うことが大切です。", type: 'psychiatrist' },
            { text: "ゆっくりでいいですよ。\n少しずつ思い出していきましょう。", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_A: {
        TITLE: "記憶の復元完了",
        SCENARIO_A: [
            [
                { text: "あの日、俺は何をしていたんだ...", type: 'protagonist' },
                { text: "我拝師山で働いていた\nいつもと同じ日だと思っていた", type: 'protagonist' },
                { text: "芦田さん、焦らなくて大丈夫です。\n少しずつ思い出しましょう。", type: 'psychiatrist' },
                { text: "あの頃のあなたは\n何を考えていましたか？", type: 'psychiatrist' }
            ],
            [
                { text: "遠藤のことばかり考えていた\nあいつから守らなければと", type: 'protagonist' },
                { text: "三浦は遠藤を傷つけていた\n俺は許せなかった", type: 'protagonist' },
                { text: "芦田さん、その感情を大切に。\n何か思い出せますか？", type: 'psychiatrist' }
            ],
            [
                { text: "善通寺の町は静かだった\nでも俺の中では嵐が吹き荒れていた", type: 'protagonist' },
                { text: "遠藤を守りたかった\nそれだけだったんだ", type: 'protagonist' },
                { text: "芦田さんは30歳の時\nそう思っていたんですね", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_MIURA: [
            [
                { text: "三浦...\nあいつのことを思い出すと頭が熱くなる", type: 'protagonist' },
                { text: "遠藤を傷つけていたあいつを\n俺は許せなかった", type: 'protagonist' },
                { text: "「やめろ」とあいつは叫んでいた\nでも俺の手は止まらなかった", type: 'protagonist' },
                { text: "三浦さんのことを\n思い出せますか？", type: 'psychiatrist' },
                { text: "あなたは何を感じましたか？\nその時。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "山が燃えた...\n我拝師山が燃えた", type: 'protagonist' },
                { text: "俺が働いていた山だ\nあの日、全てが燃え尽きた", type: 'protagonist' },
                { text: "誰かが放火したらしい\n俺のせいじゃない...はずだ", type: 'protagonist' },
                { text: "その炎を見たとき\n何を感じましたか？", type: 'psychiatrist' },
                { text: "あの火事はあなたとは\n関係がありましたか？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_YASUZAKI: [
            [
                { text: "あの男...安嵜か\n見ていたんだな、俺のことを", type: 'protagonist' },
                { text: "傍観者だ\n何もしなかった奴だ", type: 'protagonist' },
                { text: "でも、俺を止めることも\nできたはずなのに", type: 'protagonist' },
                { text: "安嵜さんのことを\n思い出せますか？", type: 'psychiatrist' },
                { text: "彼はあなたを見ていたんですね。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDING: [
            [
                { text: "遠藤を守りたかった\nそれだけだったんだ", type: 'protagonist' },
                { text: "三浦は遠藤を傷つけていた\n何度も、何度も", type: 'protagonist' },
                { text: "遠藤は俺に助けを求めた\n「守って」と言った", type: 'protagonist' },
                { text: "だから俺は...\n三浦を殺した", type: 'protagonist' },
                { text: "守ることと殺すことは\n違うはずだったのに", type: 'protagonist' },
                { text: "俺は遠藤を守ったのか\nそれとも壊したのか", type: 'protagonist' },
                { text: "芦田さん、あなたの気持ちは\n理解できます。", type: 'psychiatrist' },
                { text: "でも、守る方法は\n他にもあったかもしれません。", type: 'psychiatrist' },
                { text: "これからは\nその記憶と向き合っていきましょう。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "鮮明に思い出した...",
            MEDIUM: "少しずつ思い出してきた...",
            LOW: "まだ記憶が曖昧だ...",
        }
    },
    EPISODE_A: {
        SPOT_A_A_TITLE: "俺",
        SPOT_A_A_DESC: "あの日の俺...何をしてしまったんだ",
        SPOT_A_B_TITLE: "遠藤",
        SPOT_A_B_DESC: "守りたかった女",
        SPOT_A_MIURA_TITLE: "三浦",
        SPOT_A_MIURA_DESC: "遠藤を傷つけていた男",
        SPOT_A_WILDFIRE_TITLE: "燃える山",
        SPOT_A_WILDFIRE_DESC: "俺が働いていた我拝師山が燃えた",
        SPOT_A_YASUZAKI_TITLE: "安嵜",
        SPOT_A_YASUZAKI_DESC: "俺を見ていた傍観者",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING_A: {
        TITLE: "2005年6月13日\n芦田の記憶",
        DESCRIPTION: "俺は遠藤を守りたかった。\n三浦から救い出したかった。\n\nでも、守る方法を間違えた。\n俺は三浦を殺してしまった。\n\n遠藤は俺に感謝していたのか\nそれとも恐れていたのか。\n\n俺は永遠にこの記憶に囚われることになった。\n守ることと殺すことは違うはずだった。",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario M: Meijo (名城) - The Avenger (復讐者)
    // ============================================================
    PROLOGUE_M: {
        BUTTON_ACTION: "...話します",
        SEGMENTS: [
            { text: "声を聞かせてください。", type: 'psychiatrist' },
            { text: "名城さん\nあなたは2005年のあの日...\n何をしてしまったのか\n思い出そうとしていますね", type: 'psychiatrist' },
            { text: "あなたは今から21年前...\n24歳だった頃の記憶に\n向き合おうとしています", type: 'psychiatrist' },
            { text: "あなたが傷つけられた日々のこと\nあなたが燃やしたもののこと", type: 'psychiatrist' },
            { text: "辛い記憶かもしれません。\nでも、向き合うことが大切です。", type: 'psychiatrist' },
            { text: "ゆっくりでいいですよ。\n少しずつ思い出していきましょう。", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_M: {
        TITLE: "記憶の復元完了",
        SCENARIO_A: [
            [
                { text: "あの日、俺は何をしていたんだ...", type: 'protagonist' },
                { text: "自転車で町を走っていた\n仕事もなく、居場所もなく", type: 'protagonist' },
                { text: "名城さん、焦らなくて大丈夫です。\n少しずつ思い出しましょう。", type: 'psychiatrist' },
                { text: "あの頃のあなたは\n何を感じていましたか？", type: 'psychiatrist' }
            ],
            [
                { text: "毎日が地獄だった\n工場で働いていた頃", type: 'protagonist' },
                { text: "安嵜たちに蹴られて\n笑われて\nそれでも黙っていた", type: 'protagonist' },
                { text: "名城さん、その感情を大切に。\n何か思い出せますか？", type: 'psychiatrist' }
            ],
            [
                { text: "気がついたら工場を辞めていた\nいや、辞めさせられたのか", type: 'protagonist' },
                { text: "誰も助けてくれなかった\n誰も俺を見ていなかった", type: 'protagonist' },
                { text: "名城さんは24歳の時\nそう感じていたんですね", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_MURDER: [
            [
                { text: "誰かが殺された...\nあの日、町で何かが起きていた", type: 'protagonist' },
                { text: "俺には関係ない\n俺は別のことで手一杯だった", type: 'protagonist' },
                { text: "でも、あの日は\n何もかもがおかしかった", type: 'protagonist' },
                { text: "その事件のことを\n覚えていますか？", type: 'psychiatrist' },
                { text: "あなたはその時\n何をしていましたか？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_YASUZAKI: [
            [
                { text: "安嵜...\nあいつのことを思い出すと吐き気がする", type: 'protagonist' },
                { text: "あいつは俺を蹴っていた\n隠れて、誰にも見られないように", type: 'protagonist' },
                { text: "「使えない」って\n何度も言われた", type: 'protagonist' },
                { text: "安嵜さんとの関係について\n思い出せますか？", type: 'psychiatrist' },
                { text: "あなたは何をされましたか？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDO: [
            [
                { text: "あの女...誰だったか\n俺には関係ない人だ", type: 'protagonist' },
                { text: "俺は誰とも関係がなかった\n誰も俺を見ていなかった", type: 'protagonist' },
                { text: "その人のことを\n覚えていますか？", type: 'psychiatrist' },
                { text: "あなたは孤立していた\nそうですね？", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_ENDING: [
            [
                { text: "俺はずっと我慢していた\n工場で、毎日", type: 'protagonist' },
                { text: "安嵜たちに蹴られても\n笑われても\n黙っていた", type: 'protagonist' },
                { text: "でも限界だった\n気がついたら工場を辞めていた", type: 'protagonist' },
                { text: "行く場所がなかった\n毎日自転車で町を回っていた", type: 'protagonist' },
                { text: "あの日、俺は我拝師山に行った\n安嵜が働いていたあの山に", type: 'protagonist' },
                { text: "火をつけた\n全部燃やしてやりたかった", type: 'protagonist' },
                { text: "安嵜のもの\n俺を蹴った奴らのもの\n全部", type: 'protagonist' },
                { text: "名城さん、あなたは\n傷つけられていたんですね。", type: 'psychiatrist' },
                { text: "でも、暴力に暴力で返すことは\n正しかったでしょうか。", type: 'psychiatrist' },
                { text: "これからは\nその記憶と向き合っていきましょう。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "鮮明に思い出した...",
            MEDIUM: "少しずつ思い出してきた...",
            LOW: "まだ記憶が曖昧だ...",
        }
    },
    EPISODE_M: {
        SPOT_M_A_TITLE: "俺",
        SPOT_M_A_DESC: "あの日、自転車で走っていた俺",
        SPOT_M_B_TITLE: "我拝師山",
        SPOT_M_B_DESC: "俺が燃やした山",
        SPOT_M_MURDER_TITLE: "何かの事件",
        SPOT_M_MURDER_DESC: "誰かが死んだらしい...俺には関係ない",
        SPOT_M_YASUZAKI_TITLE: "安嵜",
        SPOT_M_YASUZAKI_DESC: "俺を蹴っていた奴",
        SPOT_M_ENDO_TITLE: "あの女",
        SPOT_M_ENDO_DESC: "誰だか知らない...俺には関係ない",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING_M: {
        TITLE: "2005年6月13日\n名城の記憶",
        DESCRIPTION: "俺はずっと傷つけられていた。\n安嵜たちに蹴られ、笑われ、辞めさせられた。\n\n誰も助けてくれなかった。\n誰も俺を見ていなかった。\n\nだから俺は山を燃やした。\n安嵜たちのものを全部燃やしてやりたかった。\n\n俺は永遠にこの記憶に囚われることになった。\n傷つけられた者が傷つける側になった。",
        CREDITS: "Thank you for playing.",
    },

    // ============================================================
    // Scenario X: The Player (あなた) - The Observer (観測者)
    // ==================================================
    // ============================================================
    // Scenario X: The Player (あなた) - The Observer (観測者)
    // ============================================================
    PROLOGUE_X: {
        BUTTON_ACTION: "...はい",
        SEGMENTS: [
            { text: "お待ちしておりました。", type: 'psychiatrist' },
            { text: "これですべての記憶が\n揃ったようですね。", type: 'psychiatrist' },
            { text: "準備はよろしいですか？", type: 'psychiatrist' }
        ] as TextSegment[]
    },
    RESULT_X: {
        SCENARIO_MAIN: [
            [
                // Yasuzaki (安嵜) - Watcher
                { text: "安嵜は傍観者でした。\n事件を見ていたのに\n何もしなかった。", type: 'psychiatrist' },
                // Endo (遠藤) - Victim
                { text: "遠藤は被害者でした。\n傷つけられ、助けを求めた。", type: 'psychiatrist' },
                // Ashida (芦田) - Perpetrator
                { text: "芦田は加害者でした。\n守ろうとして、殺した。", type: 'psychiatrist' },
                // Meijo (名城) - Avenger
                { text: "名城は復讐者でした。\n傷つけられた者が、傷つける側になった。", type: 'psychiatrist' },
                { text: "...", type: 'psychiatrist' },
                // You (あなた) - Player
                { text: "そして、あなた。", type: 'psychiatrist' },
                { text: "あなたは...誰ですか？", type: 'psychiatrist' },
                { text: "撮影者？\nそれとも...？", type: 'psychiatrist' },
                { text: "あなたはここに干渉できない。\nただ見ているだけ。", type: 'psychiatrist' },
                { text: "しかし、あなたは知ってしまった。\nこの場所で起きたことを。", type: 'psychiatrist' },
                { text: "それが何を意味するのか。\n私にもわかりません。", type: 'psychiatrist' },
                { text: "ただ...忘れないでください。", type: 'psychiatrist' },
                { text: "見ていた、ということを。\n記憶した、ということを。", type: 'psychiatrist' }
            ]
        ] as TextSegment[][]
    },
    ENDING_X: {
        TITLE: "2005年6月13日\nあなたの記憶",
        DESCRIPTION: "あなたは4人の記憶を見た。\n\n安嵜、遠藤、芦田、名城。\n彼らの運命は交錯し、燃え尽きた。\n\nあなたは何者だったのか。\nなぜこれを見ていたのか。\n\nその答えは、記憶の中にしかない。\nあるいは、最初から存在しないのかもしれない。",
        CREDITS: "Thank you for playing.",
    }
};
