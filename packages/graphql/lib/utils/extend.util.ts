import { defaultTo, isArray, isString } from 'lodash';

export function extend<T = any>(obj1: T | T[], obj2: T | T[]) {
  if (isString(obj1)) {
    return isString(obj2)
      ? [defaultTo(obj1, ''), defaultTo(obj2, '')]
      : [defaultTo(obj1, '')].concat(defaultTo(obj2 as any, []));
  }

  if (isArray(obj1)) {
    return defaultTo(obj1, []).concat(defaultTo(obj2, []));
  }

  return {
    ...((obj1 as object) || {}),
    ...((obj2 as object) || {}),
  };
}
