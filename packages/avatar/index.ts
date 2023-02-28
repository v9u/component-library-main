import ElAvatar from './src/avatar.vue'
import { App } from 'vue'
import type { SFCWithInstall } from '../utils/types'

ElAvatar.install = (app: App): void => {
  app.component(ElAvatar.name, ElAvatar)
}

const _ElAvatar: SFCWithInstall<typeof ElAvatar> = ElAvatar

export default _ElAvatar
