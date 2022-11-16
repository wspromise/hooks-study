<template>
  <section
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <Spin :tip="tip" :size="size" :spinning="loading" v-bind="$attrs" />
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { Spin } from 'ant-design-vue';
export default defineComponent({
  name: 'Loading',
  components: { Spin },
  props: {
    // 当作为包裹元素时，可以自定义描述文案
    tip: {
      type: String,
      default: '',
    },
    // 组件大小，可选值为 small default large
    size: {
      type: String,
      default: 'large',
      validator: v => {
        return ['default', 'small', 'large'].includes(v);
      },
    },
    // 是否绝对定位，用于容器内loading
    absolute: {
      type: Boolean,
      default: false,
    },
    // 是否loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 背景颜色
    background: {
      type: String,
    },
    // 主题 'dark' | 'light'
    theme: {
      type: String,
    },
  },
  setup(props, { emit }) {
    /** state */
    /** computed */
    /** watch */
    /** lifecycle */
    /** methods */
    return {};
  },
});
</script>

<style scoped lang="less">
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgb(240 242 245 / 40%);

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }

  &.light {
    // background-color: rgba(0, 0, 0, 0.05);
    background-color: red;
  }

  &.dark {
    // background-color: rgba(0, 0, 0, 0.05);
    background-color: blue;
  }
}
</style>
