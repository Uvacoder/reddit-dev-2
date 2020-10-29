import { useContext, useState } from 'react';
import { AppState } from '../store/store';
import { failed } from '../actions/actions';
import { LocalStorageSettings } from '../models/localStorageSettings';
import { diffStoredValue } from '../utils/utils';

/* Nicked from: https://usehooks.com/useLocalStorage and modified slightly
 * to use dispatch to send error messages to state management if it should be needed
 */
export function useLocalStorage(key: string, initialValue?: any): [any, (value: any) => void] {
  const { dispatch } = useContext(AppState);
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch ({ message }) {
      dispatch(failed(message));
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch ({ message }) {
      dispatch(failed(message));
    }
  };
  return [storedValue, setValue];
}

// Not really used yet but will be used to not update so often
export function useLastUpdated(): [boolean, (value: any) => void] {
  const [storedValue, setStoredValue] = useLocalStorage(
    LocalStorageSettings.LastUpdated, new Date().getTime());
  const shouldUpdate = diffStoredValue(storedValue);
  return [shouldUpdate, setStoredValue];
}

// Store all checked subreddits in localstorage, just a hard wrapper around useLocalStorage
export function useSelectedSubreddits(): [string[], (value: any) => void] {
  const [storedValue, setStoredValue] = useLocalStorage(
    LocalStorageSettings.SelectedSubreddits, []);
  return [storedValue, setStoredValue];
}
