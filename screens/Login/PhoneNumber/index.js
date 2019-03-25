import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginScreen from './view';
// Import login selectors and action creators
import { createVerificationCode } from '../../../store/actions/login';
import {
  codeCreationIsInProgress,
  requestResult,
  requestErrors,
} from '../../../store/selectors/auth';
// Import phone number selectors and action creators
import { verifyPhoneNumber } from '../../../store/actions/phone-number';
import {
  selectVerificationProcessStatus,
  selectPhoneNumber,
} from '../../../store/selectors/phone-number';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

const mapStateToProps = state => ({
  creationRequestIsInProgress: codeCreationIsInProgress(state),
  requestResult: requestResult(state),
  requestErrors: requestErrors(state),
  verificationRequestIsInProgress: selectVerificationProcessStatus(state),
  phoneNumber: selectPhoneNumber(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createVerificationCode,
    verifyPhoneNumber,
  }, dispatch);

const withSafeArea = withSafeAreaView(LoginScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
