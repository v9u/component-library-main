import CDhnAvatar from '../'
import '../../theme-chalk/src/avatar.scss'

export default {
  title: 'DHNUI/Avatar',
  component: CDhnAvatar,
  argTypes: {
    size: { control: { type: 'select', options: ['large', 'medium', 'small'] } },
  },
}

const Template  = (args) => ({
  setup () {
    return {
      args
    }
  },
  components: { CDhnAvatar },
  template: `
    <div style="width:40px;height:40px">
      <c-dhn-avatar v-bind="args" ></c-dhn-avatar>
    </div>
  `
})

export const index:any = Template.bind({});
index.args = {
  src:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  size:'large'
};