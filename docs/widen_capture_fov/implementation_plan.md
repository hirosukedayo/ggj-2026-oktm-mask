# Widen Result Image Field of View Implementation Plan

## Issue
リザルト画面の背景が黒いため、プレビュー時と同じ範囲を切り取ると視覚的に狭く感じられる。中心点はそのままで、より広い範囲をリザルト画像として残したい。

## Proposed Changes

### [MODIFY] [components/MaskCamera/MaskCamera.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/MaskCamera/MaskCamera.tsx)

`handleClick` 内の画像生成ロジックを調整し、切り取り範囲とマスクサイズを拡大します。

1.  **拡大率の定義**: `const captureScale = 1.6;` (1.6倍程度広くする)
2.  **`cropWidth`, `cropHeight` の計算**:
    ```typescript
    const captureScale = 1.6;
    const cropWidth = maskRadius * 3 * captureScale;
    const cropHeight = maskRadius * 2 * captureScale;
    ```
3.  **マスク描画時の半径**:
    マスクのグラデーション描画時にも `maskRadius * captureScale` を使用し、フェザーの範囲も広げる。

これにより、プレビューで見ているよりも「周りの風景」が多く含まれた状態でリザルト化され、狭苦しさが解消されます。

## Verification Plan
1.  ゲーム画面で特定の位置をクリックしてキャプチャする。
2.  リザルト画面（またはモーダル）で、キャプチャされた画像がプレビュー時よりも広い範囲を含んでいることを確認する。
