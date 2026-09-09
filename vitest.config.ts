import { defineConfig } from 'vitest/config'
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: { alias: {
    '@deepseek-ai/dsh-client-store': new URL('./tests/store.ts', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
    '@deepseek-ai/dsh-client-ui-primitives': new URL('./tests/primitives.tsx', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
  } },
  test: { include: ['tests/*.spec.tsx'], environment: 'jsdom' },
})
