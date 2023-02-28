export declare const getScrollContainer: (el: HTMLElement, isVertical?: Nullable<boolean> | undefined) => Window | HTMLElement | void;
export declare const getStyle: (element: HTMLElement, styleName: string) => string | undefined | null;
export declare const isScroll: (el: HTMLElement, isVertical?: Nullable<boolean> | undefined) => RegExpMatchArray | undefined | null;
export declare const getOffsetTop: (el: HTMLElement) => number;
export declare const getOffsetTopDistance: (el: HTMLElement, containerEl: HTMLElement) => number;
