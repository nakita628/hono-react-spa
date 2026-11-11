import { cloudflare } from '@cloudflare/vite-plugin'
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
  '.cloudflare/**',
  'src/styled-system/**',
]

export default defineConfig({
  // fmt（oxfmt）と lint（oxlint）の設定。共有パッケージは作らず、アプリごとにここへ直接書く。
  fmt: {
    printWidth: 100,
    singleQuote: true,
    semi: false,
    sortPackageJson: true,
    sortImports: {},
    ignorePatterns: [...ignorePatterns, 'api.md'],
  },
  lint: {
    ignorePatterns,
    options: { typeAware: true, typeCheck: true },
  },
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), cloudflare()],
  resolve: { tsconfigPaths: true },
})
