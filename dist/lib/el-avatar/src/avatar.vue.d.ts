import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<string | number>;
        validator(this: never, val: unknown): boolean;
        default: string;
    };
    shape: {
        type: StringConstructor;
        default: string;
        validator(this: never, val: string): boolean;
    };
    src: {
        type: StringConstructor;
        default: string;
    };
    alt: StringConstructor;
    srcSet: StringConstructor;
    fit: {
        type: StringConstructor;
        default: string;
    };
}, {
    hasLoadError: import("vue").Ref<boolean>;
    avatarClass: import("vue").ComputedRef<string[]>;
    sizeStyle: import("vue").ComputedRef<{
        height: string;
        width: string;
        lineHeight: string;
    } | {
        height?: undefined;
        width?: undefined;
        lineHeight?: undefined;
    }>;
    handleError: (e: Event) => void;
    fitStyle: import("vue").ComputedRef<{
        objectFit: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "error"[], "error", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size?: unknown;
    shape?: unknown;
    src?: unknown;
    alt?: unknown;
    srcSet?: unknown;
    fit?: unknown;
} & {
    size: string | number;
    shape: string;
    src: string;
    fit: string;
} & {
    alt?: string | undefined;
    srcSet?: string | undefined;
}>, {
    size: string | number;
    shape: string;
    src: string;
    fit: string;
}>;
export default _default;
