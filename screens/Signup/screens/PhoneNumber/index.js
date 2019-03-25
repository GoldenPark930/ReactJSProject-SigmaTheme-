import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import signup selectors and action creators
import {
  codeCreationIsInProgress,
  requestData,
  requestErrors,
} from '../../../../store/selectors/auth';
import { createVerificationCode } from '../../../../store/actions/signup';
// Import phone number selectors and action creators
import {
  verifyPhoneNumber,
  doesPhoneRegistered,
} from '../../../../store/actions/phone-number';
import {
  selectVerificationProcessStatus,
  selectPhoneNumber,
  selectDoesPhoneRegistered,
  selectDoesPhoneRegisteredStatus,
} from '../../../../store/selectors/phone-number';
import PhoneNumberScreen from './view';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

const mapStateToProps = state => ({
  // Signup
  creationRequestIsInProgress: codeCreationIsInProgress(state),
  signupData: requestData(state),
  requestErrors: requestErrors(state),
  // Phone number
  verificationRequestIsInProgress: selectVerificationProcessStatus(state),
  doesPhoneRegisteredInProgress: selectDoesPhoneRegisteredStatus(state),
  phoneNumber: selectPhoneNumber(state),
  isPhoneRegistered: selectDoesPhoneRegistered(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    // Signup
    createVerificationCode,
    // Phone number
    doesPhoneRegistered,
    verifyPhoneNumber,
  }, dispatch);

const withSafeArea = withSafeAreaView(PhoneNumberScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

