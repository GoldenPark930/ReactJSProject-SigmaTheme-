import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl } from 'react-native';

import ListItemSeparator from '../../../../components/list-item-separator';
import ListLoadingSpinner from '../../../../components/list-loading-spinner';
import { OWNER } from '../../../../constants/users/roles';
import EmptyGroupMembersList from './components/empty-group-members-list';
import SingleGroupMemberModel from './components/single-group-member-model';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Transfer group owner view
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { bool, number, string, func, oneOfType, arrayOf, shape } = PropTypes;
const groupMemberModel = {
  id: number.isRequired,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  image: string,
};

class GroupInnerSettingsTransferGroupOwnershipView extends Component {
  static propTypes = {
    // Flags
    requestIsInProgress: bool.isRequired,
    navWorkaroundShouldWeGetMembers: bool.isRequired,
    // Data
    groupId: oneOfType([number, string]).isRequired,
    groupMembers: arrayOf(shape(groupMemberModel)).isRequired,
    selectedMember: shape(groupMemberModel),
    // Functions
    getCurrentGroupMembers: func.isRequired,
    newOwnerOnSelectHandler: func.isRequired,
    clearCurrentGroupMembersList: func.isRequired,
  };

  static defaultProps = {
    selectedMember: null,
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    const { groupId, getCurrentGroupMembers, navWorkaroundShouldWeGetMembers } = this.props;

    if (navWorkaroundShouldWeGetMembers) {
      // Fetch group members list
      getCurrentGroupMembers(groupId);
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentGroupMembersList();
  }

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderListItem = ({ item }) => (
    <SingleGroupMemberModel
      model={item}
      modelOnPressHandler={this.props.newOwnerOnSelectHandler}
    />
  );

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const {
      groupId,
      groupMembers,
      selectedMember,
      requestIsInProgress,
      getCurrentGroupMembers,
    } = this.props;

    // Render spinner if fetching group members is in progress
    if (requestIsInProgress && groupMembers.length === 0) {
      return (
        <View style={styles.container}>
          <ListLoadingSpinner.View />
        </View>
      );
    }

    // Remove group owner from the members list because you can't pass ownership to yourself
    const membersList = groupMembers
      .filter(member => member.role !== OWNER)
      .map(member => ({
        ...member,
        selected: selectedMember !== null && member.id === selectedMember.id,
      }));

    // Render custom message if there are no members in the group
    if (membersList.length === 0) {
      return <EmptyGroupMembersList />;
    }

    // `Pull-to-refresh` feature configuration
    const RefreshControlConfig = (
      <RefreshControl
        refreshing={requestIsInProgress}
        onRefresh={() => {
          getCurrentGroupMembers(groupId);
        }}
      />
    );

    // Render the members list
    return (
      <View style={styles.container}>
        <FlatList
          data={membersList}
          keyExtractor={item => item.id}
          renderItem={this.renderListItem}
          refreshControl={RefreshControlConfig}
          ItemSeparatorComponent={() => <ListItemSeparator />}
        />
      </View>
    );
  }
}

export default GroupInnerSettingsTransferGroupOwnershipView;
