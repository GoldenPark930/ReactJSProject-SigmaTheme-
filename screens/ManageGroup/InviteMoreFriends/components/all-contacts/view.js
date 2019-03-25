import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  Platform,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';

import ListItemSeparator from '../../../../../components/list-item-separator';
import ListLoadingSpinner from '../../../../../components/list-loading-spinner';
import { CONTACT_USER, GRINK_USER } from '../../../../../constants/users/types';
import SingleUserModel from './single-user-model';
import NewUserModel from './invite-new-user-model';
import { contactMatch } from './utils';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Invite more friends
 |
 | List of all contacts and non-group members
 |------------------------------------------------------------------------------
 */


class AllContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paginationPage: 0,
    };

    // Moved actions calls from componentDidMount here to start all fetching
    // processes as earlier as possible. componentWillMount isn't the case
    // because there is a possibility that in React 16+ it's called several
    // times in a single life cycle.

    // Get phone contacts list
    props.getAllContactsListData();

    // Get Grink users that are not in the group
    if (this.props.groupId !== undefined) props.getNonMembersUsers(props.groupId, props.searchFilter);
  }


  componentWillReceiveProps(nextProps) {
    const currentListLength = this.props.nonMembersUsersList.length;
    const nextListLength = nextProps.nonMembersUsersList.length;

    // Increment pagination page number when we
    // received new part of the grink users list
    if (currentListLength < nextListLength) {
      this.setState({ paginationPage: this.state.paginationPage + 1 });
    }

    // This happens when list was refreshed with pull-to-refresh feature or by
    // search submit. Reset pagination page to the first page and scroll the
    // list to the top
    if (currentListLength > nextListLength) {
      this.setState({ paginationPage: 1 });
      // TODO {Maksym}: fix all auto-scrolling issues
      this.flatListRef.scrollToOffset({ offset: 0, animated: false });
    }
  }
  /*
  shouldComponentUpdate(nextProps) {
    const {
      fetchingGrinkUsersInProgress,
      fetchingContactsListInProgress,
      groupId,
    } = this.props;

    if (groupId === undefined) return true;
    return true;
    
    // Re-render component only when fetching processes change their status
    return (
      fetchingContactsListInProgress !== nextProps.fetchingContactsListInProgress
      || fetchingGrinkUsersInProgress !== nextProps.fetchingGrinkUsersInProgress
    );
  }
  */

  onEndReachedEventHandler = () => {
    const { paginationPage } = this.state;
    const {
      groupId,
      searchFilter,
      getMoreNonMembersUsers,
      isInfiniteScrollAvailable,
      fetchingGrinkUsersInProgress,
    } = this.props;

    if (isInfiniteScrollAvailable && !fetchingGrinkUsersInProgress) {
      getMoreNonMembersUsers(groupId, paginationPage + 1, searchFilter);
    }
  };

  renderListItem = ({ item }) => {
    // Render spinner as list item when
    // fetching process is in progress
    if (item.type === ListLoadingSpinner.JSModel.type) {
      return <ListLoadingSpinner.View />;
    }

    const {
      addUserToInvitationList,
      removeUserFromInvitationList,
      onInvited,
      list,
    } = this.props;

    return (
      <SingleUserModel
        model={item}
        onInvited={onInvited}
        addUserToInvitationList={addUserToInvitationList}
        removeUserFromInvitationList={removeUserFromInvitationList}
        initialChecked={list && (list.filter(el => (item.id && el.id === item.id) ||
          (item.phone && el.phone === item.phone)).length > 0)}
      />
    );
  };

  renderList = () => {
    const {
      groupId,
      searchFilter,
      contactsList,
      getNonMembersUsers,
      nonMembersUsersList,
      fetchingGrinkUsersInProgress,
      fetchingContactsListInProgress,
      addUserToInvitationList,
      removeUserFromInvitationList,
    } = this.props;

    // Render spinner if we don't have contacts list
    // or grink users list that are not in the group
    if (
      (fetchingContactsListInProgress && contactsList.length === 0)
      || (fetchingGrinkUsersInProgress && nonMembersUsersList.length === 0)
    ) {
      return <ListLoadingSpinner.View />;
    }

    // Filter contacts list by search value
    const filteredContactsList = searchFilter
      ? contactsList.filter(contact => contactMatch(contact, searchFilter))
      : contactsList;
    const filteredNonMembersUsersList = searchFilter
      ? nonMembersUsersList.filter(contact => contactMatch(contact, searchFilter))
      : nonMembersUsersList;

    // Merge contacts list and grink users that are not group members
    const fullList = [...filteredContactsList, ...filteredNonMembersUsersList]
    // Exclude grinkadmin
      .filter(item => item.username !== 'grinkadmin');

    // Add spinner item to represent pagination spinner
    // if fetching more users process is in progress
    if (fetchingGrinkUsersInProgress) {
      fullList.push(ListLoadingSpinner.JSModel);
    }

    // `Pull-to-refresh` feature configuration
    const refreshControlProps = {
      refreshing: fetchingGrinkUsersInProgress,
      onRefresh: () => {
        getNonMembersUsers(groupId, searchFilter);
      },
    };

    // Render the final list
    if (fullList.length > 0) {
      return (
        <FlatList
        data={fullList}
          keyExtractor={item => item.id}
          renderItem={this.renderListItem}
          refreshControl={
            groupId !== undefined ?
              <RefreshControl {...refreshControlProps} /> : null}
          ItemSeparatorComponent={() => <ListItemSeparator />}
          onEndReached={groupId !== undefined ?
            this.onEndReachedEventHandler : null}
          onEndReachedThreshold={1.5}
          ref={(element) => {
            this.flatListRef = element;
          }}
        />
      );
    }
    if (!isNaN(searchFilter)) {
      return (
        <View>
          <NewUserModel
            addUserToInvitationList={addUserToInvitationList}
            removeUserFromInvitationList={removeUserFromInvitationList}
            phone={searchFilter}
            phoneNumber={this.props.phoneNumber}
            verifyPhoneNumber={this.props.verifyPhoneNumber}
            onInvited={this.props.onInvited}
          />
          <ListItemSeparator />
        </View>
      );
    }
    return null;
  };

  render() {
    const keyboardAvoidingProps = Platform.OS === 'ios' ?
      { behavior: 'padding', keyboardVerticalOffset: 65 } : {};
    return (
      <KeyboardAvoidingView
        style={styles.mainWrapper}
        contentContainerStyle={styles.wrapper}
        {...keyboardAvoidingProps}
      >
        {this.renderList()}
      </KeyboardAvoidingView>
    );
  }
}

const {
  bool, string, number, func,
  shape, arrayOf, oneOf, oneOfType,
  object,
} = PropTypes;

AllContacts.propTypes = {
  searchFilter: string.isRequired,
  groupId: number.isRequired,
  isInfiniteScrollAvailable: bool.isRequired,

  fetchingGrinkUsersInProgress: bool.isRequired,
  nonMembersUsersList: arrayOf(shape({
    type: oneOf([CONTACT_USER, GRINK_USER]),
    id: oneOfType([number, string]).isRequired,
    email: string,
    firstName: string,
    lastName: string,
    username: string,
  })).isRequired,

  fetchingContactsListInProgress: bool.isRequired,
  contactsList: arrayOf(shape({
    type: oneOf([CONTACT_USER, GRINK_USER]),
    id: oneOfType([number, string]).isRequired,
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    phones: arrayOf(shape({
      label: string,
      text: string.isRequired,
      number: oneOfType([number, string]).isRequired,
    })),
  })).isRequired,

  getAllContactsListData: func.isRequired,
  getNonMembersUsers: func.isRequired,
  getMoreNonMembersUsers: func.isRequired,
  addUserToInvitationList: func.isRequired,
  removeUserFromInvitationList: func.isRequired,
  list: arrayOf(object).isRequired,
  onInvited: func.isRequired,
  verifyPhoneNumber: func.isRequired,
  phoneNumber: string.isRequired,
};

export default AllContacts;
