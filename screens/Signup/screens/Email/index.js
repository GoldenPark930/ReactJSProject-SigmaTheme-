import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

import {
  requestData,
  selectDoesEmailRegistered,
  selectDoesEmailRegisteredStatus,
} from '../../../../store/selectors/auth';
import {
  setSignupData,
  doesEmailRegistered,
} from '../../../../store/actions/signup';
import EmailScreen from './view';

const mapStateToProps = state => ({
  signupData: requestData(state),
  isEmailRegistered: selectDoesEmailRegistered(state),
  doesEmailRegisteredInProgress: selectDoesEmailRegisteredStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setSignupData,
    doesEmailRegistered,
  }, dispatch);

const withSafeArea = withSafeAreaView(EmailScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

