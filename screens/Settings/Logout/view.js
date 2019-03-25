import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, StatusBar, View } from 'react-native';
import { Button, Container, Content, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { clearStorage } from '../../../common/localStorage';
import { getLocalImage } from '../../../utils/helpers';
import { navigationPropTypes } from '../../../constants/app/defaults';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Logout screen
 |------------------------------------------------------------------------------
 */

const { func } = PropTypes;

class LogoutScreen extends Component {
  static propTypes = {
    // Functions
    logout: func.isRequired,
    resetCurrentGroupState: func.isRequired,
    resetCurrentUserState: func.isRequired,
    resetPhoneNumberState: func.isRequired,
    resetDataLoadingInterval: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  state = {
    isLoading: true,
    loggedOut: false,
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    const { loggedOut } = this.state;

    if (!loggedOut) {
      this.logout();
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onPress = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Auth' }),
      ],
    }));
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  logout = async () => {
    // Logout user
    await this.props.logout();

    // Clear device local storage
    await clearStorage();

    this.props.resetDataLoadingInterval();

    // Update state to reflect it on the screen
    this.setState({ loggedOut: true, isLoading: false });
  };

  renderContent = () => {
    const { content } = styles;

    // Render loading spinner while logout process in in progress
    if (this.state.isLoading) {
      return (
        <View style={content.spinnerWrapper}>
          <Spinner />
        </View>
      );
    }

    // Render 'good bye' screen
    return (
      <Content style={content.wrapper}>
        <Text style={content.textCalm}>
          {'You have successfully\n logged out'}
        </Text>

        <Text style={content.textRoyal}>
          {'Come back soon\n we\'ll be missing you!'}
        </Text>

        <Button
          full
          style={content.buttonContainer}
          onPress={this.onPress}
        >
          <Text style={content.buttonText}>
            Login
          </Text>
        </Button>
      </Content>
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { global } = styles;

    return (
      <Container style={global.wrapper}>
        <StatusBar barStyle="light-content" />

        {this.renderContent()}
      </Container>
    );
  }
}

export default LogoutScreen;

// TODO {Maksym}: `login` button sometimes does not responding
// TODO {Maksym}: left side menu should not be visible
