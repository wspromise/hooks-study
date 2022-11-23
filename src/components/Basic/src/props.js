export const TooltipProps = {
  // 提示文字
  title: { type: [String, Object] },
  // 该值将合并到 placement 的配置中
  align: { type: Object },
  // 箭头是否指向目标元素中心
  arrowPointAtCenter: { type: Boolean, default: false },
  // 气泡被遮挡时自动调整位置
  autoAdjustOverflow: { type: Boolean, default: true },
  // 背景颜色
  //   color: { type: String },
  // 默认是否显隐
  //   defaultVisible: { type: Boolean, default: false },
  // 隐藏后是否销毁 tooltip
  destroyTooltipOnHide: { type: Boolean, default: false },
  // 浮层渲染父节点，默认渲染到 body 上
  getPopupContainer: { type: Function, default: () => document.body },
  // 鼠标移入后延时多少才显示 Tooltip
  mouseEnterDelay: { type: Number, default: 0.1 },
  // 鼠标移出后延时多少才隐藏 Tooltip，单位：秒
  mouseLeaveDelay: { type: Number, default: 0.1 },
  // 卡片类名
  overlayClassName: { type: String, default: '' },
  // 卡片样式
  overlayStyle: { type: Object },
  // 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom	string	top
  placement: { type: String, default: 'top' },
  // 触发行为，可选 hover/focus/click/contextmenu
  trigger: { type: String, default: 'hover' },
  // 用于手动控制浮层显隐
  //   visible: { type: Boolean, default: false },
};

export const basicHelpProps = Object.assign({}, TooltipProps, {
  /**
   * 帮助文本最大宽度
   * @default: 600px
   */
  maxWidth: { type: String, default: '600px' },
  /**
   * 是否显示序号
   * @default: false
   */
  showIndex: { type: Boolean },
  /**
   * 帮助文本字体颜色
   * @default: #fff
   */
  color: { type: String, default: '#fff' },
  /**
   * 帮助文本字体大小
   * @default: 14px
   */
  fontSize: { type: String, default: '14px' },
  /**
   * 帮助文本放置位置
   */
  placement: { type: String, default: 'right' },
  /**
   * 帮助文本
   */
  text: { type: [Array, String] },
});
