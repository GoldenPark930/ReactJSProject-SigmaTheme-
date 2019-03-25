import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Picker, Item, Icon, Title } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import Separator from './separator';
import styles from '../styles';
import ModalWithOverlay from '../../../../../components/modal-with-overlay';
import CheckBox from '../../../../Signup/screens/Email/checkbox';
import globalColors from '../../../../../GlobalCss/globalColors';
import { REGULAR } from '../../../../../constants/fonts';

const { number, string, func, arrayOf, oneOfType, shape } = PropTypes;

/**
 |------------------------------------------------------------------------------
 | Bank account selector component
 |------------------------------------------------------------------------------
 */

class BanksListSelector extends Component {
  static propTypes = {
    // Data
    banksAccountsList: arrayOf(shape({})).isRequired,
    selectedBankAccount: oneOfType([number, string]),
    color: string,
    // Functions
    onValueChangeHandler: func.isRequired,
    addBankAccountOnPressHandler: func.isRequired,
  };

  static defaultProps = {
    selectedBankAccount: null,
    color: '#000',
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

  openModal = () => {
    // Open model with 
    this.setState({ isModalVisible: true });
  };

  selectBank = (id) => {
    this.closeModal();
    this.props.onValueChangeHandler(id);
  }
  renderSelectBankModal = () => {
    const { banksAccountsList, selectedBankAccount, color } = this.props;
    return (
      <ModalWithOverlay
        animationType="fade"
        visible={this.state.isModalVisible}
        onRequestClose={this.closeModal}
      >
        <TouchableWithoutFeedback onPress={this.closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitle}>
                <Title style={StyleSheet.flatten([globalColors.royal, {
                  fontSize: 16, fontFamily: REGULAR }])}
                >
                  Select Bank
                </Title>
              </View>
            </View>
            <ScrollView style={styles.modalContent}>
              {banksAccountsList.map(bank => (
                <TouchableOpacity style={styles.modalListItem} onPress={() => this.selectBank(bank.id)}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemTextDescription}>{bank.bankName} ••{bank.mask}</Text>
                  </View>
                  <View style={styles.itemRight}>
                    <CheckBox checked={bank.id === selectedBankAccount} checkbtnClicked={() => this.selectBank(bank.id)} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </ModalWithOverlay>
    );
  }
  render() {
    let content = null;
    const { selectedBankAccount, color } = this.props;
    if (this.props.banksAccountsList.length) {
      const data = this.props.banksAccountsList.find(x => x.id === selectedBankAccount);
      content = (
        <View>
          <TouchableWithoutFeedback onPress={this.openModal}>
            <View
              key={data.id}
              style={styles.bankInfoWrapper}
            >
              <View style={styles.bankInfoDescription}>

                <Text style={[styles.bankName, { color }]}>
                  {data.bankName} ••{data.mask}
                </Text>
              </View>

              <View style={styles.arrowButtonWrapper}>
                <Text style={[styles.bankName, { color }]}>
                Edit
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

        </View>
      );
    } else {
      content = (
        <View>
          <Text style={styles.noBanksPlaceholderText}>
            No Bank Account Available
          </Text>

          <TouchableOpacity onPress={this.props.addBankAccountOnPressHandler}>
            <View style={[styles.button, styles.buttonActive]}>
              <Text style={styles.buttonLabel}>
                Link Bank Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.selectWrapper}>
        {this.renderSelectBankModal()}
        {content}
      </View>
    );
  }
}

export default BanksListSelector;
