import { Map, List } from 'immutable';

import MyGroupsActions from '../constants/action-types/my-groups';

const initialState = Map({
  archivedGroupsData: List([]),

  errors: Map({}),

  requestIsInProgress: false,

});

export default function (state = initialState, action) {
  switch (action.type) {
    case MyGroupsActions.ARCHIVED_GROUPS__LOAD_GROUPS_DATA__SUBTYPES.START:
      return state.set('requestIsInProgress', true);

    case MyGroupsActions.ARCHIVED_GROUPS__LOAD_GROUPS_DATA__SUBTYPES.FAIL:
      return state
        .set('requestIsInProgress', false)
        .set('errors', Map(action.errors));

    case MyGroupsActions.ARCHIVED_GROUPS__LOAD_GROUPS_DATA__SUBTYPES.SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('archivedGroupsData', List(action.payload.rows));

    default:
      return state;
  }
}
