import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, RefreshControl } from 'react-native';

import Spinner from '../../../components/spinner';
import { ALL_ROLES } from '../../../constants/users/roles';
import SingleGroupMemberModel from './components/SingleGroupMemberModel';
import EmptyGroupMembersList from './components/EmptyGroupMembersList';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Manage friends
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { bool, number, string, func, shape, arrayOf, oneOf } = PropTypes;

class ManageFriendsScreenView extends Component {
  static propTypes = {
    // Flags
    fetchingIsInProgress: bool.isRequired,
    // Data
    groupId: number.isRequired,
    groupMembers: arrayOf(shape({
      id: number.isRequired,
      email: string,
      firstName: string,
      lastName: string,
      role: oneOf(ALL_ROLES).isRequired,
    })).isRequired,
    userId: number.isRequired,
    userRole: oneOf(ALL_ROLES).isRequired,
    // Functions
    getCurrentGroupMembers: func.isRequired,
  };

  state = {
    // This variable is used to prevent loading spinners overlap. First one is our custom
    // global loading spinner that should be visible only when the user navigates to the
    // manage friends screen. The second spinner is system one from `pull-to-refresh`
    // feature that should appear only when user is actually pulling to refresh.
    isItFirstFetchAfterMount: true,
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    const { getCurrentGroupMembers, groupId } = this.props;

    // Get group members from the server
    getCurrentGroupMembers(groupId);
  }

  componentWillReceiveProps(nextProps) {
    const { isItFirstFetchAfterMount } = this.state;

    if (!nextProps.fetchingIsInProgress && isItFirstFetchAfterMount) {
      // Update helper variable on remote request end
      this.setState({ isItFirstFetchAfterMount: false });
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderList = (items) => {
    const { groupId, userId, userRole, fetchingIsInProgress, getCurrentGroupMembers } = this.props;
    const { isItFirstFetchAfterMount } = this.state;

    // Set properties for `pull-to-refresh` feature
    const RefreshControlConfig = (
      <RefreshControl
        refreshing={fetchingIsInProgress && !isItFirstFetchAfterMount}
        onRefresh={() => getCurrentGroupMembers(groupId)}
      />
    );

    // Split group members into two list containing registered and unregistered members
    const { registered, unregistered } = items.reduce((result, user) => {
      if (user.registered) {
        return {
          registered: [...result.registered, user],
          unregistered: result.unregistered,
        };
      }

      return {
        registered: result.registered,
        unregistered: [...result.unregistered, user],
      };
    }, { registered: [], unregistered: [] });

    const registeredAmount = registered.length;
    const unregisteredAmount = unregistered.length;

    // Add separator label between registered members list and
    // unregistered members list if there are any unregistered ones
    const unregisteredList = unregisteredAmount > 0
      ? [
        (
          <Text key="unregisteredSeparator" style={styles.unregisteredSeparator}>
            Unregistered Friends
          </Text>
        ),
        ...unregistered.map((item, index) => (
          <SingleGroupMemberModel
            key={item.id}
            memberModel={item}
            userId={userId}
            userRole={userRole}
            showSeparator={index < unregisteredAmount - 1}
          />
        )),
      ]
      : null;

    return (
      <ScrollView refreshControl={RefreshControlConfig}>
        {registered.map((item, index) => (
          <SingleGroupMemberModel
            key={item.id}
            memberModel={item}
            userId={userId}
            userRole={userRole}
            showSeparator={index < registeredAmount - 1}
          />
        ))}

        {unregisteredList}
      </ScrollView>
    );
  };

  renderContent = () => {
    const { isItFirstFetchAfterMount } = this.state;
    const { groupMembers } = this.props;

    if (isItFirstFetchAfterMount) {
      return <View />;
    }

    return groupMembers.length
      ? this.renderList(groupMembers)
      : <EmptyGroupMembersList />;
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { isItFirstFetchAfterMount } = this.state;
    const { fetchingIsInProgress } = this.props;

    return (
      <View style={styles.contentWrapper}>
        {fetchingIsInProgress && isItFirstFetchAfterMount ? <Spinner /> : null}

        {this.renderContent()}
      </View>
    );
  }
}

export default ManageFriendsScreenView;

// TODO {Maksym}: move spinner from here to the wrapper
// TODO {Maksym}: replace ScrollView with FlatList
// TODO {Maksym}: add pagination with infinite scroll
