import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Content } from 'native-base';
import head from 'lodash/head';
import last from 'lodash/last';

import ModalPicker from '../../../components/modal-picker';
import countryCodes from '../../../constants/countryCodes';
import { getLocalImage } from '../../../utils/helpers';
import { navigationPropTypes } from '../../../constants/app/defaults';
import styles from './styles';
import Header from '../../../components/NewHeader';
import NavigationService from '../../../utils/helpers/navigation-service';

const DELIMITER = ':';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: this.props.phoneNumber.countryCode,
      countryDialCode: this.props.phoneNumber.countryDialCode,
      number: this.props.phoneNumber.number,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.creationRequestIsInProgress && !nextProps.creationRequestIsInProgress) {
      const { requestErrors } = nextProps;
      if (Object.keys(requestErrors).length > 0) Alert.alert('error', 'Phone verification error');
      else NavigationService.navigateWithDebounce('PhoneVerification');
    }
  }


  onValueChange = (type, text) => {
    const { state } = this;
    state[type] = text;
    this.setState(state);
    this.props.verifyPhoneNumber(state.countryCode, state.number);
  };

  createVerificationCode = async () => {
    if (this.props.creationRequestIsInProgress) {
      return null;
    }
    const { isValid, e164Format } = this.props.phoneNumber;
    if (!isValid) return Alert.alert('', 'Invalid phone number');
    this.props.createVerificationCode({ phoneNumber: e164Format });
    return null;
  };

  textInputOnValueChangeEventHandler = (text) => {
    // TODO: should be reworked because you should not mutate props directly
    this.props.phoneNumber.number = text;

    const { phoneNumber: { countryCode, countryDialCode, number }, verifyPhoneNumber } = this.props;

    verifyPhoneNumber(countryCode, countryDialCode, number);
    this.setState({ number });
  };

  pickerOnValueChangeEventHandler = (value) => {
    const countryData = value.split(DELIMITER);

    // TODO: should be reworked because you should not mutate props directly
    this.props.phoneNumber.countryCode = head(countryData);
    this.props.phoneNumber.countryDialCode = last(countryData);

    const { phoneNumber: { countryCode, countryDialCode, number }, verifyPhoneNumber } = this.props;

    verifyPhoneNumber(countryCode, countryDialCode, number);
    this.setState({ countryCode, countryDialCode });
  };

  navigateBack = () => {
    this.props.navigation.goBack(null);
  }


  render() {
    const { content, colors, global } = styles;
    const { countryDialCode, countryCode, number } = this.state;

    return (
      <View style={global.wrapper}>
        <Header
          leftActionIcon="ios-arrow-back"
          leftAction={this.navigateBack}
        />
        <Content style={content.wrapper}>
          <Image resizeMode="contain" style={content.imageContainer} source={getLocalImage('payClubLogo')} />

          <View style={content.formControl}>
            <ModalPicker
              listData={countryCodes}
              keyExtractor={country => `${country.code}${DELIMITER}${country.dial_code}`}
              labelExtractor={country => `${country.name} ${country.dial_code}`}
              selectedValue={`${countryCode}${DELIMITER}${countryDialCode}`}
              selectedValueStyle={content.selectedValueStyles}
              onValueChange={this.pickerOnValueChangeEventHandler}
            />

            <View style={content.formControlUnderline} />
          </View>

          <View style={content.inputContainer}>
            <TextInput
              returnKeyType="done"
              placeholder="Mobile Number"
              placeholderTextColor={colors.LIGHT_GREY}
              underlineColorAndroid={colors.CALM}
              onChangeText={this.textInputOnValueChangeEventHandler}
              keyboardType="phone-pad"
              style={content.inputNumberText}
              value={number}
            />
          </View>
          <TouchableOpacity style={content.buttonContainer} onPress={this.createVerificationCode}>
            <Text style={content.buttonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </Content>
      </View>
    );
  }
}

const { func, shape, string, bool } = PropTypes;
LoginScreen.propTypes = {
  creationRequestIsInProgress: bool.isRequired,
  verifyPhoneNumber: func.isRequired,
  createVerificationCode: func.isRequired,
  requestErrors: shape({}).isRequired,
  phoneNumber: shape({
    isValid: bool.isRequired,
    countryCode: string.isRequired,
    countryDialCode: string.isRequired,
    number: string.isRequired,
    internationalFormat: string.isRequired,
    e164Format: string.isRequired,
  }).isRequired,
  ...navigationPropTypes(PropTypes),
};

export default LoginScreen;
