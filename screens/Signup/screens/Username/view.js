import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert, TextInput } from 'react-native';

import { navigationPropTypes } from '../../../../constants/app/defaults';
import SignupHeader from '../../components/signup-header';
import ProgressBar from '../../components/progress-bar';
import ScreenTitle from '../../components/screen-title';
import NextButton from '../../components/next-button';
import styles, { SEMI_GREY, TRANSPARENT } from './styles';
import NavigationService from '../../../../utils/helpers/navigation-service';

const NEXT_SCREEN = 'Permission';

class UsernameScreen extends Component {
  textInputOnValueChangeEventHandler = (username) => {
    this.props.setSignupData({ username });
  };

  nextButtonOnPressHandler = async () => {
    const { username } = this.props.signupData;
    let error = null;

    if (username === '') {
      error = 'Username can\'t be empty';
    }

    if (!error) {
      this.props.doesUsernameRegistered(username, () => {
        if (!this.props.isUsernameRegistered) {
          NavigationService.navigateWithDebounce(NEXT_SCREEN);
        } else {
          this.showAlert('Username already taken');
        }
      });
    } else if (error) this.showAlert(error);
  };

  showAlert = text =>
    Alert.alert(
      '',
      text,
      [{ text: 'OK', onPress: () => this.textInput.focus() }],
    );

  render() {
    return (
      <View style={styles.mainContainer}>
        <SignupHeader navigation={this.props.navigation} />
        <ProgressBar currentStep={5} />

        <ScreenTitle text={'What should we call you?'} />

        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <TextInput
              autoFocus
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="username"
              returnKeyType="done"
              placeholderTextColor={SEMI_GREY}
              underlineColorAndroid={TRANSPARENT}
              onChangeText={this.textInputOnValueChangeEventHandler}
              value={this.props.signupData.username}
              onSubmitEditing={this.nextButtonOnPressHandler}
              ref={(input) => {
                this.textInput = input;
              }}
            />

            <View style={styles.formControlUnderline} />
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Your username is unique. You can always change it later.
          </Text>
        </View>

        <NextButton
          containerStyles={styles.buttonContainer}
          onPressHandler={this.nextButtonOnPressHandler}
          inProgress={this.props.doesUsernameRegisteredInProgress}
        />
      </View>
    );
  }
}

const { func, shape } = PropTypes;
UsernameScreen.propTypes = {
  setSignupData: func.isRequired,
  signupData: shape({}).isRequired,
  ...navigationPropTypes(PropTypes),
};

export default UsernameScreen;
