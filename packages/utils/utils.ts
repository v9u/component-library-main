import { camelize, capitalize, extend, hasOwn, hyphenate, isArray, isObject, isString, isFunction, looseEqual, toRawType } from '@vue/shared'
// coerce truthy value to array
export const coerceTruthyValueToArray = (arr:Array<any>) => {
    if (!arr && arr !== 0) {
      return []
    }
    return Array.isArray(arr) ? arr : [arr]
}

export function entries<T>(obj: Hash<T>): [string, T][] {
  return Object
    .keys(obj)
    .map((key: string) => ([key, obj[key]]))
}
// reexport from lodash & vue shared
export {
  hasOwn,
  // isEmpty,
  // isEqual,
  isObject,
  isArray,
  isString,
  capitalize,
  camelize,
  looseEqual,
  extend,
}