# react-panda-node

Node.js で動く Hono + React SPA（Panda CSS）。1 つのプロセスが API（`/api/*`）と SPA を配信する。

## 開発

```bash
pnpm install
pnpm --filter react-panda-node dev  # http://localhost:8787
```

## Docker

```bash
pnpm --filter react-panda-node docker:build  # イメージをビルド
pnpm --filter react-panda-node docker:scan   # 脆弱性スキャン
pnpm --filter react-panda-node docker:start  # http://localhost:8787（Ctrl+C で停止）
pnpm --filter react-panda-node docker:clean  # コンテナとイメージを削除
```

ポートは環境変数 `PORT` で変えられる（既定は 8787）。
