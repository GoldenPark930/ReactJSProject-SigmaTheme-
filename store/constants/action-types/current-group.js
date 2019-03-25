/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

export default {
  /*
  |-----------------------------------------------------------------------------
  | Redux actions types
  |-----------------------------------------------------------------------------
  */

  CURRENT_GROUP__RESET_STATE: 'CurrentGroup.resetState',
  CURRENT_GROUP__SET_CURRENTLY_VIEWED_GROUP: 'CurrentGroup.setCurrentlyViewedGroup',
  CURRENT_GROUP__CLEAR_CURRENTLY_VIEWED_GROUP: 'CurrentGroup.clearCurrentlyViewedGroup',
  CURRENT_GROUP__ADD_USER_TO_INVITATION_LIST: 'CurrentGroup.addUserToInvitationList',
  CURRENT_GROUP__REMOVE_USER_FROM_INVITATION_LIST: 'CurrentGroup.removeUserFromInvitationList',
  CURRENT_GROUP__CLEAR_INVITATION_LIST: 'CurrentGroup.clearInvitationList',
  CURRENT_GROUP__LEAVE_INVITE_MORE_FRIENDS_SCREEN: 'CurrentGroup.leaveInviteMoreFriendsScreen',
  CURRENT_GROUP__CLEAR_BANKS_ACCOUNTS_LIST: 'CurrentGroup.clearBanksAccountsList',
  CURRENT_GROUP__CLEAR_MEMBERS_LIST: 'CurrentGroup.clearMembersList',

  /*
  |-----------------------------------------------------------------------------
  | Redux-saga API call actions subtypes
  |-----------------------------------------------------------------------------
  */

  CURRENT_GROUP__FETCH_GROUP_MEMBERS__SUBTYPES: {
    START: 'CurrentGroup.fetchGroupMembers:start',
    SUCCESS: 'CurrentGroup.fetchGroupMembers:success',
    FAIL: 'CurrentGroup.fetchGroupMembers:fail',
  },

  CURRENT_GROUP__FETCH_NON_MEMBERS_USERS__SUBTYPES: {
    START: 'CurrentGroup.fetchNonMembersUsers:start',
    SUCCESS: 'CurrentGroup.fetchNonMembersUsers:success',
    FAIL: 'CurrentGroup.fetchNonMembersUsers:fail',
  },

  CURRENT_GROUP__FETCH_MORE_NON_MEMBERS_USERS__SUBTYPES: {
    START: 'CurrentGroup.fetchMoreNonMembersUsers:start',
    SUCCESS: 'CurrentGroup.fetchMoreNonMembersUsers:success',
    FAIL: 'CurrentGroup.fetchMoreNonMembersUsers:fail',
  },

  CURRENT_GROUP__FETCH_GROUP_MESSAGES__SUBTYPES: {
    START: 'CurrentGroup.fetchGroupMessages:start',
    SUCCESS: 'CurrentGroup.fetchGroupMessages:success',
    FAIL: 'CurrentGroup.fetchGroupMessages:fail',
  },

  CURRENT_GROUP__SUBMIT_INVITATION_LIST__SUBTYPES: {
    START: 'CurrentGroup.submitInvitationList:start',
    SUCCESS: 'CurrentGroup.submitInvitationList:success',
    FAIL: 'CurrentGroup.submitInvitationList:fail',
  },

  CURRENT_GROUP__REFRESH_GROUP_DATA_BY_ID__SUBTYPES: {
    START: 'CurrentGroup.refreshGroupDataById:start',
    SUCCESS: 'CurrentGroup.refreshGroupDataById:success',
    FAIL: 'CurrentGroup.refreshGroupDataById:fail',
  },

  CURRENT_GROUP__GET_BANKS_LIST__SUBTYPES: {
    START: 'CurrentGroup.getBanksList:start',
    SUCCESS: 'CurrentGroup.getBanksList:success',
    FAIL: 'CurrentGroup.getBanksList:fail',
  },

  CURRENT_GROUP__TRANSFER__SUBTYPES: {
    START: 'CurrentGroup.transfer:start',
    SUCCESS: 'CurrentGroup.transfer:success',
    FAIL: 'CurrentGroup.transfer:fail',
  },

  CURRENT_GROUP__LEAVE_GROUP__SUBTYPES: {
    START: 'CurrentGroup.leaveGroup:start',
    SUCCESS: 'CurrentGroup.leaveGroup:success',
    FAIL: 'CurrentGroup.leaveGroup:fail',
  },

  CURRENT_GROUP__UPDATE_GROUP__SUBTYPES: {
    START: 'CurrentGroup.updateGroup:start',
    SUCCESS: 'CurrentGroup.updateGroup:success',
    FAIL: 'CurrentGroup.updateGroup:fail',
  },

  CURRENT_GROUP__TRANSFER_OWNERSHIP__SUBTYPES: {
    START: 'CurrentGroup.transferOwnership:start',
    SUCCESS: 'CurrentGroup.transferOwnership:success',
    FAIL: 'CurrentGroup.transferOwnership:fail',
  },

  CURRENT_GROUP__UPDATE_GROUP_IMAGE__SUBTYPES: {
    START: 'CurrentGroup.updateGroupImage:start',
    SUCCESS: 'CurrentGroup.updateGroupImage:success',
    FAIL: 'CurrentGroup.updateGroupImage:fail',
  },

  GROUP__GET_GROUP_DATA_BY_ID__SUBTYPES: {
    START: 'Group.getGroupDataById:start',
    SUCCESS: 'Group.getGroupDataById:success',
    FAIL: 'Group.getGroupDataById:fail',
  },
};
