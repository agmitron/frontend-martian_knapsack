import { createContext, useContext, useMemo } from 'react';
import { node } from 'prop-types';

import { useApplicationStoreReducer } from './useApplicationStoreReducer';
import * as applicationStoreActions from './applicationStoreActions';

const ApplicationActionsContext = createContext();
const ApplicationStateContext = createContext();

const propTypes = {
  children: node.isRequired
};

const ApplicationStoreProvider = ({ children }) => {
  const [state, dispatch] = useApplicationStoreReducer();

  const actions = useMemo(() => {
    const actionsWithDispatch = Object.entries(applicationStoreActions).map(
      ([key, action]) => [key, action(dispatch)]
    );

    return Object.fromEntries(actionsWithDispatch);
  }, [dispatch]);

  return (
    <ApplicationActionsContext.Provider value={actions}>
      <ApplicationStateContext.Provider value={state}>
        {children}
      </ApplicationStateContext.Provider>
    </ApplicationActionsContext.Provider>
  );
};

ApplicationStoreProvider.propTypes = propTypes;

function useApplicationActions() {
  const context = useContext(ApplicationActionsContext);

  if (context === undefined) {
    throw new Error(
      'useApplicationActions must be used within a ApplicationStoreProvider'
    );
  }

  return context;
}

function useApplicationState() {
  const context = useContext(ApplicationStateContext);

  if (context === undefined) {
    throw new Error(
      'useApplicationState must be used within a ApplicationStoreProvider'
    );
  }

  return context;
}

export { ApplicationStoreProvider, useApplicationState, useApplicationActions };
