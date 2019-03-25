import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert, TextInput } from 'react-native';

import { navigationPropTypes } from '../../../../constants/app/defaults';
import { validateEmail } from '../../../../utils/helpers/validation';
import SignupHeader from '../../components/signup-header';
import ProgressBar from '../../components/progress-bar';
import ScreenTitle from '../../components/screen-title';
import NextButton from '../../components/next-button';
import styles, { SEMI_GREY, TRANSPARENT } from './styles';
import NavigationService from '../../../../utils/helpers/navigation-service';
import CheckBox from './checkbox';

const NEXT_SCREEN = 'Username';

class EmailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribedToNewsletter: true,
    };
  }

  textInputOnValueChangeEventHandler = (email) => {
    const { subscribedToNewsletter } = this.state;
    this.props.setSignupData({ email, subscribedToNewsletter });
  };

  nextButtonOnPressHandler = async () => {
    const { email } = this.props.signupData;
    let error = null;

    if (!validateEmail(email)) {
      error = 'Invalid email address';
    }

    if (!error) {
      this.props.doesEmailRegistered(email, () => {
        if (!this.props.isEmailRegistered) {
          NavigationService.navigateWithDebounce(NEXT_SCREEN);
        } else {
          this.showAlert('Email already taken');
        }
      });
    } else if (error) this.showAlert(error);
  };

  checkbtnClicked = () => {
    const { subscribedToNewsletter, email } = this.state;
    this.setState({ subscribedToNewsletter: !subscribedToNewsletter });
    this.props.setSignupData({ email, subscribedToNewsletter: !subscribedToNewsletter });
  }
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
        <ProgressBar currentStep={4} />

        <ScreenTitle text={'What\'s your email address?'} />

        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email address"
              keyboardType="email-address"
              returnKeyType="done"
              autoCorrect={false}
              placeholderTextColor={SEMI_GREY}
              underlineColorAndroid={TRANSPARENT}
              onChangeText={this.textInputOnValueChangeEventHandler}
              value={this.props.signupData.email}
              autoFocus
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
            Others will be able to find you publicly
          </Text>

          <Text style={styles.noteText}>
            by email or phone
          </Text>
        </View>

        <NextButton
          containerStyles={styles.buttonContainer}
          onPressHandler={this.nextButtonOnPressHandler}
          inProgress={this.props.doesEmailRegisteredInProgress}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={this.state.subscribedToNewsletter}
            checkbtnClicked={this.checkbtnClicked}
          />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>
              Subscribe to our newsletter
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const { func, shape } = PropTypes;
EmailScreen.propTypes = {
  signupData: shape({}).isRequired,
  setSignupData: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

export default EmailScreen;
