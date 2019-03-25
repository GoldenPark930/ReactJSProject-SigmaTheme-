import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import login selectors and action creators
import {
  setCurrentUser,
  verifyAndAuthenticate,
  createVerificationCode,
} from '../../../store/actions/login';
import {
  requestResult,
  requestErrors,
  codeCreationIsInProgress,
  authenticationIsInProgress,
} from '../../../store/selectors/auth';
// Import phone number selectors and action creators
import { selectPhoneNumber } from '../../../store/selectors/phone-number';
import { getUserData } from '../../../store/actions/user';
import { requestDataLoadingInterval } from '../../../store/actions/interval';
import PhoneVerificationScreen from './view';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

const mapStateToProps = state => ({
  // Login requests
  creationIsInProgress: codeCreationIsInProgress(state),
  authenticationIsInProgress: authenticationIsInProgress(state),
  requestResult: requestResult(state),
  requestErrors: requestErrors(state),
  // Phone number
  phoneNumber: selectPhoneNumber(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserData,
    setCurrentUser,
    verifyAndAuthenticate,
    createVerificationCode,
    requestDataLoadingInterval,
  }, dispatch);

const withSafeArea = withSafeAreaView(PhoneVerificationScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
