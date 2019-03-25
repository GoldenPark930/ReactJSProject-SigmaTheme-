import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

import CongratulationScreen from './view';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

const withSafeArea = withSafeAreaView(CongratulationScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
