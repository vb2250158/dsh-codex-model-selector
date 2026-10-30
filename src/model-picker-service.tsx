/** Shared chooser for independent settings; catalogs and recents keep their existing owners. */
import { useEffect, useMemo, useSyncExternalStore } from 'react'
import type { ModelPickerService, CatalogPickerProps, IndependentPickerProps } from './model-picker-types.js'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import { SettingsModelPicker } from './SettingsModelPicker.tsx'
import type { RecentModels } from './recent-models.ts'
import type { RecentText } from './recent-locales.ts'

interface PickerContext {
  locale: { bind(ns: 'model'): PropsLocale<'model'>['t'] }
  modelDirectories: { directoryFor(id: string): {
    store: { subscribe(listener: () => void): () => void; getSnapshot(): ModelDirectoryState }
    load(): Promise<unknown>
  } }
}

/** Create the public picker face with the selector's shared recent-model store. */
export function createModelPickerService(ctx: PickerContext, recents: RecentModels, recentText: RecentText): ModelPickerService {
  const t = ctx.locale.bind('model')
  function View({ sessionId, current, locked, select, onOpenChange, full = false }: IndependentPickerProps & { full?: boolean }) {
    const directory = useMemo(() => ctx.modelDirectories.directoryFor(sessionId), [sessionId])
    const state = useSyncExternalStore(listener => directory.store.subscribe(listener), () => directory.store.getSnapshot())
    useEffect(() => { void directory.load().catch(() => { /* The directory exposes the catalog failure. */ }) }, [directory])
    return <SettingsModelPicker groups={state.groups} current={current} locked={locked} select={select}
      recents={recents} recentText={recentText} t={t} pickerOnly={!full} dialog={!full} onOpenChange={onOpenChange} status={state.status === 'loading' ? 'loading' : state.error ? 'error' : 'ready'}
      error={state.error} failures={state.failures} load={() => { void directory.load().catch(() => {}) }} />
  }
  function Picker(props: IndependentPickerProps) { return <View {...props} /> }
  function Control(props: IndependentPickerProps) { return <View {...props} full /> }
  function CatalogPicker(props: CatalogPickerProps) {
    return <SettingsModelPicker {...props} recents={recents} recentText={recentText} t={t} pickerOnly />
  }
  return { Picker, Control, CatalogPicker }
}
