import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectUserData,
  requestErrors,
  selectUpdatingUserDocumentProgressStatus,
} from '../../../store/selectors/user';
import { updateUserDocument } from '../../../store/actions/user';
import {
  selectPhotoPermissionStatus,
  selectCameraPermissionStatus,
  selectPermissionErrors,
} from '../../../store/selectors/permission';

import { requestPermission } from '../../../store/actions/permission';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

import UploadVerificationDocumentView from './view';

const mapStateToProps = state => ({
  userData: selectUserData(state),
  updatingUserDocumentInProgress: selectUpdatingUserDocumentProgressStatus(state),
  photoPermission: selectPhotoPermissionStatus(state),
  cameraPermission: selectCameraPermissionStatus(state),
  permissionErrors: selectPermissionErrors(state),
  requestErrors: requestErrors(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateUserDocument,
    requestPermission,
  }, dispatch);

const withSafeArea = withSafeAreaView(UploadVerificationDocumentView);
export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
