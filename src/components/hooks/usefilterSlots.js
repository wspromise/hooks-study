import { useSlots } from 'vue';

/**
 * 过滤出父组件正在使用的插槽
 * @param {*} slots
 * @returns
 */
export function useFilterSlots(slots) {
  const slotsNames = Object.keys(useSlots());
  const usingSlotList = slots.filter(item => slotsNames.includes(item));
  return [usingSlotList];
}
