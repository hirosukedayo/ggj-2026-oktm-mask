import { TextSegment } from './locales';

export type Dictionary = typeof TEXT_JA;

// ==============================================================================
// Japanese Locale Data (日本語ロケールデータ)
//
// Structure Overview:
// - UI: Common UI elements (buttons, labels)
// - TITLE_SCREEN: Title screen text and scenario names
// - [SCENARIO_PREFIX]: Blocks for each scenario (A, E, A2, N, X)
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
        SCENARIO_A: "調書 A-001: 安嵜",
        SCENARIO_E: "調書 E-002: 遠藤",
        SCENARIO_A2: "調書 A-003: 芦田",
        SCENARIO_N: "調書 N-004: 名城",
        SCENARIO_X: "調書 X-XXX",
        COMING_SOON: "［開封待機］",
    },
    // ============================================================
    // Scenario A: Anzaki (安嵜) - The Bystander (傍観者)
    // ============================================================
    PROLOGUE_A: {
        BUTTON_ACTION: "わかった。少し待ってほしい",
        SEGMENTS: [
            { text: "声を聞かせてください。声を。", type: 'psychiatrist' },
            {
                text: "安嵜さん\nあなたは今から21年前……\n2005年の、あの日のことを\n徐々に思い出せてきています",
                type: 'psychiatrist',
                style: { fontStyle: 'psychiatrist' }
            },
            {
                text: "あの恐ろしい記憶へ\n少しずつ向きあえています。",
                type: 'psychiatrist',
                style: { fontStyle: 'psychiatrist' }
            },
            {
                text: "ふたつの記憶を同時に思い出す手法\n“デュアル・リコール”は効果的に進んでいます。\n少しずつで大丈夫です\nゆっくりでいいですよ",
                type: 'psychiatrist',
                style: { fontStyle: 'psychiatrist' }
            }
        ] as TextSegment[]
    },
    RESULT_A: {
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
            ],
            [ // A-5
                { text: "20歳を過ぎて\n少なくない友人が都市部へ行ってしまったなか\n僕はずいぶんと長く善通寺の町にいた", type: 'protagonist' },
                { text: "安嵜さんは\n2度目に受診したとき\n「ずっと変わらず居続けるのかな」と\nおっしゃっていましたね", type: 'psychiatrist' },
                { text: "実際、食品工場に就職してから\nよりその思いは強くなった\n芦沢さんに誘われて\nなあなあの気持ちで入ってしまっていたなあ", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        // Incident Scenarios
        SCENARIO_MURDER: [
            [
                { text: "本当にこういうことが起きた時\n身体が動かなくなるんだと知ったよ", type: 'protagonist' },
                { text: "たしか、たしか\n「やめろ」とか「たすけて」って\n三浦の声が\n空を反響していた気がする", type: 'protagonist' },
                { text: "三浦、とても甲高い声で叫んでた\n僕は何もできなかった\n見ていただけだった", type: 'protagonist' },
                { text: "安嵜さんが前にお話してくれた\n芦澤さんが三浦さんを殺めた瞬間ですね……", type: 'psychiatrist' },
                { text: "大丈夫です、\nそして、安嵜さんを苦しめているのは、\nこの事件に遭遇したことじゃない", type: 'psychiatrist' },
                { text: "ゆっくりとで大丈夫です", type: 'psychiatrist' }
            ]
        ] as TextSegment[][],
        SCENARIO_BICYCLE: [
            [
                { text: "突然、食品工場を辞めてから\n「あいつは何をしてるんだろうな」と話していた\n名城があの日\n自転車で走っているのを見つけた", type: 'protagonist' },
                { text: "名城さんですか？\nこの前もお話いただいていましたね", type: 'psychiatrist' },
                { text: "名城は仕事で使えない奴で\n僕や他の奴が隠れて蹴りを入れていたりしてたら\n気が付いたら辞めてたかな", type: 'protagonist' },
                { text: "自転車はものすごい速さだった\n競輪みたいな速さで異様だった", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        SCENARIO_WILDFIRE: [
            [
                { text: "「我拝師山が燃えさかっている」\nそう職場で聞いて\nみんな静まり返っていた", type: 'protagonist' },
                { text: "「まさか」と思った", type: 'protagonist' },
                { text: "安嵜さんが4回目のカウンセリングの時に言った\n遠藤さんとお会いした翌日に？", type: 'psychiatrist' },
                { text: "そう\n遠藤の、三浦についての\n相談に乗ったつもりだった", type: 'protagonist' },
                { text: "遠藤は三浦が\n「マジで燃やしてやりたい」と\n言い続けていて、まいってしまったって", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        SCENARIO_MURDER_WILDFIRE: [
            [
                { text: "ひどい一日だった\n人殺しがあって\n山が燃えさかったのだから", type: 'protagonist' },
                { text: "安嵜さん、大丈夫です\nゆっくりで大丈夫です", type: 'psychiatrist' },
                { text: "芦沢さんが刃物を持って\n見たことがない顔で三浦を刺していた", type: 'protagonist' },
                { text: "はい", type: 'psychiatrist' },
                { text: "戦争が始まったとすら思った", type: 'protagonist' },
                { text: "結局は同じようなものだったのかもしれない", type: 'protagonist' },
                { text: "歴史にもどこも残らないような戦争だった", type: 'protagonist' },
                { text: "自分には関係ないはずなのだと思っていた\nそう長らく思い込んでいた", type: 'protagonist' },
                { text: "でも同じ時間\n同じ場所に\n遠藤がいた", type: 'protagonist' },
                { text: "だから僕はずっとひっかかることになる\n僕が実は戦争みたいな事件を\n引きおこしたんじゃないかって", type: 'protagonist' },
                { text: "僕は\nただ見ていただけで関係ないんだと\nそう信じていたかった", type: 'protagonist' },
                { text: "安嵜さん、わかりました\nあなたはこの現場を傍観していて\nそのなかで遠藤さんがいたことに気づいたんですね", type: 'psychiatrist' },
                { text: "そう\nでも見なかったことにするつもりだった", type: 'protagonist' },
                { text: "時間が経ち\n事件の内容がわかるたびに\n精神的に削れていくような気持ちになった", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        SCENARIO_MURDER_BICYCLE: [
            [
                { text: "思い出してみれば工場で\n名城をまっさきに詰めていたのは\n芦沢さんだったなって", type: 'protagonist' },
                { text: "安嵜さん、わかりました", type: 'psychiatrist' },
                { text: "芦沢さんと遠藤が付き合ってたのを\n数年前に知っていた", type: 'protagonist' },
                { text: "気が付いたら別れていて\n三浦と付き合うようになったんだと思っていた", type: 'protagonist' },
                { text: "でもだんだん、そうではないと気づいたんですね", type: 'psychiatrist' },
                { text: "うん\n知らないところでいろいろあったんだと", type: 'protagonist' },
                { text: "三浦との付き合いのなかで\n遠藤と三人で会うこともあったが\nこういうとき楽しいだけで\n裏で何が起きていたかなんてわからないよな", type: 'protagonist' },
                { text: "平和な感じだと思い込んでいた", type: 'protagonist' },
                { text: "名城があんなことをするとは思わないし\n芦沢さんがああなるとも思わなかった", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        SCENARIO_BICYCLE_WILDFIRE: [
            [
                { text: "我拝師山が燃えさかったとき\nあとで名城が放火したと知った", type: 'protagonist' },
                { text: "そんな恐ろしいことが起きたんですね……", type: 'psychiatrist' },
                { text: "後でおおまかな動機を知った", type: 'protagonist' },
                { text: "芦沢さんが山に定期的に登っているのを\n知りつけた名城が\nこれまでの怒りをぶちまけるように\n火を放った", type: 'protagonist' },
                { text: "はい", type: 'psychiatrist' },
                { text: "でも芦沢さんは山火事に巻き込まれなかった", type: 'protagonist' },
                { text: "ただ、逆に火を放たれたことで\n芦沢さんが誰かに攻撃されたと思ったんだろうね\n殺されると気づいたら\n殺さないと生き残れないと", type: 'protagonist' },
                { text: "その姿を安嵜さんは見届けたのですね", type: 'psychiatrist' },
                { text: "そう\n俺ともうひとり\n遠藤が見つめていた", type: 'protagonist' },
                { text: "この事件に\n俺たちは関係しないと思い込んでいた\nでも限界があった", type: 'protagonist' },
                { text: "20年以上も\n黙っているのは難しかった", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        // True Ending (Spot A + Spot B)
        SCENARIO_ENDING: [
            [
                { text: "……", type: 'protagonist' },
                { text: "安嵜さん大丈夫ですか？", type: 'psychiatrist' },
                { text: "大丈夫だ、喋れる", type: 'protagonist' },
                { text: "……", type: 'protagonist' },
                { text: "僕は最初なにかのジョークだと思ったのか\n芦沢さんが三浦を刺しているのを\n笑って……ガラケーで写真を撮っていたんだよ", type: 'protagonist' },
                { text: "でもガラケーカメラを向けているうちに\n遠藤が向かい側で\n見ているのに気づいたんだ", type: 'protagonist' },
                { text: "遠藤は少し遠くにいたからはっきりとはわからないが\n言葉に出来ない表情をしていた", type: 'protagonist' },
                { text: "恐ろしい事態が起きているの\n安嵜さんと遠藤さんは見つめていた", type: 'psychiatrist' },
                { text: "そうだな……", type: 'protagonist' }
            ]
        ] as TextSegment[][],
        MESSAGES: {
            HIGH: "鮮明に思い出した！\n\nあの日の夕暮れ、路地裏で見た光景は決して忘れられないものだった。犯人が落としたコインの音が、今でも耳に残っている。そうだ、あれは確かに...",
            MEDIUM: "少しずつ思い出してきた...。\n\n何か重要なことを見落としている気がするが、輪郭は掴めてきた。確か、あの時誰かが叫んでいたはずだ。もう少しで思い出せそうだ。",
            LOW: "まだ記憶が曖昧だ...\n\n霧の中にいるようで、何もかもがぼやけている。ただ、何かが起こったという感覚だけが残っている。もっと集中しなければ...",
        }
    },
    EPISODE_A: {
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
    ENDING_A: {
        TITLE: "2005年6月13日\n安嵜の記憶",
        DESCRIPTION: "全ての記憶が繋がり、真実が明らかになった。\n\n6月13日のあの暴動は、偶然ではなく仕組まれたものだったのだ。\nカメラに残された微かな光が、闇に葬られた真実を照らし出す。",
        CREDITS: "Thank you for playing.",
        SEGMENTS: [
            { text: "僕は止められたんじゃないかと\nずっと思っていたんだ", type: 'protagonist' },
            { text: "遠藤から相談されたとき\n三浦に連絡すればよかったのかとかさ\n名城には工場にいるときにかかわらなければよかったのかとかさ", type: 'protagonist' },
            { text: "そうですね", type: 'psychiatrist' },
            { text: "やっぱり去年に遠藤が亡くなったときに\nこの頃のことを思い出してしまって", type: 'protagonist' },
            { text: "自分の知り合いの一部が事件でばらばらになったのはきついぞ", type: 'protagonist' },
            { text: "でも僕は傍観者で居続けようとしてしまったのだな", type: 'protagonist' },
            { text: "それがきついと思ったわ\n本当に", type: 'protagonist' },
            { text: "未来が少しでも予測さえできればと思ったよ", type: 'protagonist' },
            { text: "そこまで話してくれてありがとうございます。", type: 'psychiatrist' },
            { text: "安嵜さん\nここからはゆっくりとその感情を話していただければ大丈夫です", type: 'psychiatrist' },
            { text: "ゆっくりで、大丈夫です", type: 'psychiatrist' },
            { text: "声を聞かせてください。声を。", type: 'psychiatrist' }
        ] as TextSegment[]
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
        SCENARIO_ANZAKI: [
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
        SPOT_E_ANZAKI_TITLE: "安嵜さん",
        SPOT_E_ANZAKI_DESC: "相談に乗ってくれた人...",
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
    // Scenario A2: Ashida (芦田) - The Perpetrator (加害者/守護者)
    // ============================================================
    PROLOGUE_A2: {
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
    RESULT_A2: {
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
        SCENARIO_ANZAKI: [
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
    EPISODE_A2: {
        SPOT_A_A_TITLE: "俺",
        SPOT_A_A_DESC: "あの日の俺...何をしてしまったんだ",
        SPOT_A_B_TITLE: "遠藤",
        SPOT_A_B_DESC: "守りたかった女",
        SPOT_A_MIURA_TITLE: "三浦",
        SPOT_A_MIURA_DESC: "遠藤を傷つけていた男",
        SPOT_A_WILDFIRE_TITLE: "燃える山",
        SPOT_A_WILDFIRE_DESC: "俺が働いていた我拝師山が燃えた",
        SPOT_A_ANZAKI_TITLE: "安嵜",
        SPOT_A_ANZAKI_DESC: "俺を見ていた傍観者",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING_A2: {
        TITLE: "2005年6月13日\n芦田の記憶",
        DESCRIPTION: "俺は遠藤を守りたかった。\n三浦から救い出したかった。\n\nでも、守る方法を間違えた。\n俺は三浦を殺してしまった。\n\n遠藤は俺に感謝していたのか\nそれとも恐れていたのか。\n\n俺は永遠にこの記憶に囚われることになった。\n守ることと殺すことは違うはずだった。",
        CREDITS: "Thank you for playing.",
    },


    // ============================================================
    // Scenario N: Nashiro (名城) - The Avenger (復讐者)
    // ============================================================
    PROLOGUE_N: {
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
    RESULT_N: {
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
        SCENARIO_ANZAKI: [
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
    EPISODE_N: {
        SPOT_N_A_TITLE: "俺",
        SPOT_N_A_DESC: "あの日、自転車で走っていた俺",
        SPOT_N_B_TITLE: "我拝師山",
        SPOT_N_B_DESC: "俺が燃やした山",
        SPOT_N_MURDER_TITLE: "何かの事件",
        SPOT_N_MURDER_DESC: "誰かが死んだらしい...俺には関係ない",
        SPOT_N_ANZAKI_TITLE: "安嵜",
        SPOT_N_ANZAKI_DESC: "俺を蹴っていた奴",
        SPOT_N_ENDO_TITLE: "あの女",
        SPOT_N_ENDO_DESC: "誰だか知らない...俺には関係ない",
        NOTHING_TITLE: "曖昧な記憶",
        NOTHING_DESC: "何も思い出せなかった..."
    },
    ENDING_N: {
        TITLE: "2005年6月13日\n名城の記憶",
        DESCRIPTION: "俺はずっと傷つけられていた。\n安嵜たちに蹴られ、笑われ、辞めさせられた。\n\n誰も助けてくれなかった。\n誰も俺を見ていなかった。\n\nだから俺は山を燃やした。\n安嵜たちのものを全部燃やしてやりたかった。\n\n俺は永遠にこの記憶に囚われることになった。\n傷つけられた者が傷つける側になった。",
        CREDITS: "Thank you for playing.",
    },

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
                // Anzaki (安嵜) - Watcher
                { text: "安嵜は傍観者でした。\n事件を見ていたのに\n何もしなかった。", type: 'psychiatrist' },
                // Endo (遠藤) - Victim
                { text: "遠藤は被害者でした。\n傷つけられ、助けを求めた。", type: 'psychiatrist' },
                // Ashida (芦田) - Perpetrator
                { text: "芦田は加害者でした。\n守ろうとして、殺した。", type: 'psychiatrist' },
                // Nashiro (名城) - Avenger
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
