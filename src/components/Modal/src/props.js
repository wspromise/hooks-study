import { i18n } from '@/i18n/index';
const t = i18n.global.t;

export const modalProps = {
  visible: { type: Boolean },
  scrollTop: { type: Boolean, default: true },
  height: { type: Number },
  minHeight: { type: Number },
  // open drag
  draggable: { type: Boolean, default: true },
  centered: { type: Boolean },
  cancelText: { type: String, default: t('component.modal.cancelText') },
  okText: { type: String, default: t('component.modal.okText') },
  closeFunc: {
    type: Function,
    default: () => {},
  },
};

export const basicProps = Object.assign({}, modalProps, {
  defaultFullscreen: { type: Boolean },
  // Can it be full screen
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // Warm reminder message
  helpMessage: { type: [String, Array] },
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  /**
   * @description: Show close button
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * @description: Show confirmation button
   */
  showOkBtn: { type: Boolean, default: true },

  wrapperProps: { type: Object },

  afterClose: { type: Function },

  bodyStyle: { type: Object },

  closable: { type: Boolean, default: true },

  closeIcon: { type: Object },

  confirmLoading: { type: Boolean },

  destroyOnClose: { type: Boolean },

  footer: { type: Object },

  getContainer: { type: Function },

  mask: { type: Boolean, default: true },

  maskClosable: { type: Boolean, default: true },
  keyboard: { type: Boolean, default: true },

  maskStyle: { type: Object },

  okType: { type: String, default: 'primary' },

  okButtonProps: { type: Object },

  cancelButtonProps: { type: Object },

  title: { type: String },

  visible: { type: Boolean },

  width: { type: [String, Number] },

  wrapClassName: { type: String },

  zIndex: { type: Number },
});
