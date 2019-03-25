import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { navigationPropTypes } from '../../../constants/app/defaults';
import ComponentView from './view';

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
//    this.focusAndClearSearchInput(); //I'm not sure why this causes error but it does
  }

  onDoneButtonPress = () => {
    const { submitInvitationList, getCurrentGroupMembers } = this.props;
    const { currentGroupId, invitationList, navigation } = this.props;

    // Invite selected users to the Grink group
    submitInvitationList(
      currentGroupId,
      invitationList,
      () => {
        // Re-fetch group members
        getCurrentGroupMembers(currentGroupId);

        navigation.goBack();
      },
    );
  };

  onLeftButtonPress = () => {
    if (this.state.searchValue === '') {
      this.props.navigation.goBack();
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
