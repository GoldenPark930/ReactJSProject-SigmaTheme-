import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { navigationPropTypes } from 'src/constants/app/defaults';
import SignupHeader from '../../components/signup-header';
import ProgressBar from '../../components/progress-bar';
import ScreenTitle from '../../components/screen-title';
import NextButton from '../../components/next-button';
import NavigationService from '../../../../utils/helpers/navigation-service';
import styles from './styles';

const { bool, string, func, shape } = PropTypes;
const verificationCodeLength = 6;
const digitPlaceholder = 'x';
const NEXT_SCREEN = 'Email';

class PhoneVerificationScreen extends Component {
  static propTypes = {
    // Flags
    creationIsInProgress: bool.isRequired,
    verificationIsInProgress: bool.isRequired,
    // Data
    requestErrors: shape({}).isRequired,
    phoneNumber: shape({
      isValid: bool.isRequired,
      countryCode: string.isRequired,
      number: string.isRequired,
      internationalFormat: string.isRequired,
      e164Format: string.isRequired,
    }).isRequired,
    // Functions
    createVerificationCode: func.isRequired,
    verifyCode: func.isRequired,
    setSignupData: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  state = {
    verificationCode: '',
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillReceiveProps(nextProps) {
    if (this.props.verificationIsInProgress && !nextProps.verificationIsInProgress) {
      if (Object.keys(nextProps.requestErrors).length > 0) {
        const { name, message } = nextProps.requestErrors.response.data.error;
        this.showAlert(name, message);
      }
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Events handlers
  |-----------------------------------------------------------------------------
  */

  textInputOnValueChangeEventHandler = (verificationCode) => {
    // Update the state
    if (verificationCode.length <= verificationCodeLength) {
      this.setState({ verificationCode });
    }

    // Auto send verification code when all digits were inputted
    if (verificationCode.length === verificationCodeLength) {
      this.nextButtonOnPressHandler(verificationCode);
    }
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  resendButtonOnPressHandler = () => {
    const { createVerificationCode, phoneNumber: { e164Format } } = this.props;

    // Prevent code resending spam
    if (!this.isRequestInProgress()) {
      createVerificationCode({ phoneNumber: e164Format });
    }
  };

  nextButtonOnPressHandler = (code = null) => {
    const { verifyCode, navigation, setSignupData, phoneNumber: { e164Format } } = this.props;
    const { verificationCode } = this.state;

    // Prevent code verification spam
    if (!this.isRequestInProgress()) {
      setSignupData({ phone: e164Format });
      verifyCode(
        {
          phoneNumber: e164Format,
          verificationCode: parseInt(code || verificationCode, 10),
        },
        () => NavigationService.navigateWithDebounce(NEXT_SCREEN),
      );
    }
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  showAlert = (title, text) =>
    Alert.alert(
      title,
      text,
      [{ text: 'OK', onPress: this.focusHiddenInput }],
    );

  focusHiddenInput = () => {
    this.hiddenInput.focus();
  };

  isRequestInProgress = () =>
    this.props.verificationIsInProgress || this.props.creationIsInProgress;

  renderPhoneNumberInInternationalFormat = () => {
    const { internationalFormat } = this.props.phoneNumber;
    const numberParts = internationalFormat.split(' ');
    return (
      <View style={styles.internationalFormatContainer}>
        <Text style={styles.internationalFormat}>
          {numberParts.join(' ')}
        </Text>
      </View>
    );
  };

  renderVerificationCodeDigits = () => {
    const digits = [];

    for (let i = 0; i < verificationCodeLength; i += 1) {
      const digit = this.state.verificationCode[i];

      const config = {
        digit: digit || digitPlaceholder,
        styles: digit ? styles.digit : styles.placeholderDigit,
        underline: [
          styles.underline,
          digit ? styles.digitUnderline : styles.placeholderUnderline,
        ],
      };

      digits.push(
        <View key={i} style={styles.digitContainer}>
          <Text style={config.styles}>
            {config.digit}
          </Text>

          <View style={config.underline} />
        </View>,
      );
    }

    return digits;
  };

  renderForm = () => (
    <View style={styles.formContainer}>
      <TextInput
        autoFocus
        style={styles.input}
        keyboardType="phone-pad"
        value={this.state.verificationCode}
        onChangeText={this.textInputOnValueChangeEventHandler}
        onSubmitEditing={() => this.nextButtonOnPressHandler()}
        ref={(element) => {
          this.hiddenInput = element;
        }}
      />

      <TouchableWithoutFeedback onPress={this.focusHiddenInput}>
        <View style={styles.verificationCodeContainer}>
          {this.renderVerificationCodeDigits()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.mainContainer}>
        <SignupHeader navigation={this.props.navigation} />
        <ProgressBar currentStep={3} />

        <ScreenTitle text={'We sent you a code'} />

        {this.renderPhoneNumberInInternationalFormat()}

        {this.renderForm()}

        <View style={styles.resendContainer}>
          <Text style={styles.resendQuestion}>
            {'Didn\'t receive code? '}
          </Text>

          <TouchableOpacity onPress={this.resendButtonOnPressHandler}>
            <Text style={styles.resendLink}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>

        <NextButton
          containerStyles={styles.buttonContainer}
          onPressHandler={() => this.nextButtonOnPressHandler()}
          inProgress={this.isRequestInProgress()}
        />
      </View>
    );
  }
}

export default PhoneVerificationScreen;
