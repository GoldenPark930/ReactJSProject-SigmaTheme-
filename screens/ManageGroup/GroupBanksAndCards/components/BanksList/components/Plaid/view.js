import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Modal, WebView } from 'react-native';

import { PlaidWebViewSourceURL } from '../../../../../../../constants/plaid';
import { bankAndCardApis } from '../../../../../../../scripts';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Banks & Cards
 |
 | Banks list
 |------------------------------------------------------------------------------
 */

const { bool, func, number } = PropTypes;

class Plaid extends Component {
  static propTypes = {
    groupId: number.isRequired,
    onClose: func.isRequired,
    isVisible: bool.isRequired,
  };

  /*
   |----------------------------------------------------------------------------
   | Event handlers
   |----------------------------------------------------------------------------
   */

  onMessage(data) {
    // Exit
    if (data.action === 'plaid_link-undefined::exit') this.props.onClose();
    // connected
    if (data.action === 'plaid_link-undefined::connected') {
      const bankAccount = {
        publicToken: data.metadata.public_token,
        name: data.metadata.account.name,
        accountId: data.metadata.account.id,
      };
      this.addBankAccount(bankAccount);
    }
  }

  /*
   |----------------------------------------------------------------------------
   | Helper functions
   |----------------------------------------------------------------------------
   */

  verifyFields = (bankAccount) => {
    const { publicToken, accountId } = bankAccount;
    const errors = [];
    if (publicToken === '') errors.push('Plaid error');
    if (accountId === '') errors.push('Invalid account');
    if (errors.length > 0) Alert.alert('Error', errors.join('\n'));
    return errors.length === 0;
  };

  addBankAccount = async (bankAccount) => {
    const isValid = this.verifyFields(bankAccount);
    if (isValid) {
      const { groupId } = this.props;
      const result = await bankAndCardApis.addGroupBankAccount(groupId, bankAccount);
      if (result.error) {
        // eslint-disable-next-line no-underscore-dangle
        const errors = result.error.body._embedded.errors.map(a => a.message);
        Alert.alert(result.error.name, errors.join('\n'));
      }
      this.props.onClose();
    }
  };

  /*
   |----------------------------------------------------------------------------
   | RENDER
   |----------------------------------------------------------------------------
   */

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        onRequestClose={() => this.props.onClose()}
      >
        <WebView
          style={{ flex: 1 }}
          source={{ uri: PlaidWebViewSourceURL }}
          onMessage={e => this.onMessage(JSON.parse(e.nativeEvent.data))}
        />
      </Modal>
    );
  }
}

export default Plaid;
