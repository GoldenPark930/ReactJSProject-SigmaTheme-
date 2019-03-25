import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectCurrentGroupID,
  selectCurrentGroupMembers,
  selectCurrentGroupRequestProgressStatus,
  selectCurrentGroupTransferringOwnershipProgressStatus,
} from '../../../../store/selectors/current-group';
import {
  getCurrentGroupMembers,
  clearCurrentGroupMembersList,
  transferCurrentGroupOwnership,
} from '../../../../store/actions/current-group';
import { updateNavWorkaroundState } from '../../../../store/actions/nav-workaround';
import { selectNavWorkaround } from '../../../../store/selectors/nav-workaround';
import GroupInnerSettingsTransferGroupOwnershipWrapper from './wrapper';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Transfer group owner
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  groupId: selectCurrentGroupID(state),
  groupMembers: selectCurrentGroupMembers(state),
  requestIsInProgress: selectCurrentGroupRequestProgressStatus(state),
  transferringOwnershipIsInProgress: selectCurrentGroupTransferringOwnershipProgressStatus(state),
  navWorkaroundShouldWeGetMembers: selectNavWorkaround(state, 'GroupInnerSettingsTransferGroupOwnership'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCurrentGroupMembers,
    updateNavWorkaroundState,
    clearCurrentGroupMembersList,
    transferCurrentGroupOwnership,
  }, dispatch);


const withSafeArea = withSafeAreaView(GroupInnerSettingsTransferGroupOwnershipWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

