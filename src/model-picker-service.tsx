/** Shared chooser for independent settings; catalogs and recents keep their existing owners. */
import { useEffect, useMemo, useSyncExternalStore } from 'react'
import type { ComponentType } from 'react'
import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import { SettingsModelPicker } from './SettingsModelPicker.tsx'
import type { RecentModels } from './recent-models.ts'
import type { RecentText } from './recent-locales.ts'

/** Independent selection never invokes the session's selectModel operation. */
export interface IndependentPickerProps {
  sessionId: string
  current: ModelSelection | null
  locked: boolean
  select: (selection: ModelSelection) => void
}

interface PickerContext {
  locale: { bind(ns: 'model'): PropsLocale<'model'>['t'] }
  modelDirectories: { directoryFor(id: string): {
    store: { subscribe(listener: () => void): () => void; getSnapshot(): ModelDirectoryState }
    load(): Promise<unknown>
  } }
}

/** Create the public picker face with the selector's shared recent-model store. */
export function createModelPickerService(ctx: PickerContext, recents: RecentModels, recentText: RecentText): { Picker: ComponentType<IndependentPickerProps> } {
  const t = ctx.locale.bind('model')
  function Picker({ sessionId, current, locked, select }: IndependentPickerProps) {
    const directory = useMemo(() => ctx.modelDirectories.directoryFor(sessionId), [sessionId])
    const state = useSyncExternalStore(listener => directory.store.subscribe(listener), () => directory.store.getSnapshot())
    useEffect(() => { void directory.load().catch(() => { /* The directory exposes the catalog failure. */ }) }, [directory])
    return <SettingsModelPicker groups={state.groups} current={current} locked={locked} select={select}
      recents={recents} recentText={recentText} t={t} embedded status={state.status === 'loading' ? 'loading' : state.error ? 'error' : 'ready'}
      error={state.error} failures={state.failures} load={() => { void directory.load().catch(() => {}) }} />
  }
  return { Picker }
}
