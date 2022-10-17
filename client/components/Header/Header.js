import { HeaderTotalValue } from './components/HeaderTotalValue/HeaderTotalValue';

import EvilMartiansLogo from './assets/evil-martians.svg';

import styles from './Header.module.css';

const Header = () => (
  <header className={styles.root}>
    <EvilMartiansLogo className={styles.logo} />
    <h1 className={styles.title}>Martian Knapsack</h1>
    <div className={styles.value}>
      <HeaderTotalValue />
    </div>
  </header>
);

export { Header };
