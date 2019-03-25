import NavWorkaroundActions from '../constants/action-types/nav-workaround';

export const resetNavWorkaroundState = () => ({
  type: NavWorkaroundActions.NAV_WORKAROUND__RESET_STATE,
});

export const updateNavWorkaroundState = payload => ({
  type: NavWorkaroundActions.NAV_WORKAROUND__UPDATE_STATE,
  payload,
});
