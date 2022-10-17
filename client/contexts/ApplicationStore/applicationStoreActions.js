import { ACTION_TYPES } from './applicationStoreActionTypes';

export function init(dispatch) {
  return data => {
    dispatch({ type: ACTION_TYPES.init, payload: { data } });
  };
}

export function addNewItems(dispatch) {
  return items => {
    dispatch({ type: ACTION_TYPES.addNewItems, payload: { items } });
  };
}

export function resetItems(dispatch) {
  return () => {
    dispatch({ type: ACTION_TYPES.resetItems });
  };
}

export function moveItemToCargoHold(dispatch) {
  return id => {
    dispatch({ type: ACTION_TYPES.moveItemToCargoHold, payload: { id } });
  };
}

export function moveItemToStorage(dispatch) {
  return id => {
    dispatch({ type: ACTION_TYPES.moveItemToStorage, payload: { id } });
  };
}
