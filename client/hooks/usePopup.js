import { useEffect } from 'react';
import { useUIActions, useUIState } from '../contexts/UIStore/UIStore';

function usePopup() {
  const { popup } = useUIState();
  const { openPopup, closePopup } = useUIActions();

  useEffect(() => {
    const $root = document.querySelector(':root');

    if (!$root) {
      return;
    }

    if (popup) {
      $root.style.setProperty('--overflow-y', 'hidden');
    } else {
      $root.style.removeProperty('--overflow-y');
    }
  }, [popup]);

  return {
    open: popupName => openPopup(popupName),
    close: closePopup,
    current: popup
  };
}

export { usePopup };
