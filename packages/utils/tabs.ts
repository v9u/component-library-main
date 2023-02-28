import { ComponentInternalInstance, ComputedRef, Ref } from 'vue'

export type UpdatePaneStateCallback = (pane: Pane) => void
export type BeforeLeave = (
  newTabName: string,
  oldTabName: string
) => void | Promise<void> | boolean
export interface IEPaneProps {
  label: string
  name: string
  disabled: boolean
  lazy?: boolean | string
}
export interface Pane {
  uid: number
  instance: ComponentInternalInstance
  props: IEPaneProps
  paneName: ComputedRef<string>
  active: ComputedRef<boolean>
  index: Ref<string>
}
export interface IETabsProps {
 
  modelValue: string
  beforeLeave: BeforeLeave
}
export interface RootTabs {
  props: IETabsProps
  currentName: Ref<string>
}
