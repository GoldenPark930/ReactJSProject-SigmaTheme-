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

  /*
  |-----------------------------------------------------------------------------
  | Redux-saga API call actions subtypes
  |-----------------------------------------------------------------------------
  */

  LOGIN__CREATE_CODE__SUBTYPES: {
    START: 'Login.createCode:start',
    SUCCESS: 'Login.createCode:success',
    FAIL: 'Login.createCode:fail',
  },

  LOGIN__AUTH_CODE__SUBTYPES: {
    START: 'Login.authCode:start',
    SUCCESS: 'Login.authCode:success',
    FAIL: 'Login.authCode:fail',
  },

  LOGIN__AUTH_FACEBOOK__SUBTYPES: {
    START: 'Login.authFacebook:start',
    SUCCESS: 'Login.authFacebook:success',
    FAIL: 'Login.authFacebook:fail',
  },
};
