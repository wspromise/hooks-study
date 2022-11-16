<template>
  <section
    :class="['full-loading', { absolute, [theme]: !!theme }]"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <Spin :spinning="loading" :size="size" :tip="tip" v-bind="$attrs">
      <!-- 支持使用插槽插入 -->
      <template
        v-for="(slotItem, index) in slots"
        :key="index"
        #[slotItem]="slotsParams"
      >
        <slot :name="slotItem" :slotsParams="slotsParams"></slot>
      </template>
    </Spin>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { Spin } from 'ant-design-vue';
import { useFilterSlots } from '../../hooks/usefilterSlots';
// 组件支持的插槽
const slotList = ['indicator', 'tip'];

export default defineComponent({
  name: 'Loading',
  components: { Spin },
  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 组件大小，可选值为 small default large
    size: {
      type: String,
      default: 'large',
      validator(value) {
        return ['small', 'default', 'large'].includes(value);
      },
    },
    // 当作为包裹元素时，可以自定义描述文案
    tip: {
      type: [String, Object],
    },
    // 背景颜色
    background: {
      type: String,
    },
    // 主题色 light | dark
    theme: {
      type: String,
    },
    // 是否相对定位，一般用于容器内loading
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /** state */
    const [slots] = useFilterSlots(slotList);

    /** computed */

    /** watch */

    /** lifecycle */

    /** methods */

    return { slots };
  },
});
</script>

<style scoped lang="less">
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(240 242 245 / 40%);

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  &.light {
    background-color: red;
  }

  &.dark {
    background-color: blue;
  }
}
</style>
