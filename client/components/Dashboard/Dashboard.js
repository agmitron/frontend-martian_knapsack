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
import { useFocus } from '../../hooks/useFocus';

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

  const { error, loading: isLoading } = useFetchInitialData();

  const { storageItems, cargoHoldItems, cargoHoldWeightLimit } =
    useApplicationState();

  const { moveItemToStorage, moveItemToCargoHold, resetItems } =
    useApplicationActions();

  const focus = useFocus({
    storageItems,
    cargoHoldItems,
    moveItemToCargoHold,
    moveItemToStorage
  });

  const isAddNewCargoPopupOpen = popup.current === POPUPS.addNewCargo;

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
      ...getComputedValues(cargoHoldItems)
    }),
    [isLoading, cargoHoldItems, cargoHoldWeightLimit, focus.shortcuts.cargoHold]
  );

  const closePopup = useCallback(
    e => e.key === 'Escape' && popup.close(),
    [popup]
  );

  useEffect(() => {
    if (isAddNewCargoPopupOpen) {
      window.addEventListener('keydown', closePopup);
    } else {
      window.removeEventListener('keydown', closePopup);
    }
  }, [closePopup, isAddNewCargoPopupOpen]);

  if (error) {
    const text = 'Something went wrong.';
    notification.show({ severity: 'error', text });
    return <h1>{text}</h1>;
  }

  return (
    <DashboardView
      storage={storage}
      cargoHold={cargoHold}
      onAddNewItem={() => popup.open(POPUPS.addNewCargo)}
      onResetItems={resetItems}
      onMoveToCargoHold={moveItemToCargoHold}
      onMoveToStorage={moveItemToStorage}
      focusedCargoCard={focus.current}
      onCargoCardFocus={focus.set}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
};

export { Dashboard };
