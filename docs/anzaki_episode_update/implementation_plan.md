# 実装計画: 安嵜プロローグの更新

## 概要
ユーザーの要望に従い、安嵜（Anzaki）シナリオのプロローグテキストを更新する。また、心理描写を強化するためにテキストの一部を斜体（Italic）で表示できるようにする。

## 変更内容

### 共通ユーティリティ
#### [MODIFY] [locales.ts](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/utils/locales.ts)
- `TextSegment` インターフェースに optional な `style` プロパティを追加する。
- これにより、ロケールファイル内でスタイル指定が可能になる。

### 日本語ロケールデータ
#### [MODIFY] [locales_ja.ts](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/utils/locales_ja.ts)
- `PROLOGUE_A` の `SEGMENTS` を新しいテキストに置き換える。
- 該当するセグメントに `style: { fontStyle: 'italic' }` を追加する。

## 検証計画
### 自動テスト
- 現状、UIの見た目に関する自動テストは存在しないため、ビルドが通ること (`npm run build` 相当) を確認する。

### 手動検証
- タイトル画面から「安嵜」のプロローグを開始し、テキストが変更されていること、および斜体になっていることを確認する（※Userによる確認）。
