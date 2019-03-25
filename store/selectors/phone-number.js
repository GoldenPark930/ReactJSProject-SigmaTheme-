import { PHONE_NUMBER } from '../constants/store/upper-level-keys';

export const selectVerificationProcessStatus = state =>
  state[PHONE_NUMBER].get('fetchingIsInProgress');

export const selectPhoneNumber = state =>
  state[PHONE_NUMBER].get('phoneNumber').toJS();

export const selectDoesPhoneRegisteredStatus = state =>
  state[PHONE_NUMBER].get('doesPhoneRegisteredInProgress');

export const selectDoesPhoneRegistered = state =>
  state[PHONE_NUMBER].get('doesPhoneRegistered');
