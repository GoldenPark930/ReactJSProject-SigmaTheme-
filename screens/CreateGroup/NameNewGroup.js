import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert,
  View,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Title } from 'native-base';
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';


import {
  selectPhotoPermissionStatus,
  selectCameraPermissionStatus,
  selectPermissionErrors,
} from '../../store/selectors/permission';

import { requestPermission } from '../../store/actions/permission';
import ImagePicker from '../../utils/image-picker';
import * as api from '../../scripts/api-functions';
import { ALL_ROLES } from '../../constants/users/roles';
import { setCurrentlyViewedGroup } from '../../store/actions/current-group';
import ModalWithOverlay from '../../components/modal-with-overlay';
import CheckBox from '../Signup/screens/Email/checkbox';
import isIphoneX from '../../utils/helpers/is-iphone-x';

import { REGULAR } from '../../constants/fonts';
import * as Colors from '../../constants/colors';
import globalColors from '../../GlobalCss/globalColors';
import { navigationPropTypes } from '../../constants/app/defaults';
import styles from './styles';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import Header from '../../components/NewHeader';
import NavigationService from '../../utils/helpers/navigation-service';

const { bool, string, shape, func } = PropTypes;
const permissionErrorPropTypes = shape({
  title: string.isRequired,
  message: string.isRequired,
});

class NameNewGroup extends Component {
  static propTypes = {
    photoPermission: bool.isRequired,
    cameraPermission: bool.isRequired,
    permissionErrors: shape({
      photo: permissionErrorPropTypes,
      camera: permissionErrorPropTypes,
    }).isRequired,
    setCurrentlyViewedGroup: func.isRequired,
    requestPermission: func.isRequired,
    ...navigationPropTypes(PropTypes),
  };

  constructor(props) {
    super(props);
    this.state = {
      newGroupName: '',
      newGroupTopic: '',
      enableBalance: 1,
      publicGroup: 0,
      updatingNewGroupImageInProgress: false,
      creatingNewGroupInProgress: false,
      newImageInfo: null,
      isModalVisible: false,
    };
  }

  onRadioPress = (value) => {
    this.setState({ enableBalance: value, publicGroup: value === 1 ? 0 : 1 });
  }

  setClubType = (value) => {
    this.setState({ enableBalance: value, publicGroup: value === 1 ? 0 : 1 });
    this.closeModal();
  }

  createNewGroup = async () => {
    const { enableBalance, publicGroup, newGroupName, newGroupTopic, newImageInfo } = this.state;
    this.toggleCreateNewGroupInProgressStatus();

    try {
      const groupBalance = enableBalance !== 0;
      const response = await api.CreateNewGroup(newGroupName, newGroupTopic, [], groupBalance, newImageInfo, publicGroup);
      if (response) {
        await this.props.setCurrentlyViewedGroup(response);
        this.props.navigation.navigate('InviteFriendsToGroup');
      } else {
        Alert.alert('Creating Club Failed', 'Try again.');
      }
    } catch (error) {
      // console.error(error);
    }
    this.toggleCreateNewGroupInProgressStatus();
  }

  moveToNextPage = () => {
    if (this.state.creatingNewGroupInProgress) {
      return;
    }
    // here let's create a group first.
    const { newGroupName } = this.state;

    if (newGroupName.length <= 0) Alert.alert('Name too short!', 'Club names must be more than 0 characters.');
    else if (newGroupName.length > 30) Alert.alert('Name too long!', 'Club names can not be more than 30 characters.');
    else {
      this.createNewGroup();
      // NavigationService.navigateWithDebounce('InviteFriendsToGroup', { newGroupName, enableBalance, newImageInfo });
    }
  }

  updateText = (text) => {
    const newGroupName = text;
    this.setState({ newGroupName });
  };

  updateTopic = (text) => {
    const newGroupTopic = text;
    this.setState({ newGroupTopic });
  };

  toggleUploadInProgressStatus = () =>
    this.setState(state => ({ updatingNewGroupImageInProgress: !state.updatingNewGroupImageInProgress }));

  toggleCreateNewGroupInProgressStatus = () =>
    this.setState(state => ({ creatingNewGroupInProgress: !state.creatingNewGroupInProgress }));

  cameraIconOnPressHandler = async () => {
    const {
      photoPermission,
      cameraPermission,
      permissionErrors,
    } = this.props;
    const { updatingNewGroupImageInProgress } = this.state;
    // Prevent button press spam and check for usage permission
    if (updatingNewGroupImageInProgress) {
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
    this.openImagePicker();
  };
  openImagePicker = async () => {
    this.toggleUploadInProgressStatus();
    try {
      // Open image picker
      const newImageInfo = await ImagePicker.showImagePicker();

      // Update group image by uploading it to the server
      // this.props.updateNewGroupImage(response);
      if (newImageInfo) {
        this.setState({ newImageInfo });
      }
      // this.props.updateCurrentGroupImageById(this.props.groupData.id, response);
    } catch (errors) {
      // User cancels image selection or something went wrong
      if (errors) {
        Alert.alert('', errors);
      }
    }
    this.toggleUploadInProgressStatus();
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  openModal = () => {
    // Open model with 
    this.setState({ isModalVisible: true });
  };

  renderEditClubModal = () => {
    const { enableBalance } = this.state;
    return (
      <ModalWithOverlay
        animationType="fade"
        visible={this.state.isModalVisible}
        onRequestClose={this.closeModal}
      >
        <TouchableWithoutFeedback onPress={this.closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitle}>
                <Title style={[globalColors.royal, { fontSize: 16, fontFamily: REGULAR }]}>
                  Club Type
                </Title>
              </View>
            </View>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalListItem}
                onPress={() => this.setClubType(1)}
              >
                <View style={styles.itemLeft}>
                  <Text style={styles.footerTitleText}>
                    Closed Club
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    This club is moderated by the club owner.
                    Only they can charge members. Club balance stays separate from personal.
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    Ex. Club membership dues, fantasy sports.
                  </Text>
                </View>
                <View style={styles.itemRight}>
                  <CheckBox
                    checked={enableBalance === 1}
                    checkbtnClicked={() => this.setClubType(1)}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalListItem}
                onPress={() => this.setClubType(0)}
              >
                <View style={styles.itemLeft}>
                  <Text style={styles.footerTitleText}>
                    Open Club
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    Anyone in the club can charge each other.
                    Funds collected go into members personal balance.
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    Ex. Roomates, friends on vacation.
                  </Text>
                </View>
                <View style={styles.itemRight}>
                  <CheckBox
                    checked={enableBalance === 0}
                    checkbtnClicked={() => this.setClubType(0)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ModalWithOverlay>
    );
  }

  render() {
    const keyboardVerticalOffset = isIphoneX() ? 30 : 0;
    const { creatingNewGroupInProgress } = this.state;
    const keyboardAvoidingProps = Platform.OS === 'ios' ?
      { behavior: 'padding', keyboardVerticalOffset } : {};
    return (
      <View style={styles.container}>
        <Header
          leftActionIcon="ios-arrow-back"
          leftAction={() => { NavigationService.navigateWithDebounce('MyGroups'); }}
          rightAction={() => { this.moveToNextPage(); }}
          rightActionTitle="Next"
          rightActionColor={Colors.BLACK}
          spinning={creatingNewGroupInProgress}
        />

        <View style={styles.contentContainer}>
          {
            !this.state.newImageInfo ? (
              <TouchableOpacity
                style={styles.addPhotoButtonContainer}
                onPress={this.cameraIconOnPressHandler}
              >
                <FontAwesome style={styles.addPhotoIcon}>
                  {Icons.camera}
                </FontAwesome>
                <Text style={styles.addPhotoText}>
                  Add
                </Text>
                <Text style={styles.addPhotoText}>
                  photo
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addPhotoButtonContainer}
                onPress={this.cameraIconOnPressHandler}
              >
                <Image
                  style={styles.photoImage}
                  source={{ uri: this.state.newImageInfo.uri }}
                />
              </TouchableOpacity>
            )
          }
          <TextInput
            style={styles.enterClubInput}
            onChangeText={this.updateText}
            value={this.state.newGroupName}
            placeholder="Enter Club Name"
            placeholderTextColor={Colors.SEMI_GREY}
            selectionColor={Colors.CALM}
            underlineColorAndroid="transparent"
            autoFocus
            authCorrect={false}
          />
          <TextInput
            style={styles.enterClubTopicInput}
            onChangeText={this.updateTopic}
            value={this.state.newGroupTopic}
            placeholder="Club Topic (Optional)"
            placeholderTextColor={Colors.SEMI_GREY}
            selectionColor={Colors.CALM}
            underlineColorAndroid="transparent"
            autoFocus
            authCorrect={false}
          />
        </View>
        <KeyboardAvoidingView
          {...keyboardAvoidingProps}
        >
          <View style={styles.footerContainer}>
            {
              this.state.enableBalance === 1 ? (
                <View style={styles.footerTextContainer}>
                  <Text style={styles.footerTitleText}>
                    Closed Club
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    This club is moderated by the club owner.
                    Only they can charge members. Club balance stays separate from personal.
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    Ex. Club membership dues, fantasy sports.
                  </Text>
                </View>
              ) : (
                <View style={styles.footerTextContainer}>
                  <Text style={styles.footerTitleText}>
                    Open Club
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    Anyone in the club can charge each other.
                    Funds collected go into members personal balance.
                  </Text>
                  <Text style={styles.footerdDescriptionText}>
                    Ex. Roomates, friends on vacation.
                  </Text>
                </View>
              )
            }
            <TouchableOpacity
              style={styles.editButtonContainer}
              onPress={this.openModal}
            >
              <Text style={styles.editButtonText}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {this.renderEditClubModal()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  photoPermission: selectPhotoPermissionStatus(state),
  cameraPermission: selectCameraPermissionStatus(state),
  permissionErrors: selectPermissionErrors(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestPermission,
    setCurrentlyViewedGroup,
  }, dispatch);
const withSafeArea = withSafeAreaView(NameNewGroup);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);
