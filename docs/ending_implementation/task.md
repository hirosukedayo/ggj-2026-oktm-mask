# Implement Ending Transition

- [x] 実装計画の作成 <!-- id: 0 -->
- [x] `locales.ts` の更新 <!-- id: 1 -->
    - [x] `ENDING` セクションの追加
    - [x] "真実へ" (Proceed to Truth) ボタンテキストの追加
    - [x] `TITLE_SCREEN`, `PROLOGUE` セクションの追加 (ルート画面対応)
- [x] `app/page.tsx` (ルート画面) の辞書対応 <!-- id: 4 -->
- [x] `GamePage` ロジックの更新 <!-- id: 2 -->
    - [x] `GamePhase` 型に `ending` を追加
    - [x] リザルト画面での分岐追記 (合計スコア6でボタン変更)
    - [x] エンディング画面の実装
- [x] 動作確認 <!-- id: 3 -->
    - [x] 2枚撮影後にリザルト表示
    - [x] スコア6の場合、"真実の記憶へ" ボタン表示確認
    - [x] ボタン押下でエンディング画面遷移確認
    - [x] スコア6未満の場合、リセットボタン表示確認
