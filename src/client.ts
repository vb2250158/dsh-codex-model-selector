/** Replace only the composer model seat and reuse the official directory. */
import { ModelSelect } from './ModelSelect.tsx'
import { SettingsModelPicker } from './SettingsModelPicker.tsx'
import { cssText } from './ModelSelect.module.css'
import { RecentModels } from './recent-models.ts'
import { recentLocales } from './recent-locales.ts'

export const inject = ['slots', 'sessions', 'modelDirectories', 'locale']

export function apply(ctx) {
  let storage: Storage | undefined
  try { storage = window.localStorage } catch { /* 禁用浏览器存储时仅保留本页选择计数。 */ }
  const recents = new RecentModels(storage)
  ctx.effect(() => () => recents.dispose())
  ctx.effect(() => ctx.locale.register('codex-model-selector', recentLocales))
  const recentText = ctx.locale.bind('codex-model-selector')
  ctx.slots.inject('settings.model-redirect.picker', () => ctx.slots.register({
    name: 'settings.model-redirect.picker', locale: 'model',
    inject: () => ({ recents, recentText }),
  }, SettingsModelPicker))
  ctx.effect(() => {
    const style = document.createElement('style')
    style.dataset.plugin = 'dsh-codex-model-selector'
    style.textContent = cssText
    document.head.append(style)
    return () => style.remove()
  })
  ctx.slots.inject('conversation.input.model', () => ctx.slots.register({
    name: 'conversation.input.model',
    priority: -10,
    locale: 'model',
    inject(sessionId) {
      const directory = ctx.modelDirectories.directoryFor(sessionId)
      const available = ctx.sessions.subagentAddress(sessionId) === undefined
      const speed = () => ctx.slots.entries('conversation.input.right').find(entry => entry.options.id === 'codex-speed' && entry.inject)?.inject(sessionId)
      return {
        recents, recentText,
        available,
        loadSpeed: async () => speed()?.loadSpeed?.() ?? { visible: false, tier: 'standard' },
        setSpeed: async tier => speed()?.setSpeed?.(tier) ?? false,
        directory: directory.store,
        load: () => { if (available) void directory.load().catch(() => {}) },
        select: selection => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false),
      }
    },
  }, ModelSelect))
  ctx.slots.inject('conversation.input.right', () => ctx.slots.register({
    name: 'conversation.input.right', id: 'codex-speed', priority: -10,
  }, () => null))
}
