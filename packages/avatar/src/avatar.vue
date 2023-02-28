<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    />
    <!-- <i v-else-if="icon" :class="icon"></i> -->
    <slot v-else></slot>
    
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, watch, toRef } from "vue"
const ERROR_EVENT = "error"
export default defineComponent({
  name: "ElAvatar",
  props: {
    /** 图片大小 "large"大小为“100%”, "medium"大小为“80%”, "small"大小为“50%” 或者 数字*/
    size: {
      type: [Number, String] as PropType<number | string>,
      validator(this: never, val: unknown) {
        //never 无法到达的终点 永远不会执行到这里 https://www.zhihu.com/question/354601204
        //unknown 所有有可能能的类型  不用any   any放弃类型检查了   unknown传进来的什么类型就可以 确定它是什么类型
        if (typeof val === "string") {
          return ["large", "medium", "small"].includes(val);
        }
        return typeof val === "number";
      },
      default: "large",
    },
    /** 形状 圆形 "circle"  正方形 "square" */
    shape: {
      //形状 圆形  正方形
      type: String,
      default: "circle",
      validator(this: never, val: string) {
        return ["circle", "square"].includes(val);
      },
    },
    /** 图片地址 */
    src: {
      //图片地址
      type: String,
      default: "",
    },
    /** 说明 */
    alt: String, // 说明
    /** srcset 属性用于浏览器根据宽、高和像素密度来加载相应的图片资源 原生img的srcSet属性 */
    srcSet: String, //srcset 属性用于浏览器根据宽、高和像素密度来加载相应的图片资源
    /** 当展示类型为图片的时候，设置图片如何适应容器框 同原生 object-fit */
    fit: {
      //当展示类型为图片的时候，设置图片如何适应容器框
      type: String,
      default: "cover",
    },
  },
  emits: [ERROR_EVENT],
  setup(props, { emit }) {
    const hasLoadError = ref(false);
    const src = toRef(props, "src"); //赋值 src的一个引用  然后外部props传入的src变化后   把hasLoadError 错误状态清空  因为是一个新图了
    watch(src, () => {
      //新图清空错误状态
      hasLoadError.value = false;
    });
    const avatarClass = computed(() => {
      //计算class
      const { size, shape } = props;
      let classList = ["c-dhn-avatar"];
      if (size && typeof size === "string") {
        //大小  默认三个大小  字符串
        classList.push(`c-dhn-avatar--${size}`);
      }
      if (shape) {
        // 圆形还是正方形
        classList.push(`c-dhn-avatar--${shape}`);
      }
      return classList;
    });
    const sizeStyle = computed(() => {
      // 传入的数值  设置大小
      const { size } = props;
      return typeof size === "number"
        ? {
            height: `${size}px`,
            width: `${size}px`,
            lineHeight: `${size}px`,
          }
        : {};
    });

    const fitStyle = computed(() => ({
      // 如何适应容器 剪切还是缩小
      objectFit: props.fit,
    }));

    function handleError(e: Event) {
      //错误的回调函数
      hasLoadError.value = true; //图片错误的话   展示插槽的备用图
      emit(ERROR_EVENT, e); //调用回调函数
    }
    return {
      hasLoadError,
      avatarClass,
      sizeStyle,
      handleError,
      fitStyle,
    };
  },
});
</script>

<style  lang="scss">
</style>


