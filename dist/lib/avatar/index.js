import { defineComponent, ref, toRef, watch, computed, openBlock, createBlock, Fragment, createCommentVNode, renderSlot } from 'vue';

const ERROR_EVENT = "error";
var script = defineComponent({
    name: "ElAvatar",
    props: {
        size: {
            type: [Number, String],
            validator(val) {
                if (typeof val === "string") {
                    return ["large", "medium", "small"].includes(val);
                }
                return typeof val === "number";
            },
            default: "large",
        },
        shape: {
            type: String,
            default: "circle",
            validator(val) {
                return ["circle", "square"].includes(val);
            },
        },
        src: {
            type: String,
            default: "",
        },
        alt: String,
        srcSet: String,
        fit: {
            type: String,
            default: "cover",
        },
    },
    emits: [ERROR_EVENT],
    setup(props, { emit }) {
        const hasLoadError = ref(false);
        const src = toRef(props, "src");
        watch(src, () => {
            hasLoadError.value = false;
        });
        const avatarClass = computed(() => {
            const { size, shape } = props;
            let classList = ["c-dhn-avatar"];
            if (size && typeof size === "string") {
                classList.push(`c-dhn-avatar--${size}`);
            }
            if (shape) {
                classList.push(`c-dhn-avatar--${shape}`);
            }
            return classList;
        });
        const sizeStyle = computed(() => {
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
            objectFit: props.fit,
        }));
        function handleError(e) {
            hasLoadError.value = true;
            emit(ERROR_EVENT, e);
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("span", {
    class: _ctx.avatarClass,
    style: _ctx.sizeStyle
  }, [
    ((_ctx.src || _ctx.srcSet) && !_ctx.hasLoadError)
      ? (openBlock(), createBlock("img", {
          key: 0,
          src: _ctx.src,
          alt: _ctx.alt,
          srcset: _ctx.srcSet,
          style: _ctx.fitStyle,
          onError: _cache[1] || (_cache[1] = (...args) => (_ctx.handleError && _ctx.handleError(...args)))
        }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, ["src", "alt", "srcset"]))
      : (openBlock(), createBlock(Fragment, { key: 1 }, [
          createCommentVNode(" <i v-else-if=\"icon\" :class=\"icon\"></i> "),
          renderSlot(_ctx.$slots, "default")
        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  ], 6 /* CLASS, STYLE */))
}

script.render = render;
script.__file = "packages/avatar/src/avatar.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _ElAvatar = script;

export default _ElAvatar;
