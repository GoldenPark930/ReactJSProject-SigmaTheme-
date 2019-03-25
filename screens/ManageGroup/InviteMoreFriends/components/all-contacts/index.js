import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import current group selectors and action creators
import {
  selectCurrentGroupID,
  selectNonMembersUsers,
  selectInfiniteScrollStatus,
  selectCurrentGroupRequestProgressStatus,
  selectInvitationList,
} from '../../../../../store/selectors/current-group';
import {
  getNonMembersUsers,
  getMoreNonMembersUsers,
  addUserToInvitationList,
  removeUserFromInvitationList,
} from '../../../../../store/actions/current-group';

// Import contacts list selectors and action creators
import {
  selectContactsList,
  selectContactsListRequestProgressStatus,
} from '../../../../../store/selectors/contacts-list';
import {
  getAllContactsListData,
} from '../../../../../store/actions/contacts-list';

// Import other stuff
import { CROPPED_MODEL } from '../../../../../constants/app/globals';
import ComponentView from './view';

import { selectVerificationProcessStatus, selectPhoneNumber } from '../../../../../store/selectors/phone-number';
import { verifyPhoneNumber } from '../../../../../store/actions/phone-number';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Invite more friends
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  groupId: selectCurrentGroupID(state),
  isInfiniteScrollAvailable: selectInfiniteScrollStatus(state),

  fetchingGrinkUsersInProgress: selectCurrentGroupRequestProgressStatus(state),
  nonMembersUsersList: selectNonMembersUsers(state, CROPPED_MODEL),

  fetchingContactsListInProgress: selectContactsListRequestProgressStatus(state),
  contactsList: selectContactsList(state, CROPPED_MODEL),
  list: selectInvitationList(state),
  verificationRequestIsInProgress: selectVerificationProcessStatus(state),
  phoneNumber: selectPhoneNumber(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getAllContactsListData,
    getNonMembersUsers,
    getMoreNonMembersUsers,
    addUserToInvitationList,
    removeUserFromInvitationList,
    verifyPhoneNumber,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentView);
