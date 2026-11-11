import build from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'

// 生成物（main.tsp / ルート定義から作るファイル）は fmt / lint しない。
const ignorePatterns = [
  '**/node_modules/**',
  '**/dist/**',
  '**/*.gen.ts',
  'src/api/routes/index.ts',
  'src/hooks/index.ts',
]

// dist/index.js の最後に足す起動コード（app は Hono アプリの変数名）。
// ポートは環境変数 PORT で変えられる。SIGTERM（`docker stop`）では、処理中のリクエストを
// 終えてから止まる。10 秒たっても終わらなければ打ち切る。
function startServer(app: string) {
  return `
import { serve } from '@hono/node-server'
const server = serve({ fetch: ${app}.fetch, port: Number(process.env.PORT ?? 8787) })
const shutdown = () => {
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 10_000).unref()
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
`
}

export default defineConfig({
  // fmt（oxfmt）と lint（oxlint）の設定。共有パッケージは作らず、アプリごとにここへ直接書く。
  fmt: {
    printWidth: 100,
    singleQuote: true,
    semi: false,
    sortPackageJson: true,
    sortImports: {},
    sortTailwindcss: { stylesheet: './src/style.css', functions: ['cn', 'clsx', 'cva', 'twMerge'] },
    ignorePatterns: [...ignorePatterns, 'api.md'],
  },
  lint: {
    ignorePatterns,
    options: { typeAware: true, typeCheck: true },
  },
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    // 開発: Vite がソースを配信し、それ以外（/api と HTML）を Hono（src/index.tsx）に渡す。
    devServer({ entry: 'src/index.tsx' }),
    // 本番（`vp build`）: src/index.tsx に静的ファイルの配信と起動のコードを足して、dist/index.js に出す。
    // 依存はすべてバンドルするので、実行時に node_modules は要らない。
    build({ staticRoot: './dist', entryContentAfterHooks: [startServer] }),
  ],
  resolve: { tsconfigPaths: true },
  // SPA（`vp build --mode client`）: index.html は無いのでエントリを指定し、
  // src/index.tsx の HTML から参照できるように dist/static へ固定の名前（main.js / main.css）で出す。
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'static/[name].js',
        chunkFileNames: 'static/[name]-[hash].js',
        assetFileNames: 'static/[name].[ext]',
      },
    },
  },
})
