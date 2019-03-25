import CommonActions from '../constants/action-types/common';
import MyGroupsActions from '../constants/action-types/my-groups';
import * as GroupsApi from '../../utils/ajax/api/groups';

export const getArchivedGroups = userId => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: MyGroupsActions.ARCHIVED_GROUPS__LOAD_GROUPS_DATA__SUBTYPES,
  promise: () => GroupsApi.getArchivedGroups(),
});
