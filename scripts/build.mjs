import { build } from 'esbuild'
import { transform } from 'lightningcss'
import { readFile, mkdir, writeFile } from 'node:fs/promises'

const result = await build({
  entryPoints: ['src/client.ts'], bundle: true, format: 'cjs', platform: 'browser', jsx: 'automatic', write: false,
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/*'],
  plugins: [{ name: 'css-modules', setup(builder) {
    builder.onLoad({ filter: /\.module\.css$/ }, async args => {
      const result = transform({ filename: args.path, code: await readFile(args.path), cssModules: { pattern: 'codex-selector_[local]' } })
      const classes = Object.fromEntries(Object.entries(result.exports).map(([key, value]) => [key, value.name]))
      return { contents: `export default ${JSON.stringify(classes)}; export const cssText = ${JSON.stringify(result.code.toString())};`, loader: 'js' }
    })
  } }],
})
await mkdir('lib', { recursive: true })
await writeFile('lib/client.js', `window.__ModuleLoader__.load({id:'dsh-codex-model-selector',factory:(require)=>{var module={exports:{}};var exports=module.exports;\n${result.outputFiles[0].text}\nreturn module.exports;}});\n`)
await build({ entryPoints: ['src/index.ts'], outfile: 'lib/index.js', format: 'esm', platform: 'node' })
