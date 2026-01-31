# Adjust Result Image Aspect Ratio Implementation Plan

## Issue
リザルト画面で表示される「思い出した画像」の端が切れている。
これは、キャプチャ画像が横長の楕円（比率 1.5 : 1）であるのに対し、表示側のコンテナ（`.photoCard` またはその中の `img`）が正方形や異なる比率を想定したスタイルになっている、あるいは `object-fit: cover` で強制的にトリミングされているためと考えられる。

## Proposed Changes

### [MODIFY] [app/game/game.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/game.module.css)
- `.photoCard` のサイズ指定を確認。
- `img` タグの `object-fit` プロパティを `contain` に変更するか、幅・高さを自動 (`auto`) にして比率を維持させる。
- もしくは、キャプチャのアスペクト比 (3:2 = 1.5:1) に合わせてコンテナのサイズを調整する。

**具体的なスタイルの変更案:**
```css
.photoCard img {
    width: 100%;
    height: auto; /* 高さを自動にして比率を維持 */
    object-fit: contain; /* コンテナ内に全て収める */
    border-radius: 8px; /* 角丸は維持 */
}
```

## Verification Plan
1.  ゲームをプレイし、横長の楕円型にキャプチャを行う。
2.  リザルト画面で、キャプチャした楕円の左右が切れずに全て表示されていることを確認する。
