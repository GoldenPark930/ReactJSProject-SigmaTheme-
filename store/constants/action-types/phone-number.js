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

  PHONE_NUMBER__RESET_STATE: 'PhoneNumber.resetState',
  PHONE_NUMBER__VERIFY: 'PhoneNumber.verify',

  /*
  |-----------------------------------------------------------------------------
  | Redux-saga API call actions subtypes
  |-----------------------------------------------------------------------------
  */

  PHONE_NUMBER__VERIFY__START: 'PhoneNumber.verify:start',
  PHONE_NUMBER__VERIFY__SUCCESS: 'PhoneNumber.verify:success',
  PHONE_NUMBER__VERIFY__FAIL: 'PhoneNumber.verify:fail',

  PHONE_NUMBER__DOES_PHONE_REGISTERED__SUBTYPES: {
    START: 'PhoneNumber.doesPhoneRegistered:start',
    SUCCESS: 'PhoneNumber.doesPhoneRegistered:success',
    FAIL: 'PhoneNumber.doesPhoneRegistered:fail',
  },
};
