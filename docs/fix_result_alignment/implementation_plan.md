# Fix Result Image Alignment Implementation Plan

## Issue
リザルト画面（`onCapture` で生成された画像）が、プレビューで見ている場所と大きくズレている。
これは `handleClick` 内で画像切り出しを行う際、キャンバス上の表示座標 (`px`) をそのまま画像のオリジナル解像度の座標 (`sx`, `sy`) として使用してしまっているため。
(例: 画面幅960px, 画像元幅1920pxの場合、画面上のx=100は 画像上のx=200だが、そのままx=100として切り出しているためズレる)

## Proposed Changes

### [MODIFY] [components/MaskCamera/MaskCamera.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/MaskCamera/MaskCamera.tsx)

`handleClick` 関数内の `drawImage` ロジックを修正します。

**修正方針**:
1.  画像のスケール比率を計算する。
    `scaleX = img.naturalWidth / width`
    `scaleY = img.naturalHeight / height`
2.  切り出し元の座標 (`sx`, `sy`, `sWidth`, `sHeight`) にスケールを適用する。
    `sx = (displayX - cropW/2) * scaleX`
    `sWidth = cropW * scaleX`
    ...
3.  `drawImage` (9引数) に修正後の座標を渡す。

```typescript
      // Calculate scaling factors
      const scaleX = imgRef.current.naturalWidth / width;
      const scaleY = imgRef.current.naturalHeight / height;

      // Draw image section
      // Source Coords (Mapped to Natural Image Size)
      const sx = (mousePos.x - cropWidth / 2) * scaleX;
      const sy = (mousePos.y - cropHeight / 2) * scaleY;
      const sWidth = cropWidth * scaleX;
      const sHeight = cropHeight * scaleY;

      cCtx.drawImage(imgRef.current, sx, sy, sWidth, sHeight, 0, 0, cropWidth, cropHeight);
```

## Verification Plan
1.  ゲーム画面で特定の目印（例：画像の端や特徴的なオブジェクト）に合わせてクリックする。
2.  生成されたリザルト画像が、目印通りに切り取られていることを確認する。
