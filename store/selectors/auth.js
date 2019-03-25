import { AUTH } from '../constants/store/upper-level-keys';

// AUTH SELECTORS
export const codeCreationIsInProgress = state =>
  state[AUTH].get('codeCreationIsInProgress');

export const requestResult = state =>
  state[AUTH].get('result').toJS();

export const requestErrors = state =>
  state[AUTH].get('errors').toJS();


// LOGIN SELECTORS
export const authenticationIsInProgress = state =>
  state[AUTH].get('authenticationIsInProgress');


// SING UP SELECTORS
export const userCreationIsInProgress = state =>
  state[AUTH].get('userCreationIsInProgress');

export const verificationIsInProgress = state =>
  state[AUTH].get('verificationIsInProgress');

export const selectDoesEmailRegisteredStatus = state =>
  state[AUTH].get('doesEmailRegisteredInProgress');

export const selectDoesUsernameRegisteredStatus = state =>
  state[AUTH].get('doesUsernameRegisteredInProgress');

export const selectDoesEmailRegistered = state =>
  state[AUTH].get('doesEmailRegistered');

export const selectDoesUsernameRegistered = state =>
  state[AUTH].get('doesUsernameRegistered');

export const requestData = state =>
  state[AUTH].get('data').toJS();

