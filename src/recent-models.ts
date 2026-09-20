/** 最近三十天的实际请求与成功选择，按提供商和模型分别计数。 */
export interface RecentRoute { provider: string; model: string; count: number; time: number }
export interface RecentState { routes: readonly RecentRoute[]; loading: boolean; unavailable: boolean }
const WINDOW = 30 * 24 * 60 * 60 * 1000
const KEY = 'dsh-codex-model-selector.choices.v1'
export const routeKey = (route: { provider: string; model: string }): string => JSON.stringify([route.provider, route.model])

/** 合并最近窗口内的记录；相同次数按最近时间排序。 */
export function rankRecent(records: readonly RecentRoute[], now: number): RecentRoute[] {
  const map = new Map<string, RecentRoute>()
  for (const row of records) {
    if (row.time < now - WINDOW || row.time > now) continue
    const key = routeKey(row), previous = map.get(key)
    map.set(key, { ...row, count: row.count + (previous?.count ?? 0), time: Math.max(row.time, previous?.time ?? 0) })
  }
  return [...map.values()].sort((a, b) => b.count - a.count || b.time - a.time || routeKey(a).localeCompare(routeKey(b)))
}

function parseRows(value: unknown, usage: boolean): RecentRoute[] {
  if (!Array.isArray(value)) throw new Error('invalid model usage records')
  return value.flatMap(entry => {
    if (typeof entry !== 'object' || entry === null) return []
    const row = entry as Record<string, unknown>
    if (typeof row.provider !== 'string' || !row.provider || typeof row.model !== 'string' || !row.model
      || typeof row.time !== 'number' || !Number.isFinite(row.time)) return []
    if (usage && row.purpose && row.purpose !== 'assistant') return []
    const count = usage ? 1 : row.count
    if (typeof count !== 'number' || !Number.isSafeInteger(count) || count < 1) return []
    return [{ provider: row.provider, model: row.model, time: row.time, count }]
  })
}

/** 复用用量插件公开 API；选择计数仅存于当前浏览器，不写会话或模型配置。 */
export class RecentModels {
  private choices: RecentRoute[] = []
  private requests: RecentRoute[] = []
  private listeners = new Set<() => void>()
  private state: RecentState = { routes: [], loading: false, unavailable: false }
  private pending: Promise<void> | undefined
  private abort = new AbortController()
  constructor(private storage: Pick<Storage, 'getItem' | 'setItem'> | undefined, private request: typeof fetch = fetch, private now = Date.now) {
    try { this.choices = parseRows(JSON.parse(storage?.getItem(KEY) ?? '[]'), false) } catch { /* 无效或受限的浏览器存储不阻止模型选择。 */ }
    this.publish(false, false)
  }
  getSnapshot = (): RecentState => this.state
  subscribe = (listener: () => void): (() => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener) } }
  private publish(loading: boolean, unavailable: boolean): void {
    this.choices = this.choices.filter(row => row.time >= this.now() - WINDOW && row.time <= this.now())
    this.state = { routes: rankRecent([...this.requests, ...this.choices], this.now()), loading, unavailable }
    for (const listener of this.listeners) listener()
  }
  /** 仅在会话选择成功后记录，编辑规则草稿和改推理档位不计数。 */
  recordChoice(route: { provider: string; model: string }): void {
    this.readChoices()
    this.choices.push({ provider: route.provider, model: route.model, count: 1, time: this.now() })
    this.publish(this.state.loading, this.state.unavailable)
    try { this.storage?.setItem(KEY, JSON.stringify(this.choices)) } catch { /* 存储不可写时，本页仍保留计数。 */ }
  }
  /** 每次打开目录读取最新请求记录；并发打开共享同一次读取。 */
  refresh(): Promise<void> {
    if (this.pending) return this.pending
    this.readChoices()
    this.publish(true, false)
    this.pending = this.request('/usage/api', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'list' }), signal: this.abort.signal })
      .then(async response => {
        if (!response.ok) throw new Error('usage unavailable')
        const body = await response.json()
        if (body?.ok !== true) throw new Error('usage unavailable')
        this.requests = parseRows(body.records, true)
        this.publish(false, false)
      }).catch(() => { if (!this.abort.signal.aborted) this.publish(false, true) })
      .finally(() => { this.pending = undefined })
    return this.pending
  }
  private readChoices(): void {
    try {
      const saved = this.storage?.getItem(KEY)
      if (saved !== undefined && saved !== null) this.choices = parseRows(JSON.parse(saved), false)
    } catch { /* 存储不可读时保留当前页已记录的选择。 */ }
  }
  dispose(): void { this.abort.abort(); this.listeners.clear() }
}
