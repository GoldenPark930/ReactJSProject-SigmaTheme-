import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectUserData,
  selectUpdatingUserDataProgressStatus,
  selectUpdatingUserProfileImageProgressStatus,
} from '../../../store/selectors/user';
import {
  selectPhotoPermissionStatus,
  selectCameraPermissionStatus,
  selectPermissionErrors,
} from '../../../store/selectors/permission';
import { updateUserDataById, updateUserProfileImage } from '../../../store/actions/user';
import { requestPermission } from '../../../store/actions/permission';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

import EditProfileView from './view';

const mapStateToProps = state => ({
  userData: selectUserData(state),
  updatingUserDataInProgress: selectUpdatingUserDataProgressStatus(state),
  updatingUserProfileImageInProgress: selectUpdatingUserProfileImageProgressStatus(state),
  photoPermission: selectPhotoPermissionStatus(state),
  cameraPermission: selectCameraPermissionStatus(state),
  permissionErrors: selectPermissionErrors(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateUserDataById,
    updateUserProfileImage,
    requestPermission,
  }, dispatch);

const withSafeArea = withSafeAreaView(EditProfileView);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
