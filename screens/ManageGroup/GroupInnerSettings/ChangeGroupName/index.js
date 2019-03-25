import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectCurrentGroupData,
  selectCurrentGroupRequestProgressStatus,
} from '../../../../store/selectors/current-group';
import {
  updateCurrentGroup,
} from '../../../../store/actions/current-group';
import GroupInnerSettingsChangeGroupNameWrapper from './wrapper';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Change group name
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  groupData: selectCurrentGroupData(state),
  updateCurrentGroupRequestInProgress: selectCurrentGroupRequestProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateCurrentGroup,
  }, dispatch);

const withSafeArea = withSafeAreaView(GroupInnerSettingsChangeGroupNameWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
