import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';

import ModalWithOverlay from '../../../../../components/modal-with-overlay';
import { CONTACT_USER } from '../../../../../constants/users/types';
import PhonePicker from './phone-picker';
import styles from './styles';
import DefaultImage from '../../../../../../assets/images/payclub-default-avatar.png';
import { CALM, WHITE } from '../../../../../constants/colors';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Invite more friends
 |
 | Single non-group member model
 |------------------------------------------------------------------------------
 */

const { number, string, func, shape, arrayOf, oneOfType, bool } = PropTypes;

class SingleUserModel extends Component {
  static propTypes = {
    model: shape({
      id: oneOfType([number, string]).isRequired,
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      phones: arrayOf(shape({
        label: string,
        text: string.isRequired,
        number: oneOfType([number, string]).isRequired,
      })),
    }).isRequired,
    addUserToInvitationList: func.isRequired,
    removeUserFromInvitationList: func.isRequired,
    onInvited: func.isRequired,
    initialChecked: bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }


closeModal = () => {
  this.setState({ isModalVisible: false });
};

  checkboxOnToggleHandler = () => {
    const {
      model,
      onInvited,
      initialChecked,
      addUserToInvitationList,
      removeUserFromInvitationList,
    } = this.props;

    if (initialChecked) {
      // Remove deselected user from the invitation list
      removeUserFromInvitationList(model.id);
      return;
    }

    if (model.type === CONTACT_USER) {
      // Open model with phone picker
      this.setState({ isModalVisible: true });
    } else {
      // Add selected Grink use to the invitation list
      addUserToInvitationList(model);
    }
    onInvited();
  };

  phoneNumberOnSelectHandler = (phone) => {
    const { model, addUserToInvitationList } = this.props;

    // Select user and close modal window with phone number picker
    this.setState({ isModalVisible: false });

    // Add user with selected phone number to the invitation list
    addUserToInvitationList({ ...model, phone: `+1${phone}` });
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderModel = () => {
    const { firstName, lastName, username, image, phone, type } = this.props.model;
    const { initialChecked } = this.props;
    return (
      <TouchableOpacity onPress={this.checkboxOnToggleHandler}>
        <View style={styles.contactInfoWrapper}>
          <View style={styles.profile}>
            <Thumbnail
              style={styles.image}
              source={
                image === undefined ?
                  DefaultImage :
                  { uri: image }
              }
            />
            <View style={styles.contact}>
              <Text style={styles.contactName}>
                {firstName} {lastName || username}
              </Text>
              <Text style={styles.contactUsername}>
                {/* {username ? `@${username}` : phone} */}
                { type === 'GRINK_USER' ? 'Payclub user' : 'From your contacts'}
              </Text>
            </View>
          </View>

          <View style={
            initialChecked ?
              [styles.checkButton, { backgroundColor: CALM }] :
              styles.checkButton}
          >
            <Text style={
              initialChecked ?
                { fontSize: 12, color: WHITE } :
                { fontSize: 12, color: CALM }}
            >
              {
                initialChecked ?
                  'Added' :
                  'Invite'
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderModelWithModal = () => (
    <View>
      <ModalWithOverlay
        animationType="fade"
        visible={this.state.isModalVisible}
        onRequestClose={this.closeModal}
      >
        <PhonePicker
          phones={this.props.model.phones}
          onPhoneSelect={this.phoneNumberOnSelectHandler}
        />
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
    return this.props.model.type === CONTACT_USER
      ? this.renderModelWithModal()
      : this.renderModel();
  }
}

export default SingleUserModel;
