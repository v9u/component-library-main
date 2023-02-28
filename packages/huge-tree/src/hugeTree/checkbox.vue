<template>
  <div :class="['check-box']">
    <div @click="onSingleChecked" @dblclick="onDBLChecked">
      <slot />
    </div>
    <div
      v-if="showBox"
      :class="['box', { 'is-checked': checked, 'is-part-checked': indeterminate, 'is-disabled': disabled }]"
      @click="onChecked"
    ></div>
  </div>
</template>

<script>
import { depthFirstEach } from './helper.js';
export default {
  model: {
    prop: 'checked',
    event: 'checked-change',
  },
  components: {},
  props: {
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    checkedAction: { type: String, default: 'none' },
    showCheckbox: { type: Boolean, default: false },
    isLeaf: { type: Boolean, default: true },
    showCheckboxLeafOnly: { type: Boolean, default: false },
    node: { type: Object, default: () => {} },
    checkStriclty: { type: Boolean, default: false },
  },
  data() {
    return {};
  },

  computed: {
    showBox() {
      if (this.showCheckbox) {
        if (this.showCheckboxLeafOnly) {
          return this.isLeaf;
        }
        return true;
      }
      return false;
    },
  },

  mounted() {},

  methods: {
    onChecked() {
      if (this.disabled) return;
      this.$emit('checked-change', this.getNewChecked(this.checked));
      this.$emit('on-checked');
    },
    labelClick() {
      this.$emit('on-click-label');
    },
    onSingleChecked() {
      if (this.checkedAction === 'click' && this.showBox) this.onChecked();
      this.labelClick();
    },
    onDBLChecked() {
      if (this.checkedAction === 'dblclick' && this.showBox) this.onChecked();
      this.labelClick();
    },

    getNewChecked(oldChecked) {
      if (this.node.isLeaf || this.checkStriclty) {
        return !oldChecked;
      }
      let newChecked = false;
      depthFirstEach({ tree: this.node.children }, node => {
        if (node.isLeaf && !node.disabled && !node.checked) {
          newChecked = true;
          return 'break';
        }
      });
      return newChecked;
    },
  },
};
</script>


