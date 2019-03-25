import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Header, Button, Icon, Body, Left, Right } from 'native-base';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Reusable screen header component
 |------------------------------------------------------------------------------
 */

const LayoutHeader = ({ menuButtonOnPressHandler, headerTitle }) => (
  <Header style={styles.wrapper}>
    <Left>
      <Button transparent onPress={menuButtonOnPressHandler}>
        <Icon name="menu" style={styles.menuButtonIcon} />
      </Button>
    </Left>

    <Body>
      <Text style={styles.title}>
        {headerTitle}
      </Text>
    </Body>

    <Right />
  </Header>
);

LayoutHeader.propTypes = {
  menuButtonOnPressHandler: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
};

export default LayoutHeader;
