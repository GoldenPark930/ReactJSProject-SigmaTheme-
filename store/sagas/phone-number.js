import { takeEvery, put } from 'redux-saga/effects';
import PhoneNumberActions from '../constants/action-types/phone-number';

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/*
|-------------------------------------------------------------------------------
| Verify phone number
|-------------------------------------------------------------------------------
*/

export const verifyPhoneNumber = function* (action) {
  const { countryCode, countryDialCode, number } = action.payload;
  // Start the process
  yield put({
    type: PhoneNumberActions.PHONE_NUMBER__VERIFY__START,
    payload: { countryCode, countryDialCode, number },
  });

  try {
    // check region validity
    const regionCode = phoneUtil.getRegionCodeForCountryCode(countryDialCode.replace('+', ''));
    if (regionCode === 'ZZ') {
      throw new Error('Unexpected Country Code');
    }
    // parse phone number
    const phoneNumber = phoneUtil.parse(number, regionCode);
    // check number validity
    const isValidNumber = phoneUtil.isValidNumber(phoneNumber);
    if (!isValidNumber) {
      throw new Error('Invalid Phone Number');
    }
    // Get international format "+41 44 668 18 00"
    const internationalFormat = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
    // Get e164 format "+41446681800"
    const e164Format = phoneUtil.format(phoneNumber, PNF.E164);
    yield put({
      type: PhoneNumberActions.PHONE_NUMBER__VERIFY__SUCCESS,
      payload: { isValid: isValidNumber, internationalFormat, e164Format },
    });
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PhoneNumberActions.PHONE_NUMBER__VERIFY__FAIL,
      payload: { isValid: false, internationalFormat: '', e164Format: '', countryCode, countryDialCode, number },
      errors,
    });
  }
};

/*
|-------------------------------------------------------------------------------
| Export sagas
|-------------------------------------------------------------------------------
*/

export default function* () {
  yield takeEvery(
    PhoneNumberActions.PHONE_NUMBER__VERIFY,
    verifyPhoneNumber,
  );
}
