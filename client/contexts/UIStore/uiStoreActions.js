import { ACTION_TYPES } from './uiStoreActionTypes';

export function openPopup(dispatch) {
  return popupName =>
    dispatch({ type: ACTION_TYPES.OPEN_POPUP, payload: popupName });
}

export function closePopup(dispatch) {
  return () => dispatch({ type: ACTION_TYPES.CLOSE_POPUP });
}

export function showNotification(dispatch) {
  return payload => dispatch({ type: ACTION_TYPES.SHOW_NOTIFICATION, payload });
}

export function hideNotification(dispatch) {
  return () => dispatch({ type: ACTION_TYPES.HIDE_NOTIFICATION });
}
