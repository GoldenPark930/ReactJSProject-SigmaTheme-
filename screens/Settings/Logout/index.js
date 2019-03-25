import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogoutScreen from './view';
import {
  logout,
  resetCurrentGroupState,
  resetCurrentUserState,
  resetPhoneNumberState,
} from '../../../store/actions/logout';
import { resetDataLoadingInterval } from '../../../store/actions/interval';

const mapStateToProps = null;

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    logout,
    resetCurrentGroupState,
    resetCurrentUserState,
    resetPhoneNumberState,
    resetDataLoadingInterval,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
