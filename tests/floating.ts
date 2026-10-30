/** Behavior tests have no browser layout; geometry is accepted in the real browser harness. */
export const offset = (_gap: number) => ({})
export const shift = (_options: object) => ({})
export const computePosition = async () => ({ x: 16, y: 16 })
export function autoUpdate(_anchor: Element, _panel: Element, update: () => void) {
  update()
  window.addEventListener('resize', update)
  window.addEventListener('scroll', update, true)
  return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true) }
}
