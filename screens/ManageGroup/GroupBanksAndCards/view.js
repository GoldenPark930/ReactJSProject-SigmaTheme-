import React, { Component } from 'react';
import { View } from 'react-native';

import BanksList from './components/BanksList';
import Plaid from './components/BanksList/components/Plaid';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Banks & Cards
 |
 | Content view
 |------------------------------------------------------------------------------
 */

class GroupBanksAndCardsScreenView extends Component {
  state = {
    plaid: false,
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  hidePlaid = () => {
    this.setState({ plaid: false });
  };

  showPlaid = () => {
    this.setState({ plaid: true });
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { plaid } = this.state;

    return (
      <View style={styles.contentWrapper}>
        <Plaid isVisible={plaid} onClose={this.hidePlaid} />
        <BanksList onLinkPress={this.showPlaid} />
      </View>
    );
  }
}

// TODO {Maksym}: replace View with scroll view?

export default GroupBanksAndCardsScreenView;
