import { LocalStorageSettings } from '../models/localStorageSettings';

export function diffStoredValue(storedValue: any = new Date().getTime()): boolean {
  return new Date().getTime() - storedValue >= LocalStorageSettings.InvalidatedTime;
}
