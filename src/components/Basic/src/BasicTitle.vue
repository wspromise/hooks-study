<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp
      v-if="helpMessage"
      :class="`${prefixCls}-help`"
      :text="helpMessage"
      v-bind="helpProps"
    >
      <slot name="help-icon"></slot>
    </BasicHelp>
  </span>
</template>
<script setup>
import { useSlots, computed } from 'vue';
import BasicHelp from './BasicHelp.vue';
const props = defineProps({
  /**
   * 帮助文本或列表
   * @default: ''
   */
  helpMessage: {
    type: [String, Array],
    default: '',
  },
  /**
   * 标题左侧是否显示色块
   * @default: false
   */
  span: { type: Boolean, default: false },
  /**
   * 是否默认文本，即不加粗
   * @default: false
   */
  normal: { type: Boolean, default: false },
  // 帮助组件的props, 相当于basicHelpProps
  helpProps: { type: Object },
});

const prefixCls = 'ws-basic-title';
const slots = useSlots();
const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}-show-span`]: props.span && slots.default },
  { [`${prefixCls}-normal`]: props.normal },
]);
</script>
<style lang="less" scoped>
@prefix-cls: ~'ws-basic-title';

.@{prefix-cls} {
  position: relative;
  display: flex;
  padding-left: 7px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #333;
  cursor: pointer;
  user-select: none;

  &-normal {
    font-size: 14px;
    font-weight: 500;
  }

  &-show-span::before {
    position: absolute;
    top: 4px;
    left: 0;
    width: 3px;
    height: 16px;
    margin-right: 4px;
    background-color: #07b464;
    content: '';
  }

  &-help {
    margin-left: 10px;
  }
}
</style>
