import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCurrentGroupData } from '../../../store/selectors/current-group';
import { resetLinkingState } from '../../../store/actions/linking';
import { getGroupData } from '../../../store/actions/current-group';
import { selectLinkingObj } from '../../../store/selectors/linking';
import MainScreenWrapper from './wrapper';


/**
 |------------------------------------------------------------------------------
 | Group settings -> Main
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  groupData: selectCurrentGroupData(state),
  linking: selectLinkingObj(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    resetLinkingState,
    getGroupData,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(MainScreenWrapper);

