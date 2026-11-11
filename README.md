# hono-react-spa

Hono の API と React の SPA を 1 つのアプリで動かすサンプル集。

| アプリ | 実行環境 | CSS |
| --- | --- | --- |
| [`react-tailwind`](apps/react-tailwind) | Cloudflare Workers | Tailwind CSS |
| [`react-panda`](apps/react-panda) | Cloudflare Workers | Panda CSS |
| [`react-tailwind-node`](apps/react-tailwind-node) | Node.js（Docker） | Tailwind CSS |
| [`react-panda-node`](apps/react-panda-node) | Node.js（Docker） | Panda CSS |

```bash
pnpm install
pnpm build   # 全アプリをビルド
pnpm check   # 全アプリを fmt / lint / 型チェック
```
