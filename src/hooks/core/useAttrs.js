import { getCurrentInstance, reactive, shallowRef, watchEffect } from 'vue';

const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;

export function entries(obj) {
  return Object.keys(obj).map(key => [key, obj[key]]);
}

export function useAttrs(params = {}) {
  const instance = getCurrentInstance();
  if (!instance) return {};

  const {
    excludeListeners = false,
    excludeKeys = [],
    excludeDefaultKeys = true,
  } = params;
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(
    excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : []
  );

  // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
  instance.attrs = reactive(instance.attrs);

  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (
        !allExcludeKeys.includes(key) &&
        !(excludeListeners && LISTENER_PREFIX.test(key))
      ) {
        acm[key] = val;
      }

      return acm;
    }, {});

    attrs.value = res;
  });

  return attrs;
}
