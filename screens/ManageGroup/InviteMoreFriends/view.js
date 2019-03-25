import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Body, Header, Left, Right } from 'native-base';

import Chips from './components/chips';
import AllContacts from './components/all-contacts';
import CustomIcon from '../../../constants/fonts/custom_icons';
import headerStyles from '../../../GlobalCss/header-styles';
import styles from './styles';

const InviteMoreFriendsScreenView = props => (
  <View style={styles.globalWrapper}>
    <Header style={headerStyles.wrapper}>
      <Left style={headerStyles.flexOne}>
        {
          props.searchValue === '' ? (
            <Button
              transparent
              onPress={props.onLeftButtonPress}
            >
              <CustomIcon
                name="back"
                style={headerStyles.backButton}
              />
            </Button>
          ) : (
            <Button
              transparent
              onPress={props.onLeftButtonPress}
            >
              <Text style={[headerStyles.colorCalm, headerStyles.semibold]}>
                    Cancel
              </Text>
            </Button>
          )
        }
      </Left>

      <Body style={[headerStyles.content, styles.headerBodyWidth]}>
        <Text
          numberOfLines={1}
          style={[headerStyles.text, styles.headerBodyWidth]}
        >
              Invite Members
        </Text>
      </Body>

      <Right style={headerStyles.flexOne}>
        {
          props.invitationList.length === 0 ? (
            null
          ) : (
            <Button
              transparent
              onPress={props.onDoneButtonPress}
            >
              <Text style={[headerStyles.colorCalm, headerStyles.semibold]}>
                    Done
              </Text>
            </Button>
          )
        }
      </Right>
    </Header>
    <View style={styles.contentWrapper}>
      <Chips
        onSearchInputChange={props.onSearchInputChange}
        searchRef={props.addSearchInputRef}
      />

      <AllContacts
        searchFilter={props.searchValue}
        onInvited={props.onInvited}
      />
    </View>
  </View>
);

InviteMoreFriendsScreenView.propTypes = {
  searchValue: PropTypes.string.isRequired,
  invitationList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDoneButtonPress: PropTypes.func.isRequired,
  onLeftButtonPress: PropTypes.func.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  addSearchInputRef: PropTypes.func.isRequired,
  onInvited: PropTypes.func.isRequired,

};

export default InviteMoreFriendsScreenView;
