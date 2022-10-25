import classNames from 'classnames';
import { Route, Switch } from 'wouter';
import { useStickyHeader } from '../../hooks/useStickyHeader';

import { Dashboard } from '../Dashboard/Dashboard';
import { Header } from '../Header/Header';
import { Launch } from '../Launch/Launch';

import styles from './Application.module.css';

const Application = () => {
  const isHeaderSticky = useStickyHeader();

  return (
    <div
      className={classNames(styles.root, {
        [styles['with-gutter']]: isHeaderSticky
      })}
    >
      <Header isSticky={isHeaderSticky} />
      <main className={styles.content}>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/launch">
            <Launch />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export { Application };
