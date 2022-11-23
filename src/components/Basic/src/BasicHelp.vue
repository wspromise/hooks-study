<script lang="jsx">
import { defineComponent, computed, unref } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { getPopupContainer, isString, isArray } from '@/utils';
import { getSlot } from '@/utils/helper/tsxHelper';
import { basicHelpProps, TooltipProps } from './props.js';

export default defineComponent({
  name: 'BasicHelp',
  components: { Tooltip },
  props: basicHelpProps,
  setup(props, { slots }) {
    // 类名
    const prefixCls = 'ws-basic-help';

    // 获取文字提示的样式
    const getTooltipStyle = computed(() => ({
      color: props.color,
      fontSize: props.fontSize,
    }));

    // 计算文字提示组件props
    const computedTooltipProps = computed(() => {
      let attrMap = {};
      for (const key in TooltipProps) {
        if (Object.hasOwnProperty.call(TooltipProps, key)) {
          attrMap[key] = props[key];
        }
      }

      return attrMap;
    });
    console.log(computedTooltipProps, 123);

    // 获取卡片样式
    const getOverlayStyle = computed(() => ({ maxWidth: props.maxWidth }));

    // 渲染标题
    function renderTitle() {
      // 获取文本或者文本列表
      const textList = props.text;

      if (isString(textList)) {
        // 文本
        return <p>{textList}</p>;
      }

      // 文本列表
      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          );
        });
      }
      return null;
    }

    return () => {
      return (
        <Tooltip
          {...computedTooltipProps.value}
          overlayClassName={`${prefixCls}__wrap`}
          title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class={prefixCls}>
            {getSlot(slots) || <InfoCircleOutlined />}
          </span>
        </Tooltip>
      );
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'ws-basic-help';

.@{prefix-cls} {
  display: inline-block;
  margin-left: 6px;
  font-size: 14px;
  color: black;
  cursor: pointer;

  &:hover {
    color: #07b464;
  }

  &__wrap {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
