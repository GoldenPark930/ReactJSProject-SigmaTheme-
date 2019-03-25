import { Map, List } from 'immutable';

import { paginate } from 'src/utils/helpers';
import NotificationsActions from '../constants/action-types/notifications';

// Define initial state
const initialState = Map({
  errors: Map({}),
  // Flags
  fetchingIsInProgress: false,
  fetchingMoreIsInProgress: false,
  pullToRefreshIsInProgress: false,
  infiniteScrollIsAvailable: true,
  updatingStatusIsInProgress: false,
  // Data
  data: List([]),
  count: 0,
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    // Start getting count process
    case NotificationsActions.NOTIFICATIONS__GET_COUNT__SUBTYPES.START:
      return state.set('fetchingIsInProgress', true);

    // Store errors
    case NotificationsActions.NOTIFICATIONS__GET_COUNT__SUBTYPES.FAIL:
      return state
        .set('fetchingIsInProgress', false)
        .set('errors', action.errors);

    // Store count
    case NotificationsActions.NOTIFICATIONS__GET_COUNT__SUBTYPES.SUCCESS:
      return state
        .set('fetchingIsInProgress', false)
        .set('count', action.payload.count);

    // Start fetching process
    case NotificationsActions.NOTIFICATIONS__FETCH_ALL__SUBTYPES.START:
      return state.get('data').toJS().length
        ? state.set('pullToRefreshIsInProgress', true)
        : state.set('fetchingIsInProgress', true);

    // Store errors
    case NotificationsActions.NOTIFICATIONS__FETCH_ALL__SUBTYPES.FAIL:
      return state
        .set('fetchingIsInProgress', false)
        .set('pullToRefreshIsInProgress', false)
        .set('errors', action.errors);

    // Store received entities
    case NotificationsActions.NOTIFICATIONS__FETCH_ALL__SUBTYPES.SUCCESS: {
      const currentPage = paginate(action.payload.rows);

      return state
        .set('fetchingIsInProgress', false)
        .set('pullToRefreshIsInProgress', false)
        .set('infiniteScrollIsAvailable', !currentPage.isLastPage)
        .set('data', List(currentPage.content));
    }

    // Start pagination fetching process
    case NotificationsActions.NOTIFICATIONS__FETCH_MORE__SUBTYPES.START:
      return state.set('fetchingMoreIsInProgress', true);

    // Store errors
    case NotificationsActions.NOTIFICATIONS__FETCH_MORE__SUBTYPES.FAIL:
      return state
        .set('fetchingMoreIsInProgress', false)
        .set('infiniteScrollIsAvailable', false)
        .set('errors', action.errors);

    // Store received entities
    case NotificationsActions.NOTIFICATIONS__FETCH_MORE__SUBTYPES.SUCCESS: {
      const currentPage = paginate(action.payload.rows);

      // TODO {Maksym}: handle entities duplication
      return state
        .set('fetchingMoreIsInProgress', false)
        .set('infiniteScrollIsAvailable', !currentPage.isLastPage)
        .set('data', List([...state.get('data').toJS(), ...currentPage.content]));
    }

    case NotificationsActions.NOTIFICATIONS__UPDATE_STATUS_AS_READ__SUBTYPES.START:
      return state
        .set('updatingStatusIsInProgress', true);

    case NotificationsActions.NOTIFICATIONS__UPDATE_STATUS_AS_READ__SUBTYPES.SUCCESS:
      return state
        .set('updatingStatusIsInProgress', false);

    case NotificationsActions.NOTIFICATIONS__UPDATE_STATUS_AS_READ__SUBTYPES.FAIL:
      return state
        .set('updatingStatusIsInProgress', false)
        .set('errors', action.errors);

    // Clear the notifications list
    case NotificationsActions.NOTIFICATIONS__CLEAR_LIST:
      return state.set('data', List([]));

    default:
      return state;
  }
}
