import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectUserID } from '../../../store/selectors/user';
import { updateNavWorkaroundState } from '../../../store/actions/nav-workaround';
import {
  selectCurrentGroupData,
  selectCurrentGroupRequestProgressStatus,
} from '../../../store/selectors/current-group';
import {
  leaveCurrentGroup,
} from '../../../store/actions/current-group';
import GroupInnerSettingsWrapper from './wrapper';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc'

/**
 |------------------------------------------------------------------------------
 | Group inner settings
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  userId: selectUserID(state),
  groupData: selectCurrentGroupData(state),
  leavingGroupIsInProgress: selectCurrentGroupRequestProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    leaveCurrentGroup,
    updateNavWorkaroundState,
  }, dispatch);


const withSafeArea = withSafeAreaView(GroupInnerSettingsWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

