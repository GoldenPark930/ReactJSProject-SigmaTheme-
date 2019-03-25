import lowerCase from 'lodash/lowerCase';
import last from 'lodash/last';

import { MEMBER } from 'src/constants/users/roles';
import { GRINK_USER } from 'src/constants/users/types';
import { DEFAULT_LIMIT } from 'src/constants/app/defaults';
import * as GroupsApi from 'src/utils/ajax/api/groups';
import CommonActions from '../constants/action-types/common';
import CurrentGroupActions from '../constants/action-types/current-group';

/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

/*
|-------------------------------------------------------------------------------
| Redux actions
|-------------------------------------------------------------------------------
*/

export const clearCurrentlyViewedGroupState = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__RESET_STATE,
});

export const setCurrentlyViewedGroup = group => ({
  type: CurrentGroupActions.CURRENT_GROUP__SET_CURRENTLY_VIEWED_GROUP,
  payload: group,
});

export const clearCurrentlyViewedGroup = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__CLEAR_CURRENTLY_VIEWED_GROUP,
});

export const addUserToInvitationList = friendData => ({
  type: CurrentGroupActions.CURRENT_GROUP__ADD_USER_TO_INVITATION_LIST,
  payload: friendData,
});

export const removeUserFromInvitationList = friendId => ({
  type: CurrentGroupActions.CURRENT_GROUP__REMOVE_USER_FROM_INVITATION_LIST,
  payload: friendId,
});

export const clearInvitationList = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__CLEAR_INVITATION_LIST,
});

export const leaveInviteMoreFriendsScreen = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__LEAVE_INVITE_MORE_FRIENDS_SCREEN,
});

export const clearCurrentGroupBanksAccountsList = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__CLEAR_BANKS_ACCOUNTS_LIST,
});

export const clearCurrentGroupMembersList = () => ({
  type: CurrentGroupActions.CURRENT_GROUP__CLEAR_MEMBERS_LIST,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga API call actions
|-------------------------------------------------------------------------------
*/

export const getCurrentGroupMembers = groupId => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MEMBERS__SUBTYPES,
  promise: () => GroupsApi.getGroupMembers(groupId),
});

export const getGroupMessages = groupId => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MESSAGES__SUBTYPES,
  promise: () => GroupsApi.getGroupMessages(groupId),
});

// Search filters generator
const generateFilters = searchValue => JSON.stringify({
  or: [
    { firstName: searchValue },
    { lastName: searchValue },
    { username: searchValue },
    { email: searchValue },
  ],
});

export const getNonMembersUsers = (groupId, searchValue = null) => {
  // Set pagination settings to the request filters
  const params = {
    limit: DEFAULT_LIMIT + 1,
    skip: 0,
  };

  // Add search filter to request filters
  if (searchValue) {
    params.where = generateFilters(searchValue);
  }

  return {
    type: CommonActions.COMMON__API_CALL,
    subtypes: CurrentGroupActions.CURRENT_GROUP__FETCH_NON_MEMBERS_USERS__SUBTYPES,
    promise: () => GroupsApi.getNonMembersUsers(groupId, params),
  };
};

export const getMoreNonMembersUsers = (groupId, page, searchValue = null) => {
  // Set pagination settings to the request filters
  const params = {
    limit: DEFAULT_LIMIT + 1,
    skip: DEFAULT_LIMIT * (page ? page - 1 : 0),
  };

  // Add search filter to request filters
  if (searchValue) {
    params.where = generateFilters(searchValue);
  }

  return {
    type: CommonActions.COMMON__API_CALL,
    subtypes: CurrentGroupActions.CURRENT_GROUP__FETCH_MORE_NON_MEMBERS_USERS__SUBTYPES,
    promise: () => GroupsApi.getNonMembersUsers(groupId, params),
  };
};

export const submitInvitationList = (groupId, invitationList, onSuccessCallback) => {
  // Parse the invitation list so the server can process it
  const payload = invitationList
    .map(user => ({
      role: MEMBER,
      ...(user.type === GRINK_USER
        ? { id: user.id }
        : {
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
    }));

  return {
    type: CommonActions.COMMON__API_CALL,
    subtypes: CurrentGroupActions.CURRENT_GROUP__SUBMIT_INVITATION_LIST__SUBTYPES,
    promise: () => GroupsApi.inviteUsersToGroup(groupId, payload),
    onSuccessCallback,
  };
};

export const refreshCurrentGroupData = groupId => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__REFRESH_GROUP_DATA_BY_ID__SUBTYPES,
  promise: () => GroupsApi.getGroupData(groupId),
});

export const getGroupData = (groupId, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.GROUP__GET_GROUP_DATA_BY_ID__SUBTYPES,
  promise: () => GroupsApi.getGroupData(groupId),
  onSuccessCallback,
});

export const getGroupBanksAccountsList = groupId => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__GET_BANKS_LIST__SUBTYPES,
  promise: () => GroupsApi.getGroupBanksAccounts(groupId),
});

export const transfertToOwnerBalance = (groupId, amount, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__TRANSFER__SUBTYPES,
  promise: () => GroupsApi.transfertToOwnerBalance(groupId, { amount }),
  onSuccessCallback,
});

export const transfertToOwnerBank = (groupId, amount, accountId, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__TRANSFER__SUBTYPES,
  promise: () => GroupsApi.transfertToOwnerBank(groupId, { amount, accountId }),
  onSuccessCallback,
});

export const leaveCurrentGroup = (groupId, userId, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__LEAVE_GROUP__SUBTYPES,
  promise: () => GroupsApi.leaveGroup(groupId, { userId }),
  onSuccessCallback,
});

export const updateCurrentGroup = (groupId, payload, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP__SUBTYPES,
  promise: () => GroupsApi.updateGroup(groupId, payload),
  onSuccessCallback,
});

export const transferCurrentGroupOwnership = (groupId, newOwnerId, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: CurrentGroupActions.CURRENT_GROUP__TRANSFER_OWNERSHIP__SUBTYPES,
  promise: () => GroupsApi.transferOwnership(groupId, { role: MEMBER, userId: newOwnerId.toString() }),
  onSuccessCallback,
});

export const updateCurrentGroupImageById = (groupId, { fileName, data: base64string }) => {
  const payload = {
    type: 'profile',
    file: base64string,
  };
  if (fileName !== undefined) payload.extension = lowerCase(last(fileName.split('.')));

  return {
    type: CommonActions.COMMON__API_CALL,
    subtypes: CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP_IMAGE__SUBTYPES,
    promise: () => GroupsApi.updateGroupImage(groupId, payload),
  };
};
