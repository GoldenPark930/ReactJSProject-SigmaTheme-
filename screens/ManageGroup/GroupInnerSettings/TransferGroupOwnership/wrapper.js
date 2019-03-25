import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Body, Header, Left, Right } from 'native-base';

import Spinner from '../../../../components/spinner';
import { navigationPropTypes } from '../../../../constants/app/defaults';
import CustomIcon from '../../../../constants/fonts/custom_icons';
import headerStyles from '../../../../GlobalCss/header-styles';
import GroupInnerSettingsTransferGroupOwnershipView from './view';
import NavigationService from '../../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Transfer group owner wrapper
 |
 | Wrapper adds header to the screen
 |------------------------------------------------------------------------------
 */

const { bool, number, string, func, oneOfType } = PropTypes;

class GroupInnerSettingsTransferGroupOwnershipWrapper extends Component {
  static propTypes = {
    // Flags
    transferringOwnershipIsInProgress: bool.isRequired,
    // Data
    groupId: oneOfType([number, string]).isRequired,
    // Functions
    updateNavWorkaroundState: func.isRequired,
    transferCurrentGroupOwnership: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  state = {
    newOwner: null,
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handler
  |-----------------------------------------------------------------------------
  */

  newOwnerOnSelectHandler = (newOwner) => {
    this.setState({ newOwner });
  };

  doneButtonOnPressHandler = () => {
    const { newOwner } = this.state;
    const {
      groupId,
      transferCurrentGroupOwnership,
      transferringOwnershipIsInProgress,
    } = this.props;

    if (newOwner && !transferringOwnershipIsInProgress) {
      transferCurrentGroupOwnership(
        groupId,
        newOwner.id,
        () => {
          this.useNavWorkaround();
          NavigationService.navigateWithDebounce('MyGroups');
        },
      );
    }
  };

  backButtonOnPressHandler = () => {
    this.useNavWorkaround();

    // Redirect to previous screen
    this.props.navigation.goBack();
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  useNavWorkaround = () => {
    this.props.updateNavWorkaroundState({ GroupInnerSettingsTransferGroupOwnership: false });
  };

  renderDoneButton = () => {
    // Render the `done` button only if new owner was selected
    if (this.state.newOwner) {
      return (
        <Right style={headerStyles.flexOne}>
          <Button
            transparent
            onPress={this.doneButtonOnPressHandler}
          >
            <Text style={[headerStyles.colorCalm, headerStyles.semibold]}>
              Done
            </Text>
          </Button>
        </Right>
      );
    }

    return <Right style={headerStyles.flexOne} />;
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.globalWrapper}>
        <Header style={headerStyles.wrapper}>
          <Left style={headerStyles.flexOne}>
            <Button transparent onPress={this.backButtonOnPressHandler}>
              <CustomIcon name="back" style={headerStyles.backButton} />
            </Button>
          </Left>

          <Body style={headerStyles.content}>
            <Text numberOfLines={1} style={headerStyles.text}>
              Change Club Owner
            </Text>
          </Body>

          {this.renderDoneButton()}
        </Header>

        <GroupInnerSettingsTransferGroupOwnershipView
          newOwnerOnSelectHandler={this.newOwnerOnSelectHandler}
          selectedMember={this.state.newOwner}
          {...this.props}
        />

        <Spinner visible={this.props.transferringOwnershipIsInProgress} textContent="Transferring..." />
      </View>
    );
  }
}

export default GroupInnerSettingsTransferGroupOwnershipWrapper;
