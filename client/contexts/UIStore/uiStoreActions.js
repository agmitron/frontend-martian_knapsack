import { ACTION_TYPES } from './uiStoreActionTypes';

export function openPopup(dispatch) {
  return popupName =>
    dispatch({ type: ACTION_TYPES.OPEN_POPUP, payload: popupName });
}

export function closePopup(dispatch) {
  return () => dispatch({ type: ACTION_TYPES.CLOSE_POPUP });
}
