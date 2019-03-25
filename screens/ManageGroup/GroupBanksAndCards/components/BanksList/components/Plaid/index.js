import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCurrentGroupID } from '../../../../../../../store/selectors/current-group';
import PlaidView from './view';

/**
 |------------------------------------------------------------------------------
 | Notifications
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  groupId: selectCurrentGroupID(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaidView);
