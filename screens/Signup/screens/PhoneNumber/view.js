import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Alert, TextInput } from 'react-native';
import head from 'lodash/head';
import last from 'lodash/last';

import { navigationPropTypes } from '../../../../constants/app/defaults';
import countryCodes from '../../../../constants/countryCodes';
import ModalPicker from '../../../../components/modal-picker';
import SignupHeader from '../../components/signup-header';
import ProgressBar from '../../components/progress-bar';
import ScreenTitle from '../../components/screen-title';
import NextButton from '../../components/next-button';
import PrivacyMessage from './components/privacy-message';
import styles, { SEMI_GREY, TRANSPARENT } from './styles';
import CheckBox from '../Email/checkbox';
import NavigationService from '../../../../utils/helpers/navigation-service';

const DELIMITER = ':';
const NEXT_SCREEN = 'PhoneVerification';

class PhoneNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legalChecked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.creationRequestIsInProgress && !nextProps.creationRequestIsInProgress) {
      if (Object.keys(nextProps.requestErrors).length > 0) {
        Alert.alert('error', 'Phone verification error');
      }
    }
  }


  textInputOnValueChangeEventHandler = (text) => {
    // TODO: should be reworked because you should not mutate props directly
    this.props.phoneNumber.number = text;

    const { phoneNumber: { countryCode, countryDialCode, number }, verifyPhoneNumber } = this.props;

    verifyPhoneNumber(countryCode, countryDialCode, number);
  };

  pickerOnValueChangeEventHandler = (value) => {
    const countryData = value.split(DELIMITER);

    // TODO: should be reworked because you should not mutate props directly
    this.props.phoneNumber.countryCode = head(countryData);
    this.props.phoneNumber.countryDialCode = last(countryData);

    const { phoneNumber: { countryCode, countryDialCode, number }, verifyPhoneNumber } = this.props;

    verifyPhoneNumber(countryCode, countryDialCode, number);
  };

  nextButtonOnPressHandler = async () => {
    const { createVerificationCode, phoneNumber: { e164Format, isValid }, navigation } = this.props;
    const { legalChecked } = this.state;
    if (!legalChecked) {
      return;
    }


    if (!isValid) {
      this.showAlert('Invalid phone number');
      return;
    }

    this.props.doesPhoneRegistered(e164Format, () => {
      if (!this.props.isPhoneRegistered) {
        createVerificationCode(
          { phoneNumber: e164Format },
          () => NavigationService.navigateWithDebounce(NEXT_SCREEN),
        );
      } else this.showAlert('Phone already taken');
    });
  };

  isRequestInProgress = () =>
    this.props.creationRequestIsInProgress || this.props.doesPhoneRegisteredInProgress;

  showAlert = text =>
    Alert.alert(
      '',
      text,
      [{ text: 'OK', onPress: () => this.textInput.focus() }],
    );

  legelbtnClicked = () => {
    this.setState({ legalChecked: !this.state.legalChecked });
  }


  render() {
    const { number, countryCode, countryDialCode } = this.props.phoneNumber;
    return (
      <View style={styles.mainContainer}>
        <SignupHeader navigation={this.props.navigation} />
        <ProgressBar currentStep={2} />

        <ScreenTitle text={'What\'s your phone number?'} />

        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <ModalPicker
              listData={countryCodes}
              keyExtractor={country => `${country.code}${DELIMITER}${country.dial_code}`}
              labelExtractor={country => `${country.name} ${country.dial_code}`}
              selectedValue={`${countryCode}${DELIMITER}${countryDialCode}`}
              onValueChange={this.pickerOnValueChangeEventHandler}
            />

            <View style={styles.formControlUnderline} />
          </View>

          <View style={styles.formControl}>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              placeholderTextColor={SEMI_GREY}
              underlineColorAndroid={TRANSPARENT}
              onChangeText={this.textInputOnValueChangeEventHandler}
              value={number}
              onSubmitEditing={this.nextButtonOnPressHandler}
              ref={(input) => {
                this.textInput = input;
              }}
            />

            <View style={styles.formControlUnderline} />
          </View>

          <NextButton
            containerStyles={styles.buttonContainer}
            onPressHandler={this.nextButtonOnPressHandler}
            inProgress={this.isRequestInProgress()}
            disabled={!this.state.legalChecked}
            text="Agree & Continue"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox checked={this.state.legalChecked} checkbtnClicked={this.legelbtnClicked} />
          <View style={styles.optionTextContainer}>
            <PrivacyMessage />
          </View>
        </View>
      </View>
    );
  }
}

const { bool, string, func, shape } = PropTypes;
PhoneNumberScreen.propTypes = {
  creationRequestIsInProgress: bool.isRequired,
  requestErrors: shape({}).isRequired,
  phoneNumber: shape({
    isValid: bool.isRequired,
    countryCode: string.isRequired,
    countryDialCode: string.isRequired,
    number: string.isRequired,
    internationalFormat: string.isRequired,
    e164Format: string.isRequired,
  }).isRequired,
  createVerificationCode: func.isRequired,
  verifyPhoneNumber: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

export default PhoneNumberScreen;
