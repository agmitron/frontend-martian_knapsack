import { useMemo, useState } from 'react';

import { DashboardView } from './Dashboard.view';
import { FILTERS_ENUM } from '../Filter/Filter';
import {
  useApplicationActions,
  useApplicationState
} from '../../contexts/ApplicationStore/ApplicationStore';

import { useFetchInitialData } from '../../__mock_data__/useFetchInitialData';
import { bindKeyboardShortcuts, focusControls } from './utils';

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
  const [focusedCargoCard, setFocusedCargoCard] = useState({
    cardIndex: null,
    columnIndex: null
  });

  const [filter, setFilter] = useState(FILTERS_ENUM.storage);

  const { error, loading } = useFetchInitialData();

  const { storageItems, cargoHoldItems, cargoHoldWeightLimit } =
    useApplicationState();

  const { moveItemToStorage, moveItemToCargoHold, resetItems } =
    useApplicationActions();

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
      Escape: () => setFocusedCargoCard(focusControls.blur)
    }),
    []
  );

  const storage = useMemo(
    () => ({
      loading,
      items: storageItems,
      onKeyDown: bindKeyboardShortcuts({
        ...commonCargoCardShortcuts,
        ArrowRight: () =>
          setFocusedCargoCard(prev =>
            focusControls.right(prev, lastCargoHoldCardIndex)
          ),
        ArrowUp: () =>
          setFocusedCargoCard(prev =>
            focusControls.up(prev, lastStorageCardIndex)
          ),
        ArrowDown: () =>
          setFocusedCargoCard(prev =>
            focusControls.down(prev, lastStorageCardIndex)
          ),
        Enter: (_, item) => {
          moveItemToCargoHold(item.id);
          setFocusedCargoCard(prev =>
            focusControls.slide(prev, lastStorageCardIndex)
          );
        }
      }),
      ...getComputedValues(storageItems)
    }),
    [
      loading,
      storageItems,
      commonCargoCardShortcuts,
      lastCargoHoldCardIndex,
      lastStorageCardIndex,
      moveItemToCargoHold
    ]
  );

  const cargoHold = useMemo(
    () => ({
      loading,
      items: cargoHoldItems,
      weightLimit: cargoHoldWeightLimit,
      onKeyDown: bindKeyboardShortcuts({
        ...commonCargoCardShortcuts,
        ArrowLeft: () =>
          setFocusedCargoCard(prev =>
            focusControls.left(prev, lastStorageCardIndex)
          ),
        ArrowUp: () =>
          setFocusedCargoCard(prev =>
            focusControls.up(prev, lastCargoHoldCardIndex)
          ),
        ArrowDown: () =>
          setFocusedCargoCard(prev =>
            focusControls.down(prev, lastCargoHoldCardIndex)
          ),
        Enter: (_, item) => {
          moveItemToStorage(item.id);
          setFocusedCargoCard(prev =>
            focusControls.slide(prev, lastCargoHoldCardIndex)
          );
        }
      }),
      ...getComputedValues(cargoHoldItems)
    }),
    [
      loading,
      cargoHoldItems,
      cargoHoldWeightLimit,
      commonCargoCardShortcuts,
      lastStorageCardIndex,
      lastCargoHoldCardIndex,
      moveItemToStorage
    ]
  );

  // TODO: handle error, show better UI
  if (error) return <h1>Something went wrong.</h1>;

  return (
    <DashboardView
      storage={storage}
      cargoHold={cargoHold}
      // TODO: Should pass modal opener handler
      onAddNewItem={() => {}}
      onResetItems={resetItems}
      onMoveToCargoHold={moveItemToCargoHold}
      onMoveToStorage={moveItemToStorage}
      focusedCargoCard={focusedCargoCard}
      onCargoCardFocus={setFocusedCargoCard}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
};

export { Dashboard };
