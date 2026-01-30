# Game Context Update Implementation Plan (with Localization)

## Goal Description
ゲームのコンテキストを「写真撮影」から「記憶の回想」に変更します。
同時に、将来的なテキスト変更や多言語対応を見越して、テキストを辞書ファイルで管理するようにリファクタリングします。

## Proposed Changes

### [NEW] [utils/locales.ts](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/utils/locales.ts)
- テキスト辞書を定義。現在は日本語のみ実装するが、構造は多言語対応可能にする。
```typescript
export const TEXT = {
  UI: {
    RETICLE_CAPTURE: "RECALL",
    RETICLE_LIMIT: "LIMIT",
    BUTTON_RESET: "もう一度思い出す",
  },
  RESULT: {
    TITLE: "記憶の復元完了",
    SCORE_LABEL: "Clarity",
    TOTAL_SCORE_LABEL: "記憶の同期率",
    MESSAGES: {
      HIGH: "鮮明に思い出した！\n\nあの日の夕暮れ、路地裏で見た光景は決して忘れられないものだった。犯人が落としたコインの音が、今でも耳に残っている。そうだ、あれは確かに...",
      MEDIUM: "少しずつ思い出してきた...。\n\n何か重要なことを見落としている気がするが、輪郭は掴めてきた。確か、あの時誰かが叫んでいたはずだ。もう少しで思い出せそうだ。",
      LOW: "まだ記憶が曖昧だ...\n\n霧の中にいるようで、何もかもがぼやけている。ただ、何かが起こったという感覚だけが残っている。もっと集中しなければ...",
    }
  }
}
```

### [MODIFY] [app/game/game.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/game.module.css)
- `.resultMessage` のスタイルを長文対応に変更:
    - `white-space: pre-wrap;` (改行対応)
    - `text-align: left;` (読みやすくするため)
    - `max-width: 600px;` (一行が長くなりすぎないように)
    - `line-height: 1.6;` (可読性向上)

### [MODIFY] [MaskCamera.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/MaskCamera/MaskCamera.tsx)
- `TEXT.UI.RETICLE_CAPTURE` 等を使用するように変更。

### [MODIFY] [page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- `TEXT.RESULT` 配下のテキストを使用するように変更。
- スコア判定ロジックとメッセージ取得部分で辞書を使用。

## Verification Plan

### Manual Verification
1.  `/game` にアクセスする。
2.  表示されるテキストが意図した通りに変更されているか確認。
    - レチクル: "RECALL"
3.  2回クリックしてリザルト画面を表示。
4.  辞書経由で取得したテキストが正しく表示されるか確認。
    - タイトル: "記憶の復元完了"
    - 同期率、鮮明度などの表記確認。
