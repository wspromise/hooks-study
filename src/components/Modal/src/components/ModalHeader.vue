<template>
  <BasicTitle
    :helpMessage="helpMessage"
    :span="span"
    :normal="normal"
    :helpProps="helpProps"
    @dblclick="handleDblclick"
  >
    {{ title }}
  </BasicTitle>
</template>
<script>
import { defineComponent } from 'vue';
import { BasicTitle } from '@/components/Basic';

export default defineComponent({
  name: 'BasicModalHeader',
  components: { BasicTitle },
  props: {
    helpMessage: {
      type: [String, Array],
    },
    title: { type: String },
    span: { type: Boolean },
    normal: { type: Boolean },
    // 帮助组件props
    helpProps: { type: Object },
  },
  emits: ['dblclick'],
  setup(props, { emit }) {
    const handleDblclick = e => {
      emit('dblclick', e);
    };
    return { handleDblclick };
  },
});
</script>
