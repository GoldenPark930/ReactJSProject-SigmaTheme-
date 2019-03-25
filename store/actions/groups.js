import * as GroupApi from '../../utils/ajax/api/groups';
import CommonActions from '../constants/action-types/common';
import GroupActions from '../constants/action-types/groups';

export const getFirstStepOfAllGroups = limit => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: GroupActions.GROUPS__FIRST_STEP_OF_ALL,
  promise: () => GroupApi.getAllGroups(limit, 0),
});

export const getAllGroups = (limit, skip) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: GroupActions.GROUPS__GET_ALL,
  promise: () => GroupApi.getAllGroups(limit, skip),
});
