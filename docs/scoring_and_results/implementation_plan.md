# Result Screen & Scoring System Implementation Plan

## Goal Description
撮影した2枚の写真に基づいてスコアを計算し、リザルト画面を表示する機能を実装します。
スコアは「どこを切り抜いたか」によって決まり（今回は仮のロジックとして中心点からの距離などで判定）、合計点数によって表示テキストを変化させます。
リザルト画面からは初期画面に戻れるようにします。

## Proposed Changes

### Logic & State (`app/game/page.tsx`)
- **State**:
    - `phase`: `'capturing' | 'result'`
    - `photos`: `Photo[]` (既存拡張: scoreプロパティを追加)
- **Scoring Logic**:
    - 関数 `calculateScore(x, y, width, height)` を実装。
    - 画面中心 (400, 300) に近いほど高得点 (3点)、遠いと低得点 (1点) とするロジックを仮実装。
- **Flow**:
    - 2枚撮影完了時点で `phase` を `'result'` に変更。

### UI Components
- **Result Overlay**:
    - `app/game/page.tsx` 内に直接、または新規コンポーネントとして実装。
    - 撮影写真のサムネイル表示。
    - スコア表示。
    - 結果テキスト表示 (Switch文などで分岐)。
    - 「最初に戻る」ボタン。

### File Changes

#### [MODIFY] [page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- `Photo` インターフェースに `score` を追加。
- `calculateScore` 関数の追加。
- `handleCapture` 内でスコア計算と保存。
- 2枚撮影後のリザルト表示ロジック追加。
- リザルト画面のJSX追加。

## Verification Plan

### Manual Verification
1. `npm run dev` で起動。
2. `/game` にアクセス。
3. 1枚目を撮影 -> 継続。
4. 2枚目を撮影 -> リザルト画面が表示されることを確認。
5. 写真、点数、テキストが表示されていることを確認。
6. 「戻る」ボタンで初期状態 (撮影枚数0) に戻ることを確認。
