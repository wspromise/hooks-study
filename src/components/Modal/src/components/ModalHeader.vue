<template>
  <BasicTitle :helpMessage="helpMessage">
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
  },
  emits: ['dblclick'],
});
</script>
