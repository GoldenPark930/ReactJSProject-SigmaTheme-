import { GROUPS } from '../constants/store/upper-level-keys';

export const selectGetAllGroupsDataProgessStatus = state =>
  state[GROUPS].get('fetchingAllGroupsInProgress');

export const selectGetFirstStepOfAllGroupsProgressStatus = state =>
  state[GROUPS].get('fetchingFirstOfAllGroupsInProgress');

export const selectAllGroups = state =>
  state[GROUPS].get('groups').toJS().rows;

export const selectAllGroupsTotalCount = state =>
  state[GROUPS].get('groups').toJS().totalCount;

export const selectSkip = state =>
  state[GROUPS].get('skip');

export const selectStep = state =>
  state[GROUPS].get('step');

