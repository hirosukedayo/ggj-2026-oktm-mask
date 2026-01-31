# Refine Mask Effect Implementation Plan

## Goal Description
「写真を撮る」から「思い出す」へのコンテキスト変更に合わせて、視覚効果を調整します。
現在のくっきりとした円形のマスク描画を変更し、以下の特徴を持つ「記憶の想起」表現を実装します。
1.  **形状**: 真円ではなく「楕円形」にする。
2.  **境界**: くっきり切り取るのではなく、境界にグラデーション(ブラー/ぼかし)をかけ、周囲のブラー画像と滑らかに馴染ませる。

## Proposed Changes

### [MODIFY] [components/MaskCamera/MaskCamera.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/MaskCamera/MaskCamera.tsx)
- Canvas描画ロジック (`drawClippedImage` 関数付近) を変更。
- `ellipse` メソッドを使用して楕円を描画 (または `scale` で円を変形)。
- **ぼかしの実装**:
    - `ctx.shadowBlur` や `ctx.filter = 'blur(...)'` は合成モード (`destination-in`) と相性が悪い場合があるため、**放射状グラデーション (Radial Gradient)** をマスクとして使用する方法を採用する。
    - 具体的には、`globalCompositeOperation = 'destination-in'` (または `destination-out` の逆) を使う際に、不透明度 `1.0` から `0.0` へ変化するグラデーション円を描画することで、画像のアルファチャンネルを滑らかに削る。

#### 具体的な描画ステップ
1.  ベースとなる「ブラー画像」を描画 (既存)。
2.  一時的なCanvas、あるいはレイヤー操作で「クリア画像」を用意。
3.  「クリア画像」に対して、記憶の場所 (楕円) だけを切り抜くが、この時 **グラデーションマスク** を使用する。
    - `ctx.createRadialGradient` を使用。
    - 中心は不透明 (Alpha 1)、端に向かって透明 (Alpha 0) になるグラデーション。
4.  これにより、切り抜かれたクリア画像の縁が半透明になり、背景のブラー画像と重なった時に馴染む。

### [MODIFY] [app/game/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- `maskRadius` のプロパティ指定があれば、縦横比などを考慮した値への変更が必要かもしれないが、今回はコンポーネント内で `maskRadius` を基準に楕円比率 (例: 横1.2 : 縦0.8) を適用する形とする。

## Verification Plan

### Manual Verification
1.  ゲーム画面でカーソルを動かす。
2.  マスクの形状が楕円であることを確認。
3.  マスクの縁がぼやけていて、背景のピンボケ画像と滑らかに繋がっていることを確認。
