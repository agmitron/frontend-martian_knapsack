import { render } from 'react-dom';
import { Router } from 'wouter';

import { Application } from './components/Application/Application';

import { ApplicationStoreProvider } from './contexts/ApplicationStore/ApplicationStore';

import './styles/normalize.css';
import './styles/base.css';
import './styles/theme.css';
import './styles/typography.css';

render(
  <Router>
    <ApplicationStoreProvider>
      <Application />
    </ApplicationStoreProvider>
  </Router>,
  document.querySelector('#root')
);
