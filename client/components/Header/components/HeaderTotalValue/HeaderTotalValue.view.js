import { number } from 'prop-types';

import styles from './HeaderTotalValue.module.css';

const propTypes = {
  usedWeight: number.isRequired,
  weightLimit: number.isRequired,
  totalValue: number.isRequired
};

const HeaderTotalValueView = ({ usedWeight, weightLimit, totalValue }) => (
  <dl className={styles.root}>
    <dt className={styles.label}>Total Value</dt>
    <dd className={styles.value}>{totalValue}</dd>
    <dt className={styles.label}>Used weight</dt>
    <dd className={styles.value}>
      {usedWeight} / {weightLimit}
    </dd>
  </dl>
);

HeaderTotalValueView.propTypes = propTypes;

export { HeaderTotalValueView };
