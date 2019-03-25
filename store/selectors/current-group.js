import { createSelector } from 'reselect';
import lowerCase from 'lodash/lowerCase';

import { FULL_MODEL, CROPPED_MODEL } from 'src/constants/app/globals';
import { GRINK_USER } from 'src/constants/users/types';
import { getImageUrl } from 'src/utils/ajax/api/common';
import { CURRENT_GROUP } from '../constants/store/upper-level-keys';

/**
 |------------------------------------------------------------------------------
 | Customisable Android like switch component
 |------------------------------------------------------------------------------
 |
 | TODO {Youssef}: Need to adjust balance
 |
 |------------------------------------------------------------------------------
 */

export const selectCurrentGroupRequestProgressStatus = state =>
  state[CURRENT_GROUP].get('requestIsInProgress');

export const selectCurrentGroupTransferringOwnershipProgressStatus = state =>
  state[CURRENT_GROUP].get('transferringOwnershipInProgress');

export const selectInfiniteScrollStatus = state =>
  state[CURRENT_GROUP].get('infiniteScrollIsAvailable');

export const selectUpdatingGroupImageInProgressStatus = state =>
  state[CURRENT_GROUP].get('updatingGroupImageInProgress');

export const selectCurrentGroupData = (state) => {
  const result = state[CURRENT_GROUP].get('groupData').toJS();
  result.members = result.members || { totalCount: 1 };
  result.charges = result.charges || { totalCount: 0 };
  result.setting = result.setting || { mute: false };
  result.groupImage = result.image
    ? { uri: getImageUrl(result.image) }
    : { uri: 'https://placeimg.com/200/200/arch' };
  return result;
};

export const selectCurrentGroupID = createSelector(
  selectCurrentGroupData,
  group => group.id,
);

export const selectCurrentGroupRole = createSelector(
  selectCurrentGroupData,
  group => group.role,
);

export const selectCurrentGroupBalance = createSelector(
  selectCurrentGroupData,
  group => group.balance,
);

export const selectCurrentGroupMembers = state =>
  state[CURRENT_GROUP].get('membersList').toJS();

export const selectCurrentGroupMessages = createSelector(
  state => state[CURRENT_GROUP].get('messagesList').toJS(),
  messages => messages
    .map(message => ({
      id: message.id,
      text: message.text,
      fromUserId: message.fromUserId,
      fromUser: {
        id: message.fromUser.id,
        phone: message.fromUser.phone,
        firstName: message.fromUser.firstName,
        lastName: message.fromUser.lastName,
        destinationImage: message.fromUser.image ?
          getImageUrl(message.fromUser.image) : 'https://placeimg.com/200/200/arch',
        imageUrl: message.fromUser.imageUrl,
      },
      createdAt: message.creationDate,
    })),
);

export const selectInvitationList = state =>
  state[CURRENT_GROUP].get('invitationList').toJS();

const selectNonMembersUsersFullModel = state =>
  state[CURRENT_GROUP].get('nonMembersList').toJS();

const selectNonMembersUsersCroppedModel = createSelector(
  selectNonMembersUsersFullModel,
  users => users
    // Select only needed properties
    .map(user => ({
      type: GRINK_USER,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email || '',
      phone: user.phone,
      image: user.imageUrl,
    })),
);

export const selectNonMembersUsers = (state, modelType = FULL_MODEL) => {
  if (modelType === CROPPED_MODEL) {
    return selectNonMembersUsersCroppedModel(state);
  }

  return selectNonMembersUsersFullModel(state);
};

export const selectCurrentGroupFetchingBanksListRequestProcessStatus = state =>
  state[CURRENT_GROUP].get('fetchingBanksListInProgress');

export const selectCurrentGroupBanksAccountsList = state =>
  state[CURRENT_GROUP].get('banksAccounts').toJS();

export const selectCurrentGroupTransferringProcessStatus = state =>
  state[CURRENT_GROUP].get('transferIsInProgress')
  || selectCurrentGroupRequestProgressStatus(state);
