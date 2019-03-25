import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import {
  Icon,
  Header,
  Right,
  Left,
  Thumbnail,
  Button,
  Text,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

import {
  selectPhotoPermissionStatus,
  selectCameraPermissionStatus,
  selectPermissionErrors,
} from '../../store/selectors/permission';
import {
  selectCurrentGroupData,
  selectUpdatingGroupImageInProgressStatus,
} from '../../store/selectors/current-group';
import {
  selectUserData,
  selectUpdatingUserDataProgressStatus,
  selectUpdatingUserProfileImageProgressStatus,
} from '../../store/selectors/user';
import { updateUserProfileImage } from '../../store/actions/user';
import { requestPermission } from '../../store/actions/permission';
import { updateCurrentGroupImageById } from '../../store/actions/current-group';
import { getLocalIcon } from '../../utils/helpers';
import ImagePicker from '../../utils/image-picker';

import { ALL_ROLES, isOwnerOrAdmin } from '../../constants/users/roles';
import styles from './styles';
import globalColors from '../../GlobalCss/globalColors';
import { navigationPropTypes } from '../../constants/app/defaults';
import { resetNavWorkaroundState } from '../../store/actions/nav-workaround';
import { BLACK } from '../../constants/colors';
import NavigationService from '../../utils/helpers/navigation-service';

const { string, number, func, shape, oneOf, oneOfType, bool } = PropTypes;
const permissionErrorPropTypes = shape({
  title: string.isRequired,
  message: string.isRequired,
});

class GradientHeader extends React.Component {
  static propTypes = {
    // Data
    colorOption: string,
    isGroup: bool,
    title: string,
    closeButtonPosition: number,
    onCloseHandler: func,
    imageLink: string,
    // Navigation
    ...navigationPropTypes(PropTypes),
    // Data
    groupData: shape({
      id: number.isRequired,
      name: string.isRequired,
      role: oneOf(ALL_ROLES).isRequired,
      owner: shape({
        firstName: string.isRequired,
        lastName: string.isRequired,
        image: number.isRequired,
        username: string.isRequired,
        phone: string.isRequired,
        id: number.isRequired,
      }).isRequired,
      imageUrl: string.isRequired,
    }).isRequired,
    permissionErrors: shape({
      photo: permissionErrorPropTypes,
      camera: permissionErrorPropTypes,
    }).isRequired,
    // Functions
    requestPermission: func.isRequired,
    updateCurrentGroupImageById: func.isRequired,
    updatingUserProfileImageInProgress: bool.isRequired,
    userData: shape({
      id: oneOfType([number, string]).isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      email: string.isRequired,
      profileImage: shape({
        uri: string.isRequired,
      }).isRequired,
    }).isRequired,
    updateUserProfileImage: func.isRequired,
  };
  static defaultProps = {
    title: null,
    isGroup: false,
    colorOption: null,
    closeButtonPosition: 1, // 1 for right, 0 for left
    onCloseHandler: null,
    imageLink: null,
  }

  static navigationOptions = () => ({
    header: null,
  });

  handleOnPress = (data) => {
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce(upperFirst(camelCase(data)));
  };
  handleClose = () => {
    if (this.props.onCloseHandler) {
      this.props.onCloseHandler();
      return;
    }
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce('MyGroups');
  }
  cameraIconOnPressHandler = async () => {
    const {
      photoPermission,
      cameraPermission,
      permissionErrors,
      groupData: { role },
      updatingGroupImageInProgress,
      updatingUserProfileImageInProgress,
    } = this.props;

    // Prevent button press spam and check for usage permission
    if (updatingUserProfileImageInProgress || (updatingGroupImageInProgress && !isOwnerOrAdmin(role))) {
      return;
    }

    // Show photo permission denied message
    if (permissionErrors.photo) {
      const { title, message } = permissionErrors.photo;
      Alert.alert(title, message);
      return;
    }

    // Show camera permission denied message
    if (permissionErrors.camera) {
      const { title, message } = permissionErrors.camera;
      Alert.alert(title, message);
      return;
    }

    // Some of the permissions are undetermined
    if (!photoPermission || !cameraPermission) {
      // Request for photo permission
      if (!photoPermission) {
        this.props.requestPermission('photo');
      }

      // Request for camera permission
      if (!cameraPermission) {
        this.props.requestPermission('camera');
      }

      return;
    }

    // Open image picker
    this.openImagePicker(true);
  };

  openImagePicker = async (isGroup) => {
    try {
      // Open image picker
      const response = await ImagePicker.showImagePicker();

      // Update group image by uploading it to the server
      if (isGroup) {
        this.props.updateCurrentGroupImageById(this.props.groupData.id, response);
      } else {
        this.props.updateUserProfileImage(response);
      }
    } catch (errors) {
      // User cancels image selection or something went wrong
      if (errors) {
        Alert.alert('', errors);
      }
    }
  };

  renderCameraIcon = () => {
    const { isGroup, groupData: { role }, updatingGroupImageInProgress, updatingUserProfileImageInProgress } = this.props;

    // Only group owner and admins can update group image/thumbnail
    if (isGroup && !isOwnerOrAdmin(role)) {
      return null;
    }

    // Show loader when image is being updated
    if (updatingGroupImageInProgress || updatingUserProfileImageInProgress) {
      return (
        <View style={[styles.cameraIconContainer, styles.activityIndicator]}>
          <ActivityIndicator
            color={BLACK}
            size="small"
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.cameraIconContainer}
        onPress={this.cameraIconOnPressHandler}
      >
        <Image
          style={styles.cameraIcon}
          source={getLocalIcon('cameraIcon')}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { title, colorOption, closeButtonPosition, imageLink, isGroup,
      groupData: { imageUrl } } = this.props;
    const userImageUrl = this.props.userData.imageUrl;

    let colors;
    switch (colorOption) {
      case 'Calm':
        colors = ['#65e3ce', '#05d69e'];
        break;
      case 'Blue':
        colors = ['#74cae1', '#219ac7'];
        break;
      case 'Green':
        colors = ['#21cb86', '#08a541'];
        break;
      case 'DarkBlue':
        colors = ['#007ed2', '#1c9cdb'];
        break;
      default:
        colors = null;
        break;
    }
    return (
      <View>
        <Header
          style={styles.header}
        >
          { colors ?
            <LinearGradient
              colors={colors}
              style={{ flex: 1, flexDirection: 'row' }}
            >
              {closeButtonPosition === 1 ?
                <Right style={{ flex: 1 }}>
                  <Button
                    transparent
                    onPress={() => this.handleClose()}
                  >
                    <Icon
                      name={'arrow-forward'}
                      style={StyleSheet.flatten(globalColors.white)}
                    />
                  </Button>
                </Right>
                :
                <Left style={{ flex: 1 }}>
                  <Button
                    transparent
                    onPress={() => this.handleClose()}
                  >
                    <Icon
                      name={'arrow-back'}
                      style={StyleSheet.flatten(globalColors.white)}
                    />
                  </Button>
                </Left>
              }
            </LinearGradient>
            :
            <View
              style={{ flex: 1, flexDirection: 'row' }}
            >
              {closeButtonPosition === 1 ?
                <Right style={{ flex: 1 }}>
                  <Button
                    transparent
                    onPress={() => this.handleClose()}
                  >
                    <Icon
                      name={'arrow-forward'}
                      style={StyleSheet.flatten(globalColors.white)}
                    />
                  </Button>
                </Right>
                :
                <Left style={{ flex: 1 }}>
                  <Button
                    transparent
                    onPress={() => this.handleClose()}
                  >
                    <Icon
                      name={'arrow-back'}
                      style={StyleSheet.flatten(globalColors.white)}
                    />
                  </Button>
                </Left>
              }
            </View>
          }

          { title ?
            <Text style={styles.titleText}>{title}</Text>
            : null
          }
        </Header>
        { imageLink ?
          <TouchableOpacity
            onPress={() => this.handleOnPress(imageLink)}
            style={styles.imageContainer}
          >
            { !title ?
              <Thumbnail
                style={styles.thumbnail}
                source={{ uri: isGroup ? imageUrl : userImageUrl }}
              />
              : null }
            { isGroup ? this.renderCameraIcon() : null }
          </TouchableOpacity>
          : null }
        {!imageLink ?
          <View
            style={styles.imageContainer}
          >
            { !title ?
              <Thumbnail
                style={styles.thumbnail}
                source={{ uri: isGroup ? imageUrl : userImageUrl }}
              />
              : null }
            { isGroup ? this.renderCameraIcon() : null }
          </View>
          : null }
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userData: selectUserData(state),
  updatingUserDataInProgress: selectUpdatingUserDataProgressStatus(state),
  updatingUserProfileImageInProgress: selectUpdatingUserProfileImageProgressStatus(state),
  groupData: selectCurrentGroupData(state),
  photoPermission: selectPhotoPermissionStatus(state),
  cameraPermission: selectCameraPermissionStatus(state),
  permissionErrors: selectPermissionErrors(state),
  updatingGroupImageInProgress: selectUpdatingGroupImageInProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateUserProfileImage,
    requestPermission,
    updateCurrentGroupImageById,
    resetNavWorkaroundState,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GradientHeader);
