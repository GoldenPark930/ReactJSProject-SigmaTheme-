import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestData,
  requestErrors,
  requestResult,
  userCreationIsInProgress,
  selectDoesUsernameRegistered,
  selectDoesUsernameRegisteredStatus,
} from '../../../../store/selectors/auth';
import {
  setSignupData,
  createNewUser,
  setCurrentUser,
  doesUsernameRegistered,
} from '../../../../store/actions/signup';
import UsernameScreen from './view';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

const mapStateToProps = state => ({
  creationIsInProgress: userCreationIsInProgress(state),
  signupData: requestData(state),
  requestResult: requestResult(state),
  requestErrors: requestErrors(state),
  isUsernameRegistered: selectDoesUsernameRegistered(state),
  doesUsernameRegisteredInProgress: selectDoesUsernameRegisteredStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setSignupData,
    createNewUser,
    setCurrentUser,
    doesUsernameRegistered,
  }, dispatch);

const withSafeArea = withSafeAreaView(UsernameScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

