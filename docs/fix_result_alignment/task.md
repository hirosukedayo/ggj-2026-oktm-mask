# Fix Result Image Alignment

- [x] 実装計画の作成 <!-- id: 0 -->
- [x] `MaskCamera` の `handleClick` ロジック修正 <!-- id: 1 -->
    - [x] 座標変換 (Display -> Natural) を正しく行うか、描画済みCanvasから切り出す方式に変更する。
    - [x] 9引数の `drawImage` を使用する場合は、ソース座標を `img.naturalWidth / width` でスケールする。
- [x] 動作確認 <!-- id: 3 -->
