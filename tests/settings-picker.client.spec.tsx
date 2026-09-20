import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { SettingsModelPicker } from '../src/SettingsModelPicker.tsx'
import { zh } from './fixtures/model-locales.ts'

afterEach(cleanup)
const t = (key: string) => zh[key] ?? key
const groups = [{ id: 'api', name: 'API Provider', models: [{ id: 'model-a', name: 'Model A' }, { id: 'model-b', name: 'Model B' }] }]

it('规则编辑复用搜索下拉，只回传草稿选择，Escape 直接关闭', async () => {
  const select = vi.fn()
  const view = render(<SettingsModelPicker groups={groups} current={null} locked={false} select={select} t={t} />)
  fireEvent.click(screen.getByRole('button'))
  const search = screen.getByRole('searchbox')
  expect(document.activeElement).toBe(search)
  fireEvent.change(search, { target: { value: 'Model B' } })
  await waitFor(() => expect(screen.queryByRole('menuitemradio', { name: 'Model A' })).toBeNull())
  fireEvent.click(screen.getByRole('menuitemradio', { name: 'Model B' }))
  await waitFor(() => expect(select).toHaveBeenCalledWith({ provider: 'api', model: 'model-b' }))
  view.rerender(<SettingsModelPicker groups={groups} current={{ provider: 'api', model: 'model-b' }} locked={false} select={select} t={t} />)
  await waitFor(() => expect(screen.getByRole('button').textContent).toContain('Model B · API Provider'))
  fireEvent.click(screen.getByRole('button'))
  fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape' })
  expect(screen.queryByRole('menu')).toBeNull()
})
