import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { View, Text, Alert, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import ModalWithOverlay from '../../../../../components/modal-with-overlay';
import Gravatar from '../../../../../components/gravatar';
import { CONTACT_USER } from '../../../../../constants/users/types';
import styles, { GRAVATAR_SIZE } from './styles';
import { SEMI_GREY, TRANSPARENT } from '../../../../../constants/colors';
import { apiFunctions } from '../../../../../scripts';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Invite more friends
 |
 | Single non-group member model
 |------------------------------------------------------------------------------
 */

const { number, string, func, bool, shape } = PropTypes;

class InviteNewUserModel extends Component {
  static propTypes = {
    phone: string.isRequired,
    addUserToInvitationList: func.isRequired,
    removeUserFromInvitationList: func.isRequired,
    phoneNumber: shape({
      isValid: bool.isRequired,
      countryCode: string.isRequired,
      countryDialCode: string.isRequired,
      number: string.isRequired,
      internationalFormat: string.isRequired,
      e164Format: string.isRequired,
    }).isRequired,
    verifyPhoneNumber: func.isRequired,
    onInvited: func.isRequired,
  };


  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      validationInProgress: false,
      phone: this.props.phone
    };

  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.phone !== this.props.phone) {
      this.setState({ phone: nextProps.phone });
    }
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  openInviteModal = () => {
    // Open model with 
    this.setState({ isModalVisible: true });

  };


  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderModel = () => {
    const { phone } = this.props;

    return (
      <TouchableOpacity onPress={this.openInviteModal}>
        <View style={styles.contactInfoWrapper}>
          <View style={styles.profile}>
            <View style={styles.contact}>
              <Text style={styles.contactName}>
                Add new phone number
              </Text>
              <Text style={styles.contactUsername}>
                {phone}
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  textInputOnValueChangeEventHandler = (text) => {
    this.setState({
      phone: text,
    })

    const { phoneNumber: { countryCode, countryDialCode }, verifyPhoneNumber } = this.props;

    verifyPhoneNumber(countryCode, countryDialCode, text);
  };
  toggleValidationInProgressStatus = () =>
    this.setState(state => ({ validationInProgress: !state.validationInProgress }));

  inviteButtonOnPressHandler = async () => {

    this.toggleValidationInProgressStatus();
    const isValid = await this.verifyNumber();

    if (isValid) {
      this.props.addUserToInvitationList({ phone: this.props.phoneNumber.e164Format });
      this.props.onInvited();
      this.closeModal();
    }

    this.toggleValidationInProgressStatus();
  };
  verifyNumber = async () => {
    const { isValid, e164Format } = this.props.phoneNumber;

    // Validate number
    if (!isValid) {
      this.showAlert('Invalid phone number');
      return false;
    }

    return true;
  };
  showAlert = text =>
    Alert.alert(
      '',
      text,
      [{ text: 'OK', onPress: () => this.textInput.focus() }],
    );

  renderModelWithModal = () => (
    <View>
      <ModalWithOverlay
        animationType="fade"
        visible={this.state.isModalVisible}
        onRequestClose={this.closeModal}
      >
        <TouchableWithoutFeedback  onPress={this.closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  Add by Phone Number
                </Text>
                <TextInput
                  style={styles.phoneText}
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  placeholderTextColor={SEMI_GREY}
                  underlineColorAndroid={TRANSPARENT}
                  onChangeText={this.textInputOnValueChangeEventHandler}
                  value={this.state.phone}
                  ref={(input) => {
                    this.textInput = input;
                  }}
                />
              </View>


              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={this.inviteButtonOnPressHandler}
                  style={styles.inviteButton}
                >
                  <Text style={styles.inviteButtonText}>
                    Invite
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </ModalWithOverlay>

      {this.renderModel()}
    </View>
  );

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return this.renderModelWithModal();
  }
}

export default InviteNewUserModel;
