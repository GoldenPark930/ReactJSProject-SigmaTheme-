import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert, TouchableOpacity, Platform } from 'react-native';
import { merge } from 'lodash';

import { navigationPropTypes } from 'src/constants/app/defaults';
import { storeToken, StoreUserAccountInfo } from 'src/common/localStorage';
import SignupHeader from '../../components/signup-header';
import ProgressBar from '../../components/progress-bar';
import ScreenTitle from '../../components/screen-title';
import PermissionConfig from './constants/permission-list-config';
import PermissionList from './components/permission-list';
import NavigationService from '../../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Signup -> Permission view
 |------------------------------------------------------------------------------
 */

const { bool, string, func, shape } = PropTypes;
const permissionErrorPropTypes = shape({
  title: string.isRequired,
  message: string.isRequired,
});
const NEXT_SCREEN = 'Congratulation';

class PermissionView extends Component {
  static propTypes = {
    // Flags
    requestInProgress: bool.isRequired,
    locationPermission: bool.isRequired,
    contactsPermission: bool.isRequired,
    notificationsPermission: bool.isRequired,
    creationIsInProgress: bool.isRequired,
    // Data
    permissionErrors: shape({
      contacts: permissionErrorPropTypes,
      location: permissionErrorPropTypes,
      notifications: permissionErrorPropTypes,
    }).isRequired,
    requestResult: shape({}).isRequired,
    requestErrors: shape({}).isRequired,
    signupData: shape({}).isRequired,
    // Functions
    requestDataLoadingInterval: func.isRequired,
    requestPermission: func.isRequired,
    createNewUser: func.isRequired,
    setCurrentUser: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillReceiveProps(nextProps) {
    const { creationIsInProgress, setCurrentUser, navigation: { navigate } } = this.props;

    if (creationIsInProgress && !nextProps.creationIsInProgress) {
      const { requestErrors, requestResult } = nextProps;

      if (Object.keys(requestErrors).length > 0) {
        // TODO: Implement actual error handler
        Alert.alert('Error', 'Something went wrong...');
      }

      if (requestResult && requestResult.token) {
        const { token: { id } } = requestResult;

        // TODO: Remove User store
        storeToken(id);
        StoreUserAccountInfo(requestResult);

        setCurrentUser(nextProps.requestResult);
        this.props.requestDataLoadingInterval();
        NavigationService.navigateWithDebounce('Permission');
      }
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  completeSignupButtonOnPressHandler = () => {
    const { signupData, createNewUser, navigation: { navigate } } = this.props;

    // Create new user and navigate to the next screen on success
    createNewUser(signupData, () => NavigationService.navigateWithDebounce(NEXT_SCREEN));
  };

  permissionOnToggleHandler = (type) => {
    // User can't turn off permission directly from the application
    const lowerType = type.toLowerCase();
    if (!this.props[`${lowerType}Permission`]) {
      const { permissionErrors } = this.props;
      const permissionErrorData = permissionErrors[lowerType];
      if (permissionErrorData) {
        // Show permission error alert
        Alert.alert(permissionErrorData.title, permissionErrorData.message);
      } else {
        // Request for permission of a certain type
        this.props.requestPermission(lowerType);
      }
    }
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderCompleteSignupButton = () => {
    const { locationPermission, contactsPermission, notificationsPermission } = this.props;

    const osPermissions = Platform.OS === 'ios' ?
      (locationPermission && contactsPermission && notificationsPermission) :
      (locationPermission && contactsPermission);

    const buttonLabel = (
      <Text style={styles.buttonLabel}>
        Complete Signup
      </Text>
    );

    if (osPermissions) {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, styles.buttonEnabled]}
          onPress={this.completeSignupButtonOnPressHandler}
        >
          {buttonLabel}
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.buttonContainer, styles.buttonDisabled]}>
        {buttonLabel}
      </View>
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const {
      requestInProgress,
      locationPermission,
      contactsPermission,
      notificationsPermission,
    } = this.props;

    // Extend permission config with permission statuses and convert to array
    const extendedPermissionConfig = Object.values(
      merge(PermissionConfig, {
        location: { status: locationPermission },
        notifications: { status: notificationsPermission },
        contacts: { status: contactsPermission },
      }),
    );
    if (Platform.OS === 'android') extendedPermissionConfig.splice(1, 1);

    return (
      <View style={styles.mainContainer}>
        <SignupHeader navigation={this.props.navigation} />
        <ProgressBar currentStep={6} />

        <ScreenTitle text={'And lastly...'} />

        <PermissionList
          requestInProgress={requestInProgress}
          onToggleHandler={this.permissionOnToggleHandler}
          permissionConfig={extendedPermissionConfig}
        />

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Access to the following is required to register for PayClub. Please accept each
          </Text>
        </View>

        {this.renderCompleteSignupButton()}
      </View>
    );
  }
}

export default PermissionView;
