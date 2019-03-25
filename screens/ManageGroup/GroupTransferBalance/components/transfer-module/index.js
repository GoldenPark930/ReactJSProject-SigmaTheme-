import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { navigationPropTypes } from '../../../../../constants/app/defaults';
import QuestionModal from './components/question-modal';
import BanksAccountSelector from './components/banks-list-selector';
import AmountToTransferInput from './components/amount-to-transfer-input';
import TransferSubmitButton from './components/transfer-submit-button';
import { getTransferAmountValidationError } from './utils/helpers';
import NavigationService from '../../../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Transfer to bank
 |
 | Actual transfer module that is responsible for screen logic
 |------------------------------------------------------------------------------
 */

const { number, func, shape, arrayOf } = PropTypes;

class TransferModule extends Component {
  static propTypes = {
    // Data
    groupId: number.isRequired,
    groupBalance: number.isRequired,
    banksAccountList: arrayOf(shape({})).isRequired,
    // Functions
    transfer: shape({
      bank: func.isRequired,
      balance: func.isRequired,
    }).isRequired,
    refreshCurrentGroupData: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  constructor(props) {
    super(props);

    const { banksAccountList, groupBalance } = props;

    this.state = {
      error: null,
      isQuestionModalVisible: false,

      amount: `$${groupBalance}`,
      wasAmountChanged: false,
      // Add balance to bank accounts
      accountList: [{ id: -1, name: 'My Payclub Balance' }, ...banksAccountList],
      // Auto-select balance (id = -1)
      selectedAccount: -1,
      selectedBankAccount: banksAccountList.length > 0 ? banksAccountList[0].id : null,
    };
  }

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillReceiveProps(nextProps) {
    if (this.props.groupBalance !== nextProps.groupBalance) {
      this.setState({ amount: `$${nextProps.groupBalance.toFixed(2)}` });
    }
    if (this.props.banksAccountList !== nextProps.banksAccountList) {
      this.setState(
        { selectedBankAccount: nextProps.banksAccountList.length > 0 ? nextProps.banksAccountList[0].id : null },
      );
    }
  }

  // TODO {Maksym}: add shouldComponentUpdate

  /*
  |-----------------------------------------------------------------------------
  | Events handlers
  |-----------------------------------------------------------------------------
  */

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

    this.setState({
      amount: `$${newValue}`,
      wasAmountChanged: true,
      error: getTransferAmountValidationError(newValue, this.props.groupBalance),
    });
  };

  banksAccountSelectorOnValueChangeEventHandler = (itemValue) => {
    this.setState({ selectedAccount: itemValue });
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  submitTransfer = () => {
    const { selectedAccount } = this.state;
    const { groupId, amount, transfer: { balance, bank }, refreshCurrentGroupData } = this.props;

    if (selectedAccount === -1) {
      // Make transfer from group to owner balance and refresh the screen on success
      balance(
        groupId,
        amount.slice(1),
        () => refreshCurrentGroupData(groupId),
      );
    } else {
      // Make transfer from group to owner bank and refresh the screen on success
      bank(
        groupId,
        amount.slice(1),
        selectedAccount.toString(),
        () => refreshCurrentGroupData(groupId),
      );
    }

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
    // TODO {Maksym}: Clarify the handler behaviour
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
    this.state.selectedAccount !== null && this.isValueTransferable();

  // Check if user can transfer inputted amount
  isValueTransferable = () =>
    this.props.amount
    && this.props.amount.length > 1
    && +this.props.amount.slice(1) > 0
    && this.props.amount.slice(1) <= this.props.groupBalance;

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const {
      error,
      wasAmountChanged,
      accountList,
      selectedAccount,
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
          accountList={accountList}
          selectedAccount={selectedAccount}
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
