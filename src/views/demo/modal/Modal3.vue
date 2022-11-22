<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    width="700px"
    :closeFunc="closeModal"
  >
    <p class="h-20" v-for="index in 20" :key="index">根据屏幕高度自适应</p>
  </BasicModal>
</template>
<script>
import { defineComponent } from 'vue';
import { BasicModal, useModalInner } from '@/components/Modal';
export default defineComponent({
  name: 'Modal3',
  components: { BasicModal },
  setup() {
    const [register, { closeModal, setModalProps }] = useModalInner();

    return {
      register,
      closeModal,
      setModalProps: () => {
        setModalProps({ title: 'Modal New Title' });
      },
    };
  },
});
</script>
