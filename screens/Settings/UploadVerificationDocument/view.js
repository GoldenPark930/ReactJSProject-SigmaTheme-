import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { Alert, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import {
  Button,
  Body,
  Left,
  Right,
  Icon,
} from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from '../../../utils/image-picker';

// import NetworkInfo from 'react-native-network-info';
import { navigationPropTypes } from '../../../constants/app/defaults';
import globalColors from '../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../GlobalCss/globalBackgroundColors';
import Header from '../../../components/NewHeader';
import NavigationService from '../../../utils/helpers/navigation-service';

import styles from './styles';

const globalStyles = styleSheet => StyleSheet.flatten(styleSheet);

// PropTypes
const { bool, number, string, func, oneOfType, shape } = PropTypes;

class UploadVerificationDocumentView extends Component {
  static propTypes = {
    // Flags
    updatingUserDocumentInProgress: bool.isRequired,
    // Data
    userData: shape({
      id: oneOfType([number, string]).isRequired,
    }).isRequired,
    requestErrors: shape({}).isRequired,
    // Functions
    updateUserDocument: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };
  /*
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={globalStyles([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)} >
            <Icon name="arrow-back" style={globalStyles(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={1} style={globalStyles([globalColors.royal, { fontSize: 16 }])}>Verify Identity</Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });
*/
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      selectingDocumentInProgress: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // const { firstName, lastName, email, phone } = nextProps.userData;
    const { requestErrors } = nextProps;

    // Reflect user data update in Redux
    if (this.props.updatingUserDocumentInProgress && !nextProps.updatingUserDocumentInProgress) {
      // this.setState({ firstName, lastName, email, phone });
      if (Object.keys(requestErrors).length > 0) {
        Alert.alert('Document Upload', 'Something went wrong. Please try again later');
      } else {
        Alert.alert('Document Upload', 'The document was uploaded successfully. Please wait for approval');
        NavigationService.navigateWithDebounce('AccountSettings');
      }
    }
  }

  cameraIconOnPressHandler = async () => {
    const {
      photoPermission,
      cameraPermission,
      permissionErrors,
    } = this.props;

    const { selectingDocumentInProgress } = this.state;
    // Prevent button press spam and check for usage permission
    if (selectingDocumentInProgress) {
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

    // Open document picker
    // this.selectDocument();
    // this.openImagePicker();
    this.openImagePicker();
  };
  openImagePicker = async () => {
    this.toggleSelectInProgressStatus();
    try {
      // Open image picker
      const response = await ImagePicker.showImagePicker();
      if (response) {
        this.setState({ file: response });
      }

      // Update user profile image by uploading it to the server
    } catch (errors) {
      this.toggleSelectInProgressStatus();
      // User cancels image selection or something went wrong
      if (errors) {
        Alert.alert('', errors);
      }
      return;
    }
    this.toggleSelectInProgressStatus();
  };


  selectDocument = async () => {
    this.toggleSelectInProgressStatus();
    try {
      DocumentPicker.show({
        filetype: [DocumentPickerUtil.images(), DocumentPickerUtil.pdf()],
      }, (error, res) => {
        this.setState({ file: res });
        this.toggleSelectInProgressStatus();
      });
    } catch (err) {
      this.setState({ err });
      this.toggleSelectInProgressStatus();
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        // throw err;
      }
    }
  }

  toggleSelectInProgressStatus = () =>
    this.setState(state => ({ selectingDocumentInProgress: !state.selectingDocumentInProgress }));

  updateButtonOnPressHandler = async () => {
    const { selectingDocumentInProgress, file } = this.state;

    if (selectingDocumentInProgress || !file) {
      Alert.alert('Document is empty', 'Please select document');
      return;
    }
    const {
      updatingUserDocumentInProgress,
      updateUserDocument,
    } = this.props;

    // Prevent API call spam
    if (!updatingUserDocumentInProgress) {
      // Upload the image
      updateUserDocument(
        { documentType: 'passport', file }, // new document
        // () => NavigationService.navigateWithDebounce('MyGroups'),// on success callback
      );
    }
  };

  isProfileDataUpdating = () =>
    this.props.updatingUserDocumentInProgress;

  renderCameraIcon = () =>
    (!this.state.file ?
      (<TouchableOpacity style={styles.cameraIconContainer} onPress={this.cameraIconOnPressHandler}>
        <FontAwesome style={{ fontSize: 40 }}>{Icons.camera}</FontAwesome>
        <Text>Add</Text>
        <Text>photo</Text>
      </TouchableOpacity>)
      :
      (<TouchableOpacity
        style={styles.cameraIconContainer}
        onPress={this.cameraIconOnPressHandler}
      >
        <Image
          style={styles.photoImage}
          source={{ uri: this.state.file.uri }}
        />
      </TouchableOpacity>))
      ;


  render() {
    // TODO fix camera icon on profile picture
    // TODO fix padding on list and underline on list items to look like design
    return (
      <View style={{ flex: 1 }} >
        <Header
          title="Account Settings"
          leftActionIcon="ios-arrow-back"
          leftAction={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>
              {'Please upload a picture of your ID,'}
            </Text>
            <Text style={[styles.text, styles.title]}>
              {'Driver\'s License, or Passport.'}
            </Text>
            {this.renderCameraIcon()}
            <Button style={styles.button} onPress={this.updateButtonOnPressHandler}>
              {
                this.isProfileDataUpdating()
                  ? <ActivityIndicator size="large" />
                  : (
                    <Text style={styles.textButton}>Confirm my identity</Text>
                  )
              }

            </Button>
          </View>
          <View style={[styles.container, styles.longContainer]}>
            <Text style={[styles.text, styles.description]}>
              {`By submitting information above you agree to allow Payclub and its partners (including Dwolla)
             to verify your identity. If you have any questions please reach out to support@payclub.co`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default UploadVerificationDocumentView;
