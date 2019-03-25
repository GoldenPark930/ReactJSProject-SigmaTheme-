import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { navigationPropTypes } from '../../../../constants/app/defaults';
import QuestionModal from './components/question-modal';
import BanksAccountSelector from './components/banks-list-selector';
import AmountToTransferInput from './components/amount-to-transfer-input';
import TransferSubmitButton from './components/transfer-submit-button';
import { getTransferAmountValidationError } from './utils/helpers';
import NavigationService from '../../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Transfer to bank
 |
 | Actual transfer module that is responsible for screen logic
 |------------------------------------------------------------------------------
 */

const { number, func, string, shape, arrayOf } = PropTypes;
let decimal = false;
let decimalLocation = -1;


class TransferModule extends Component {
  static propTypes = {
    // Data
    userBalance: number.isRequired,
    banksAccountsList: arrayOf(shape({})).isRequired,
    color: string,
    // Functions
    makeWithdraw: func.isRequired,
    refreshUserBalanceDetails: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };
  static defaultProps = {
    color: '#000',
  }

  constructor(props) {
    super(props);

    const { banksAccountsList } = props;

    this.state = {
      error: null,
      isQuestionModalVisible: false,
      // Auto-select the first bank account if there is one
      selectedBankAccount: banksAccountsList.length > 0 ? banksAccountsList[0].id : null,
    };
  }

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillReceiveProps(nextProps) {
    if (this.props.userBalance !== nextProps.userBalance) {
      this.setState({ amount: `$${nextProps.userBalance.toFixed(2)}` });
    }
    if (this.props.banksAccountsList !== nextProps.banksAccountsList) {
      this.setState(
        { selectedBankAccount: nextProps.banksAccountsList.length > 0 ? nextProps.banksAccountsList[0].id : null },
      );
    }
  }

  // TODO {Maksym}: add shouldComponentUpdate

  /*
  |-----------------------------------------------------------------------------
  | Events handlers
  |-----------------------------------------------------------------------------
  */
  updateText = (text) => {
    let value = text;
    if ((text.substring(text.length - 1, text.length).includes('.')) && (decimal === true)) {
      value = text.substring(0, text.length - 1) + text.substring(text.length - 1, text.length).replace('.', '');
    } else if (text.includes('.') === false) {
      decimal = false;
    } else if ((text.includes('.')) && (decimal === false)) {
      decimal = true;
      decimalLocation = text.indexOf('.');
    }
    if ((decimal === true) && ((text.substring(decimalLocation, text.length).length > 2))) {
      value = text.substring(0, decimalLocation + 1) + text.substring(decimalLocation + 1, decimalLocation + 3);
    }
    if (value === '') {
      value = 0;
    }
    if (!decimal) {
      value = parseFloat(value);
    }
    return value;
  }

  amountToTransferInputOnChangeEventHandler = (value) => {
    // value === '$' or empty
    if (value.length < 2 && this.state.amount) {
      // There is no point to show any errors in this case
      this.setState({
        amount: value,
        wasAmountChanged: true,
        error: '',
      });
      return;
    }

    // Remove '$' symbol from the value
    // TODO {Maksym}: add zero symbol trimming from case `value = 0000123`
    const newValue = this.state.amount ? value.slice(1) : value;
    const alertedValue = this.updateText(newValue);

    this.setState({
      amount: `$${alertedValue}`,
      wasAmountChanged: true,
      error: getTransferAmountValidationError(alertedValue, this.props.userBalance),
    });
  };

  banksAccountSelectorOnValueChangeEventHandler = (itemValue) => {
    this.setState({ selectedBankAccount: itemValue });
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  submitTransfer = () => {
    const { selectedBankAccount } = this.state;
    const { makeWithdraw, amount, refreshUserBalanceDetails } = this.props;

    // Make withdraw from group to bank and refresh the screen on success
    makeWithdraw(
      amount.slice(1),
      selectedBankAccount.toString(),
      () => refreshUserBalanceDetails(),
    );

    // Close the modal window
    this.closeQuestionModal();
  };

  submitTransferHandler = () => {
    // Show modal with question if transfer is available
    if (this.isTransferAvailable()) {
      this.setState({ isQuestionModalVisible: true });
    }
  };

  addBankAccountOnPressHandler = () => {
    // Navigation to user settings `Bank & Cards` screen
    NavigationService.navigateWithDebounce('BanksAndCards');
  };

  closeQuestionModal = () => {
    // Close the modal window
    this.setState({ isQuestionModalVisible: false });
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  // Check if transfer operation is available
  isTransferAvailable = () =>
    this.state.selectedBankAccount !== null && this.isValueTransferable();

  // Check if user can transfer inputted amount
  isValueTransferable = () =>
    this.props.amount.length > 1
    && +this.props.amount.slice(1) > 0
    && +this.props.amount.slice(1) <= +this.props.userBalance;

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { banksAccountsList } = this.props;
    const {
      selectedBankAccount,
      isQuestionModalVisible,
    } = this.state;
    const { amount, color } = this.props;

    return (
      <View style={styles.componentWrapper}>
        <QuestionModal
          visible={isQuestionModalVisible}
          amount={amount}
          onRequestClose={this.closeQuestionModal}
          onSubmitQuestionHandler={this.submitTransfer}
        />

        <BanksAccountSelector
          banksAccountsList={banksAccountsList}
          selectedBankAccount={selectedBankAccount}
          onValueChangeHandler={this.banksAccountSelectorOnValueChangeEventHandler}
          addBankAccountOnPressHandler={this.addBankAccountOnPressHandler}
          color={color}
        />

        <TransferSubmitButton
          isTransferAvailable={this.isTransferAvailable()}
          onPressHandler={this.submitTransferHandler}
        />
      </View>
    );
  }
}

export default TransferModule;
