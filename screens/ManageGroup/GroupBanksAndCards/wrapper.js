import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Body, Header, Left, Right } from 'native-base';

import { navigationPropTypes } from '../../../constants/app/defaults';
import CustomIcon from '../../../constants/fonts/custom_icons';
import headerStyles from '../../../GlobalCss/header-styles';
import GroupBanksAndCardsScreenView from './view';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Banks & Cards
 |
 | Wrapper that adds header to the screen
 |------------------------------------------------------------------------------
 */

const GroupBanksAndCardsScreenWrapper = props => (
  <View style={styles.globalWrapper}>
    <View style={styles.globalWrapper}>
      <Header style={headerStyles.wrapper}>
        <Left style={headerStyles.flexOne}>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <CustomIcon name="back" style={headerStyles.backButton} />
          </Button>
        </Left>

        <Body style={headerStyles.content}>
          <Text numberOfLines={1} style={headerStyles.text}>
            bank account
          </Text>
        </Body>

        <Right />
      </Header>

      <GroupBanksAndCardsScreenView {...props} />
    </View>
  </View>
);

GroupBanksAndCardsScreenWrapper.propTypes = {
  ...navigationPropTypes(PropTypes),
};

export default GroupBanksAndCardsScreenWrapper;
