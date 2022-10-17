import { useReducer } from 'react';

import { applicationStoreReducer } from './applicationStoreReducer';

const initialState = {
  storageItems: [],
  cargoHoldItems: [],
  cargoHoldWeightLimit: 0
};

export function useApplicationStoreReducer() {
  return useReducer(applicationStoreReducer, initialState);
}
