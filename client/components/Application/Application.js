import { useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';

import { Dashboard } from '../Dashboard/Dashboard';
import { Header } from '../Header/Header';
import { Launch } from '../Launch/Launch';

import styles from './Application.module.css';

const Application = () => {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const toggleHeaderStickiness = () => {
      setIsHeaderSticky(window.scrollY >= 150);
    };

    window.addEventListener('scroll', toggleHeaderStickiness);

    return () => {
      window.removeEventListener('scroll', toggleHeaderStickiness);
    };
  }, []);

  return (
    <div className={styles.root}>
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
