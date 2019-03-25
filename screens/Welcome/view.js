import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import isEmpty from 'lodash/isEmpty';

import { storeToken, StoreUserAccountInfo } from '../../common/localStorage';
import { navigationPropTypes } from '../../constants/app/defaults';
import WelcomeView from './screens/welcome';

class WelcomeContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.authenticationIsInProgress && !nextProps.authenticationIsInProgress) {
      const { requestErrors, requestResult } = nextProps;
      // If error
      // if (!isEmpty(requestErrors)) Alert.alert('error', 'Phone verification error');
      // If user not found: go to signUp
      if (!requestResult.token) this.props.navigation.navigate('Signup');
      // If user: go to main screen
      else if (requestResult.token) {
        const { token } = requestResult;
        // TODO: Remove User store
        storeToken(token.id);
        StoreUserAccountInfo(requestResult);
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'MainApp' }),
          ],
        }));
        this.props.getUserData();
      }
    }
  }

  onFacebookPress = async () => {
    this.props.facebookLogin((errors, accessToken) => {
      if (errors || !accessToken) {
        return; /* Alert.alert('Error While Login in'); */
      }
      return this.props.facebookAuthenticate(accessToken);
    });
  };

  onGooglePress = async () => {
    this.props.googleLogin((errors) => {
      if (errors) return Alert.alert('Error While Login in');
      return this.props.navigation.navigate('Signup');
    });
  };

  onSignUpPress = async () => {
    this.props.navigation.navigate('Signup');
  };

  onLoginPress = async () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <WelcomeView
        onFacebookPress={this.onFacebookPress}
        onGooglePress={this.onGooglePress}
        onSignUpPress={this.onSignUpPress}
        onLoginPress={this.onLoginPress}
      />
    );
  }
}

const { func, shape, bool } = PropTypes;
WelcomeContainer.propTypes = {
  authenticationIsInProgress: bool.isRequired,
  requestResult: shape({}).isRequired,
  requestErrors: shape({}).isRequired,
  getUserData: func.isRequired,
  facebookAuthenticate: func.isRequired,
  facebookLogin: func.isRequired,
  googleLogin: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

export default WelcomeContainer;
