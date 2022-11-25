<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="Modal Title1"
    :helpMessage="['提示1', '提示2']"
    :closeFunc="closeModal"
    :helpProps="{
      showIndex: true,
      trigger: 'click',
      fontColor: 'red', // 帮助文本字体颜色
      isManualControl: true, // 手动控制Tooltip的显示与隐藏
      visible: visibleHelp, // 用于手动控制浮层显隐
      onVisibleChange, // 显示隐藏的回调
    }"
    @visible-change="handleShow"
  >
    <template #insertFooter>
      <a-button type="primary" danger @click="setLines" :disabled="loading"
        >点我更新内容</a-button
      >
    </template>
    <template v-if="loading">
      <div class="empty-tips">加载中，稍等3秒……</div>
    </template>
    <template v-if="!loading">
      <ul>
        <li v-for="index in lines" :key="index">加载完成{{ index }}！</li>
      </ul>
    </template>

    <!-- 帮助组件的icon -->
    <template #help-icon>
      <PlayCircleOutlined />
    </template>
  </BasicModal>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import { BasicModal, useModalInner } from '@/components/Modal';
import { PlayCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'Modal1',
  components: { BasicModal, PlayCircleOutlined },
  setup() {
    const visibleHelp = ref(false);
    const loading = ref(true);
    const lines = ref(10);
    const [register, { setModalProps, redoModalHeight, closeModal }] =
      useModalInner();

    watch(
      () => lines.value,
      () => {
        redoModalHeight();
      }
    );

    function handleShow(visible) {
      if (visible) {
        loading.value = true;
        setModalProps({ loading: true, confirmLoading: true });
        setTimeout(() => {
          lines.value = Math.round(Math.random() * 30 + 5);
          loading.value = false;
          setModalProps({ loading: false, confirmLoading: false });
        }, 3000);
      }
    }

    function setLines() {
      lines.value = Math.round(Math.random() * 20 + 10);
    }

    function onVisibleChange(visible) {
      visibleHelp.value = visible;
    }
    return {
      visibleHelp,
      onVisibleChange,
      register,
      loading,
      handleShow,
      lines,
      setLines,
      closeModal,
    };
  },
});
</script>
<style scoped>
.empty-tips {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
