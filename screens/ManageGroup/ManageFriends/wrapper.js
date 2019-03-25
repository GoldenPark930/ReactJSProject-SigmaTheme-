import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Body, Header, Left, Right } from 'native-base';

import { navigationPropTypes } from '../../../constants/app/defaults';
import { ALL_ROLES, isOwnerOrAdmin } from '../../../constants/users/roles';
import CustomIcon from '../../../constants/fonts/custom_icons';
import headerStyles from '../../../GlobalCss/header-styles';
import ManageFriendsScreenView from './view';
import NavigationService from '../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Manage friends
 |
 | Wrapper that adds header to the screen
 |------------------------------------------------------------------------------
 */

const ManageFriendsScreenWrapper = props => (
  <View style={styles.globalWrapper}>
    <Header style={headerStyles.wrapper}>
      <Left style={headerStyles.flexOne}>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <CustomIcon name="back" style={headerStyles.backButton} />
        </Button>
      </Left>

      <Body style={headerStyles.content}>
        <Text numberOfLines={1} style={headerStyles.text}>
          Manage Friends
        </Text>
      </Body>

      <Right style={headerStyles.flexOne}>
        {
          isOwnerOrAdmin(props.userRole)
            ? (
              <Button 
              transparent 
              onPress={() => NavigationService.navigateWithDebounce('InviteMoreFriends')}>
                <Text style={[headerStyles.colorCalm, headerStyles.semibold]}>
                  Invite
                </Text>
              </Button>
            )
            : null
        }
      </Right>
    </Header>

    <ManageFriendsScreenView {...props} />
  </View>
);

const { oneOf } = PropTypes;

ManageFriendsScreenWrapper.propTypes = {
  // Data
  userRole: oneOf(ALL_ROLES).isRequired,
  // Navigation
  ...navigationPropTypes(PropTypes),
};

export default ManageFriendsScreenWrapper;

// TODO {Maksym}: move spinner from view to here
