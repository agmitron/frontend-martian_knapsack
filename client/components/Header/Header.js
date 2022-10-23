import { HeaderTotalValue } from './components/HeaderTotalValue/HeaderTotalValue';

import EvilMartiansLogo from './assets/evil-martians.svg';

import styles from './Header.module.css';
import { bool } from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  isSticky: bool
};

const Header = ({ isSticky }) => (
  <header className={classNames(styles.root, { [styles.sticky]: isSticky })}>
    <div className={styles.logo}>
      <EvilMartiansLogo />
    </div>
    <h1 className={styles.title}>Martian Knapsack</h1>
    <div className={styles.stats}>
      <HeaderTotalValue />
    </div>
  </header>
);

Header.propTypes = propTypes;

export { Header };
