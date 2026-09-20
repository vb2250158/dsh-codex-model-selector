/** Replace only the composer model seat and reuse the official directory. */
import { ModelSelect } from './ModelSelect.tsx'
import { SettingsModelPicker } from './SettingsModelPicker.tsx'
import { cssText } from './ModelSelect.module.css'

export const inject = ['slots', 'sessions', 'modelDirectories']

export function apply(ctx) {
  ctx.slots.inject('settings.model-redirect.picker', () => ctx.slots.register({
    name: 'settings.model-redirect.picker', locale: 'model',
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
