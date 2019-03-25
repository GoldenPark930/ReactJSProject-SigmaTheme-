import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';

import { navigationPropTypes } from '../../constants/app/defaults';
import headerStyles from '../../GlobalCss/header-styles';
import TransactionHistoryView from './view';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Transaction History
 |
 | Wrapper that adds header and global spinner to the screen
 |------------------------------------------------------------------------------
 */

const TransactionHistoryWrapper = props => (
  <View style={styles.globalWrapper}>
    <View style={styles.globalWrapper}>
      <Header style={headerStyles.wrapper}>
        <Left style={headerStyles.flexOne}>
          <Button transparent onPress={() => props.navigation.navigate('DrawerOpen')}>
            <Icon name="menu" style={headerStyles.colorRoyal} />
          </Button>
        </Left>

        <Body style={headerStyles.content}>
          <Text numberOfLines={1} style={headerStyles.text}>
            Transaction History
          </Text>
        </Body>

        <Right />
      </Header>

      <TransactionHistoryView {...props} />
    </View>

  </View>
);

TransactionHistoryWrapper.propTypes = {
  // Navigation
  ...navigationPropTypes(PropTypes),
};

export default TransactionHistoryWrapper;
