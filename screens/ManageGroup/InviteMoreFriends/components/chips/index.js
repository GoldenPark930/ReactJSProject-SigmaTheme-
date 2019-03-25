import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectInvitationList } from '../../../../../store/selectors/current-group';
import { removeUserFromInvitationList } from '../../../../../store/actions/current-group';
import ChipsView from './view';


const mapStateToProps = state => ({
  list: selectInvitationList(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    removeUserFromInvitationList,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChipsView);
