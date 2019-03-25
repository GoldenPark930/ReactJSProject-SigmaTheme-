import { AsyncStorage } from 'react-native';

import axios from 'src/utils/ajax/services/axios-service';
import { PERSISTENT_PREFIX } from 'src/constants/app/defaults';

// TODO {Maksym}: move this component to the `src/utils` directory at some point

export async function storeUser(userId) {
  const id = userId.toString();
  await AsyncStorage.setItem('id', id);
}

export async function storeToken(token) {
  axios.setAuthorizationToken(token); // temporary workaround for axios
  await AsyncStorage.setItem('token', token);
}

export async function StoreUserAccountInfo(userInfo) {
  const storageData = [];
  const { firstName, lastName, username, email, phone, invited, id, status } = userInfo;
  if (firstName) storageData.push(['firstname', firstName]);
  if (lastName) storageData.push(['lastname', lastName]);
  if (username) storageData.push(['username', username]);
  if (email) storageData.push(['email', email]);
  if (phone) storageData.push(['phone', phone]);
  if (invited) storageData.push(['invited', invited]);
  if (id) storageData.push(['id', id.toString()]);
  if (status) storageData.push(['status', status]);
  await AsyncStorage.multiSet(storageData);
}

export async function retrieveUser() {
  const connectedUserId = await AsyncStorage.getItem('id');
  return connectedUserId;
}

export async function retrieveUsername() {
  const username = await AsyncStorage.getItem('username');
  return username;
}

export async function retrieveToken() {
  const storedToken = await AsyncStorage.getItem('token');
  axios.setAuthorizationToken(storedToken); // temporary workaround for axios
  return storedToken;
}

export function setTokenToAxios(token) {
  axios.setAuthorizationToken(token);
}

export async function clearStorage() {
  axios.setAuthorizationToken(null); // temporary workaround for axios

  // Get all keys from AsyncStorage
  const keys = await AsyncStorage.getAllKeys();

  // Filter out keys with persistent prefix
  const keysToRemove = await keys.filter(key => key.indexOf(PERSISTENT_PREFIX) === -1);

  // Remove everything else from the AsyncStorage
  return AsyncStorage.multiRemove(keysToRemove);
}
