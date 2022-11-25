import { cloneDeep } from 'lodash-es';
/**
 * @description: 设置挂载的节点
 */
export function getPopupContainer(node) {
  return node?.parentNode ?? document.body;
}

/**
 * 为组件挂载install方法
 * @param {*} component 组件
 * @param {*} alias 组件别名
 * @returns
 */
export const withInstall = (component, alias) => {
  const comp = component;
  comp.install = app => {
    // 注册为全局组件
    app.component(comp.name || comp.displayName, component);
    // 是否存在别名
    if (alias) {
      // 对 Vue 2 中 Vue.prototype 使用方式的一种替代，挂载到全局，无需引入，任意组件模板上都可用，并且也可以通过任意组件实例的 this 访问到
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

/**
 * 深度合并
 * @param {*} src 源对象
 * @param {*} target 目标对象
 * @returns
 */
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
