/** Observable fixture driving the presentation through host-accepted snapshots. */
export function createSnapshotStore<T>(initial: T) {
  let state = initial
  const listeners = new Set<() => void>()
  return { getSnapshot: () => state, subscribe: (listener: () => void) => { listeners.add(listener); return () => listeners.delete(listener) }, set: (value: T) => { state = value; listeners.forEach(listener => listener()) }, update: (mutate: (value: T) => void) => { state = { ...state }; mutate(state); listeners.forEach(listener => listener()) } }
}
