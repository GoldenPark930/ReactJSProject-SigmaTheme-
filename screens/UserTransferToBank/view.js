import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Spinner from '../../components/spinner';
import { navigationPropTypes } from '../../constants/app/defaults';
import AvailableBalance from './components/available-balance';
import TransferModule from './components/transfer-module';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | User Transfer to bank
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { bool, number, func, shape, arrayOf } = PropTypes;

class UserTransferToBankView extends Component {
  static propTypes = {
    // Flags
    fetchingBanksListInProgress: bool.isRequired,
    // Data
    userBalance: number.isRequired,
    banksAccountsList: arrayOf(shape({})).isRequired,
    // Functions
    getUserBalanceDetails: func.isRequired,
    getUserBanksAccountsList: func.isRequired,
    makeWithdrawFromUserToBank: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    // Get user's balance detail
    this.props.getUserBalanceDetails();
    // Get user's banks accounts list
    this.props.getUserBanksAccountsList();
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const {
      navigation,
      userBalance,
      banksAccountsList,
      getUserBalanceDetails,
      makeWithdrawFromUserToBank,
      fetchingBanksListInProgress,
    } = this.props;

    // Render loading spinner if fetching group banks request is in progress
    if (fetchingBanksListInProgress) {
      return <Spinner visible />;
    }

    return (
      <View style={styles.contentWrapper}>
        <AvailableBalance
          userBalance={userBalance}
        />

        <TransferModule
          banksAccountsList={banksAccountsList}
          userBalance={userBalance}
          makeWithdraw={makeWithdrawFromUserToBank}
          refreshUserBalanceDetails={getUserBalanceDetails}
          navigation={navigation}
        />
      </View>
    );
  }
}

export default UserTransferToBankView;
