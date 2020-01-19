// constants
import STORAGE_KEYS from '../constants/storageKeys';
// helpers
import { getFromSessionStorage, removeFromSessionStorage, setToSessionStorage } from './sessionStorage';

export const setAuthToken = (value) => setToSessionStorage(STORAGE_KEYS.authToken, value);
export const getAuthToken = () => getFromSessionStorage(STORAGE_KEYS.authToken);
export const removeAuthToken = () => removeFromSessionStorage(STORAGE_KEYS.authToken);
