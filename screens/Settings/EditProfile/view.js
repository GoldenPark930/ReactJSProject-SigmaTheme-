import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import {
  View,
  Text,
  Alert,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Input,
  Item,
  Label,
  Thumbnail,
  Form,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigationPropTypes } from '../../../constants/app/defaults';
import ImagePicker from '../../../utils/image-picker';
import globalColors from '../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../GlobalCss/globalBackgroundColors';
import Header from '../../../components/NewHeader';

import styles from '../styles';
import NavigationService from '../../../utils/helpers/navigation-service';
import { CALM, WHITE } from '../../../constants/colors';

const globalStyles = styleSheet => StyleSheet.flatten(styleSheet);

// PropTypes
const { bool, number, string, func, oneOfType, shape } = PropTypes;
const permissionErrorPropTypes = shape({
  title: string.isRequired,
  message: string.isRequired,
});

class EditProfileView extends Component {
  static propTypes = {
    // Flags
    photoPermission: bool.isRequired,
    cameraPermission: bool.isRequired,
    updatingUserDataInProgress: bool.isRequired,
    updatingUserProfileImageInProgress: bool.isRequired,
    // Data
    userData: shape({
      id: oneOfType([number, string]).isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      email: string.isRequired,
      profileImage: shape({
        uri: string.isRequired,
      }).isRequired,
    }).isRequired,
    permissionErrors: shape({
      photo: permissionErrorPropTypes,
      camera: permissionErrorPropTypes,
    }).isRequired,
    // Functions
    requestPermission: func.isRequired,
    updateUserDataById: func.isRequired,
    updateUserProfileImage: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  state = pick(this.props.userData, ['email', 'firstName', 'lastName']);

  componentWillReceiveProps(nextProps) {
    const { firstName, lastName, email } = nextProps.userData;

    // Reflect user data update in Redux
    if (this.props.updatingUserDataInProgress && !nextProps.updatingUserDataInProgress) {
      this.setState({ firstName, lastName, email });
    }

    // Open image picker when user granted all required permissions
    // so he/she doesn't need to press the camera button once again
    if (
      (!this.props.photoPermission || !this.props.cameraPermission)
      && nextProps.photoPermission && nextProps.cameraPermission
    ) {
      // Open image picker
      this.openImagePicker();
    }
  }

  updateButtonOnPressHandler = () => {
    const { firstName, lastName, email } = this.state;
    const {
      userData: { id },
      updateUserDataById,
      updatingUserDataInProgress,
    } = this.props;

    // Prevent API call spam
    if (!updatingUserDataInProgress) {
      // Update user data
      updateUserDataById(
        id, // userId
        { firstName, lastName, email }, // new user data
        () => NavigationService.navigateWithDebounce('MyGroups'), // on success callback
      );
    }
  };

  cameraIconOnPressHandler = async () => {
    const { photoPermission, cameraPermission, permissionErrors, requestPermission } = this.props;

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
        requestPermission('photo');
      }

      // Request for camera permission
      if (!cameraPermission) {
        requestPermission('camera');
      }

      return;
    }

    // Open image picker
    this.openImagePicker();
  };

  openImagePicker = async () => {
    try {
      // Open image picker
      const response = await ImagePicker.showImagePicker();

      // Update user profile image by uploading it to the server
      this.props.updateUserProfileImage(response);
    } catch (errors) {
      // User cancels image selection or something went wrong
      if (errors) {
        Alert.alert('', errors);
      }
    }
  };

  isProfileDataUpdating = () =>
    this.props.updatingUserProfileImageInProgress || this.props.updatingUserDataInProgress;

  render() {
    // TODO fix camera icon on profile picture
    // TODO fix padding on list and underline on list items to look like design
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Edit Profile"
          leftActionIcon={params !== undefined ? 'ios-arrow-back' : 'ios-menu-outline'}
          leftAction={() => {
            Keyboard.dismiss();
            if (params !== undefined) {
              this.props.navigation.goBack(null);
            } else {
              this.props.navigation.navigate('DrawerOpen');
            }
          }}
        />
        <Container style={globalStyles(globalBackgroundColors.white)}>
          <Content padder>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '20%' }} />
              <Item style={{ width: 130, borderBottomWidth: 0, marginTop: 25 }}>
                <Body>
                  <Thumbnail
                    style={{ width: 130, height: 130, borderRadius: 65 }}
                    source={this.props.userData.profileImage}
                  />
                  <Button
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      height: 33,
                      width: 33,
                      padding: 0,
                      borderRadius: 16.5,
                      backgroundColor: CALM,
                    }}
                    onPress={this.cameraIconOnPressHandler}
                  >
                    <Icon
                      name="ios-camera"
                      size={25}
                      color={WHITE}
                    />
                  </Button>
                </Body>
              </Item>
              <View style={{ width: '20%' }} />
            </View>

            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  placeholderTextColor={styles.colors.LIGHT_GREY}
                  underlineColorAndroid={styles.colors.CALM}
                  onChangeText={text => this.setState({ firstName: text })}
                  value={this.state.firstName}
                />
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  placeholderTextColor={styles.colors.LIGHT_GREY}
                  underlineColorAndroid={styles.colors.CALM}
                  onChangeText={text => this.setState({ lastName: text })}
                  value={this.state.lastName}
                />
              </Item>
              <Item floatingLabel>
                <Label>Email Address</Label>
                <Input
                  placeholderTextColor={styles.colors.LIGHT_GREY}
                  underlineColorAndroid={styles.colors.CALM}
                  keyboardType="email-address"
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email}
                />
              </Item>
            </Form>
            <Button
              full
              disabled={this.isProfileDataUpdating()}
              style={globalStyles([globalBackgroundColors.grey, { marginTop: 20 }])}
              onPress={this.updateButtonOnPressHandler}
            >
              {
                this.isProfileDataUpdating()
                  ? <ActivityIndicator size="large" />
                  : (
                    <Text style={globalStyles([globalColors.white, { fontSize: 20 }])}>
                      Update
                    </Text>
                  )
              }
            </Button>
          </Content>
        </Container>
      </View>
    );
  }
}

export default EditProfileView;
