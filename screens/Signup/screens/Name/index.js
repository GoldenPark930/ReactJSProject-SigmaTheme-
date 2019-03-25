import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

import { requestData } from '../../../../store/selectors/auth';
import { setSignupData } from '../../../../store/actions/signup';
import NameScreen from './view';

const mapStateToProps = state => ({
  signupData: requestData(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setSignupData,
  }, dispatch);

const withSafeArea = withSafeAreaView(NameScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

