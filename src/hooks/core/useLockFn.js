import { ref, unref } from 'vue';

export function useLockFn(fn) {
  const lockRef = ref(false);
  return async function (...args) {
    if (unref(lockRef)) return;
    lockRef.value = true;
    try {
      const ret = await fn(...args);
      lockRef.value = false;
      return ret;
    } catch (e) {
      lockRef.value = false;
      throw e;
    }
  };
}
