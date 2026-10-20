import { Context, Service } from '@deepseek-ai/cordis'
import { expect, it, vi } from 'vitest'
import * as selector from '../src/client.ts'
import { createSnapshotStore } from './store.ts'

it('会话模型入口可通过真实 Cordis 服务上下文解析模型目录', async () => {
  const store = createSnapshotStore({ status: 'ready', groups: [], current: null, routable: false, pending: null, error: null, failures: [] })
  const directory = { store, load: async () => store.getSnapshot(), select: async () => {} }
  const ctx = new Context()
  class Remote extends Service {
    constructor(scope: Context) { super(scope, 'remote') }
    get session() { return this.ctx['remote.session'] }
  }
  class Directories extends Service {
    static inject = ['remote', 'remote.session']
    constructor(scope: Context) { super(scope, 'modelDirectories') }
    directoryFor() { return this.ctx.remote.session }
  }
  type Contribution = { name: string; inject?: (id: string) => { directory: typeof store } }
  const contributions = new Map<string, Contribution>()
  const fixture = ctx.plugin((scope: Context) => {
    scope.provide('remote.session', directory)
    scope.provide('slots', {
    inject: (_name: string, callback: () => void) => callback(),
    register: (entry: Contribution) => { contributions.set(entry.name, entry); return () => contributions.delete(entry.name) },
    entries: () => [],
    })
    scope.provide('sessions', { subagentAddress: () => undefined })
    scope.provide('locale', { register: () => () => {}, bind: () => (key: string) => key })
  })
  const remote = ctx.plugin(Remote)
  const directories = ctx.plugin(Directories)
  const plugin = ctx.plugin(selector)
  try {
    await vi.waitFor(() => expect(contributions.has('conversation.input.model')).toBe(true))
    expect(contributions.get('conversation.input.model')?.inject?.('synthetic').directory).toBe(store)
  } finally {
    await plugin.dispose()
    await directories.dispose()
    await remote.dispose()
    await fixture.dispose()
  }
})
