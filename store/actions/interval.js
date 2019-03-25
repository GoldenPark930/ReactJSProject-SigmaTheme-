import IntervalTypes from '../constants/action-types/interval';

export const requestDataLoadingInterval = () => ({
  type: IntervalTypes.INTERVAL__REQUEST_DATA_LOADING,
});

export const resetDataLoadingInterval = () => ({
  type: IntervalTypes.INTERVAL__RESET_DATA_LOADING,
});

