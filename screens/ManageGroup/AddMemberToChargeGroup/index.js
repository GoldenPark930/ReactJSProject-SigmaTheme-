import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectCurrentGroupData, selectCurrentGroupMembers } from '../../../store/selectors/current-group';
import { getCurrentGroupMembers } from '../../../store/actions/current-group';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

import AddMemberToChargeGroup from './newview';

const mapStateToProps = state => ({
  group: selectCurrentGroupData(state),
  members: selectCurrentGroupMembers(state),
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCurrentGroupMembers,
  }, dispatch);


const withSafeArea = withSafeAreaView(AddMemberToChargeGroup, 'top');

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

