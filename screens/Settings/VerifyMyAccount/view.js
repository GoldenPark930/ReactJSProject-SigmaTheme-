import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Button,
  Content,
  Input,
  Item,
  Label,
  Form,
} from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import { NetworkInfo } from 'react-native-network-info';
import { navigationPropTypes } from '../../../constants/app/defaults';
import globalColors from '../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../GlobalCss/globalBackgroundColors';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';
import Header from '../../../components/NewHeader';
import { WHITE } from '../../../constants/colors';
import { Dropdown } from 'react-native-material-dropdown';
import states from '../../../constants/states.js';

import styles from '../styles';

const globalStyles = styleSheet => StyleSheet.flatten(styleSheet);

const stateData = states.map(item => {
  return {
    value: item.abbreviation,
    label: item.name
  };
});

// PropTypes
const { bool, number, string, func, oneOfType, shape } = PropTypes;

class VerifyMyAccountView extends Component {
  static propTypes = {
    // Flags
    retryingUserVerifiationInProgress: bool.isRequired,
    requestErrors: shape({}).isRequired,
    // Data
    userData: shape({
      id: oneOfType([number, string]).isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      email: string.isRequired,
      phone: string.isRequired,
    }).isRequired,
    // Functions
    retryUserVerification: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  state = pick(this.props.userData, ['email', 'firstName', 'lastName', 'phone']);

  componentWillReceiveProps(nextProps) {
    const { requestErrors } = nextProps;
    // const { firstName, lastName, email, phone } = nextProps.userData;

  }

  doneUploadingHandler = () => {
    Alert.alert( 'Your information was sent successfully. Please wait for approval' );
  }
  updateButtonOnPressHandler = () => {
    // this.setState({ ssn: this.textInput.getRawValue() });
    NetworkInfo.getIPAddress((ip) => {
      this.setState({ ip });
    });
    const { firstName, lastName, email, address1, address2, city, state, postalCode, dateOfBirth, ssn, phone, ip } = this.state;
    const {
      retryUserVerification,
      navigation: { navigate },
      retryingUserVerifiationInProgress,
    } = this.props;

    if (!firstName) {
      Alert.alert('City can not be left blank');
      return;
    }
    if (!lastName) {
      Alert.alert('City can not be left blank');
      return;
    }
    if (!email) {
      Alert.alert('City can not be left blank');
      return;
    }
    if (!address1) {
      Alert.alert('Address can not be left blank');
      return;
    }
    if (!city) {
      Alert.alert('City can not be left blank');
      return;
    }
    if (!state) {
      Alert.alert('State can not be left blank');
      return;
    }
    if (!postalCode) {
      Alert.alert('Postal Code can not be left blank');
      return;
    }
    if (!dateOfBirth) {
      Alert.alert('Date of Birth can not be left blank');
      return;
    }
    if (!ssn) {
      Alert.alert('SSN can not be left blank');
      return;
    }
    if (!phone) {
      Alert.alert('Phone number can not be left blank');
      return;
    }
    if (phone.length !== 10) {
      Alert.alert('Phone numbers must be 10 digits');
      return;
    }
    if (ssn.length !== 9) {
      Alert.alert('Social Security Number must be 9 digits');
      return;
    }


    // Prevent API call spam
    if (!retryingUserVerifiationInProgress) {
      // retry api call
      retryUserVerification(
        { firstName, lastName, email, address1, address2, city, state, postalCode, dateOfBirth, ssn, phone, ip }, // new user data
      );
    }
  };

  isVerificationRetrying = () =>
    this.props.retryingUserVerifiationInProgress;

  render() {
    // TODO fix camera icon on profile picture
    // TODO fix padding on list and underline on list items to look like design
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Account Settings"
          leftActionIcon="ios-arrow-back"
          leftAction={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <StatusBar barStyle="dark-content" />
        <Content style={{ flex: 1, backgroundColor: WHITE }}>
          <Form>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                onChangeText={text => this.setState({ firstName: text })}
                value={this.state.firstName}
              />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                onChangeText={text => this.setState({ lastName: text })}
                value={this.state.lastName}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email Address</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                keyboardType="email-address"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                onChangeText={text => this.setState({ address1: text })}
                value={this.state.address1}
              />
            </Item>
            <Item floatingLabel>
              <Label>Address 2 (optional)</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                onChangeText={text => this.setState({ address2: text })}
                value={this.state.address2}
              />
            </Item>
            <Item floatingLabel>
              <Label>City</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                onChangeText={text => this.setState({ city: text })}
                value={this.state.city}
              />
            </Item>
            <Item>
              <Dropdown
                containerStyle={{ width: '100%' }}
                labelFontSize='14'
                baseColor={styles.colors.LIGHT_GREY}
                label='State'
                data={stateData}
                onChangeText={text => this.setState({ state: text })}
                value={this.state.state}
              />

            </Item>
            <Item floatingLabel>
              <Label>Postal Code</Label>
              <Input
                placeholderTextColor={styles.colors.LIGHT_GREY}
                underlineColorAndroid={styles.colors.CALM}
                onChangeText={text => this.setState({ postalCode: text })}
                value={this.state.postalCode}
                keyboardType={'numeric'}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              <Label>Birthday</Label>
            </Item>
            <Item>
              <DatePicker
                date={this.state.dateOfBirth}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    width: '100%',
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: '#575757',
                  },
                  dateText: {
                    fontSize: 17,
                    color: styles.colors.ROYAL,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ dateOfBirth: date }); }}
              />
            </Item>
            <Item stackedLabel>
              <Label>Social Security Number</Label>
              <TextInputMask
                placeholderTextColor={'#575757'}
                ref={(input) => { this.textInput = input; }}
                placeholder="XXX-XX-XXXX"
                type={'custom'}
                options={{ mask: '999-99-9999' }}
                style={{ width: '100%', height: 100, color: styles.colors.ROYAL, fontSize: 17 }}
                onChangeText={ssn => this.setState({ ssn })}
                value={this.state.ssn}
                keyboardType={'numeric'}
              />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <TextInputMask
                placeholderTextColor={styles.colors.LIGHT_GREY}
                ref={(input) => { this.textInput = input; }}
                placeholder="Phone Number"
                type={'custom'}
                options={{ mask: '999-999-9999' }}
                style={{ width: '100%', height: 100, color: styles.colors.ROYAL, fontSize: 17 }}
                onChangeText={text => this.setState({ phone: text.replace('+1', '').replace(/-/g,'') })}
                value={this.state.phone.replace('+1', '').replace(/-/g,'')}
                keyboardType={'phone-pad'}
              />
            </Item>
          </Form>
          <Button
            full
            disabled={this.isVerificationRetrying()}
            style={globalStyles([globalBackgroundColors.calm, { marginTop: 20 }])}
            onPress={this.updateButtonOnPressHandler}
          >
            {
              this.isVerificationRetrying()
                ? <ActivityIndicator size="large" />
                : (
                  <Text style={globalStyles([globalColors.white, { fontSize: 20 }])}>
                      Update
                  </Text>
                )
            }
          </Button>
        </Content>
      </View>
    );
  }
}

const withSafeArea = withSafeAreaView(VerifyMyAccountView);

export default withSafeArea;
