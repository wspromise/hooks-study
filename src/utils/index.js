import { cloneDeep } from 'lodash-es';
/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node) {
  return node?.parentNode ?? document.body;
}

export const withInstall = (component, alias) => {
  const comp = component;
  comp.install = app => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component;
};

const toString = Object.prototype.toString;

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val) {
  return is(val, 'String');
}

export function isArray(val) {
  return val && Array.isArray(val);
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isObject(val) {
  return is(val, 'Object');
}

// 深度合并
export function deepMerge(src = {}, target = {}) {
  let key;
  const res = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key])
      ? deepMerge(res[key], target[key])
      : (res[key] = target[key]);
  }
  return res;
}
