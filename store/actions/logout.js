import * as userAPI from 'src/utils/ajax/api/user';
import {
  CommonActions,
  LogoutActions,
  CurrentUserActions,
  CurrentGroupActions,
  PhoneNumberActions,
} from '../constants/action-types';

/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

/*
|-------------------------------------------------------------------------------
| Redux actions
|-------------------------------------------------------------------------------
*/

export const resetCurrentUserState = () => ({
  type: CurrentUserActions.CURRENT_USER__RESET_STATE,
});

export const resetCurrentGroupState = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__RESET_STATE,
});

export const resetPhoneNumberState = () => ({
  type: PhoneNumberActions.PHONE_NUMBER__RESET_STATE,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga actions
|-------------------------------------------------------------------------------
*/

export const logout = (params, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: LogoutActions.LOGOUT__LOGOUT__SUBTYPES,
  promise: () => userAPI.logout(params),
  onSuccessCallback,
});
