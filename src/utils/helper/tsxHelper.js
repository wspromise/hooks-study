import { isFunction } from '@/utils';

/**
 * @description:  Get slot to prevent empty error
 */
export function getSlot(slots, slot = 'default', data) {
  // 插槽或者默认插槽不存在
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  // 对应的插槽不是函数
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
}

/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export function extendSlots(slots, excludeKeys = []) {
  const slotKeys = Object.keys(slots);
  const ret = {};
  slotKeys.map(key => {
    if (excludeKeys.includes(key)) {
      return null;
    }
    ret[key] = data => getSlot(slots, key, data);
  });
  return ret;
}
