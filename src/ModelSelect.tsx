/**
 * ModelSelect: the composer's named model seat (`conversation.input.model`).
 * A compact model card exposes adapter-owned effort stops on a slider.
 * The model and effort captions open their complete selection lists.
 * Data and submission ride the SAME per-session ModelDirectory as the
 * /model popup; exact-model reasoning metadata and the selected effort come
 * from the Host rather than a client-owned vocabulary. A rejected selection
 * announces through the shared transient Toast anchored to the composer
 * card; the in-menu strip with Retry remains the catalog-load surface.
 */
import {
  useDeferredValue, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore,
  type KeyboardEvent, type FocusEvent,
} from 'react'
import clsx from 'clsx'
import type { ModelReasoningEffort, ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import {
  IconCheckOutline16, IconChevronDownOutline14, IconChevronRightOutline14,
  IconWarningOutline16, Toast,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { ModelSelectInjected } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import css from './ModelSelect.module.css'

/** Which pane the dropdown shows: the two-row root or one drilled-in list. */
type Pane = 'root' | 'model'

/** One dynamic effort row; undefined means preserve the provider default. */
interface EffortChoice {
  key: string
  effort: string | undefined
  label: string
}

/**
 * Render the composer model seat.
 * @param props - owner share (locked) + injected face (shared directory
 * store/verbs) + the standard locale seat.
 * @returns the trigger and, while open, the two-level menu.
 */
export function ModelSelect(
  { locked, available, directory, load, select, t, loadSpeed, setSpeed }:
  ModelSelectInjected & { locked: boolean; loadSpeed?: () => Promise<{ visible: boolean; tier: string }>; setSpeed?: (tier: string) => Promise<boolean> } & PropsLocale<'model'>,
) {
  const state = useSyncExternalStore(
    fn => directory.subscribe(fn),
    () => directory.getSnapshot(),
  )
  const [open, setOpen] = useState(false)
  const dragging = useRef(false)
  const [effortDraft, setEffortDraft] = useState<number | null>(null)
  const [pane, setPane] = useState<Pane>('root')
  const [searchQuery, setSearchQuery] = useState('')
  const [speed, updateSpeed] = useState<{ visible: boolean; tier: string } | null>(null)
  const [speedBusy, setSpeedBusy] = useState(false)
  const speedRef = useRef(loadSpeed)
  speedRef.current = loadSpeed
  useEffect(() => {
    if (speedRef.current === undefined) return
    let cancelled = false
    updateSpeed(null)
    void speedRef.current().then(value => { if (!cancelled) updateSpeed(value) }, () => { if (!cancelled) updateSpeed(null) })
    return () => { cancelled = true }
  }, [open, state.current?.provider, state.current?.model])
  // The in-menu error strip serves catalog loads (its Retry re-runs the
  // load); a rejected SELECTION announces through the transient toast
  // instead, so the strip renders only while the latest failure-capable
  // action was a load.
  const lastActionRef = useRef<'load' | 'select'>('load')
  const [toast, setToast] = useState<{ seq: number; text: string } | null>(null)
  const toastSeq = useRef(0)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const modelSearchRef = useRef<HTMLInputElement | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  const choices = useMemo(() => state.groups.flatMap(group =>
    group.models.map(model => ({
      group,
      model,
      selection: {
        provider: group.id,
        model: model.id,
        ...model.reasoning?.defaultEffort === undefined
          ? {}
          : { reasoningEffort: model.reasoning.defaultEffort },
      } satisfies ModelSelection,
    }))), [state.groups])
  const selectedIndex = state.current === null
    ? -1
    : choices.findIndex(c => c.selection.provider === state.current?.provider && c.selection.model === state.current.model)
  const currentChoice = choices[selectedIndex]
  const deferredSearchQuery = useDeferredValue(searchQuery.trim().toLocaleLowerCase())
  const filteredGroups = useMemo(() => {
    if (deferredSearchQuery === '') return state.groups
    return state.groups.flatMap(group => {
      const providerMatches = `${group.id} ${group.name}`.toLocaleLowerCase().includes(deferredSearchQuery)
      const models = providerMatches
        ? group.models
        : group.models.filter(model => `${model.id} ${model.name}`.toLocaleLowerCase().includes(deferredSearchQuery))
      return models.length === 0 ? [] : [{ ...group, models }]
    })
  }, [deferredSearchQuery, state.groups])
  const reasoning = currentChoice?.model.reasoning
  const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort
  const effortLabel = reasoning === undefined
    ? undefined
    : effectiveEffort === undefined
      ? t('effort.providerDefault')
      : reasoning.efforts.find(level => level.id === effectiveEffort)?.name ?? effectiveEffort
  const effortChoices = useMemo<readonly EffortChoice[]>(() => reasoning === undefined
    ? []
    : [
      ...reasoning.defaultEffort === undefined
        ? [{ key: 'provider-default', effort: undefined, label: t('effort.providerDefault') }]
        : [],
      ...reasoning.efforts.map((effort: ModelReasoningEffort) => ({
        key: `effort:${effort.id}`,
        effort: effort.id,
        label: effort.name,
      })),
    ], [reasoning, t])
  const busy = state.status === 'selecting'
  const effortIndex = Math.max(0, effortChoices.findIndex(choice => choice.effort === effectiveEffort))
  const previewEffortLabel = effortDraft === null ? effortLabel : effortChoices[effortDraft]?.label

  const reload = (): void => {
    lastActionRef.current = 'load'
    load()
  }

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: MouseEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOutside)
    return () => { document.removeEventListener('mousedown', closeOutside) }
  }, [open])

  useEffect(() => {
    if (open && pane === 'model') modelSearchRef.current?.focus()
  }, [open, pane])

  if (!available) return null

  const show = (): void => {
    setPane('root')
    setSearchQuery('')
    setOpen(true)
    reload()
  }

  const close = (restoreFocus = false): void => {
    setOpen(false)
    setPane('root')
    if (restoreFocus) queueMicrotask(() => { triggerRef.current?.focus() })
  }

  const moveFocus = (offset: number): void => {
    const items = itemRefs.current.filter(item => item !== null)
    if (items.length === 0) return
    const active = items.findIndex(item => item === document.activeElement)
    const next = (Math.max(active, 0) + offset + items.length) % items.length
    items[next]?.focus()
  }

  const onRootKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.target === modelSearchRef.current) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setPane('root')
      }
      return
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      // Escape backs out of a drilled pane first, then closes.
      if (pane !== 'root') setPane('root')
      else close(true)
      return
    }
    if (!open) return
    if ((event.target as HTMLElement).tagName === 'INPUT') return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(event.key === 'ArrowDown' ? 1 : -1)
    }
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>): void => {
    // Disabling a saving control can blur it without a new focus target.
    if (event.relatedTarget === null || dragging.current) return
    if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return
    close()
  }

  const settleSelection = (accepted: boolean): void => {
    if (accepted) {
      if (rootRef.current !== null) close(true)
      return
    }
    const message = directory.getSnapshot().error
    if (message !== null) {
      toastSeq.current += 1
      setToast({ seq: toastSeq.current, text: t('error.action', { message }) })
    }
  }

  const choose = (selection: ModelSelection): void => {
    if (state.current?.provider === selection.provider && state.current.model === selection.model) {
      close(true)
      return
    }
    lastActionRef.current = 'select'
    void select(selection).then(settleSelection)
  }

  const chooseEffort = (effort: string | undefined, keepOpen = false): void => {
    if (state.current === null) return
    if (effectiveEffort === effort) {
      if (!keepOpen) close(true)
      return
    }
    const selection: ModelSelection = {
      provider: state.current.provider,
      model: state.current.model,
      ...effort === undefined ? {} : { reasoningEffort: effort },
    }
    lastActionRef.current = 'select'
    void select(selection).then(accepted => {
      if (!accepted || !keepOpen) settleSelection(accepted)
    })
  }

  const waiting = state.current === null && state.status === 'loading'
  const modelLabel = waiting
    ? t('trigger.loading')
    : currentChoice?.model.name
      ?? (state.current === null ? t('trigger.fallback') : `${state.current.provider}/${state.current.model}`)
  const triggerLabel = effortLabel === undefined ? modelLabel : `${modelLabel} · ${effortLabel}`
  const triggerAria = waiting
    ? t('trigger.loading')
    : state.current === null
      ? t('trigger.selectAria')
      : effortLabel === undefined
        ? t('trigger.aria', { model: modelLabel })
        : t('trigger.ariaEffort', { model: modelLabel, effort: effortLabel })
  itemRefs.current = []
  let itemIndex = 0
  const itemRef = () => {
    const at = itemIndex++
    return (node: HTMLButtonElement | null) => { itemRefs.current[at] = node }
  }

  return (
    <div ref={rootRef} className={css.root} onKeyDown={onRootKeyDown} onBlur={onBlur}>
      <button
        ref={triggerRef}
        type="button"
        className={css.trigger}
        aria-label={triggerAria}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `${id}-menu` : undefined}
        title={speed?.visible && speed.tier === 'fast' ? `${triggerLabel} · 快速模式` : triggerLabel}
        disabled={locked}
        onClick={() => {
          if (open) {
            close()
          } else {
            show()
          }
        }}
      >
        {speed?.visible && speed.tier === 'fast' && <svg className={css.triggerFast} data-fast-mode="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-12h-7V2Z" /></svg>}
        <span className={css.triggerLabel}>{modelLabel}</span>
        {effortLabel !== undefined && <span className={css.triggerEffort}>{effortLabel}</span>}
        <IconChevronDownOutline14 className={clsx(css.chevron, open && css.chevronOpen)} />
      </button>

      {open && (
        <div
          id={`${id}-menu`}
          className={css.menu}
          role="menu"
          aria-label={t('menu.aria')}
          aria-busy={state.status === 'loading' || busy}
        >
          {pane === 'root' && (
            <div className={css.effortCard}>
              <div className={css.cardHeading}>
                <button type="button" className={css.fastButton} disabled={!speed?.visible || speedBusy || locked} aria-label={speed?.visible ? `快速模式：${speed.tier === 'fast' ? '已开启' : '未开启'}` : '当前模型不支持快速模式'} aria-pressed={speed?.tier === 'fast'} title={speed?.visible ? '快速模式（消耗更多用量）' : '当前模型不支持快速模式'} onClick={() => {
                  if (!speed?.visible || !setSpeed) return
                  setSpeedBusy(true)
                  const tier = speed.tier === 'fast' ? 'standard' : 'fast'
                  void setSpeed(tier).then(accepted => {
                    if (accepted) updateSpeed({ visible: true, tier })
                    else { toastSeq.current += 1; setToast({ seq: toastSeq.current, text: '快速模式切换失败，请重试' }) }
                  }).finally(() => setSpeedBusy(false))
                }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z" /></svg></button>
                <button ref={itemRef()} type="button" role="menuitem" aria-label={`${t('menu.model')} ${modelLabel}`} className={css.modelHeading} onClick={() => { setPane('model') }}>
                  {reasoning !== undefined && <span className={css.effortCaption}>{previewEffortLabel}<IconChevronRightOutline14 /></span>}
                  <span className={css.modelCaption}>{modelLabel}<IconChevronRightOutline14 /></span>
                </button>
                {reasoning !== undefined && <button type="button" className={css.resetEffort} aria-label={t('effort.providerDefault')} title={t('effort.providerDefault')} disabled={busy || locked} onClick={() => { chooseEffort(reasoning.defaultEffort, true) }}>↺</button>}
              </div>
              {reasoning !== undefined && (
                <div className={css.effortTrack}>
                  <div className={css.effortFill} style={{ width: `${effortChoices.length <= 1 ? 0 : (effortDraft ?? effortIndex) / (effortChoices.length - 1) * 100}%` }} />
                  <div className={css.effortStops} aria-hidden="true">{effortChoices.map(choice => <span key={choice.key} />)}</div>
                  <input type="range" aria-label={t('menu.effort')} aria-valuetext={previewEffortLabel} min={0} max={Math.max(0, effortChoices.length - 1)} step={1} value={effortDraft ?? effortIndex} disabled={busy || locked || effortChoices.length < 2}
                    onPointerDown={event => { dragging.current = true; event.currentTarget.setPointerCapture?.(event.pointerId) }}
                    onPointerUp={event => {
                      if (!dragging.current) return
                      dragging.current = false
                      setEffortDraft(null)
                      chooseEffort(effortChoices[Number(event.currentTarget.value)]?.effort, true)
                    }}
                    onPointerCancel={() => { dragging.current = false; setEffortDraft(null) }}
                    onChange={event => {
                      const index = Number(event.target.value)
                      if (dragging.current) setEffortDraft(index)
                      else chooseEffort(effortChoices[index]?.effort, true)
                    }} />
                </div>
              )}
            </div>
          )}

          {pane === 'model' && (
            <>
              {state.status === 'loading' && (
                <div className={css.status}>{t('status.loading')}</div>
              )}
              {state.error !== null && lastActionRef.current === 'load' && (
                <div className={css.error}>
                  <span>{t('error.action', { message: state.error })}</span>
                  <button type="button" className={css.retry} onClick={reload}>{t('retry')}</button>
                </div>
              )}
              {state.failures.map(failure => (
                <div className={css.warning} key={failure.id}>
                  <span>{t('warning.groupLoad', { name: failure.name, message: failure.message })}</span>
                  <button type="button" className={css.retry} onClick={reload}>{t('retry')}</button>
                </div>
              ))}
              <input
                ref={modelSearchRef}
                className={css.search}
                type="search"
                value={searchQuery}
                placeholder="搜索模型"
                aria-label="搜索模型"
                disabled={busy}
                onChange={(event) => { setSearchQuery(event.currentTarget.value) }}
              />
              <div className={clsx(css.groups, 'scrollable')}>
                {filteredGroups.map((group) => {
                  const headingId = `${id}-${group.id}`
                  return (
                    <section role="group" aria-labelledby={headingId} className={css.group} key={group.id}>
                      <div className={css.groupTitle} id={headingId}>{group.name}</div>
                      {group.models.map((model) => {
                        const selected = state.current?.provider === group.id && state.current.model === model.id
                        return (
                          <button
                            ref={itemRef()}
                            type="button"
                            role="menuitemradio"
                            aria-checked={selected}
                            className={clsx(css.option, selected && css.selected)}
                            key={model.id}
                            title={model.name}
                            disabled={busy}
                            onClick={() => { choose({ provider: group.id, model: model.id }) }}
                          >
                            <span className={css.optionCopy}>
                              <span className={css.modelName}>{model.name}</span>
                            </span>
                            <span className={css.check}>
                              {selected ? <IconCheckOutline16 /> : null}
                            </span>
                          </button>
                        )
                      })}
                    </section>
                  )
                })}
              </div>
              {state.status === 'ready' && choices.length === 0 && (
                <div className={css.empty}>{t('empty.models')}</div>
              )}
              {state.status === 'ready' && choices.length > 0 && filteredGroups.length === 0 && (
                <div className={css.empty} role="status">没有匹配的模型。</div>
              )}
            </>
          )}


        </div>
      )}
      {toast !== null && (
        <Toast
          key={toast.seq}
          text={toast.text}
          icon={<IconWarningOutline16 />}
          anchor={rootRef.current?.closest<HTMLElement>('[data-composer-card]') ?? null}
          onDone={() => { setToast(null) }}
        />
      )}
    </div>
  )
}
