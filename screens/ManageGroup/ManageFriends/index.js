import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentGroupMembers } from '../../../store/actions/current-group';
import {
  selectCurrentGroupID,
  selectCurrentGroupRole,
  selectCurrentGroupMembers,
  selectCurrentGroupRequestProgressStatus,
} from '../../../store/selectors/current-group';
import { selectUserID } from '../../../store/selectors/user';
import ManageFriendsScreenWrapper from './wrapper';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Manage friends
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  fetchingIsInProgress: selectCurrentGroupRequestProgressStatus(state),
  groupId: selectCurrentGroupID(state),
  groupMembers: selectCurrentGroupMembers(state),
  userId: selectUserID(state),
  userRole: selectCurrentGroupRole(state),

  currentGroup: {
    id: selectCurrentGroupID(state),
    role: selectCurrentGroupRole(state),
    members: selectCurrentGroupMembers(state),
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCurrentGroupMembers,
  }, dispatch);

const withSafeArea = withSafeAreaView(ManageFriendsScreenWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
