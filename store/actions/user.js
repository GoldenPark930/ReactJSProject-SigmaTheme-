import last from 'lodash/last';
import lowerCase from 'lodash/lowerCase';
import * as UserApi from '../../utils/ajax/api/user';
import CommonActions from '../constants/action-types/common';
import UserActions from '../constants/action-types/user';

/*
|-------------------------------------------------------------------------------
| Redux actions
|-------------------------------------------------------------------------------
*/

/*
|-------------------------------------------------------------------------------
| Redux-saga actions
|-------------------------------------------------------------------------------
*/

export const getUserData = (onSuccessCallback, onFailCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__GET_USER_DATA__SUBTYPES,
  promise: () => UserApi.getUserData(),
  onSuccessCallback,
  onFailCallback,
});

export const getUserDataById = userId => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__GET_USER_DATA_BY_ID__SUBTYPES,
  promise: () => UserApi.getUserDataById(userId),
});

export const updateUserDataById = (userId, payload, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__UPDATE_USER_DATA_BY_ID__SUBTYPES,
  promise: () => UserApi.updateUserDataById(userId, payload),
  onSuccessCallback,
});

export const updateUserDocument = (payload, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__UPDATE_USER_DOCUMENT__SUBTYPES,
  promise: () => UserApi.updateUserDocument(payload),
  onSuccessCallback,
});

export const retryUserVerification = (payload, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__RETRY_USER_VERIFICATION__SUBTYPES,
  promise: () => UserApi.retryUserVerification(payload),
  onSuccessCallback,
});

export const updateUserProfileImage = ({ fileName, data: base64string }) => {
  const payload = {
    type: 'profile',
    file: base64string,
  };
  if (fileName !== undefined) payload.extension = lowerCase(last(fileName.split('.')));

  return {
    type: CommonActions.COMMON__API_CALL,
    subtypes: UserActions.USER__UPDATE_USER_PROFILE_IMAGE__SUBTYPES,
    promise: () => UserApi.updateUserProfileImage(payload),
  };
};

export const getUserBalanceDetails = () => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__BALANCE_DETAIL__SUBTYPES,
  promise: () => UserApi.getBalanceDetails(),
});

export const getUserBanksAccountsList = () => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__FETCH_BANKS_LIST__SUBTYPES,
  promise: () => UserApi.getBanksAccountsList(),
});

export const addUserBank = (banksData, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__ADD_BANK__SUBTYPES,
  promise: () => UserApi.addBankAccount(banksData),
  onSuccessCallback,
});

export const getUserTransactionHistoryList = () => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__FETCH_TRANSACTION_HISTORY_LIST__SUBTYPES,
  promise: () => UserApi.getTransactionHistoryList(),
});

export const removeUserBank = (bankId, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__REMOVE_BANK__SUBTYPES,
  promise: () => UserApi.removeUserBank(bankId),
  onSuccessCallback,
});

export const makeWithdrawFromUserToBank = (amount, accountId, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__TRANSFER_TO_BANK__SUBTYPES,
  promise: () => UserApi.makeWithdraw({ amount, accountId }),
  onSuccessCallback,
});

export const submitSupport = (messageType, message, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__SUBMIT_SUPPORT__SUBTYPES,
  promise: () => UserApi.submitSupport({ messageType, message }),
  onSuccessCallback,
});

export const resendEmailVerification = onSuccessCallback => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: UserActions.USER__EMAIL_VERIFICATION__SUBTYPES,
  promise: () => UserApi.resendEmailVerification(),
  onSuccessCallback,
});

export const updateGroupBalance = groupsBalance => ({
  type: UserActions.USER__UPDATE_GROUPS_BALANCE,
  groupsBalance,
});

export const updateUserBalance = balance => ({
  type: UserActions.USER__UPDATE_USER_BALANCE,
  balance,
});

