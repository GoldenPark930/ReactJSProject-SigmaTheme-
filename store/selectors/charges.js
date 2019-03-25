import { CHARGES } from '../constants/store/upper-level-keys';

export const acceptChargesIsInProgress = state =>
  state[CHARGES].get('acceptChargesIsInProgress');

export const acceptedChargeId = state =>
  state[CHARGES].get('acceptedCharge');

