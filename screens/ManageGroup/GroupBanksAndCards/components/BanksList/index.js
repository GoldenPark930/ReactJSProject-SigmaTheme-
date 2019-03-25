import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectCurrentGroupID,
  selectCurrentGroupBanksAccountsList,
  selectCurrentGroupRequestProgressStatus,
} from '../../../../../store/selectors/current-group';
import {
  getGroupBanksAccountsList,
  clearCurrentGroupBanksAccountsList,
} from '../../../../../store/actions/current-group';
import BanksScreenView from './view';

/**
 |------------------------------------------------------------------------------
 | Banks
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  fetchingIsInProgress: selectCurrentGroupRequestProgressStatus(state),
  banks: selectCurrentGroupBanksAccountsList(state),
  currentGroupId: selectCurrentGroupID(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getGroupBanksAccountsList,
    clearCurrentGroupBanksAccountsList,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BanksScreenView);
