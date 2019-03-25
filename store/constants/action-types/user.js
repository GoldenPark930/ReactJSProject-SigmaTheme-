/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

export default {
  /*
  |-----------------------------------------------------------------------------
  | Redux actions types
  |-----------------------------------------------------------------------------
  */

  USER__RESET_STATE: 'User.resetState',

  USER__UPDATE_GROUPS_BALANCE: 'User.updateGroupsBalanceLocaly',

  USER__UPDATE_USER_BALANCE: 'User.updateUserBalanceLocaly',

  /*
  |-----------------------------------------------------------------------------
  | Redux-saga API call actions subtypes
  |-----------------------------------------------------------------------------
  */

  USER__GET_USER_DATA__SUBTYPES: {
    START: 'User.getUserData:start',
    SUCCESS: 'User.getUserData:success',
    FAIL: 'User.getUserData:fail',
  },

  USER__GET_USER_DATA_BY_ID__SUBTYPES: {
    START: 'User.getUserDataById:start',
    SUCCESS: 'User.getUserDataById:success',
    FAIL: 'User.getUserDataById:fail',
  },

  USER__UPDATE_USER_DATA_BY_ID__SUBTYPES: {
    START: 'User.updateUserDataById:start',
    SUCCESS: 'User.updateUserDataById:success',
    FAIL: 'User.updateUserDataById:fail',
  },

  USER__UPDATE_USER_DOCUMENT__SUBTYPES: {
    START: 'User.updateUserDocument:start',
    SUCCESS: 'User.updateUserDocument:success',
    FAIL: 'User.updateUserDocument:fail',
  },

  USER__RETRY_USER_VERIFICATION__SUBTYPES: {
    START: 'User.retryUserVerification:start',
    SUCCESS: 'User.retryUserVerification:success',
    FAIL: 'User.retryUserVerification:fail',
  },

  USER__UPDATE_USER_PROFILE_IMAGE__SUBTYPES: {
    START: 'User.updateUserProfileImage:start',
    SUCCESS: 'User.updateUserProfileImage:success',
    FAIL: 'User.updateUserProfileImage:fail',
  },

  USER__BALANCE_DETAIL__SUBTYPES: {
    START: 'User.balanceDetail:start',
    SUCCESS: 'User.balanceDetail:success',
    FAIL: 'User.balanceDetail:fail',
  },

  USER__FETCH_BANKS_LIST__SUBTYPES: {
    START: 'User.fetchBanksList:start',
    SUCCESS: 'User.fetchBanksList:success',
    FAIL: 'User.fetchBanksList:fail',
  },

  USER__ADD_BANK__SUBTYPES: {
    START: 'User.addBank:start',
    SUCCESS: 'User.addBank:success',
    FAIL: 'User.addBank:fail',
  },

  USER__REMOVE_BANK__SUBTYPES: {
    START: 'User.removeBank:start',
    SUCCESS: 'User.removeBank:success',
    FAIL: 'User.removeBank:fail',
  },

  USER__TRANSFER_TO_BANK__SUBTYPES: {
    START: 'User.transferToBank:start',
    SUCCESS: 'User.transferToBank:success',
    FAIL: 'User.transferToBank:fail',
  },

  USER__SUBMIT_SUPPORT__SUBTYPES: {
    START: 'User.submitSupport:start',
    SUCCESS: 'User.submitSupport:success',
    FAIL: 'User.submitSupport:fail',
  },
  USER__FETCH_TRANSACTION_HISTORY_LIST__SUBTYPES: {
    START: 'User.fetchTransactionHistoryList:start',
    SUCCESS: 'User.fetchTransactionHistoryList:success',
    FAIL: 'User.fetchTransactionHistoryList:fail',
  },
  USER__EMAIL_VERIFICATION__SUBTYPES: {
    START: 'User.emailVerification:start',
    SUCCESS: 'User.emailVerification:success',
    FAIL: 'User.emailVerification:fail',
  },

  USER__GET_ALL_GROUPS: {
    START: 'User.getAllGroups:start',
    SUCCESS: 'User.getAllGroups:success',
    FAIL: 'User.getAllGroups:fail',
  },
};
