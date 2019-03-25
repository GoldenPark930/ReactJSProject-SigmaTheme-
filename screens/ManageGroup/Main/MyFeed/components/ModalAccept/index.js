import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { navigationPropTypes } from '../../../../../../constants/app/defaults';
import { selectUserBalance, selectUserData } from '../../../../../../store/selectors/user';
import styles from './styles';
import GrinkBalance from './GrinkBalance';
import BankItem from './BankItem';
import NavigationService from '../../../../../../utils/helpers/navigation-service';

// Constant id for the available grink balance radio item
const GRINK = 'grink';

class ModalRequest extends Component {
  constructor(props) {
    super(props);
    // check the this.props.balance and if there is no bank account linked, we set the payable false
    const { amount, banks, balance } = props;
    let payable = true;
    let selected = '';
    if (parseFloat(balance) < amount) {
      payable = false;
      if (banks.length > 0) {
        payable = true;
        selected = banks[0].id;
      }
    } else {
      selected = GRINK;
    }
    this.state = {
      selected,
      payable,
    };
  }

  onSelect = (selected) => {
    const { amount, balance } = this.props;
    if (balance < amount && selected === GRINK) {
      return;
    }
    this.setState({ selected, payable: true });
  }

  onClose = () => this.props.onClose();

  onPay = () => {
    const { selected, payable } = this.state;
    if (!payable) {
      return;
    }
    this.props.onValidate(selected === GRINK ?
      { action: 'balance' } :
      { action: 'bank', id: selected });
  }
  onVerify = () => {
    const { status } = this.props.userData;
    if (status === 'retry') {
      NavigationService.navigateWithDebounce('VerifyMyAccount');
    }
    if (status === 'document') {
      NavigationService.navigateWithDebounce('UploadVerificationDocument');
    }
  }

  addPaymentMethod = () => this.props.addPaymentMethod();

  renderItem = (arrayItem) => {
    const isLast = arrayItem.index === this.props.banks.length - 1;
    const { item } = arrayItem;
    return (
      <BankItem
        radioId={item.id}
        name={item.bankName}
        selected={this.state.selected}
        onSelect={this.onSelect}
        isLast={isLast}
      />
    );
  }

  render() {
    const { visible, amount, banks, balance, userData } = this.props;
    const { selected, payable } = this.state;
    return (
      <Modal isVisible={visible} >
        <TouchableWithoutFeedback onPress={this.onClose}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>

                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>
                    Pay with
                  </Text>
                </View>

                <GrinkBalance
                  balance={balance}
                  radioId={GRINK}
                  selected={selected}
                  onSelect={this.onSelect}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.orText}>
                    or
                  </Text>
                </View>

                <FlatList
                  style={styles.bankListContainer}
                  data={banks}
                  extraData={this.state}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => item.id}
                />
                { userData.status === 'retry' || userData.status === 'document' ?
                  <View style={styles.buttonsContainer}>
                    <Text style={styles.descriptionText}>
                      Your account needs to be verified to pay balance. Please click the button below
                    </Text>
                    <TouchableOpacity
                      style={styles.verifyButton}
                      onPress={this.onVerify}
                    >
                      <Text style={styles.payButtonText}>
                      Please verify your account
                      </Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={payable ? styles.payButton : styles.payButtonDisabled}
                      onPress={this.onPay}
                    >
                      <Text style={styles.payButtonText}>
                      Pay ${amount}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.addNewButton}
                      onPress={this.addPaymentMethod}
                    >
                      <Text style={styles.addNewButtonText}>
                      Add New Payment Method
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            </TouchableWithoutFeedback >
          </View>
        </TouchableWithoutFeedback>
      </Modal >
    );
  }
}

const mapStateToProps = state => ({
  balance: selectUserBalance(state),
  userData: selectUserData(state),
});

const ModalRequestContainer = connect(
  mapStateToProps,
)(ModalRequest);

const { func, bool, number, arrayOf, shape, string } = PropTypes;
ModalRequest.propTypes = {
  visible: bool.isRequired,
  amount: number.isRequired,
  banks: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
    })).isRequired,
  onClose: func.isRequired,
  onValidate: func.isRequired,
  addPaymentMethod: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

export default ModalRequestContainer;
