import { useCallback, useEffect, useMemo, useState } from 'react';

import { DashboardView } from './Dashboard.view';
import { FILTERS_ENUM } from '../Filter/Filter';
import {
  useApplicationActions,
  useApplicationState
} from '../../contexts/ApplicationStore/ApplicationStore';

import { useFetchInitialData } from '../../__mock_data__/useFetchInitialData';
import { usePopup } from '../../hooks/usePopup';
import { POPUPS } from '../../contexts/UIStore/constants';
import { useNotification } from '../../hooks/useNotification';
import { useDashboardFocus } from '../../hooks/useDashboardFocus';
import { bindKeyboardShortcuts } from '../../utils';

const errorMessage = 'Something went wrong. Try again later.';

function getComputedValues(items) {
  return items.reduce(
    (acc, item) => ({
      totalValue: acc.totalValue + item.value,
      totalWeight: acc.totalWeight + item.weight
    }),
    {
      totalValue: 0,
      totalWeight: 0
    }
  );
}

const Dashboard = () => {
  const [filter, setFilter] = useState(FILTERS_ENUM.storage);

  const notification = useNotification();
  const popup = usePopup();

  const isPopupOpen = popup.current === POPUPS.addNewCargo;

  const { error, loading: isLoading } = useFetchInitialData();

  const { storageItems, cargoHoldItems, cargoHoldWeightLimit } =
    useApplicationState();

  const { moveItemToStorage, moveItemToCargoHold, resetItems } =
    useApplicationActions();

  const cargoHoldComputedValues = useMemo(
    () => getComputedValues(cargoHoldItems),
    [cargoHoldItems]
  );

  const focus = useDashboardFocus({
    storageItems,
    cargoHoldItems,
    moveItemToCargoHold,
    moveItemToStorage,
    isPopupOpen,
    totalWeight: cargoHoldComputedValues.totalWeight,
    weightLimit: cargoHoldWeightLimit
  });

  const storage = useMemo(
    () => ({
      isLoading,
      items: storageItems,
      onKeyDown: focus.shortcuts.storage,
      ...getComputedValues(storageItems)
    }),
    [isLoading, storageItems, focus.shortcuts.storage]
  );

  const cargoHold = useMemo(
    () => ({
      isLoading,
      items: cargoHoldItems,
      weightLimit: cargoHoldWeightLimit,
      onKeyDown: focus.shortcuts.cargoHold,
      ...cargoHoldComputedValues
    }),
    [
      isLoading,
      cargoHoldItems,
      cargoHoldWeightLimit,
      cargoHoldComputedValues,
      focus.shortcuts.cargoHold
    ]
  );

  const openPopup = useCallback(() => popup.open(POPUPS.addNewCargo), [popup]);

  const onKeyDown = useCallback(
    e => {
      const fn = bindKeyboardShortcuts({
        n: () => {
          openPopup();
          focus.set({ columnIndex: null, cardIndex: null });
        },
        x: resetItems
      });
      fn(e);
    },
    [focus, openPopup, resetItems]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown, resetItems]);

  useEffect(() => {
    if (error) {
      notification.show({ severity: 'alert', text: errorMessage });
    }
  }, [error]);

  if (error) {
    return <h1>{errorMessage}</h1>;
  }

  return (
    <DashboardView
      storage={storage}
      cargoHold={cargoHold}
      onAddNewItem={openPopup}
      onResetItems={resetItems}
      onMoveToCargoHold={moveItemToCargoHold}
      onMoveToStorage={moveItemToStorage}
      filter={filter}
      onFilterChange={setFilter}
      isPopupOpen={isPopupOpen}
      focus={focus}
    />
  );
};

export { Dashboard };
