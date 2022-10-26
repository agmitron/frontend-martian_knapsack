import { useUIActions, useUIState } from '../contexts/UIStore/UIStore';

function usePopup() {
  const { popup } = useUIState();
  const { openPopup, closePopup } = useUIActions();

  return {
    open: popupName => openPopup(popupName),
    close: closePopup,
    current: popup
  };
}

export { usePopup };
