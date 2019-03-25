import * as AuthAPI from './../../utils/ajax/api/authentication';
import {
  CommonActions,
  LoginActions,
  CurrentUserActions,
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

export const setCurrentUser = user => ({
  type: CurrentUserActions.CURRENT_USER__SET_USER,
  payload: user,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga actions
|-------------------------------------------------------------------------------
*/

export const createVerificationCode = data => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: LoginActions.LOGIN__CREATE_CODE__SUBTYPES,
  promise: () => AuthAPI.createVerificationCode(data),
});

export const verifyAndAuthenticate = data => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: LoginActions.LOGIN__AUTH_CODE__SUBTYPES,
  promise: () => AuthAPI.verifyAndAuthenticate(data),
});

export const facebookAuthenticate = accessToken => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: LoginActions.LOGIN__AUTH_FACEBOOK__SUBTYPES,
  promise: () => AuthAPI.facebookAuthenticate(accessToken),
});
