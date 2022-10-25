import { ACTION_TYPES } from './uiStoreActionTypes';

export function uiStoreReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.OPEN_POPUP: {
      return { ...state, popup: action.payload };
    }

    case ACTION_TYPES.CLOSE_POPUP: {
      return { ...state, popup: null };
    }

    default: {
      return state;
    }
  }
}
