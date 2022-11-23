import { i18n } from '@/i18n/index';
const t = i18n.global.t;

export const modalProps = {
  // 对话框是否可见
  visible: { type: Boolean },
  // 是否滚动到顶部
  scrollTop: { type: Boolean, default: true },
  height: { type: Number },
  minHeight: { type: Number },
  // 是否开启拖拽
  draggable: { type: Boolean, default: true },
  // 垂直居中展示 Modal
  centered: { type: Boolean },
  // 取消按钮文字
  cancelText: { type: String, default: t('component.modal.cancelText') },
  // 确认按钮文字
  okText: { type: String, default: t('component.modal.okText') },
  // 关闭弹窗的回调
  closeFunc: {
    type: Function,
    default: () => {},
  },
  /**
   * modal标题
   */
  // 标题左侧是否显示色块
  span: { type: Boolean },
  // 是否默认文本，即不加粗
  normal: { type: Boolean },
  /**
   * 帮助组件props
   */
  helpProps: { type: Object },
};

export const basicProps = Object.assign({}, modalProps, {
  // 默认是否全屏
  defaultFullscreen: { type: Boolean },
  // 是否开启全屏
  canFullscreen: { type: Boolean, default: true },
  // 启用包装器后，可以增加底部的高度
  wrapperFooterOffset: { type: Number, default: 0 },
  // 温馨提醒信息
  helpMessage: { type: [String, Array] },
  // 是否设置容器
  useWrapper: { type: Boolean, default: true },
  // 是否开启loading
  loading: { type: Boolean },
  // loading的提示
  loadingTip: { type: String },
  // 是否显示关闭按钮
  showCancelBtn: { type: Boolean, default: true },
  // 是否显示确定按钮
  showOkBtn: { type: Boolean, default: true },
  // 容器的props
  wrapperProps: { type: Object },
  // Modal 完全关闭后的回调
  afterClose: { type: Function },
  // Modal body 样式
  bodyStyle: { type: Object },
  // 是否显示右上角的关闭按钮
  closable: { type: Boolean, default: true },
  // 自定义关闭图标
  closeIcon: { type: Object },
  // 确定按钮 loading
  confirmLoading: { type: Boolean },
  // 关闭时销毁 Modal 里的子元素
  destroyOnClose: { type: Boolean },
  // 底部内容，当不需要默认底部按钮时，可以设为 :footer="null"
  footer: { type: Object },
  // 指定 Modal 挂载的 HTML 节点
  getContainer: { type: Function },
  // 是否展示遮罩
  mask: { type: Boolean, default: true },
  // 点击蒙层是否允许关闭
  maskClosable: { type: Boolean, default: true },
  // 是否支持键盘 esc 关闭
  keyboard: { type: Boolean, default: true },
  // 遮罩样式
  maskStyle: { type: Object },
  // 确认按钮类型
  okType: { type: String, default: 'primary' },
  // ok 按钮 props
  okButtonProps: { type: Object },
  // cancel 按钮 props
  cancelButtonProps: { type: Object },
  // 标题
  title: { type: String },
  // 对话框是否可见
  visible: { type: Boolean },
  // 宽度
  width: { type: [String, Number] },
  // 对话框外层容器的类名
  wrapClassName: { type: String },
  // 设置 Modal 的 z-index
  zIndex: { type: Number },
});
