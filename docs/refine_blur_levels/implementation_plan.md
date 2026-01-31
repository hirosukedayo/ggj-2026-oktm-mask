# Refine Mask Blur Levels Implementation Plan

## Goal Description
「探している最中（マウス操作中）」は完全にくっきりではなく「少しボケている」状態にし、「思い出した（クリック後）」箇所だけが「くっきり（シャープ）」になるように変更します。

## Proposed Changes

### [MODIFY] [components/MaskCamera/MaskCamera.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/MaskCamera/MaskCamera.tsx)

1.  **Canvas準備の追加**:
    - 現在: `offscreenCanvas` (強ブラー: 20px)
    - 追加: `mildBlurCanvas` (中ブラー: 例 4px)
    - この2つを初期ロード (`useEffect`) で生成しておく。

2.  **描画ロジック (`draw`) の変更**:
    - **レイヤー1: 背景**: `offscreenCanvas` (強ブラー) を全体に描画。
    - **レイヤー2: プレビュー (マウス位置)**:
        - `mildBlurCanvas` (中ブラー) をソースとして使用。
        - マウス位置の楕円マスク (`drawFeatheredOval`) で切り抜いて合成。
    - **レイヤー3: 確定済み (Revealed)**:
        - オリジナル画像 (シャープ) をソースとして使用。
        - `revealedAreas` の楕円マスクで切り抜いて合成。

これにより、マウスで探っているときは「なんとなくわかる（中ブラー）」、クリックして確定すると「はっきりわかる（シャープ）」という段階的な記憶の想起表現になります。

## Verification Plan
1.  ブラウザでゲーム画面を開く。
2.  マウスを動かし、マスク内の映像が「背景よりは鮮明だが、少しボケている」ことを確認。
3.  クリックして個所を確定させる。
4.  確定した個所が「完全にくっきり」することを確認。
