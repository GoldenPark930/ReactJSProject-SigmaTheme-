import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectPermissionErrors,
  selectContactsPermissionStatus,
  selectLocationPermissionStatus,
  selectNotificationsPermissionStatus,
  selectRequestingPermissionProcessStatus,
} from 'src/store/selectors/permission';
import {
  requestPermission,
} from 'src/store/actions/permission';
import {
  requestData,
  requestErrors,
  requestResult,
  userCreationIsInProgress,
} from 'src/store/selectors/auth';
import {
  createNewUser,
  setCurrentUser,
} from 'src/store/actions/signup';
import { requestDataLoadingInterval } from '../../../../store/actions/interval';
import PermissionView from './view';
import withSafeAreaView from '../../../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Signup -> Permission screen
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  permissionErrors: selectPermissionErrors(state),
  requestInProgress: selectRequestingPermissionProcessStatus(state),
  contactsPermission: selectContactsPermissionStatus(state),
  locationPermission: selectLocationPermissionStatus(state),
  notificationsPermission: selectNotificationsPermissionStatus(state),
  creationIsInProgress: userCreationIsInProgress(state),
  signupData: requestData(state),
  requestResult: requestResult(state),
  requestErrors: requestErrors(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestPermission,
    createNewUser,
    setCurrentUser,
    requestDataLoadingInterval,
  }, dispatch);

const withSafeArea = withSafeAreaView(PermissionView);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

