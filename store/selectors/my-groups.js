import { createSelector } from 'reselect';

import { MY_GROUPS } from '../constants/store/upper-level-keys';


export const selectArchivedGroupsData = state =>
  state.myGroups.get('archivedGroupsData').toJS();

export const selectArchivedGroupsRequestProgressStatus = state =>
  state[MY_GROUPS].get('requestIsInProgress');

