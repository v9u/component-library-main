import type { App } from 'vue'



export type AnyFunction<T> = (...args: any[]) => T


export type SFCWithInstall<T> = T & { install(app: App): void; }
