import { diffStoredValue } from './utils';
import { LocalStorageSettings } from '../models/localStorageSettings';

describe('utils', () => {
  it('should not update', () => {
    const storedValue = new Date().getTime();
    const result = diffStoredValue(storedValue);
    expect(result).toBeFalsy();
  });

  it('should update', () => {
    const halfHour = LocalStorageSettings.InvalidatedTime;
    const storedValue = new Date().getTime() - halfHour;
    const result = diffStoredValue(storedValue);
    expect(result).toBeTruthy();
  });
});
