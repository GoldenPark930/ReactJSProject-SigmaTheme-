import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import { navigationPropTypes } from '../../../constants/app/defaults';
import ComponentView from '../../ManageGroup/InviteMoreFriends/view';
import NavigationService from '../../../utils/helpers/navigation-service';

class InviteMoreFriendsScreenWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      lastSearch: '',
    };
  }

  componentWillUnmount() {
    this.props.leaveInviteMoreFriendsScreen();
  }

  onSubmitSearch = () => {
    const { currentGroupId, getNonMembersUsers } = this.props;
    const { searchValue, lastSearch } = this.state;

    if (searchValue !== lastSearch) {
      if (currentGroupId !== undefined) getNonMembersUsers(currentGroupId, searchValue);
      this.setState({ lastSearch: searchValue });
    }
  };

  onSearchInputChange = (value) => {
    this.setState({ searchValue: value });
  };

  onInvited = () => {
    this.focusAndClearSearchInput();
  }

  onDoneButtonPress = () => {
    const { submitInvitationList } = this.props;
    const { currentGroupId, invitationList, navigation } = this.props;

    // Invite selected users to the Grink group
    submitInvitationList(
      currentGroupId,
      invitationList,
      () => {
        navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
                routeName: 'MainApp',
                params: {},
                action: NavigationActions.navigate({ routeName: 'ManageGroup' }),
              }),
            ],
          }),
        );
      },
    );
  };

  onLeftButtonPress = () => {
    if (this.state.searchValue === '') {
      this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'MainApp',
              params: {},
              action: NavigationActions.navigate({ routeName: 'ManageGroup' }),
            }),
          ],
        }),
      );
    } else {
      this.focusAndClearSearchInput();
    }
  };

  addSearchInputRef = (input) => {
    this.searchInput = input;
  }

  focusAndClearSearchInput = () => {
    this.setState({ searchValue: '' });
    this.searchInput.clear();
    this.searchInput.focus();
  }

  render() {
    return (
      <ComponentView
        searchValue={this.state.searchValue}
        invitationList={this.props.invitationList}
        onDoneButtonPress={this.onDoneButtonPress}
        onLeftButtonPress={this.onLeftButtonPress}
        onSearchInputChange={this.onSearchInputChange}
        addSearchInputRef={this.addSearchInputRef}
        onInvited={this.onInvited}
      />
    );
  }
}

const { func, arrayOf, object, number } = PropTypes;
InviteMoreFriendsScreenWrapper.propTypes = {
  currentGroupId: number.isRequired,
  invitationList: arrayOf(object).isRequired,
  getNonMembersUsers: func.isRequired,
  submitInvitationList: func.isRequired,
  getCurrentGroupMembers: func.isRequired,
  leaveInviteMoreFriendsScreen: func.isRequired,

  ...navigationPropTypes(PropTypes),
};

export default InviteMoreFriendsScreenWrapper;
