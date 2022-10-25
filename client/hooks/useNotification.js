import { useUIActions, useUIState } from '../contexts/UIStore/UIStore';

function useNotification() {
  const { notification } = useUIState();
  const { showNotification: show, hideNotification: hide } = useUIActions();

  return {
    show,
    hide,
    current: notification
  };
}

export { useNotification };
