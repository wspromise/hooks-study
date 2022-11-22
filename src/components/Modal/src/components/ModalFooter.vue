<template>
  <div>
    <slot name="insertFooter"></slot>
    <a-button
      v-bind="cancelButtonProps"
      @click="handleCancel"
      v-if="showCancelBtn"
    >
      {{ cancelText }}
    </a-button>

    <slot name="centerFooter"></slot>

    <a-button
      :type="okType"
      @click="handleOk"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      v-if="showOkBtn"
    >
      {{ okText }}
    </a-button>
    <slot name="appendFooter"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { basicProps } from '../props';

export default defineComponent({
  name: 'ModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  setup(props, { emit }) {
    function handleOk(e) {
      emit('ok', e);
    }

    function handleCancel(e) {
      emit('cancel', e);
    }

    return { handleOk, handleCancel };
  },
});
</script>

<style scoped lang="less"></style>
