import { LINKING } from '../constants/store/upper-level-keys';

// eslint-disable-next-line
export const selectLinkingObj = state => 
  state[LINKING].get('linking').toJS();

