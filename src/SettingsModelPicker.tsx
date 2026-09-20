/** 设置中的模型选择复用输入框的同一个 ModelSelect。 */
import { useMemo, useEffect } from 'react'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { ModelCatalog, ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import { ModelSelect } from './ModelSelect.tsx'

interface PickerProps {
  groups: ModelCatalog['groups']
  current: ModelSelection | null
  locked: boolean
  select: (selection: ModelSelection) => void
}

/** 仅编辑规则草稿，不提交会话模型选择。 */
export function SettingsModelPicker({ groups, current, locked, select, t }: PickerProps & PropsLocale<'model'>) {
  const directory = useMemo(() => createSnapshotStore<ModelDirectoryState>({
    status: 'ready', error: null, groups, failures: [], current, routable: true,
  }), [])
  useEffect(() => { directory.update(state => { state.groups = groups; state.current = current }) }, [directory, groups, current])
  return <ModelSelect pickerOnly available locked={locked} directory={directory} load={() => {}}
    select={async selection => { select(selection); return true }} t={t} />
}
