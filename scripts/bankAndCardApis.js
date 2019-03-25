import isNil from 'lodash/isNil';
import { retrieveToken } from '../common/localStorage';
import ApiConstants from '../constants/api';
import FetchService from '../utils/ajax/services/fetch-service';

const format = require('string-template');

const { URL, BANKANDCCROUTES } = ApiConstants;

/*
|-------------------------------------------------------------------------------
| GrinkUsers
|-------------------------------------------------------------------------------
*/
// USED IN BANKS AND CARD & MANAGE GROUP
async function getUserBankAccounts() {
  const accessToken = await retrieveToken();
  const url = `${URL}${BANKANDCCROUTES.userListBankAccounts}`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  };
  const result = await FetchService.customFetch(url, options);
  if (!isNil(result)) return result.rows;
  return [];
}

/*
|-------------------------------------------------------------------------------
| Groups
|-------------------------------------------------------------------------------
*/

// USED IN MANAGE GROUPS IN GROUP BANKS AND CARDS
async function addGroupBankAccount(groupId, data) {
  const accessToken = await retrieveToken();
  const url = `${URL}${format(BANKANDCCROUTES.groupAddBankAccount, { groupId })}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

module.exports = {
  getUserBankAccounts,
  addGroupBankAccount,
};
