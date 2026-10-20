import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'
const harnessRoot = process.env.DSH_HARNESS_ROOT
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: { alias: {
    ...(harnessRoot ? { '@deepseek-ai/cordis': resolve(harnessRoot, 'vendor/cordis/lib/index.js') } : {}),
    '@deepseek-ai/dsh-client-store': new URL('./tests/store.ts', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
    '@deepseek-ai/dsh-client-ui-primitives': new URL('./tests/primitives.tsx', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
  } },
  test: { include: ['tests/*.spec.tsx'], environment: 'jsdom' },
})
