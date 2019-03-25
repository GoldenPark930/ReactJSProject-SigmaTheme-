import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectAllNotifications,
  selectInfiniteScrollStatues,
  selectNotificationsFetchingProcessStatus,
  selectNotificationsFetchingMoreProcessStatus,
  selectNotificationsPullToRefreshProcessStatus,
  selectUpdatingStatusIsInProgress,
} from '../../store/selectors/notifications';
import {
  fetchAllNotifications,
  fetchMoreNotifications,
  clearNotificationsList,
  updateNotificationStatusAsRead,
} from '../../store/actions/notifications';
import NotificationsScreenView from './view';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Notifications
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  updatingStatusIsInProgress: selectUpdatingStatusIsInProgress(state),
  fetchingIsInProgress: selectNotificationsFetchingProcessStatus(state),
  fetchingMoreIsInProgress: selectNotificationsFetchingMoreProcessStatus(state),
  pullToRefreshIsInProgress: selectNotificationsPullToRefreshProcessStatus(state),
  isInfiniteScrollAvailable: selectInfiniteScrollStatues(state),
  notifications: selectAllNotifications(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchAllNotifications,
    fetchMoreNotifications,
    clearNotificationsList,
    updateNotificationStatusAsRead,
  }, dispatch);


const withSafeArea = withSafeAreaView(NotificationsScreenView);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

