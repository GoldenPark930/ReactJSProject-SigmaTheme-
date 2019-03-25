import { Map, List } from 'immutable';

import { paginate } from 'src/utils/helpers';
import CurrentGroupActions from '../constants/action-types/current-group';

// Define initial state
const initialState = Map({
  errors: Map({}),
  // Flags
  requestIsInProgress: false,
  fetchingBanksListInProgress: false,
  transferIsInProgress: false,
  infiniteScrollIsAvailable: true,
  transferringOwnershipInProgress: false,
  updatingGroupImageInProgress: false,
  // Data
  groupData: Map({}),
  banksAccounts: List([]),
  invitationList: List([]),
  membersList: List([]),
  nonMembersList: List([]),
  messagesList: List([]),
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    // Reset the whole state
    case CurrentGroupActions.CURRENT_GROUP__RESET_STATE:
      return initialState;

    // Store currently viewed group data
    case CurrentGroupActions.CURRENT_GROUP__SET_CURRENTLY_VIEWED_GROUP:
      return state.set('groupData', Map(action.payload));

    // Clear currently viewed group data
    case CurrentGroupActions.CURRENT_GROUP__CLEAR_CURRENTLY_VIEWED_GROUP:
      return state.set('groupData', Map({}));

    // Add user to the invitation list
    case CurrentGroupActions.CURRENT_GROUP__ADD_USER_TO_INVITATION_LIST:
      return state.set('invitationList', List([
        ...state.get('invitationList').toJS(),
        action.payload,
      ]));

    // Remove user from the invitation list
    case CurrentGroupActions.CURRENT_GROUP__REMOVE_USER_FROM_INVITATION_LIST:
      return state.set('invitationList', List(
        state.get('invitationList').toJS()
          .filter(item => item.id !== action.payload && item.phone !== action.payload),
      ));

    // Clear invitation list completely
    case CurrentGroupActions.CURRENT_GROUP__CLEAR_INVITATION_LIST:
      return state.set('invitationList', List([]));

    // Reset specific data before leaving Invite more friends screen
    case CurrentGroupActions.CURRENT_GROUP__LEAVE_INVITE_MORE_FRIENDS_SCREEN:
      return state
        .set('infiniteScrollIsAvailable', true)
        .set('errors', Map({}))
        .set('nonMembersList', List([]))
        .set('invitationList', List([]));

    // Start remote request
    case CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MEMBERS__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MESSAGES__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__FETCH_NON_MEMBERS_USERS__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__FETCH_MORE_NON_MEMBERS_USERS__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__SUBMIT_INVITATION_LIST__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__REFRESH_GROUP_DATA_BY_ID__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__LEAVE_GROUP__SUBTYPES.START:
    case CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP__SUBTYPES.START:
    case CurrentGroupActions.GROUP__GET_GROUP_DATA_BY_ID__SUBTYPES.START:
      return state.set('requestIsInProgress', true);

    // Remote request failed with an error
    case CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MEMBERS__SUBTYPES.FAIL:
    case CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MESSAGES__SUBTYPES.FAIL:
    case CurrentGroupActions.CURRENT_GROUP__FETCH_NON_MEMBERS_USERS__SUBTYPES.FAIL:
    case CurrentGroupActions.CURRENT_GROUP__SUBMIT_INVITATION_LIST__SUBTYPES.FAIL:
    case CurrentGroupActions.CURRENT_GROUP__REFRESH_GROUP_DATA_BY_ID__SUBTYPES.FAIL:
    case CurrentGroupActions.CURRENT_GROUP__LEAVE_GROUP__SUBTYPES.FAIL:
    case CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP__SUBTYPES.FAIL:
    case CurrentGroupActions.GROUP__GET_GROUP_DATA_BY_ID__SUBTYPES.FAIL:
      return state
        .set('requestIsInProgress', false)
        .set('errors', Map(action.errors));

    // Leave group request finished with success
    case CurrentGroupActions.CURRENT_GROUP__LEAVE_GROUP__SUBTYPES.SUCCESS:
      return state.set('requestIsInProgress', false);

    // Remote request failed with an error + turn off infinite scroll
    case CurrentGroupActions.CURRENT_GROUP__FETCH_MORE_NON_MEMBERS_USERS__SUBTYPES.FAIL:
      return state
        .set('requestIsInProgress', false)
        .set('infiniteScrollIsAvailable', false)
        .set('errors', Map(action.errors));

    // Store current group members list
    case CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MEMBERS__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('membersList', List(action.payload.rows));

    // Store current group messages list
    case CurrentGroupActions.CURRENT_GROUP__FETCH_GROUP_MESSAGES__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('messagesList', List(action.payload.rows));

    // Submit invitation list so the users in it will be invited to the group
    case CurrentGroupActions.CURRENT_GROUP__SUBMIT_INVITATION_LIST__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('invitationList', List([]));

    // Store users that are not in the current group
    case CurrentGroupActions.CURRENT_GROUP__FETCH_NON_MEMBERS_USERS__SUBTYPES.SUCCESS: {
      const currentPage = paginate(action.payload.rows);

      return state
        .set('requestIsInProgress', false)
        .set('infiniteScrollIsAvailable', !currentPage.isLastPage)
        .set('nonMembersList', List(currentPage.content));
    }

    // Add users from the next pagination page to the list
    case CurrentGroupActions.CURRENT_GROUP__FETCH_MORE_NON_MEMBERS_USERS__SUBTYPES.SUCCESS: {
      const currentPage = paginate(action.payload.rows);

      // TODO {Maksym}: handle entities duplication
      return state
        .set('requestIsInProgress', false)
        .set('infiniteScrollIsAvailable', !currentPage.isLastPage)
        .set('nonMembersList', List([
          ...state.get('nonMembersList').toJS(),
          ...currentPage.content,
        ]));
    }

    // Update group data
    case CurrentGroupActions.CURRENT_GROUP__REFRESH_GROUP_DATA_BY_ID__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('groupData', Map({
          ...state.get('groupData').toJS(),
          ...action.payload,
        }));
    case CurrentGroupActions.GROUP__GET_GROUP_DATA_BY_ID__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('groupData', Map(action.payload));


    // Start fetching group banks accounts list request process
    case CurrentGroupActions.CURRENT_GROUP__GET_BANKS_LIST__SUBTYPES.START:
      return state.set('fetchingBanksListInProgress', true);

    // Store fetching group banks accounts list request errors
    case CurrentGroupActions.CURRENT_GROUP__GET_BANKS_LIST__SUBTYPES.FAIL:
      return state
        .set('fetchingBanksListInProgress', false)
        .set('errors', Map(action.errors));

    // Store group banks accounts list
    case CurrentGroupActions.CURRENT_GROUP__GET_BANKS_LIST__SUBTYPES.SUCCESS:
      return state
        .set('fetchingBanksListInProgress', false)
        .set('banksAccounts', List(action.payload));

    // Start transferring to bank process
    case CurrentGroupActions.CURRENT_GROUP__TRANSFER__SUBTYPES.START:
      return state.set('transferIsInProgress', true);

    // Store transferring request errors
    case CurrentGroupActions.CURRENT_GROUP__TRANSFER__SUBTYPES.FAIL:
      return state
        .set('transferIsInProgress', false)
        .set('errors', Map(action.errors));

    // Stop transferring request process
    case CurrentGroupActions.CURRENT_GROUP__TRANSFER__SUBTYPES.SUCCESS:
      return state.set('transferIsInProgress', false);

    // Clear group banks accounts list
    case CurrentGroupActions.CURRENT_GROUP__CLEAR_BANKS_ACCOUNTS_LIST:
      return state.set('banksAccounts', List([]));

    // Update group data
    case CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('groupData', Map({
          ...state.get('groupData').toJS(),
          ...action.payload,
        }));

    // Clear current group members list
    case CurrentGroupActions.CURRENT_GROUP__CLEAR_MEMBERS_LIST:
      return state.set('membersList', List([]));

    // Start transferring group ownership process
    case CurrentGroupActions.CURRENT_GROUP__TRANSFER_OWNERSHIP__SUBTYPES.START:
      return state.set('transferringOwnershipInProgress', true);

    // Transferring group ownership process failed - store errors
    case CurrentGroupActions.CURRENT_GROUP__TRANSFER_OWNERSHIP__SUBTYPES.FAIL:
      return state
        .set('transferringOwnershipInProgress', false)
        .set('errors', Map(action.errors));

    // Stop transferring group ownership process
    case CurrentGroupActions.CURRENT_GROUP__TRANSFER_OWNERSHIP__SUBTYPES.SUCCESS:
      return state.set('transferringOwnershipInProgress', false);

    // Clear errors and start updating group image process
    case CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP_IMAGE__SUBTYPES.START:
      return state
        .set('updatingGroupImageInProgress', true)
        .set('errors', Map({}));

    // Stop updating group image process and store errors
    case CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP_IMAGE__SUBTYPES.FAIL:
      return state
        .set('updatingGroupImageInProgress', false)
        .set('errors', Map(action.errors));

    // CLear errors and store updated data
    case CurrentGroupActions.CURRENT_GROUP__UPDATE_GROUP_IMAGE__SUBTYPES.SUCCESS:
      return state
        .set('updatingGroupImageInProgress', false)
        .set('errors', Map({}))
        .set('groupData', Map({
          ...state.get('groupData').toJS(),
          image: action.payload.id,
        }));

    default:
      return state;
  }
}
