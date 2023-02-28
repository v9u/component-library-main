import { App } from 'vue'

import ElAvatar from '../avatar'

export {

  ElAvatar,

}
const components = [

  ElAvatar,

]
const install = (app: App, opt: Object): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

}
export default {
  version: 'independent',
  install
}
