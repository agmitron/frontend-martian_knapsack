import { useMemo } from 'react';

import { DashboardView } from './Dashboard.view';

import {
  useApplicationActions,
  useApplicationState
} from '../../contexts/ApplicationStore/ApplicationStore';

import { useFetchInitialData } from '../../__mock_data__/useFetchInitialData';

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
  const { error, loading } = useFetchInitialData();

  const { storageItems, cargoHoldItems, cargoHoldWeightLimit } =
    useApplicationState();

  const { moveItemToStorage, moveItemToCargoHold, resetItems } =
    useApplicationActions();

  const storage = useMemo(
    () => ({
      items: storageItems,
      ...getComputedValues(storageItems),
      loading
    }),
    [storageItems, loading]
  );

  const cargoHold = useMemo(
    () => ({
      items: cargoHoldItems,
      weightLimit: cargoHoldWeightLimit,
      ...getComputedValues(cargoHoldItems),
      loading
    }),
    [cargoHoldWeightLimit, cargoHoldItems, loading]
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
      filter="storage"
    />
  );
};

export { Dashboard };
