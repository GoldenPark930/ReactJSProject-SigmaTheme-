import LinkingTypes from '../constants/action-types/linking';

export const setLinkingState = linking => ({
  type: LinkingTypes.LINKING__SET_STATE,
  payload: linking,
});

export const resetLinkingState = () => ({
  type: LinkingTypes.LINKING__RESET_STATE,
});

