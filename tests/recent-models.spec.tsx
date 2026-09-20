import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import { RecentModels, rankRecent } from '../src/recent-models.ts'
import { ModelSelect } from '../src/ModelSelect.tsx'
import { zh } from './fixtures/model-locales.ts'

const now = Date.now()
const route = (provider: string, count = 1, time = now) => ({ provider, model: 'same', count, time })
const api = (rows: unknown[]) => vi.fn(async () => ({ ok: true, json: async () => ({ ok: true, records: rows }) }) as Response)
const memory = () => { let value: string | null = null; return { getItem: () => value, setItem: (_key: string, next: string) => { value = next } } }
afterEach(cleanup)

it('calls the native fetch without binding it to the recent-model store', async () => {
  const original = globalThis.fetch
  globalThis.fetch = function (this: unknown) {
    if (this !== undefined && this !== globalThis) throw new TypeError('Illegal invocation')
    return api([route('a')])()
  } as typeof fetch
  try {
    const recent = new RecentModels(undefined)
    await recent.refresh()
    expect(recent.getSnapshot().unavailable).toBe(false)
    expect(recent.getSnapshot().routes).toHaveLength(1)
  } finally { globalThis.fetch = original }
})

it('combines counts, separates providers, expires old records and breaks ties by recency', () => {
  expect(rankRecent([route('a', 2, now - 1), route('a'), route('b', 3, now - 2), route('expired', 100, now - 31 * 86400000), route('future', 100, now + 1)], now).map(r => [r.provider, r.count])).toEqual([['a', 3], ['b', 3]])
})

it('combines persisted choices with requests without duplicating refreshed requests', async () => {
  const storage = memory(), request = api([route('a'), route('a'), { ...route('ignored'), purpose: 'title' }])
  const first = new RecentModels(storage, request, () => now)
  first.recordChoice(route('b'))
  const second = new RecentModels(storage, request, () => now)
  second.recordChoice(route('b'))
  first.recordChoice(route('a'))
  await first.refresh(); await first.refresh()
  expect(first.getSnapshot().routes.map(r => [r.provider, r.count])).toEqual([['a', 3], ['b', 2]])
  expect(first.getSnapshot().unavailable).toBe(false)
})

it('keeps choices when usage fails and rejects malformed rows', async () => {
  const request = api([null, { provider: 'a', model: 'same', time: 'bad' }])
  const recent = new RecentModels(memory(), request, () => now)
  recent.recordChoice(route('a'))
  await recent.refresh()
  request.mockRejectedValueOnce(new Error('offline'))
  await recent.refresh()
  expect(recent.getSnapshot()).toMatchObject({ unavailable: true, loading: false, routes: [route('a')] })
})

function mount(recent: RecentModels, select = vi.fn(async () => true), pickerOnly = false) {
  const groups = Array.from({ length: 8 }, (_, i) => ({ id: `p${i}`, name: `Provider ${i}`, models: [{ id: 'same', name: 'Same Model' }] }))
  render(<ModelSelect directory={createSnapshotStore({ current: { provider: 'other', model: 'other' }, groups, status: 'ready', routable: true, failures: [], error: null })} available locked={false} load={vi.fn()} select={select} recents={recent} pickerOnly={pickerOnly} t={key => (zh as Record<string, string>)[key] ?? key} />)
  fireEvent.click(screen.getByRole('button', { name: /选择模型/ }))
  if (!pickerOnly) fireEvent.click(screen.getByRole('menuitem'))
  return select
}

it('shows six catalog matches with providers and opens the searchable complete catalog', async () => {
  const recent = new RecentModels(undefined, api([route('hidden'), ...Array.from({ length: 8 }, (_, i) => route(`p${i}`))]), () => now)
  mount(recent)
  await waitFor(() => expect(screen.getAllByRole('menuitemradio')).toHaveLength(6))
  expect(screen.getAllByRole('menuitemradio')[0].textContent).toContain('Provider 0')
  expect(screen.queryByRole('searchbox')).toBeNull()
  fireEvent.click(screen.getByRole('menuitem', { name: '更多模型' }))
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(8)
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Provider 7' } })
  await waitFor(() => expect(screen.getAllByRole('menuitemradio')).toHaveLength(1))
  fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape' })
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(6)
})

it.each([{ accepted: true, draft: false, count: 1 }, { accepted: false, draft: false, count: 0 }, { accepted: true, draft: true, count: 0 }])('records only accepted session choices: $accepted / draft $draft', async ({ accepted, draft, count }) => {
  const recent = new RecentModels(undefined, api([]), () => now)
  const select = mount(recent, vi.fn(async () => accepted), draft)
  fireEvent.click(screen.getByRole('menuitem', { name: '更多模型' }))
  fireEvent.click(screen.getAllByRole('menuitemradio')[0])
  await waitFor(() => expect(select).toHaveBeenCalledOnce())
  await waitFor(() => expect(recent.getSnapshot().loading).toBe(false))
  expect(recent.getSnapshot().routes).toHaveLength(count)
})
