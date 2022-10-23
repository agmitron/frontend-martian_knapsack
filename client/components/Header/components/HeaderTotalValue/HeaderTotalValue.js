import { useMemo } from 'react';

import { HeaderTotalValueView } from './HeaderTotalValue.view';

import { useApplicationState } from '../../../../contexts/ApplicationStore/ApplicationStore';

function getUsedWeight(items) {
  return items.reduce((acc, { weight }) => acc + weight, 0);
}

const HeaderTotalValue = () => {
  const { cargoHoldItems, cargoHoldWeightLimit } = useApplicationState();

  const totalValue = useMemo(
    () => cargoHoldItems.reduce((acc, curr) => acc + curr.value, 0),
    [cargoHoldItems]
  );

  const usedWeight = useMemo(
    () => getUsedWeight(cargoHoldItems),
    [cargoHoldItems]
  );

  return (
    <HeaderTotalValueView
      totalValue={totalValue}
      weightLimit={cargoHoldWeightLimit}
      usedWeight={usedWeight}
    />
  );
};

export { HeaderTotalValue };
