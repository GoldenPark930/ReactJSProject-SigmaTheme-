import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectCurrentGroupID,
  selectCurrentGroupMessages,
  selectCurrentGroupRequestProgressStatus,
} from 'src/store/selectors/current-group';
import {
  getGroupMessages,
} from 'src/store/actions/current-group';
import GroupFeed from './view';

/**
 |------------------------------------------------------------------------------
 | GroupFeed
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  fetchingIsInProgress: selectCurrentGroupRequestProgressStatus(state),
  groupId: selectCurrentGroupID(state),
  messages: selectCurrentGroupMessages(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getGroupMessages,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroupFeed);
