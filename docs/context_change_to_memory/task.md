# Update Game Context to Memory Recall

- [x] 実装計画の作成 (多言語対応含む) <!-- id: 0 -->
- [x] 辞書ファイルの作成 (`app/locales.ts`) <!-- id: 4 -->
- [x] `MaskCamera` コンポーネントの更新 (辞書使用) <!-- id: 1 -->
    - [x] レチクルのテキスト "CAPTURE" を "RECALL" に変更
- [x] `GamePage` (リザルト画面) の更新 <!-- id: 2 -->
    - [x] "撮影終了" -> "記憶の復元完了"
    - [x] リザルトメッセージの更新 ("スクープ" -> "重要な記憶", "記事" -> "手がかり" 等)
    - [x] "もう一度挑戦する" -> "もう一度思い出す"
    - [x] "Score" 表記を "Clarity" (鮮明度) 等に変更
- [x] 変更の確認 <!-- id: 3 -->
    - [x] Browser Subagent にて文言とフローを確認済み
