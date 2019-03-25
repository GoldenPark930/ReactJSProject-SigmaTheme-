import * as AuthAPI from 'src/utils/ajax/api/authentication';
import * as UserAPI from 'src/utils/ajax/api/user';
import {
  CommonActions,
  SignupActions,
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

export const setSignupData = data => ({
  type: SignupActions.SIGNUP__SET_DATA,
  payload: data,
});

export const clearSignupData = () => ({
  type: SignupActions.SIGNUP__CLEAR_DATA,
});

export const setCurrentUser = user => ({
  type: CurrentUserActions.CURRENT_USER__SET_USER,
  payload: user,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga actions
|-------------------------------------------------------------------------------
*/

export const createVerificationCode = (data, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: SignupActions.SIGNUP__CREATE_CODE__SUBTYPES,
  promise: () => AuthAPI.createVerificationCode(data),
  onSuccessCallback,
});

export const verifyCode = (data, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: SignupActions.SIGNUP__AUTH_CODE__SUBTYPES,
  promise: () => AuthAPI.verifyCode(data),
  onSuccessCallback,
});

export const createNewUser = (data, onSuccessCallback = null) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: SignupActions.SIGNUP__CREATE_USER__SUBTYPES,
  promise: () => UserAPI.signup(data),
  onSuccessCallback,
});

export const doesEmailRegistered = (email, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: SignupActions.SUGNUP__DOES_EMAIL_REGISTERED__SUBTYPES,
  promise: () => AuthAPI.doesEmailRegistered(email),
  onSuccessCallback,
});

export const doesUsernameRegistered = (username, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: SignupActions.SUGNUP__DOES_USERNAME_REGISTERED__SUBTYPES,
  promise: () => AuthAPI.doesUsernameRegistered(username),
  onSuccessCallback,
});
