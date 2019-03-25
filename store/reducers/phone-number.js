import { Map } from 'immutable';

import PhoneNumberActions from '../constants/action-types/phone-number';

// Define initial state
const initialState = Map({
  requestIsInProgress: false,
  doesPhoneRegisteredInProgress: false,
  doesPhoneRegistered: false,
  phoneNumber: Map({
    countryCode: 'US',
    countryDialCode: '+1',
    number: '',
    isValid: false,
    internationalFormat: '',
    e164Format: '',
  }),
  errors: Map({}),
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    // Start/continue the process
    case PhoneNumberActions.PHONE_NUMBER__VERIFY__START:
      return state
        .set('requestIsInProgress', true)
        .set('phoneNumber', Map({
          ...state.get('phoneNumber').toJS(),
          ...action.payload,
        }));
    case PhoneNumberActions.PHONE_NUMBER__DOES_PHONE_REGISTERED__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('doesPhoneRegisteredInProgress', true);

    // Something went wrong
    case PhoneNumberActions.PHONE_NUMBER__VERIFY__FAIL:
      return state
        .set('requestIsInProgress', false)
        .set('phoneNumber', Map({
          ...state.get('phoneNumber').toJS(),
          ...action.payload,
        }))
        .set('errors', Map(action.errors));
    case PhoneNumberActions.PHONE_NUMBER__DOES_PHONE_REGISTERED__SUBTYPES.FAIL:
      return state
        .set('doesPhoneRegisteredInProgress', false)
        .set('errors', Map({ ...action.errors }));


    // Store contacts list
    case PhoneNumberActions.PHONE_NUMBER__VERIFY__SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('phoneNumber', Map({
          ...state.get('phoneNumber').toJS(),
          ...action.payload,
        }));
    case PhoneNumberActions.PHONE_NUMBER__DOES_PHONE_REGISTERED__SUBTYPES.SUCCESS:
      return state
        .set('doesPhoneRegisteredInProgress', false)
        .set('doesPhoneRegistered', action.payload);


    // Reset the whole state
    case PhoneNumberActions.PHONE_NUMBER__RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
