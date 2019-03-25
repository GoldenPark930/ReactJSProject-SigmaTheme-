import * as phoneApi from '../../utils/ajax/api/phone-number';
import {
  CommonActions,
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

export const verifyPhoneNumber = (countryCode, countryDialCode, number) => ({
  type: PhoneNumberActions.PHONE_NUMBER__VERIFY,
  payload: { countryCode, countryDialCode, number },
});

export const doesPhoneRegistered = (phone, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: PhoneNumberActions.PHONE_NUMBER__DOES_PHONE_REGISTERED__SUBTYPES,
  promise: () => phoneApi.doesPhoneRegistered(phone),
  onSuccessCallback,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga API call actions
|-------------------------------------------------------------------------------
*/
