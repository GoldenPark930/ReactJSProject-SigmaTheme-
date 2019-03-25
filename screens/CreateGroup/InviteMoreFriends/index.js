import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectInvitationList,
  selectCurrentGroupID,
} from '../../../store/selectors/current-group';
import {
  getNonMembersUsers,
  submitInvitationList,
  getCurrentGroupMembers,
  leaveInviteMoreFriendsScreen,
} from '../../../store/actions/current-group';
import InviteMoreFriendsScreenWrapper from './view';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Invite more friends
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  currentGroupId: selectCurrentGroupID(state),
  invitationList: selectInvitationList(state),
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getNonMembersUsers,
    submitInvitationList,
    getCurrentGroupMembers,
    leaveInviteMoreFriendsScreen,
  }, dispatch);

const withSafeArea = withSafeAreaView(InviteMoreFriendsScreenWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

