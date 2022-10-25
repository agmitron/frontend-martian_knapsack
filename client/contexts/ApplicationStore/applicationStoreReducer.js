import { ACTION_TYPES } from './applicationStoreActionTypes';

export function applicationStoreReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.init: {
      const { data } = action.payload;

      return { ...state, ...data };
    }
    case ACTION_TYPES.moveItemToCargoHold: {
      const { id } = action.payload;

      const item = state.storageItems.find(entry => entry.id === id);
      const storageItems = state.storageItems.filter(entry => entry.id !== id);
      const cargoHoldItems = [item, ...state.cargoHoldItems];

      return { ...state, storageItems, cargoHoldItems };
    }
    case ACTION_TYPES.moveItemToStorage: {
      const { id } = action.payload;

      const item = state.cargoHoldItems.find(entry => entry.id === id);
      const cargoHoldItems = state.cargoHoldItems.filter(
        entry => entry.id !== id
      );
      const storageItems = [item, ...state.storageItems];

      return { ...state, storageItems, cargoHoldItems };
    }
    case ACTION_TYPES.addNewItems: {
      const { items } = action.payload;

      const storageItems = [...items, ...state.storageItems];

      return { ...state, storageItems };
    }
    case ACTION_TYPES.resetItems: {
      const storageItems = [...state.storageItems, ...state.cargoHoldItems];
      return { ...state, storageItems, cargoHoldItems: [] };
    }
    default:
      throw new Error(
        `action.type "${action.type}" is not available for ApplicationStateReducer`
      );
  }
}
