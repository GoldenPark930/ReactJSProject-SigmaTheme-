import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import login selectors and action creators
import {
  createVerificationCode,
  verifyCode,
  setSignupData,
} from 'src/store/actions/signup';
import {
  codeCreationIsInProgress,
  verificationIsInProgress,
  requestData,
  requestErrors,
} from 'src/store/selectors/auth';
// Import phone number selectors and action creators
import { selectPhoneNumber } from 'src/store/selectors/phone-number';
import PhoneVerificationScreen from './view';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

const mapStateToProps = state => ({
  // Login requests
  creationIsInProgress: codeCreationIsInProgress(state),
  verificationIsInProgress: verificationIsInProgress(state),
  signupData: requestData(state),
  requestErrors: requestErrors(state),
  // Phone number
  phoneNumber: selectPhoneNumber(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createVerificationCode,
    verifyCode,
    setSignupData,
  }, dispatch);

const withSafeArea = withSafeAreaView(PhoneVerificationScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

