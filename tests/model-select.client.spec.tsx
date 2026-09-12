// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { ComponentProps } from 'react'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import { ModelSelect } from '../src/ModelSelect.tsx'
import { zh } from './fixtures/model-locales.ts'
import { zh as commonZh } from './fixtures/common-zh.ts'

// The seat's key domain is model ∪ common; the stub mirrors the real lookup
// chain: package dictionary, then common vocabulary, then the key.
const t: ComponentProps<typeof ModelSelect>['t'] = (key, params) => {
  const template = (zh as Record<string, string>)[key]
    ?? (commonZh as Record<string, string>)[key]
    ?? key
  return params === undefined
    ? template
    : template.replace(/\{(\w+)\}/g, (match, name: string) => name in params ? String(params[name]) : match)
}

const reasoning = {
  efforts: [
    { id: 'off', name: 'Off' },
    { id: 'high', name: 'High' },
    { id: 'max', name: 'Max', description: 'Largest budget' },
  ],
  defaultEffort: 'high',
}

function state(overrides: Partial<ModelDirectoryState> = {}): ModelDirectoryState {
  return {
    current: { provider: 'deepseek-official', model: 'deepseek-v4-flash' },
    routable: true,
    groups: [{
      id: 'deepseek-official',
      name: 'DeepSeek',
      models: [{
        id: 'deepseek-v4-flash',
        name: 'DeepSeek-V4-Flash',
        description: 'Fast catalog description',
        reasoning,
      }],
    }],
    failures: [],
    status: 'ready',
    error: null,
    ...overrides,
  }
}

afterEach(cleanup)

describe('ModelSelect reasoning effort', () => {
  it('shows a filled lightning before the model when the saved fast tier is active', async () => {
    const directory = createSnapshotStore<ModelDirectoryState>(state())
    render(<ModelSelect locked={false} available directory={directory} load={vi.fn()} select={vi.fn()} t={t} loadSpeed={async () => ({ visible: true, tier: 'fast' })} />)
    const trigger = screen.getByRole('button', { name: /选择模型/ })
    await waitFor(() => expect(trigger.querySelector('[data-fast-mode="true"]')).toBeTruthy())
    expect(trigger.firstElementChild?.tagName.toLowerCase()).toBe('svg')
    expect(trigger.textContent).toContain('DeepSeek-V4-Flash')
    expect(trigger.textContent).toContain('High')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('commits a drag only on release and survives the saving control blur', async () => {
    const directory = createSnapshotStore<ModelDirectoryState>(state())
    const select = vi.fn(async (selection: ModelSelection) => {
      directory.set(state({ current: selection, status: 'selecting' }))
      return true
    })
    render(<ModelSelect locked={false} available directory={directory} load={vi.fn()} select={select} t={t} />)
    fireEvent.click(screen.getByRole('button', { name: /选择模型/ }))
    const slider = screen.getByRole('slider')
    fireEvent.pointerDown(slider)
    fireEvent.change(slider, { target: { value: '0' } })
    expect(screen.getByRole('menuitem', { name: /模型/ }).textContent).toContain('Off')
    expect(slider.getAttribute('aria-valuetext')).toBe('Off')
    fireEvent.change(slider, { target: { value: '2' } })
    expect(screen.getByRole('menuitem', { name: /模型/ }).textContent).toContain('Max')
    expect(slider.getAttribute('aria-valuetext')).toBe('Max')
    expect(select).not.toHaveBeenCalled()
    fireEvent.pointerUp(slider)
    fireEvent.blur(slider, { relatedTarget: null })
    await waitFor(() => expect(select).toHaveBeenCalledTimes(1))
    expect(select).toHaveBeenCalledWith({ provider: 'deepseek-official', model: 'deepseek-v4-flash', reasoningEffort: 'max' })
    expect(screen.getByRole('menu')).toBeTruthy()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('keeps model and effort in the trigger and uses the fast-tier provider when available', async () => {
    const directory = createSnapshotStore<ModelDirectoryState>(state())
    const setSpeed = vi.fn().mockResolvedValue(true)
    render(<ModelSelect locked={false} available directory={directory} load={vi.fn()} select={vi.fn()} t={t} loadSpeed={async () => ({ visible: true, tier: 'standard' })} setSpeed={setSpeed} />)
    const trigger = screen.getByRole('button', { name: /选择模型/ })
    expect(trigger.textContent).toContain('DeepSeek-V4-Flash')
    expect(trigger.textContent).toContain('High')
    fireEvent.click(trigger)
    const fast = await screen.findByRole('button', { name: '快速模式：未开启' })
    expect(fast.querySelector('svg path')).toBeTruthy()
    fireEvent.click(fast)
    await waitFor(() => expect(setSpeed).toHaveBeenCalledWith('fast'))
    expect(await screen.findByRole('button', { name: '快速模式：已开启' })).toBeTruthy()
  })

  it('selects advertised slider stops and resets to the model default without closing the card', async () => {
    const directory = createSnapshotStore<ModelDirectoryState>(state())
    const select = vi.fn(async (selection: ModelSelection) => {
      directory.set(state({ current: selection }))
      return true
    })
    render(<ModelSelect locked={false} available directory={directory} load={vi.fn()} select={select} t={t} />)
    fireEvent.click(screen.getByRole('button', { name: /选择模型/ }))
    const slider = screen.getByRole('slider', { name: '推理等级' })
    expect(slider.getAttribute('max')).toBe('2')
    fireEvent.change(slider, { target: { value: '2' } })
    await waitFor(() => { expect(slider.getAttribute('aria-valuetext')).toBe('Max') })
    expect(screen.getByRole('menu')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Default' }))
    await waitFor(() => { expect(slider.getAttribute('aria-valuetext')).toBe('High') })
    expect(select).toHaveBeenLastCalledWith({ provider: 'deepseek-official', model: 'deepseek-v4-flash', reasoningEffort: 'high' })
  })

  it.each(['High', 'DeepSeek-V4-Flash'])('opens models from either heading line: %s', label => {
    const directory = createSnapshotStore<ModelDirectoryState>(state())
    render(<ModelSelect locked={false} available directory={directory} load={vi.fn()} select={vi.fn()} t={t} />)
    fireEvent.click(screen.getByRole('button', { name: /选择模型/ }))
    const heading = screen.getByRole('menuitem', { name: /模型/ })
    fireEvent.click(Array.from(heading.querySelectorAll('span')).find(span => span.textContent === label)!)
    expect(screen.getByRole('menuitemradio', { name: 'DeepSeek-V4-Flash' })).toBeTruthy()
    expect(screen.queryByRole('menuitemradio', { name: 'Max' })).toBeNull()
  })

  it('offers provider default only when the adapter does not configure a model default', () => {
    const directory = createSnapshotStore(state({
      groups: [{
        id: 'provider',
        name: 'Provider',
        models: [{
          id: 'model',
          name: 'Model',
          reasoning: { efforts: [{ id: 'standard', name: 'Standard' }] },
        }],
      }],
      current: { provider: 'provider', model: 'model' },
    }))
    render(<ModelSelect
      locked={false}
      available
      directory={directory}
      load={vi.fn()}
      select={vi.fn().mockResolvedValue(true)}
      t={t}
    />)

    fireEvent.click(screen.getByRole('button', {
      name: '选择模型，当前 Model，推理等级 Default',
    }))
    expect(screen.getByRole('slider').getAttribute('max')).toBe('1')
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toBe('Default')
  })

  it('shows the durable model id when the catalog has no matching display name', () => {
    const directory = createSnapshotStore(state({
      current: { provider: 'deepseek-official', model: 'removed-model' },
    }))
    const select = vi.fn().mockResolvedValue(true)
    render(<ModelSelect
      locked={false}
      available
      directory={directory}
      load={vi.fn()}
      select={select}
      t={t}
    />)

    const trigger = screen.getByRole('button', { name: '选择模型，当前 deepseek-official/removed-model' })
    expect(trigger.textContent).toContain('deepseek-official/removed-model')
    fireEvent.click(trigger)
    expect(screen.queryByRole('menuitem', { name: /推理等级/ })).toBeNull()
    fireEvent.click(screen.getByRole('menuitem', { name: /模型/ }))
    expect(screen.queryByRole('menuitemradio', { name: 'removed-model' })).toBeNull()
    expect(screen.getByRole('menuitemradio', { name: 'DeepSeek-V4-Flash' })).toBeTruthy()
    expect(screen.queryByText('Fast catalog description')).toBeNull()
  })

  it('filters loaded provider groups by model or provider name', () => {
    const directory = createSnapshotStore(state({
      groups: [{
        id: 'openai',
        name: 'OpenAI',
        models: [{ id: 'gpt-5-6-terra', name: 'GPT-5.6-Terra' }],
      }, {
        id: 'grok',
        name: 'Grok',
        models: [{ id: 'grok-4', name: 'Grok 4' }],
      }],
    }))
    render(<ModelSelect
      locked={false}
      available
      directory={directory}
      load={vi.fn()}
      select={vi.fn().mockResolvedValue(true)}
      t={t}
    />)

    fireEvent.click(screen.getByRole('button', { name: /选择模型/ }))
    fireEvent.click(screen.getByRole('menuitem', { name: /模型/ }))
    const search = screen.getByRole('searchbox', { name: '搜索模型' })
    expect(document.activeElement).toBe(search)
    fireEvent.change(search, { target: { value: 'terra' } })
    expect(screen.getByRole('menuitemradio', { name: 'GPT-5.6-Terra' })).toBeTruthy()
    expect(screen.queryByRole('menuitemradio', { name: 'Grok 4' })).toBeNull()

    fireEvent.change(search, { target: { value: 'grok' } })
    expect(screen.getByRole('menuitemradio', { name: 'Grok 4' })).toBeTruthy()
    expect(screen.queryByRole('menuitemradio', { name: 'GPT-5.6-Terra' })).toBeNull()

    fireEvent.change(search, { target: { value: 'missing' } })
    expect(screen.getByRole('status').textContent).toBe('没有匹配的模型。')
  })

  it('shows loading until the catalog and Session projection are both ready', async () => {
    const directory = createSnapshotStore<ModelDirectoryState>(state({
      current: null,
      routable: null,
      groups: [],
      status: 'loading',
    }))
    render(<ModelSelect
      locked={false}
      available
      directory={directory}
      load={vi.fn()}
      select={vi.fn().mockResolvedValue(true)}
      t={t}
    />)

    expect(screen.getByRole('button', { name: '正在加载模型…' }).textContent)
      .toContain('正在加载模型…')
    directory.set(state())
    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: '选择模型，当前 DeepSeek-V4-Flash，推理等级 High',
      })).toBeTruthy()
    })
  })

  it('announces a rejected selection as a transient toast and keeps the in-menu strip for loads', async () => {
    const groups = [{
      id: 'deepseek-official',
      name: 'DeepSeek',
      models: [
        { id: 'deepseek-v4-flash', name: 'DeepSeek-V4-Flash', reasoning },
        { id: 'deepseek-v4-pro', name: 'DeepSeek-V4-Pro' },
      ],
    }]
    const directory = createSnapshotStore<ModelDirectoryState>(state({ groups }))
    const select = vi.fn(async () => {
      directory.set(state({ groups, status: 'error', error: 'session/model-unavailable: session already contains images' }))
      return false
    })
    render(<ModelSelect
      locked={false}
      available
      directory={directory}
      load={vi.fn()}
      select={select}
      t={t}
    />)

    fireEvent.click(screen.getByRole('button', { name: /选择模型|当前/ }))
    fireEvent.click(screen.getByRole('menuitem', { name: /模型/ }))
    fireEvent.click(screen.getByRole('menuitemradio', { name: /DeepSeek-V4-Pro/ }))
    const toast = await screen.findByRole('alert')
    expect(toast.textContent).toContain('模型操作失败：session/model-unavailable: session already contains images')
    // The selection failure does not render the in-menu load strip (no Retry).
    expect(screen.queryByRole('button', { name: '重试' })).toBeNull()
  })

  it('renders no Agent-bound control for an addressed subagent session', () => {
    const load = vi.fn()
    render(<ModelSelect
      locked={false}
      available={false}
      directory={createSnapshotStore(state())}
      load={load}
      select={vi.fn().mockResolvedValue(false)}
      t={t}
    />)

    expect(screen.queryByRole('button')).toBeNull()
    expect(load).not.toHaveBeenCalled()
  })
})
