/** Public components supplied by the modelPickers client service. */
import type { ComponentType } from 'react'
import type { ModelCatalog, ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'

/** Independent selection never invokes the session model mutation. Return false when saving fails. */
export interface IndependentPickerProps {
  onOpenChange?: (open: boolean) => void
  sessionId: string
  current: ModelSelection | null
  locked: boolean
  select: (selection: ModelSelection) => void | boolean | Promise<void | boolean>
}

/** Caller-owned catalog and selection, with shared search, provider groups, locale and recent models. */
export interface CatalogPickerProps extends Omit<IndependentPickerProps, 'sessionId'> {
  groups: ModelCatalog['groups']
  status?: ModelDirectoryState['status']
  error?: string | null
  failures?: ModelDirectoryState['failures']
  /** Called on open and retry; publish refreshed catalog/error through the props. */
  load: () => void
}

/** Model-only pickers never change reasoning effort or the current chat session. */
export interface ModelPickerService {
  Picker: ComponentType<IndependentPickerProps>
  Control: ComponentType<IndependentPickerProps>
  CatalogPicker: ComponentType<CatalogPickerProps>
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    modelPickers: ModelPickerService
  }
}
