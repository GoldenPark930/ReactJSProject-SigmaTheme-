import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl } from 'react-native';

import Header from '../../components/NewHeader';
import Spinner from '../../components/spinner';
import ListItemSeparator from '../../components/list-item-separator';
import ListLoadingSpinner from '../../components/list-loading-spinner';
import { navigationPropTypes } from '../../constants/app/defaults';
import SingleNotificationModel from './components/single-notification-model';
import EmptyNotificationsList from './components/empty-notifications-list';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Notifications
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { string, number, func, bool, shape, arrayOf, oneOfType } = PropTypes;

class NotificationsScreenView extends Component {
  static propTypes = {
    // Flags
    fetchingIsInProgress: bool.isRequired,
    fetchingMoreIsInProgress: bool.isRequired,
    pullToRefreshIsInProgress: bool.isRequired,
    isInfiniteScrollAvailable: bool.isRequired,
    // Data
    notifications: arrayOf(shape({
      id: number.isRequired,
      read: bool.isRequired,
      message: string.isRequired,
      deliveryType: string.isRequired,
      notificationType: string.isRequired,
      createdAt: oneOfType([string, number]).isRequired,
      destinationImage: string.isRequired,
    })).isRequired,
    // Functions
    fetchAllNotifications: func.isRequired,
    fetchMoreNotifications: func.isRequired,
    clearNotificationsList: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  constructor(props) {
    super(props);

    this.state = {
      paginationPage: 0,
    };

    // Moved actions calls from componentDidMount here to start all fetching
    // processes as earlier as possible. componentWillMount isn't the case
    // because there is a possibility that in React 16+ it's called several
    // times in a single life cycle.

    // Start fetching notifications from remote server
    props.fetchAllNotifications(() => {
      props.updateNotificationStatusAsRead();
    });
  }

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillReceiveProps(nextProps) {
    const previousListLength = this.props.notifications.length;
    const nextListLength = nextProps.notifications.length;

    // Increment pagination page number when new chunk of data arrives
    if (previousListLength < nextListLength) {
      this.setState({ paginationPage: this.state.paginationPage + 1 });
    }

    // This happens when list was refreshed with pull-to-refresh
    // feature. Reset pagination page to the first page.
    if (previousListLength > nextListLength) {
      this.setState({ paginationPage: 1 });
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      fetchingIsInProgress,
      fetchingMoreIsInProgress,
      pullToRefreshIsInProgress,
    } = this.props;

    // Re-render component only when fetching processes change their status
    return (
      fetchingIsInProgress !== nextProps.fetchingIsInProgress
      || fetchingMoreIsInProgress !== nextProps.fetchingMoreIsInProgress
      || pullToRefreshIsInProgress !== nextProps.pullToRefreshIsInProgress
    );
  }

  componentWillUnmount() {
    // Clear notifications list when user leaves the screen
    this.props.clearNotificationsList();
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onEndReachedEventHandler = () => {
    const { paginationPage } = this.state;
    const {
      fetchMoreNotifications,
      fetchingMoreIsInProgress,
      isInfiniteScrollAvailable,
    } = this.props;

    if (isInfiniteScrollAvailable && !fetchingMoreIsInProgress) {
      fetchMoreNotifications(paginationPage + 1);
    }
  };

  menuButtonOnPressHandler = () => {
    this.props.navigation.navigate('DrawerOpen');
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderListItem = ({ item }) => {
    // Render spinner as list item when fetching process is in progress
    if (item.type === ListLoadingSpinner.JSModel.type) {
      return <ListLoadingSpinner.View />;
    }

    // Render single list item model
    return <SingleNotificationModel data={item} />;
  };

  renderList = (items) => {
    const {
      fetchAllNotifications,
      fetchingMoreIsInProgress,
      pullToRefreshIsInProgress,
      updateNotificationStatusAsRead,
    } = this.props;

    // Add spinner item to represent pagination spinner
    // if fetching more entities process is in progress
    if (fetchingMoreIsInProgress) {
      items.push(ListLoadingSpinner.JSModel);
    }

    return (
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={this.renderListItem}
        refreshControl={<RefreshControl
          refreshing={pullToRefreshIsInProgress}
          onRefresh={() => {
            fetchAllNotifications(() => {
              updateNotificationStatusAsRead();
            });
          }}
        />}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        onEndReached={this.onEndReachedEventHandler}
        onEndReachedThreshold={0.7}
      />
    );
  };

  renderContent = () => {
    const { notifications, fetchingIsInProgress } = this.props;

    if (fetchingIsInProgress) {
      return <View />;
    }

    return notifications.length
      ? this.renderList(notifications)
      : <EmptyNotificationsList />;
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title="My Activity"
          leftActionIcon="ios-menu-outline"
          leftAction={this.menuButtonOnPressHandler}
        />

        {this.renderContent()}

        <Spinner visible={this.props.fetchingIsInProgress} />
      </View>
    );
  }
}

export default NotificationsScreenView;
