import { Route, Switch } from 'wouter';

import { Dashboard } from '../Dashboard/Dashboard';
import { Header } from '../Header/Header';
import { Launch } from '../Launch/Launch';

import styles from './Application.module.css';

const Application = () => (
  <div className={styles.root}>
    <Header />
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

export { Application };
