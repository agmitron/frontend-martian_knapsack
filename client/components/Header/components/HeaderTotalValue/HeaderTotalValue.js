import { useMemo } from 'react';

import { HeaderTotalValueView } from './HeaderTotalValue.view';

import { useApplicationState } from '../../../../contexts/ApplicationStore/ApplicationStore';

const HeaderTotalValue = () => {
  const { cargoHoldItems } = useApplicationState();

  const totalValue = useMemo(
    () => cargoHoldItems.reduce((acc, curr) => acc + curr.value, 0),
    [cargoHoldItems]
  );

  return <HeaderTotalValueView totalValue={totalValue} />;
};

export { HeaderTotalValue };
