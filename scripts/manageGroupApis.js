import isNil from 'lodash/isNil';
import { retrieveToken } from '../common/localStorage';
import ApiConstants, { URL } from '../constants/api';
import FetchService from '../utils/ajax/services/fetch-service';

const format = require('string-template');

const { MANAGEGROUPROUTES } = ApiConstants;

/*
|-------------------------------------------------------------------------------
| ChargeRequests
|-------------------------------------------------------------------------------
*/
// USED IN MANAGE GROUP IN CHARGE GROUP
async function createChargeRequest(data) {
  const accessToken = await retrieveToken();
  const url = `${URL}${MANAGEGROUPROUTES.chargeRequest}`;
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

// USED IN MANAGE GROUP IN CHARGE GROUP
async function updateChargeRequest(data) {
  const { chargeRequestID, charges } = data;
  const accessToken = await retrieveToken();
  const url = `${URL}${format(MANAGEGROUPROUTES.chargeRequestUpdate, { chargeRequestId: chargeRequestID })}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(charges),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

// USED IN MANAGE GROUP IN CHART PAGE
async function summaryChargeRequests(groupID) {
  const accessToken = await retrieveToken();
  const filter = `?groupID=${groupID}`;
  const url = `${URL}${MANAGEGROUPROUTES.chargeRequestAllSummary}${filter}`;
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

// USED IN MANAGE GROUP IN CHART PAGE
async function summaryChargeRequest(chargeRequestId) {
  const accessToken = await retrieveToken();
  const url = `${URL}${format(MANAGEGROUPROUTES.chargeRequestSummary, { chargeRequestId })}`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

/*
|-------------------------------------------------------------------------------
| charges
|-------------------------------------------------------------------------------
*/
// USED IN MANAGE GROUP IN MY FEED
async function listCharges(groupId) {
  const accessToken = await retrieveToken();
  const url = `${URL}${format(MANAGEGROUPROUTES.groupCharges, { groupId })}?status=pending`;
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

// USED IN MANAGE GROUP IN MY FEED
async function acceptCharge(data) {
  const accessToken = await retrieveToken();
  const { chargeId, action, accountId } = data;
  const url = `${URL}${format(MANAGEGROUPROUTES.chargeAccept, { chargeId })}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, accountId }),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

// USED IN MANAGE GROUP IN MY FEED
async function declineCharge(data) {
  const accessToken = await retrieveToken();
  const { chargeId } = data;
  const url = `${URL}${format(MANAGEGROUPROUTES.chargeDecline, { chargeId })}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}
async function editCharge(chargeId, payload) {
  const accessToken = await retrieveToken();
  const url = `${URL}${format(MANAGEGROUPROUTES.chargeEdit, { chargeId })}`;
  const options = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}
// USED IN MANAGE GROUP IN MY FEED
async function deleteCharge(chargeId) {
  const accessToken = await retrieveToken();
  const url = `${URL}${format(MANAGEGROUPROUTES.chargeDelete, { chargeId })}`;
  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

module.exports = {
  createChargeRequest,
  updateChargeRequest,
  listCharges,
  acceptCharge,
  declineCharge,
  editCharge,
  deleteCharge,
  summaryChargeRequests,
  summaryChargeRequest,
};
