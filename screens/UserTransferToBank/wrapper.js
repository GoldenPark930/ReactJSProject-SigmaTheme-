import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Keyboard } from 'react-native';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';

import Spinner from '../../components/spinner';
import { navigationPropTypes } from '../../constants/app/defaults';
import headerStyles from '../../GlobalCss/header-styles';
import UserTransferToBankView from './view';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | User Transfer to bank
 |
 | Wrapper that adds header and global spinner to the screen
 |------------------------------------------------------------------------------
 */

const UserTransferToBankWrapper = props => (
  <View style={styles.globalWrapper}>
    <View style={styles.globalWrapper}>
      <Header style={headerStyles.wrapper}>
        <Left style={headerStyles.flexOne}>
          <Button
            transparent
            onPress={() => {
              Keyboard.dismiss();
              props.navigation.navigate('DrawerOpen');
            }}
          >
            <Icon name="menu" style={headerStyles.colorRoyal} />
          </Button>
        </Left>

        <Body style={headerStyles.content}>
          <Text numberOfLines={1} style={headerStyles.text}>
            Transfer to Bank
          </Text>
        </Body>

        <Right />
      </Header>

      <UserTransferToBankView {...props} />
    </View>

    <Spinner
      visible={props.transferToBankInProgress}
      textContent="Transferring the money. Please wait..."
      overlayColor="rgba(0, 0, 0, 0.25)"
    />
  </View>
);

const { bool } = PropTypes;

UserTransferToBankWrapper.propTypes = {
  // Flags
  transferToBankInProgress: bool.isRequired,
  // Navigation
  ...navigationPropTypes(PropTypes),
};

export default UserTransferToBankWrapper;
