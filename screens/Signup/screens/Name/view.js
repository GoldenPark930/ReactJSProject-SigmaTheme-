import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Alert, TextInput } from 'react-native';

import { navigationPropTypes } from '../../../../constants/app/defaults';
import SignupHeader from '../../components/signup-header';
import ProgressBar from '../../components/progress-bar';
import ScreenTitle from '../../components/screen-title';
import NextButton from '../../components/next-button';
import NavigationService from '../../../../utils/helpers/navigation-service';
import styles, { SEMI_GREY, TRANSPARENT } from './styles';

const NEXT_SCREEN = 'PhoneNumber';

class NameScreen extends Component {
  textInputOnValueChangeEventHandler = (data) => {
    this.props.setSignupData(data);
  };

  nextButtonOnPressHandler = () => {
    const { navigate } = this.props.navigation;

    // Validate data and navigate to next step if its valid
    return this.verifyNames() && NavigationService.navigateWithDebounce(NEXT_SCREEN);
  };

  verifyNames = () => {
    const { firstName, lastName } = this.props.signupData;
    const errors = [];
    let focusTarget = null;

    // Validate first name
    if (firstName === '') {
      errors.push('First name can\'t be empty');
      focusTarget = this.firstNameInput;
    }

    // Validate last name
    if (lastName === '') {
      errors.push('Last name can\'t be empty');
      focusTarget = focusTarget || this.lastNameInput;
    }

    // Alert errors if there are any
    if (errors.length > 0) {
      this.showAlert(errors.join('\n'), focusTarget);
    }

    return errors.length === 0;
  };

  showAlert = (text, focusTarget) =>
    Alert.alert(
      '',
      text,
      [{ text: 'OK', onPress: () => focusTarget.focus() }],
    );

  render() {
    return (
      <View style={styles.mainContainer}>
        <SignupHeader
          backButtonLabel="Cancel"
          navigation={this.props.navigation}
        />
        <ProgressBar currentStep={1} />

        <ScreenTitle text={'Hi. What\'s your name?'} />

        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <TextInput
              autoFocus
              style={styles.input}
              autoCapitalize="words"
              placeholder="First name"
              returnKeyType="next"
              autoCorrect={false}
              placeholderTextColor={SEMI_GREY}
              underlineColorAndroid={TRANSPARENT}
              onChangeText={text => this.textInputOnValueChangeEventHandler({ firstName: text })}
              value={this.props.signupData.firstName}
              onSubmitEditing={() => this.lastNameInput.focus()}
              ref={(input) => {
                this.firstNameInput = input;
              }}
            />
            <View style={styles.formControlUnderline} />
          </View>

          <View style={styles.formControl}>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              placeholder="Last name"
              returnKeyType="done"
              autoCorrect={false}
              placeholderTextColor={SEMI_GREY}
              underlineColorAndroid={TRANSPARENT}
              onChangeText={text => this.textInputOnValueChangeEventHandler({ lastName: text })}
              value={this.props.signupData.lastName}
              onSubmitEditing={this.nextButtonOnPressHandler}
              ref={(input) => {
                this.lastNameInput = input;
              }}
            />
            <View style={styles.formControlUnderline} />
          </View>
        </View>

        <NextButton
          containerStyles={styles.buttonContainer}
          onPressHandler={this.nextButtonOnPressHandler}
        />
      </View>
    );
  }
}

const { func, shape } = PropTypes;
NameScreen.propTypes = {
  signupData: shape({}).isRequired,
  setSignupData: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

export default NameScreen;
