<template>
  <Modal v-bind="getBindValue" @cancel="handleCancel">
    <template #closeIcon v-if="!$slots.closeIcon">
      <ModalClose
        :canFullscreen="getProps.canFullscreen"
        :fullScreen="fullScreenRef"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>

    <template #title v-if="!$slots.title">
      <ModalHeader
        :helpMessage="getProps.helpMessage"
        :title="getMergeProps.title"
        :span="getMergeProps.span"
        :normal="getMergeProps.normal"
        :helpProps="helpProps"
        @dblclick="handleTitleDbClick"
      >
        <template #help-icon>
          <slot name="help-icon"></slot>
        </template>
      </ModalHeader>
    </template>

    <template #footer v-if="!$slots.footer">
      <ModalFooter v-bind="getBindValue" @ok="handleOk" @cancel="handleCancel">
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </ModalFooter>
    </template>

    <ModalWrapper
      :useWrapper="getProps.useWrapper"
      :footerOffset="wrapperFooterOffset"
      :fullScreen="fullScreenRef"
      ref="modalWrapperRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :minHeight="getProps.minHeight"
      :height="getWrapperHeight"
      :visible="visibleRef"
      :modalFooterHeight="footer !== undefined && !footer ? 0 : undefined"
      v-bind="
        omit(getProps.wrapperProps, 'visible', 'height', 'modalFooterHeight')
      "
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    >
      <slot></slot>
    </ModalWrapper>

    <!-- modal支持的插槽（除了默认插槽） -->
    <template
      #[item]="data"
      v-for="item in Object.keys(omit($slots, 'default'))"
    >
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  watch,
  unref,
  watchEffect,
  toRef,
  getCurrentInstance,
  nextTick,
} from 'vue';
import Modal from './components/Modal';
import ModalWrapper from './components/ModalWrapper.vue';
import ModalClose from './components/ModalClose.vue';
import ModalFooter from './components/ModalFooter.vue';
import ModalHeader from './components/ModalHeader.vue';
import { isFunction } from '@/utils/index';
import { deepMerge } from '@/utils';
import { basicProps } from './props';
import { useFullScreen } from './hooks/useModalFullScreen';
import { omit } from 'lodash-es';

export default defineComponent({
  name: 'BasicModal',
  components: { Modal, ModalWrapper, ModalClose, ModalFooter, ModalHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: [
    'visible-change',
    'height-change',
    'cancel',
    'ok',
    'register',
    'update:visible',
  ],
  setup(props, { emit, attrs }) {
    const visibleRef = ref(false);
    const propsRef = ref(null);
    const modalWrapperRef = ref(null);
    const prefixCls = 'ws-basic-modal';

    // modal   Bottom and top height
    const extHeightRef = ref(0);
    const modalMethods = {
      setModalProps,
      emitVisible: undefined,
      redoModalHeight: () => {
        nextTick(() => {
          if (unref(modalWrapperRef)) {
            unref(modalWrapperRef).setModalHeight();
          }
        });
      },
    };
    // 获取组件实例
    const instance = getCurrentInstance();
    if (instance) {
      emit('register', modalMethods, instance.uid);
    }

    // Custom title component: get title
    const getMergeProps = computed(() => {
      return {
        ...props,
        ...unref(propsRef),
      };
    });

    const { handleFullScreen, getWrapClassName, fullScreenRef } = useFullScreen(
      {
        modalWrapperRef,
        extHeightRef,
        wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
      }
    );

    // modal component does not need title and origin buttons
    const getProps = computed(() => {
      const opt = {
        ...unref(getMergeProps),
        visible: unref(visibleRef),
        okButtonProps: undefined,
        cancelButtonProps: undefined,
        title: undefined,
      };
      return {
        ...opt,
        wrapClassName: unref(getWrapClassName),
      };
    });

    const getBindValue = computed(() => {
      const attr = {
        ...attrs,
        ...unref(getMergeProps),
        visible: unref(visibleRef),
        wrapClassName: unref(getWrapClassName),
      };
      if (unref(fullScreenRef)) {
        return omit(attr, ['height', 'title']);
      }
      return omit(attr, 'title');
    });

    const getWrapperHeight = computed(() => {
      if (unref(fullScreenRef)) return undefined;
      return unref(getProps).height;
    });

    watchEffect(() => {
      visibleRef.value = !!props.visible;
      fullScreenRef.value = !!props.defaultFullscreen;
    });

    watch(
      () => unref(visibleRef),
      v => {
        emit('visible-change', v);
        emit('update:visible', v);
        instance && modalMethods.emitVisible?.(v, instance.uid);
        nextTick(() => {
          if (props.scrollTop && v && unref(modalWrapperRef)) {
            unref(modalWrapperRef).scrollTop();
          }
        });
      },
      {
        immediate: false,
      }
    );

    // 取消事件
    async function handleCancel(e) {
      e?.stopPropagation();
      // 过滤自定义关闭按钮的空白区域
      if (e.target?.classList?.contains(prefixCls + '-close--custom')) return;
      // 有传递关闭弹窗的回调
      if (props.closeFunc && isFunction(props.closeFunc)) {
        // 回调函数的返回值来判断是否关闭弹窗
        const isClose = await props.closeFunc();
        visibleRef.value = !isClose;
        return;
      }

      // 没有传递关闭弹窗的回调
      visibleRef.value = false;
      emit('cancel', e);
    }

    /**
     * @description: 设置modal参数
     */
    function setModalProps(props) {
      // Keep the last setModalProps
      // 深度合并
      propsRef.value = deepMerge(unref(propsRef) || {}, props);
      if (Reflect.has(props, 'visible')) {
        visibleRef.value = !!props.visible;
      }
      if (Reflect.has(props, 'defaultFullscreen')) {
        fullScreenRef.value = !!props.defaultFullscreen;
      }
    }

    function handleOk(e) {
      emit('ok', e);
    }

    function handleHeightChange(height) {
      emit('height-change', height);
    }

    function handleExtHeight(height) {
      extHeightRef.value = height;
    }

    function handleTitleDbClick(e) {
      if (!props.canFullscreen) return;
      e.stopPropagation();
      handleFullScreen(e);
    }

    return {
      handleCancel,
      getBindValue,
      getProps,
      handleFullScreen,
      fullScreenRef,
      getMergeProps,
      handleOk,
      visibleRef,
      omit,
      modalWrapperRef,
      handleExtHeight,
      handleHeightChange,
      handleTitleDbClick,
      getWrapperHeight,
    };
  },
});
</script>
