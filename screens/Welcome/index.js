
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUserData } from '../../store/actions/user';
import { requestResult, requestErrors, authenticationIsInProgress } from '../../store/selectors/auth';
import { facebookAuthenticate } from '../../store/actions/login';
import { facebookLogin, googleLogin } from '../../store/actions/social';

import WelcomeView from './view';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';


const mapStateToProps = state => ({
  authenticationIsInProgress: authenticationIsInProgress(state),
  requestResult: requestResult(state),
  requestErrors: requestErrors(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    facebookLogin,
    googleLogin,
    facebookAuthenticate,
    getUserData,
  }, dispatch);

const withSafeArea = withSafeAreaView(WelcomeView);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

