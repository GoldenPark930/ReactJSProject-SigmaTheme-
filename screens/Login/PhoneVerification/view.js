import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { storeToken, StoreUserAccountInfo } from '../../../common/localStorage';
import { navigationPropTypes } from '../../../constants/app/defaults';
import styles from './styles';
import Header from '../../../components/NewHeader';

const codeLength = 6;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: new Array(codeLength).fill(''),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authenticationIsInProgress && !nextProps.authenticationIsInProgress) {
      const { requestErrors, requestResult } = nextProps;
      if (requestResult.token) {
        const { token } = requestResult;
        // TODO: Remove User store
        storeToken(token.id);
        StoreUserAccountInfo(requestResult);
        this.props.setCurrentUser(nextProps.requestResult);
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'MainApp' }),
          ],
        }));
        this.props.getUserData();
        this.props.requestDataLoadingInterval();
      } else if (Object.keys(requestErrors).length > 0) Alert.alert('error', 'Phone verification error');
    }
  }

  onValueChange = (index, text) => {
    const code = text.slice(-1);
    const { verificationCode } = this.state;
    verificationCode[index] = code;
    this.setState({ verificationCode });
    verificationCode[index] = code;
    if (index < codeLength - 1 && code !== '') this[`input_${index + 1}`].focus();
    else if (index === codeLength - 1 && code !== '') {
      this.verifyAndAuthenticate();
    }
  };

  verifyAndAuthenticate = async () => {
    const { e164Format } = this.props.phoneNumber;
    let { verificationCode } = this.state;
    verificationCode = parseInt(verificationCode.join(''), 10);
    const data = { phoneNumber: e164Format, verificationCode };
    this.props.verifyAndAuthenticate(data);
  };

  resendVerificationCode = async () => {
    const { e164Format } = this.props.phoneNumber;
    this.props.createVerificationCode({ phoneNumber: e164Format });
  };

  navigateBack = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    const { internationalFormat } = this.props.phoneNumber;
    const { content, colors, global } = styles;
    const { verificationCode } = this.state;

    return (
      <View style={global.wrapper}>
        <Header
          leftActionIcon="ios-arrow-back"
          leftAction={this.navigateBack}
        />
        <View style={content.wrapper}>
          <Text style={content.title}>{'We\'ve sent you code on'}</Text>
          <Text style={content.number}>{internationalFormat}</Text>
          <Text style={content.info}>Please enter it below</Text>
          <View style={content.inputContainer}>
            {
              verificationCode.map((code, index) => (
                <TextInput
                  ref={(ref) => { this[`input_${index}`] = ref; }}
                  key={`input:${index}`}
                  returnKeyType={index < codeLength - 1 ? 'next' : 'done'}
                  autoFocus={index === 0}
                  placeholder={'X'}
                  placeholderTextColor={colors.LIGHT_GREY}
                  underlineColorAndroid={colors.CALM}
                  onChangeText={text => this.onValueChange(index, text)}
                  keyboardType="phone-pad"
                  style={content.inputCodeText}
                  value={code}
                  onSubmitEditing={() => {
                    if (index < codeLength - 1) this[`input_${index + 1}`].focus();
                  }}
                />
              ))
            }
          </View>
          <TouchableOpacity style={content.buttonContainer} onPress={this.verifyAndAuthenticate}>
            <Text style={content.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 10 }} >
            <Text style={content.resendLabel}>{'Didn\'t receive code? '}</Text>
            <TouchableOpacity onPress={this.resendVerificationCode}>
              <Text style={content.resendText}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { func, shape, string, bool } = PropTypes;
LoginScreen.propTypes = {
  requestDataLoadingInterval: func.isRequired,
  authenticationIsInProgress: bool.isRequired,
  requestResult: shape({}).isRequired,
  requestErrors: shape({}).isRequired,
  phoneNumber: shape({
    isValid: bool.isRequired,
    countryCode: string.isRequired,
    number: string.isRequired,
    internationalFormat: string.isRequired,
    e164Format: string.isRequired,
  }).isRequired,
  getUserData: func.isRequired,
  createVerificationCode: func.isRequired,
  verifyAndAuthenticate: func.isRequired,
  setCurrentUser: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

export default LoginScreen;
