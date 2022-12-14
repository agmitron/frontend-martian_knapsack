import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
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

  const [isFirstElementFocused, setIsFirstElementFocused] = useState(false);

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

  const set = useCallback(
    state => {
      if (!isFirstElementFocused) {
        setCurrent(state);
      }
    },
    [isFirstElementFocused]
  );

  const check = useCallback(
    (columnIndex, cardIndex) =>
      current.columnIndex === columnIndex && current.cardIndex === cardIndex,
    [current.cardIndex, current.columnIndex]
  );

  const reset = useCallback(() => {
    setCurrent({ columnIndex: null, cardIndex: null });
    setIsFirstElementFocused(false);
  }, []);

  useLayoutEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        document.body.focus();
        reset();
      }

      if (e.key === 'Tab' && isNull) {
        setIsFirstElementFocused(document.activeElement === document.body);
      }

      if (e.key === 'ArrowDown' && isNull) {
        setCurrent({ columnIndex: 0, cardIndex: 0 });
        setIsFirstElementFocused(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isNull, reset]);

  return {
    current,
    isNull,
    isFirstElementFocused,
    shortcuts: {
      storage,
      cargoHold
    },
    set,
    check,
    reset
  };
}

export { useDashboardFocus };
