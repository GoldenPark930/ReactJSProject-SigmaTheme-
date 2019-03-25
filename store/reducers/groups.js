import { Map } from 'immutable';

import GroupActions from '../constants/action-types/groups';

const initialState = Map({
  errors: Map({}),

  fetchingFirstOfAllGroupsInProgress: false,
  fetchingAllGroupsInProgress: false,

  skip: 0,
  step: 8,

  groups: Map({
    totalCount: 0,
    rows: [],
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GroupActions.GROUPS__FIRST_STEP_OF_ALL.START:
      return state
        .set('fetchingFirstOfAllGroupsInProgress', true);

    case GroupActions.GROUPS__FIRST_STEP_OF_ALL.FAIL:
      return state
        .set('fetchingFirstOfAllGroupsInProgress', false)
        .set('errors', Map(action.errors));

    case GroupActions.GROUPS__FIRST_STEP_OF_ALL.SUCCESS:
      return state
        .set('fetchingFirstOfAllGroupsInProgress', false)
        .set('skip', 8)
        .set('groups', Map({
          totalCount: action.payload.totalCount,
          rows: action.payload.rows,
        }));

    case GroupActions.GROUPS__GET_ALL.START:
      return state
        .set('fetchingAllGroupsInProgress', true);

    case GroupActions.GROUPS__GET_ALL.FAIL:
      return state
        .set('fetchingAllGroupsInProgress', false)
        .set('errors', Map(action.errors));

    case GroupActions.GROUPS__GET_ALL.SUCCESS:
      return state
        .set('fetchingAllGroupsInProgress', false)
        .set('groups', Map({
          totalCount: action.payload.totalCount,
          rows: state.get('groups').toJS().rows.concat(action.payload.rows),
        }))
        .set('skip', state.get('skip') + state.get('step'));

    default:
      return state;
  }
}
