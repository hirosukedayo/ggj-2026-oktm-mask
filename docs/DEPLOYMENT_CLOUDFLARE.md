# Cloudflare Pages デプロイ手順

このプロジェクトは静的エクスポート (`output: 'export'`) モードのNext.jsアプリケーションとして設定されています。
Cloudflare Pagesへのデプロイは非常に簡単で、基本的に無料で維持できます。

## 手順

1.  **Cloudflare Dashboard** にログインします。
2.  **Pages** セクションへ移動し、「**Gitに接続**」を選択します。
3.  このリポジトリ (`github.com/hirosukedayo/ggj-2026-oktm-mask`) を選択します。
4.  **ビルド設定**で以下を選択/入力します：

| 設定項目 | 値 |
| :--- | :--- |
| **フレームワーク プリセット** | `Next.js (Static HTML Export)` |
| **ビルド コマンド** | `npm run build` |
| **ビルド出力ディレクトリ** | `out` |

5.  「**保存してデプロイ**」をクリックします。

以上で、`main` ブランチへのプッシュごとに自動的にデプロイが行われます。
`setup_game_jam_project` などのドキュメントフォルダはビルドには影響しません。
