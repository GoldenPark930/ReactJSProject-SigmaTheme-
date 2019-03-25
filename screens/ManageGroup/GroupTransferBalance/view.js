import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Spinner from '../../../components/spinner';
import { navigationPropTypes } from '../../../constants/app/defaults';
import AvailableBalance from './components/available-balance';
import TransferModule from './components/transfer-module';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Transfer to bank
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { bool, number, func, shape, arrayOf } = PropTypes;

class GroupTransferBalanceScreenView extends Component {
  static propTypes = {
    // Flags
    fetchingBanksListInProgress: bool.isRequired,
    // Data
    groupId: number.isRequired,
    groupBalance: number.isRequired,
    banksAccountList: arrayOf(shape({})).isRequired,
    // Functions
    transfertToOwnerBank: func.isRequired,
    transfertToOwnerBalance: func.isRequired,
    refreshCurrentGroupData: func.isRequired,
    getUserBanksAccountsList: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    // Get group's banks accounts list
    this.props.getUserBanksAccountsList();
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const {
      groupId,
      navigation,
      groupBalance,
      banksAccountList,
      transfertToOwnerBank,
      transfertToOwnerBalance,
      refreshCurrentGroupData,
      fetchingBanksListInProgress,
    } = this.props;

    // Render loading spinner if fetching group banks request is in progress
    if (fetchingBanksListInProgress) {
      return <Spinner visible />;
    }

    return (
      <View style={styles.contentWrapper}>
        <AvailableBalance
          groupBalance={groupBalance}
        />

        <TransferModule
          groupId={groupId}
          banksAccountList={banksAccountList}
          groupBalance={groupBalance}
          transfer={{
            balance: transfertToOwnerBalance,
            bank: transfertToOwnerBank,
          }}
          refreshCurrentGroupData={refreshCurrentGroupData}
          navigation={navigation}
        />
      </View>
    );
  }
}

export default GroupTransferBalanceScreenView;
