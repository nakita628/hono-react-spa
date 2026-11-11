import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'react-tailwind',
    compatibilityDate: '2026-11-10',
    compatibilityFlags: ['nodejs_compat'],
    entrypoint: 'src/index.ts',
    assets: {
      notFoundHandling: 'single-page-application',
    },
  },
})
