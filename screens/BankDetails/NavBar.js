import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Button, Body, Header, Left, Right, Icon } from 'native-base';

import styles from './styles';
import headerStyles from '../../GlobalCss/header-styles';

const NavBar = props => (
  <Header style={headerStyles.wrapper}>
    <Left style={headerStyles.flexOne}>
      <Button transparent onPress={props.onBackPress}>
        <Icon name="arrow-back" style={headerStyles.colorRoyal} />
      </Button>
    </Left>

    <Body style={styles.headerBodyWidth}>
      <Text
        numberOfLines={1}
        style={headerStyles.text}
      >
        {props.title}
      </Text>
    </Body>
    <Right style={{ flex: 1 }} />
  </Header>
);

NavBar.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavBar;
