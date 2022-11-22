import {
  ref,
  onUnmounted,
  unref,
  getCurrentInstance,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
  computed,
} from 'vue';
import { isFunction } from '@/utils/index';
import { isEqual } from 'lodash-es';
import { tryOnUnmounted } from '@vueuse/core';

// **** 是否是生产环境，暂时写死
const isProdMode = true;
const error = message => {
  throw new Error(`[error]:${message}`);
};

const dataTransfer = reactive({});

const visibleData = reactive({});

/**
 * @description: Applicable to independent modal and call outside
 */
export function useModal() {
  const modal = ref(null);
  const loaded = ref(false);
  const uid = ref('');

  function register(modalMethod, uuid) {
    if (!getCurrentInstance()) {
      throw new Error(
        'useModal() can only be used inside setup() or functional components!'
      );
    }
    uid.value = uuid;
    isProdMode &&
      onUnmounted(() => {
        modal.value = null;
        loaded.value = false;
        dataTransfer[unref(uid)] = null;
      });
    if (unref(loaded) && isProdMode && modalMethod === unref(modal)) return;

    modal.value = modalMethod;
    loaded.value = true;
    modalMethod.emitVisible = (visible, uid) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods = {
    setModalProps: props => {
      getInstance()?.setModalProps(props);
    },

    getVisible: computed(() => {
      return visibleData[~~unref(uid)];
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.();
    },

    openModal: (visible = true, data, openOnSet = true) => {
      getInstance()?.setModalProps({
        visible: visible,
      });

      if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ visible: false });
    },
  };
  return [register, methods];
}

export const useModalInner = callbackFn => {
  const modalInstanceRef = ref(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref('');

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      error('useModalInner instance is undefined!');
    }
    return instance;
  };

  const register = (modalInstance, uuid) => {
    isProdMode &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null;
      });
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading });
      },
      getVisible: computed(() => {
        return visibleData[~~unref(uidRef)];
      }),

      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmLoading: loading });
      },

      closeModal: () => {
        getInstance()?.setModalProps({ visible: false });
        return true;
      },

      setModalProps: props => {
        getInstance()?.setModalProps(props);
      },

      redoModalHeight: () => {
        const callRedo = getInstance()?.redoModalHeight;
        callRedo && callRedo();
      },
    },
  ];
};
