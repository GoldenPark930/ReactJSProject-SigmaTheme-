import { retrieveToken } from '../common/localStorage';
import ApiConstants from '../constants/api';
import FetchService from '../utils/ajax/services/fetch-service';

const { URL, AUTHROUTES } = ApiConstants;

// USED IN RESET PASS SCREEN
async function triggerResetPassword(data) {
  const url = `${URL}${AUTHROUTES.triggerResetPassword}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

// USED IN RESET PASS SCREEN
async function resetPassword(data) {
  const accessToken = await retrieveToken();
  const url = `${URL}${AUTHROUTES.resetPassword}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify(data),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

module.exports = {
  triggerResetPassword,
  resetPassword,
};
