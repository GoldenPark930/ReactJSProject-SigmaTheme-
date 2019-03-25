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

  SIGNUP__SET_DATA: 'Signup.setData',
  SIGNUP__CLEAR_DATA: 'Signup.clearData',

  /*
  |-----------------------------------------------------------------------------
  | Redux-saga API call actions subtypes
  |-----------------------------------------------------------------------------
  */

  SIGNUP__CREATE_CODE__SUBTYPES: {
    START: 'Signup.createCode:start',
    SUCCESS: 'Signup.createCode:success',
    FAIL: 'Signup.createCode:fail',
  },

  SIGNUP__AUTH_CODE__SUBTYPES: {
    START: 'Signup.authCode:start',
    SUCCESS: 'Signup.authCode:success',
    FAIL: 'Signup.authCode:fail',
  },

  SIGNUP__CREATE_USER__SUBTYPES: {
    START: 'Signup.createUser:start',
    SUCCESS: 'Signup.createUser:success',
    FAIL: 'Signup.createUser:fail',
  },

  SUGNUP__DOES_EMAIL_REGISTERED__SUBTYPES: {
    START: 'Signup.doesEmailRegistered:start',
    SUCCESS: 'Signup.doesEmailRegistered:success',
    FAIL: 'Signup.doesEmailRegistered:fail',
  },

  SUGNUP__DOES_USERNAME_REGISTERED__SUBTYPES: {
    START: 'Signup.doesUsernameRegistered:start',
    SUCCESS: 'Signup.doesUsernameRegistered:success',
    FAIL: 'Signup.doesUsernameRegistered:fail',
  },
};
