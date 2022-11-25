<template>
  <div :class="computedClass">
    <template v-if="canFullscreen">
      <!-- 全屏状态 -->
      <Tooltip
        v-if="fullScreen"
        :title="t('component.modal.restore')"
        placement="bottom"
      >
        <FullscreenExitOutlined role="full" @click="handleFullScreen" />
      </Tooltip>

      <!-- 非全屏状态 -->
      <Tooltip v-else :title="t('component.modal.maximize')" placement="bottom">
        <FullscreenOutlined role="close" @click="handleFullScreen"
      /></Tooltip>
    </template>

    <Tooltip :title="t('component.modal.close')" placement="bottom">
      <CloseOutlined @click="handleCancel" />
    </Tooltip>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tooltip } from 'ant-design-vue';
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  CloseOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  name: 'ModalClose',
  props: {
    canFullscreen: {
      type: Boolean,
      default: true,
    },

    fullScreen: { type: Boolean },
  },
  components: {
    Tooltip,
    FullscreenExitOutlined,
    FullscreenOutlined,
    CloseOutlined,
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    /** state */
    const { t } = useI18n();
    const prefixCls = 'ws-basic-modal-close';
    /** computed */
    const computedClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--custom`,
        {
          [`${prefixCls}--can-full`]: props.canFullscreen,
        },
      ];
    });
    // 点击关闭按钮
    function handleCancel(e) {
      emit('cancel', e);
    }
    // 点击全屏按钮
    function handleFullScreen(e) {
      e?.stopPropagation();
      e?.preventDefault();
      // 分发全屏事件
      emit('fullscreen');
    }

    /** watch */

    /** lifecycle */

    /** methods */

    return { t, computedClass, handleFullScreen, handleCancel, prefixCls };
  },
});
</script>

<style scoped lang="less">
@prefix-cls: ~'ws-basic-modal-close';
.@{prefix-cls} {
  display: flex;
  height: 95%;
  align-items: center;

  > span {
    margin-left: 48px;
    font-size: 16px;
  }

  &--can-full {
    > span {
      margin-left: 12px;
    }
  }

  &:not(&--can-full) {
    > span:nth-child(1) {
      &:hover {
        font-weight: 700;
      }
    }
  }

  & span:nth-child(1) {
    display: inline-block;
    padding: 10px;

    &:hover {
      color: #07b464;
    }
  }

  & span:last-child {
    &:hover {
      color: red;
    }
  }
}
</style>
