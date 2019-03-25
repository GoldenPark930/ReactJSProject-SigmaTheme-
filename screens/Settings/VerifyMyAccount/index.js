import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectUserData,
  requestErrors,
  selectRetryingUserVerificationProgressStatus,
} from '../../../store/selectors/user';
import { retryUserVerification } from '../../../store/actions/user';

import VerifyMyAccountView from './view';

const mapStateToProps = state => ({
  userData: selectUserData(state),
  requestErrors: requestErrors(state),
  retryingUserVerifiationInProgress: selectRetryingUserVerificationProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    retryUserVerification,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMyAccountView);
