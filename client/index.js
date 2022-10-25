import { render } from 'react-dom';
import { Router } from 'wouter';

import { Application } from './components/Application/Application';

import { ApplicationStoreProvider } from './contexts/ApplicationStore/ApplicationStore';
import { UIStoreProvider } from './contexts/UIStore/UIStore';

import './styles/normalize.css';
import './styles/base.css';
import './styles/theme.css';
import './styles/typography.css';

render(
  <Router>
    <UIStoreProvider>
      <ApplicationStoreProvider>
        <Application />
      </ApplicationStoreProvider>
    </UIStoreProvider>
  </Router>,
  document.querySelector('#root')
);
