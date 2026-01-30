# Game Image Update Implementation Plan

## Goal Description
ゲームで使用するメイン画像を `incident_02.png` から `Okutama_Bteam_mock.png` に変更します。
`public/Okutama_Bteam_mock.png` に存在するファイルを `public/images/` に移動し、コードの参照を更新します。

## Proposed Changes

### File Operations
- Move `public/Okutama_Bteam_mock.png` to `public/images/Okutama_Bteam_mock.png`

### [MODIFY] [utils/locales.ts](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/utils/locales.ts)
- `PROLOGUE` テキストを更新:
    - より詩的で、記憶を辿ろうとする内省的な文言に変更。
    - 例: "霧の向こうに、置き忘れた景色がある..." 等。
- `RESULT` から `SCORE_LABEL`, `TOTAL_SCORE_LABEL` を削除 (もしくは使用しないように変更)。

### [MODIFY] [app/game/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- `MaskCamera` の `imageSrc` プロパティを `/images/Okutama_Bteam_mock.png` に更新。
- リザルト画面からスコアの数値表示を削除。
    - 写真のみを表示し、テキストで結果を伝える形にする。

## Verification Plan

### Manual Verification
1.  `/game` にアクセスする。
2.  背景画像とレンズ内の画像が新しい `Okutama_Bteam_mock.png` になっていることを確認。
