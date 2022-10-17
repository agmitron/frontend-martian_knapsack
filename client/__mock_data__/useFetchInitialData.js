import { useEffect, useState } from 'react';

import { useApplicationActions } from '../contexts/ApplicationStore/ApplicationStore';

import { config } from './config';
import { storageItems } from './storageItems';

const initialState = {
  storageItems,
  cargoHoldItems: [],
  cargoHoldWeightLimit: config.cargoHoldWeightLimit
};

function fetchInitialData(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Something went wrong'));
      } else {
        resolve(initialState);
      }
    }, 3500);
  });
}

export function useFetchInitialData(shouldFail) {
  const { init } = useApplicationActions();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchInitialData(shouldFail)
      .then(data => {
        init(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [init, shouldFail]);

  return { error, loading };
}
