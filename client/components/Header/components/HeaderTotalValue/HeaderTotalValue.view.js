import { number } from 'prop-types';

import styles from './HeaderTotalValue.module.css';

const propTypes = {
  totalValue: number.isRequired
};

const HeaderTotalValueView = ({ totalValue }) => (
  <dl className={styles.root}>
    <dt className={styles.label}>Total Value</dt>
    <dd className={styles.value}>{totalValue}</dd>
  </dl>
);

HeaderTotalValueView.propTypes = propTypes;

export { HeaderTotalValueView };
