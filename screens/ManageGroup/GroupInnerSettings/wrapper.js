import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Body, Header, Left, Right } from 'native-base';

import Spinner from '../../../components/spinner';
import { navigationPropTypes } from '../../../constants/app/defaults';
import CustomIcon from '../../../constants/fonts/custom_icons';
import headerStyles from '../../../GlobalCss/header-styles';
import GroupBanksAndCardsScreenView from './view';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings wrapper
 |
 | Wrapper adds header to the screen
 |------------------------------------------------------------------------------
 */

const GroupInnerSettingsWrapper = props => (
  <View style={styles.globalWrapper}>
    <Header style={headerStyles.wrapper}>
      <Left style={headerStyles.flexOne}>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <CustomIcon name="back" style={headerStyles.backButton} />
        </Button>
      </Left>

      <Body style={headerStyles.content}>
        <Text numberOfLines={1} style={headerStyles.text}>
          Club Settings
        </Text>
      </Body>

      <Right />
    </Header>

    <GroupBanksAndCardsScreenView {...props} />

    <Spinner visible={props.leavingGroupIsInProgress} />
  </View>
);

const { bool } = PropTypes;

GroupInnerSettingsWrapper.propTypes = {
  // Flags
  leavingGroupIsInProgress: bool.isRequired,
  // Navigation
  ...navigationPropTypes(PropTypes),
};

export default GroupInnerSettingsWrapper;
