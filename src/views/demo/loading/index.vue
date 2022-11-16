<template>
  <div
    class="loading-wrap"
    v-loading.fullscreen="loadingRef"
    loading-tip="加载中..."
    title="Loading组件示例"
  >
    <div class="loading-inner" ref="wrapEl">
      <a-alert message="组件方式" />
      <a-button class="my-4 mr-4" type="primary" @click="openCompFullLoading">
        全屏 Loading
      </a-button>

      <a-button class="my-4" type="primary" @click="openCompAbsolute">
        容器内 Loading
      </a-button>
      <Loading
        :loading="loading"
        :absolute="absolute"
        :theme="theme"
        :background="background"
        :tip="tip"
      />

      <a-alert message="函数方式" />
      <a-button class="my-4 mr-4" type="primary" @click="openFnFullLoading">
        全屏 Loading
      </a-button>
      <a-button class="my-4" type="primary" @click="openFnWrapLoading">
        容器内 Loading
      </a-button>

      <a-alert message="指令方式" />
      <a-button class="my-4 mr-4" type="primary" @click="openDirectiveLoading">
        打开指令Loading
      </a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, h, createVNode } from 'vue';
import { Loading, useLoading } from '@/components/Loading';

export default defineComponent({
  components: {
    Loading,
  },
  setup(props, { emit }) {
    /** state */
    const wrapEl = ref(null);
    const loadingRef = ref(false);
    const compState = reactive({
      absolute: false,
      loading: false,
      theme: 'dark',
      background: 'rgba(111,111,111,.7)',
      tip: '加载中...',
    });
    const [openFullLoading, closeFullLoading] = useLoading({
      //   tip: '加载中...',
      tip: createVNode('div', undefined, '3333333'),
    });

    const [openWrapLoading, closeWrapLoading] = useLoading({
      target: wrapEl,
      props: {
        // tip: '加载中...',
        tip: createVNode('div', undefined, '2222222222'),
        absolute: true,
      },
    });
    /** computed */

    /** watch */

    /** lifecycle */

    /** methods */
    function openLoading(absolute) {
      compState.absolute = absolute;
      compState.loading = true;
      setTimeout(() => {
        compState.loading = false;
      }, 3000);
    }

    function openCompFullLoading() {
      openLoading(false);
    }

    function openCompAbsolute() {
      openLoading(true);
    }

    function openFnFullLoading() {
      openFullLoading();

      setTimeout(() => {
        closeFullLoading();
      }, 2000);
    }

    function openFnWrapLoading() {
      openWrapLoading();

      setTimeout(() => {
        closeWrapLoading();
      }, 2000);
    }

    function openDirectiveLoading() {
      loadingRef.value = true;
      setTimeout(() => {
        loadingRef.value = false;
      }, 2000);
    }

    return {
      openCompFullLoading,
      openCompAbsolute,
      openFnFullLoading,
      openFnWrapLoading,
      openDirectiveLoading,
      ...toRefs(compState),
      wrapEl,
      loadingRef,
    };
  },
});
</script>

<style scoped lang="less">
.loading-inner {
  position: relative;
  margin: 0 auto;
  width: 600px;
  background-color: pink;
  .my-4 {
    margin: 0 10px;
  }
}
</style>
