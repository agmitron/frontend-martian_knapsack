import { createContext, useContext, useMemo } from 'react';
import { initialState, useUIStoreReducer } from './useUIStoreReducer';
import * as uiStoreActions from './uiStoreActions';
import { node } from 'prop-types';

const UIActionsContext = createContext();
const UIStateContext = createContext(initialState);

const propTypes = {
  children: node.isRequired
};

const UIStoreProvider = ({ children }) => {
  const [state, dispatch] = useUIStoreReducer();

  const actions = useMemo(() => {
    const actionsWithDispatch = Object.entries(uiStoreActions).map(
      ([key, action]) => [key, action(dispatch)]
    );

    return Object.fromEntries(actionsWithDispatch);
  }, [dispatch]);

  return (
    <UIActionsContext.Provider value={actions}>
      <UIStateContext.Provider value={state}>
        {children}
      </UIStateContext.Provider>
    </UIActionsContext.Provider>
  );
};

UIStoreProvider.propTypes = propTypes;

function useUIActions() {
  const context = useContext(UIActionsContext);

  if (context === undefined) {
    throw new Error('useUIActions must be used within a UIStoreProvider');
  }

  return context;
}

function useUIState() {
  const context = useContext(UIStateContext);

  if (context === undefined) {
    throw new Error('useUIState must be used within a UIStoreProvider');
  }

  return context;
}

export { UIStoreProvider, useUIActions, useUIState };
