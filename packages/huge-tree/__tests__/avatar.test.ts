import { mount } from '@vue/test-utils'
import Element from '../src/avatar.vue'

describe('c-dhn-avatar', () => {
    test('avatar-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('span')
    })
})
