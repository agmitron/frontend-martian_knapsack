import classNames from 'classnames';
import { Route, Switch } from 'wouter';
import { useNotification } from '../../hooks/useNotification';
import { useStickyHeader } from '../../hooks/useStickyHeader';
import { Alert } from '../Alert/Alert';

import { Dashboard } from '../Dashboard/Dashboard';
import { Header } from '../Header/Header';
import { Launch } from '../Launch/Launch';
import { Snackbar } from '../Snackbar/Snackbar';

import styles from './Application.module.css';

const Application = () => {
  const isHeaderSticky = useStickyHeader();
  const notification = useNotification();

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
      <Snackbar isOpen={!!notification.current} onClose={notification.hide}>
        {notification.current && (
          <Alert severity={notification.current.severity}>
            {notification.current.text}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export { Application };
