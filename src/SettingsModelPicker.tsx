/** 设置中的模型选择复用输入框的同一个 ModelSelect。 */
import { useMemo, useEffect } from 'react'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { ModelCatalog, ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import { ModelSelect } from './ModelSelect.tsx'
import type { RecentModels } from './recent-models.ts'
import type { RecentText } from './recent-locales.ts'

interface PickerProps {
  recents?: RecentModels
  recentText?: RecentText
  embedded?: boolean
  dialog?: boolean
  onOpenChange?: (open: boolean) => void
  status?: ModelDirectoryState['status']
  error?: string | null
  failures?: ModelDirectoryState['failures']
  load?: () => void
  groups: ModelCatalog['groups']
  current: ModelSelection | null
  locked: boolean
  select: (selection: ModelSelection) => void
}

/** 仅编辑规则草稿，不提交会话模型选择。 */
export function SettingsModelPicker({ groups, current, locked, select, t, recents, recentText, embedded, dialog, onOpenChange, status = 'ready', error = null, failures = [], load = () => {} }: PickerProps & PropsLocale<'model'>) {
  const directory = useMemo(() => createSnapshotStore<ModelDirectoryState>({
    status, error, groups, failures, current, routable: true, pending: null,
  }), [])
  useEffect(() => { directory.update(state => { state.groups = groups; state.current = current; state.status = status; state.error = error; state.failures = failures }) }, [directory, groups, current, status, error, failures])
  return <ModelSelect pickerOnly embedded={embedded} dialog={dialog} onOpenChange={onOpenChange} available locked={locked} directory={directory} load={load} recents={recents} recentText={recentText}
    select={async selection => { select(selection); return true }} t={t} />
}
