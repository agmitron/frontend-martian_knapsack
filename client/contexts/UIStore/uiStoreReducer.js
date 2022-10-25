import { ACTION_TYPES } from './uiStoreActionTypes';

export function uiStoreReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.OPEN_POPUP: {
      return { ...state, popup: action.payload };
    }

    case ACTION_TYPES.CLOSE_POPUP: {
      return { ...state, popup: null };
    }

    case ACTION_TYPES.SHOW_NOTIFICATION: {
      const notification = action.payload;
      return { ...state, notification };
    }

    case ACTION_TYPES.HIDE_NOTIFICATION: {
      return { ...state, notification: null };
    }

    default: {
      return state;
    }
  }
}
