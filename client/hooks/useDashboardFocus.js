import { useCallback, useMemo, useState } from 'react';
import { bindKeyboardShortcuts } from '../utils';

const focusControls = {
  left: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex: columnIndex - 1,
    cardIndex: cardIndex > lastCardIndex ? lastCardIndex : cardIndex
  }),
  right: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex: columnIndex + 1,
    cardIndex: cardIndex > lastCardIndex ? lastCardIndex : cardIndex
  }),
  up: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex,
    cardIndex: cardIndex <= 0 ? lastCardIndex : cardIndex - 1
  }),
  down: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex,
    cardIndex: cardIndex >= lastCardIndex ? 0 : cardIndex + 1
  }),
  blur: () => ({ columnIndex: null, cardIndex: null }),
  slide: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex,
    cardIndex: cardIndex >= lastCardIndex ? cardIndex - 1 : cardIndex
  })
};

function useDashboardFocus({
  storageItems,
  cargoHoldItems,
  moveItemToStorage,
  moveItemToCargoHold,
  totalWeight,
  weightLimit,
  isPopupOpen
}) {
  const [current, setCurrent] = useState({
    cardIndex: null,
    columnIndex: null
  });

  const lastStorageCardIndex = useMemo(
    () => storageItems.length - 1,
    [storageItems]
  );

  const lastCargoHoldCardIndex = useMemo(
    () => cargoHoldItems.length - 1,
    [cargoHoldItems]
  );

  const commonCargoCardShortcuts = useMemo(
    () => ({
      Escape: () => {
        if (!isPopupOpen) {
          setCurrent(focusControls.blur);
        }
      }
    }),
    [isPopupOpen]
  );

  const isNull = useMemo(
    () => current.columnIndex === null && current.cardIndex === null,
    [current.cardIndex, current.columnIndex]
  );

  const storage = bindKeyboardShortcuts({
    ...commonCargoCardShortcuts,
    ArrowRight: () =>
      setCurrent(prev => focusControls.right(prev, lastCargoHoldCardIndex)),
    ArrowUp: () =>
      setCurrent(prev => focusControls.up(prev, lastStorageCardIndex)),
    ArrowDown: () =>
      setCurrent(prev => focusControls.down(prev, lastStorageCardIndex)),
    Enter: (_, item) => {
      const isDisabled = item.weight + totalWeight >= weightLimit;

      if (!isDisabled) {
        moveItemToCargoHold(item.id);
        setCurrent(prev => focusControls.slide(prev, lastStorageCardIndex));
      }
    }
  });

  const cargoHold = bindKeyboardShortcuts({
    ...commonCargoCardShortcuts,
    ArrowLeft: () =>
      setCurrent(prev => focusControls.left(prev, lastStorageCardIndex)),
    ArrowUp: () =>
      setCurrent(prev => focusControls.up(prev, lastCargoHoldCardIndex)),
    ArrowDown: () =>
      setCurrent(prev => focusControls.down(prev, lastCargoHoldCardIndex)),
    Enter: (_, item) => {
      moveItemToStorage(item.id);
      setCurrent(prev => focusControls.slide(prev, lastCargoHoldCardIndex));
    }
  });

  const check = useCallback(
    (columnIndex, cardIndex) =>
      current.columnIndex === columnIndex && current.cardIndex === cardIndex,
    [current.cardIndex, current.columnIndex]
  );

  const reset = useCallback(
    () => setCurrent({ columnIndex: null, cardIndex: null }),
    []
  );

  return {
    current,
    isNull,
    shortcuts: {
      storage,
      cargoHold
    },
    set: setCurrent,
    check,
    reset
  };
}

export { useDashboardFocus };
