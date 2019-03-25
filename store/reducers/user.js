import { Map, List } from 'immutable';

import UserActions from '../constants/action-types/user';

// Define initial state
const initialState = Map({
  errors: Map({}),
  // Flags
  fetchingUserDataInProgress: false,
  fetchingBanksListInProgress: false,
  fetchingUserBalanceDetailInProgress: false,
  transferToBankInProgress: false,
  removingBankInProgress: false,
  updatingUserDataInProgress: false,
  updatingUserDocumentInProgress: false,
  retryingUserVerifiationInProgress: false,
  updatingUserProfileImageInProgress: false,
  sendingEmailVerificationInProgress: false,
  addingNewBankAccountInProgress: false,
  // Data
  lastRemovedBankId: 0,
  userData: Map({}),
  banksList: List([]),
  transactionHistoryList: List([]),
  verificationMailSendedBack: false,
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    // Start fetching user data process
    case UserActions.USER__GET_USER_DATA__SUBTYPES.START:
      return state
        .set('fetchingUserDataInProgress', true)
        .set('errors', Map({}));

    // Store request errors
    case UserActions.USER__GET_USER_DATA__SUBTYPES.FAIL:
      return state
        .set('fetchingUserDataInProgress', false)
        .set('errors', Map(action.errors));

    // Store user data
    case UserActions.USER__GET_USER_DATA__SUBTYPES.SUCCESS:
      return state
        .set('fetchingUserDataInProgress', false)
        .set('errors', Map({}))
        .set('userData', Map({ ...action.payload }));

    // Start fetching balance detail process
    case UserActions.USER__BALANCE_DETAIL__SUBTYPES.START:
      return state
        .set('fetchingUserBalanceDetailInProgress', true)
        .set('errors', Map({}));

    // Store request errors
    case UserActions.USER__BALANCE_DETAIL__SUBTYPES.FAIL:
      return state
        .set('fetchingUserBalanceDetailInProgress', false)
        .set('errors', Map(action.errors));

    // Store user's balance detail
    case UserActions.USER__BALANCE_DETAIL__SUBTYPES.SUCCESS:
      return state
        .set('fetchingUserBalanceDetailInProgress', false)
        .set('errors', Map({}))
        .set('userBalanceDetail', { ...action.payload })
        .set('userData', Map({
          ...state.get('userData').toJS(),
          ...{ balanceDetail: action.payload },
        }));

    // Start fetching banks list process
    case UserActions.USER__FETCH_BANKS_LIST__SUBTYPES.START:
      return state
        .set('fetchingBanksListInProgress', true)
        .set('errors', Map({}));

    // Store request errors
    case UserActions.USER__FETCH_BANKS_LIST__SUBTYPES.FAIL:
      return state
        .set('fetchingBanksListInProgress', false)
        .set('errors', Map(action.errors));

    // Store user's banks list
    case UserActions.USER__FETCH_BANKS_LIST__SUBTYPES.SUCCESS:
      return state
        .set('fetchingBanksListInProgress', false)
        .set('errors', Map({}))
        .set('banksList', List(action.payload.rows));

    // Start fetching transactionHistory list process
    case UserActions.USER__FETCH_TRANSACTION_HISTORY_LIST__SUBTYPES.START:
      return state
        .set('fetchingTransactionHistoryListInProgress', true)
        .set('errors', Map({}));

    // Store request errors
    case UserActions.USER__FETCH_TRANSACTION_HISTORY_LIST__SUBTYPES.FAIL:
      return state
        .set('fetchingTransactionHistoryListInProgress', false)
        .set('errors', Map(action.errors));

    // Store user's transactionHistory list
    case UserActions.USER__FETCH_TRANSACTION_HISTORY_LIST__SUBTYPES.SUCCESS:
      return state
        .set('fetchingTransactionHistoryListInProgress', false)
        .set('errors', Map({}))
        .set('transactionHistoryList', List(action.payload));

    // Start transfer to bank process
    case UserActions.USER__TRANSFER_TO_BANK__SUBTYPES.START:
      return state
        .set('transferToBankInProgress', true)
        .set('errors', Map({}));

    // Store transfer to bank request errors
    case UserActions.USER__TRANSFER_TO_BANK__SUBTYPES.FAIL:
      return state
        .set('transferToBankInProgress', false)
        .set('errors', Map(action.errors));

    // Stop transfer to bank process
    case UserActions.USER__TRANSFER_TO_BANK__SUBTYPES.SUCCESS:
      return state
        .set('transferToBankInProgress', false)
        .set('errors', Map({}));

    case UserActions.USER__REMOVE_BANK__SUBTYPES.START:
      return state
        .set('removingBankInProgress', true)
        .set('errors', Map({}));

    case UserActions.USER__REMOVE_BANK__SUBTYPES.FAIL:
      return state
        .set('removingBankInProgress', false)
        .set('errors', Map(action.errors));

    case UserActions.USER__REMOVE_BANK__SUBTYPES.SUCCESS:
      return state
        .set('removingBankInProgress', false)
        .set('lastRemovedBankId', action.payload)
        .set('errors', Map({}));

    // Start updating user data process
    case UserActions.USER__UPDATE_USER_DATA_BY_ID__SUBTYPES.START:
      return state
        .set('updatingUserDataInProgress', true)
        .set('errors', Map({}));

    // Store updating user data errors
    case UserActions.USER__UPDATE_USER_DATA_BY_ID__SUBTYPES.FAIL:
      return state
        .set('updatingUserDataInProgress', false)
        .set('errors', Map(action.errors));

    // Update user data and clear errors
    case UserActions.USER__UPDATE_USER_DATA_BY_ID__SUBTYPES.SUCCESS:
      return state
        .set('updatingUserDataInProgress', false)
        .set('updatingUserProfileImageInProgress', false)
        .set('errors', Map({}))
        .set('userData', Map({
          ...state.get('userData').toJS(),
          ...action.payload,
        }));

    // Start updating user document process
    case UserActions.USER__UPDATE_USER_DOCUMENT__SUBTYPES.START:
      return state
        .set('updatingUserDocumentInProgress', true)
        .set('errors', Map({}));

    // Store updating user document errors
    case UserActions.USER__UPDATE_USER_DOCUMENT__SUBTYPES.FAIL:
      return state
        .set('updatingUserDocumentInProgress', false)
        .set('errors', Map(action.errors));

    // Update user document and clear errors
    case UserActions.USER__UPDATE_USER_DOCUMENT__SUBTYPES.SUCCESS:
      return state
        .set('updatingUserDocumentInProgress', false)
        .set('errors', Map({}));

    // Start retrying verification process
    case UserActions.USER__RETRY_USER_VERIFICATION__SUBTYPES.START:
      return state
        .set('retryingUserVerifiationInProgress', true)
        .set('errors', Map({}));

    // Store retrying verification errors
    case UserActions.USER__RETRY_USER_VERIFICATION__SUBTYPES.FAIL:
      return state
        .set('retryingUserVerifiationInProgress', false)
        .set('errors', Map(action.errors));

    // Update retrying verification and clear errors
    case UserActions.USER__RETRY_USER_VERIFICATION__SUBTYPES.SUCCESS:
      return state
        .set('retryingUserVerifiationInProgress', false)
        .set('errors', Map({}));

    // Start updating user profile image process
    case UserActions.USER__UPDATE_USER_PROFILE_IMAGE__SUBTYPES.START:
      return state
        .set('updatingUserProfileImageInProgress', true)
        .set('errors', Map({}));

    // Store updating user profile image errors
    case UserActions.USER__UPDATE_USER_PROFILE_IMAGE__SUBTYPES.FAIL:
      return state
        .set('updatingUserProfileImageInProgress', false)
        .set('errors', Map(action.errors));

    // Update user data and clear errors
    case UserActions.USER__UPDATE_USER_PROFILE_IMAGE__SUBTYPES.SUCCESS:
      return state
        .set('updatingUserDataInProgress', false)
        .set('updatingUserProfileImageInProgress', false)
        .set('errors', Map({}))
        .set('userData', Map({
          ...state.get('userData').toJS(),
          image: action.payload.id || null,
        }));

    // Start resend mail verification process
    case UserActions.USER__EMAIL_VERIFICATION__SUBTYPES.START:
      return state
        .set('sendingEmailVerificationInProgress', true)
        .set('verificationMailSendedBack', false);

    // Store updating user profile image errors
    case UserActions.USER__EMAIL_VERIFICATION__SUBTYPES.FAIL:
      return state
        .set('sendingEmailVerificationInProgress', false)
        .set('verificationMailSendedBack', false)
        .set('errors', Map(action.errors));

    // Update user data and clear errors
    case UserActions.USER__EMAIL_VERIFICATION__SUBTYPES.SUCCESS:
      return state
        .set('sendingEmailVerificationInProgress', false)
        .set('verificationMailSendedBack', true);

    case UserActions.USER__ADD_BANK__SUBTYPES.START:
      return state
        .set('addingNewBankAccountInProgress', true);

    case UserActions.USER__ADD_BANK__SUBTYPES.FAIL:
      return state
        .set('addingNewBankAccountInProgress', false)
        .set('errors', Map(action.errors));

    case UserActions.USER__ADD_BANK__SUBTYPES.SUCCESS:
      return state
        .set('addingNewBankAccountInProgress', false);


    case UserActions.USER__UPDATE_GROUPS_BALANCE:
      return state
        .set('userData', Map({
          ...state.get('userData').toJS(),
          groupsBalance: action.groupsBalance,
        }));

    case UserActions.USER__UPDATE_USER_BALANCE:
      return state
        .set('userData', Map({
          ...state.get('userData').toJS(),
          balance: action.balance,
        }));

    default:
      return state;
  }
}
