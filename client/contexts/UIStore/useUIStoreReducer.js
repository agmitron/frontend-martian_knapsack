import { useReducer } from 'react';
import { uiStoreReducer } from './uiStoreReducer';

export const initialState = {
  popup: null,
  notification: null
};

export function useUIStoreReducer() {
  return useReducer(uiStoreReducer, initialState);
}
