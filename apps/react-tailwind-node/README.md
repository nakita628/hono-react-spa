# react-tailwind-node

Node.js で動く Hono + React SPA（Tailwind CSS）。1 つのプロセスが API（`/api/*`）と SPA を配信する。

## 開発

```bash
pnpm install
pnpm --filter react-tailwind-node dev  # http://localhost:8787
```

## Docker

```bash
pnpm --filter react-tailwind-node docker:build  # イメージをビルド
pnpm --filter react-tailwind-node docker:scan   # 脆弱性スキャン
pnpm --filter react-tailwind-node docker:start  # http://localhost:8787（Ctrl+C で停止）
pnpm --filter react-tailwind-node docker:clean  # コンテナとイメージを削除
```

ポートは環境変数 `PORT` で変えられる（既定は 8787）。
