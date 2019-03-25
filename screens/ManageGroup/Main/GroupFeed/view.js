import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';

import SingleFeedModel from './components/single-feed-model';
import EmptyFeedList from './components/empty-feed-list';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Feed screen view
 |------------------------------------------------------------------------------
 */

const { string, number, func, bool, shape, arrayOf, oneOfType } = PropTypes;

class FeedScreenView extends Component {
  static propTypes = {
    // Flags
    fetchingIsInProgress: bool.isRequired,
    // Data
    messages: arrayOf(shape({
      id: number.isRequired,
      text: string.isRequired,
      fromUserId: number.isRequired,
      fromUser: shape({
        id: number.isRequired,
        phone: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
        imageUrl: string.isRequired,
      }).isRequired,
      createdAt: oneOfType([string, number]).isRequired,
    })).isRequired,
    // Functions
    groupId: number.isRequired,
    // Functions
    getGroupMessages: func.isRequired,
  };

  constructor(props) {
    super(props);

    // Moved actions calls from componentDidMount here to start all fetching
    // processes as earlier as possible. componentWillMount isn't the case
    // because there is a possibility that in React 16+ it's called several
    // times in a single life cycle.

    // Start fetching messages from remote server
    this.fetchAllFeeds();
  }

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  getRefreshControlConfig = () => (
    <RefreshControl
      refreshing={this.props.fetchingIsInProgress}
      onRefresh={this.fetchAllFeeds}
    />
  );

  fetchAllFeeds = () => this.props.getGroupMessages(this.props.groupId);

  renderItem = ({ item }) => (
    <SingleFeedModel
      data={item}
      key={item.id}
    />
  )

  renderList = () => {
    const { messages, fetchingIsInProgress } = this.props;

    if (messages.length || fetchingIsInProgress) {
      return (
        <FlatList
          data={messages}
          initialNumToRender={7}
          extraData={this.props}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      );
    }

    return <EmptyFeedList />;
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView refreshControl={this.getRefreshControlConfig()}>
          {this.renderList()}
        </ScrollView>
      </View>
    );
  }
}

export default FeedScreenView;
