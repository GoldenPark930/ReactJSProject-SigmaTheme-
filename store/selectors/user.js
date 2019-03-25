import { createSelector } from 'reselect';

import { getImageUrl } from '../../utils/ajax/api/common';
import { getLocalImage } from '../../utils/helpers';
import { USER } from '../constants/store/upper-level-keys';

export const requestErrors = state =>
  state[USER].get('errors').toJS();

export const selectFetchingUserBanksListProgressStatus = state =>
  state[USER].get('fetchingBanksListInProgress');

export const selectFetchingTransactionHistoryListProgressStatus = state =>
  state[USER].get('fetchingTransactionHistoryListInProgress');

export const selectTransferToBankProgressStatus = state =>
  state[USER].get('transferToBankInProgress') || state[USER].get('fetchingUserDataInProgress');

export const selectRemovingUserBankProgressStatus = state =>
  state[USER].get('removingBankInProgress');

export const selectUpdatingUserDataProgressStatus = state =>
  state[USER].get('updatingUserDataInProgress');

export const selectUpdatingUserDocumentProgressStatus = state =>
  state[USER].get('updatingUserDocumentInProgress');

export const selectRetryingUserVerificationProgressStatus = state =>
  state[USER].get('retryingUserVerifiationInProgress');

export const selectUpdatingUserProfileImageProgressStatus = state =>
  state[USER].get('updatingUserProfileImageInProgress');

export const selectVerificationMailSendedBack = state =>
  state[USER].get('verificationMailSendedBack');

export const selectAddingBankAccountProgressStatus = state =>
  state[USER].get('addingNewBankAccountInProgress');

export const selectFetchingUserDataProgressStatus = state =>
  state[USER].get('fetchingUserDataInProgress');

export const selectFetchingUserBalanceDetailProgressStatus = state =>
  state[USER].get('fetchingUserBalanceDetailInProgress');

export const selectUserData = (state) => {
  const userData = state[USER].get('userData').toJS();

  return {
    ...userData,
    balance: parseFloat(userData.balance).toFixed(2),
    groupsBalance: parseFloat(userData.groupsBalance).toFixed(2),
    profileImage: { uri: userData.imageUrl },
  };
};

export const selectUserBalance = createSelector(
  selectUserData,
  user => user.balance,
);

export const selectUserAvailableBalance = createSelector(
  selectUserData,
  user => user.balanceDetail && user.balanceDetail.available || 0,
);

export const selectUserBalanceDetail = (state) => {
  const balanceDetail = state[USER].get('userBalanceDetail');
  if (!balanceDetail) return balanceDetail;

  return {
    ...balanceDetail,
    available: parseFloat(balanceDetail.available).toFixed(2),
    displayed: parseFloat(balanceDetail.displayed).toFixed(2),
    present: parseFloat(balanceDetail.present).toFixed(2),
  };
};

export const selectUserID = createSelector(
  selectUserData,
  user => user.id,
);

export const selectUserBanksList = state =>
  state[USER].get('banksList').toJS();

export const selectTransactionHistoryList = state =>
  state[USER].get('transactionHistoryList').toJS();
