# Ending Transition Implementation Plan

## Goal Description
合計スコアが 6 (最高得点) の場合のみ遷移可能な「エンディング」画面を実装します。
リザルト画面で条件を満たした場合、リセットボタンの代わりにエンディングへの遷移ボタンを表示します。

## Proposed Changes

### [MODIFY] [utils/locales.ts](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/utils/locales.ts)
- `UI` に `BUTTON_ENDING`: "真実の記憶へ" を追加。
- `ENDING` セクションを追加し、エンディングメッセージを定義。
- `TITLE_SCREEN` セクションを追加:
    - タイトル、サブタイトル、スタートボタンなどのテキスト。
- `PROLOGUE` セクションを追加:
    - プロローグのストーリーテキストを全て移行。

### [MODIFY] [app/game/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- State `GamePhase` に `'ending'` を追加。
- リザルト画面のボタン分岐処理実装。
- エンディング画面の実装。

### [MODIFY] [app/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/page.tsx)
- ハードコードされたテキスト (タイトル、プロローグなど) を `TEXT` 辞書からの参照に置き換え。

### [MODIFY] [app/game/game.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/game.module.css)
- エンディング画面用のスタイル (`endingOverlay` 等) を追加。

## Verification Plan

### Manual Verification
1.  ゲームで中心を正確に狙い、スコア 3+3 = 6 を出す。
2.  リザルト画面のボタンが "真実の記憶へ" に変わっていることを確認。
3.  ボタンをクリックし、エンディング画面が表示されることを確認。
4.  (比較検証) わざと外してスコアを下げ、リセットボタンのまま変わらないことを確認。
