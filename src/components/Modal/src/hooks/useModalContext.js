import { createContext, useContext } from '@/hooks/core/useContext';

const key = Symbol();

export function createModalContext(context) {
  return createContext(context, key);
}

export function useModalContext() {
  return useContext(key);
}
