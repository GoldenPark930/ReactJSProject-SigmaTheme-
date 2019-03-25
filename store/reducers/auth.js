import { Map } from 'immutable';

import signupActions from '../constants/action-types/signup';
import loginActions from '../constants/action-types/login';
import facebookActions from '../constants/action-types/facebook';
import googleActions from '../constants/action-types/google';


const initialState = Map({
  userCreationIsInProgress: false,
  codeCreationIsInProgress: false,
  verificationIsInProgress: false,
  doesEmailRegisteredInProgress: false,
  doesEmailRegistered: false,
  doesUsernameRegisteredInProgress: false,
  doesUsernameRegistered: false,
  authenticationIsInProgress: false,
  errors: Map({}),
  result: Map({}),
  data: Map({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    identity: {},
  }),
});


export default function (state = initialState, action) {
  switch (action.type) {
    // LOGIN ACTIONS
    case loginActions.LOGIN__CREATE_CODE__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('codeCreationIsInProgress', true);

    case loginActions.LOGIN__AUTH_CODE__SUBTYPES.START:
    case loginActions.LOGIN__AUTH_FACEBOOK__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('authenticationIsInProgress', true);

    case loginActions.LOGIN__CREATE_CODE__SUBTYPES.SUCCESS:
      return state
        .set('codeCreationIsInProgress', false);

    case loginActions.LOGIN__AUTH_CODE__SUBTYPES.SUCCESS:
    case loginActions.LOGIN__AUTH_FACEBOOK__SUBTYPES.SUCCESS:
      return state
        .set('authenticationIsInProgress', false)
        .set('result', Map({
          token: action.payload.token,
          ...action.payload.user,
        }));

    case loginActions.LOGIN__CREATE_CODE__SUBTYPES.FAIL:
      return state
        .set('codeCreationIsInProgress', false)
        .set('errors', Map({ ...action.errors }));

    case loginActions.LOGIN__AUTH_CODE__SUBTYPES.FAIL:
    case loginActions.LOGIN__AUTH_FACEBOOK__SUBTYPES.FAIL:
      return state
        .set('authenticationIsInProgress', false)
        .set('errors', Map({ ...action.errors }));


    // SING UP ACTIONS
    case signupActions.SIGNUP__SET_DATA:
      return state
        .set('data', Map({
          ...state.get('data').toJS(),
          ...action.payload,
        }));
    case googleActions.GOOGLE__PROFILE__SUCCESS:
    case facebookActions.FACEBOOK__PROFILE__SUCCESS:
      return state
        .set('data', Map({
          ...state.get('data').toJS(),
          ...action.payload,
        }));
    case signupActions.SIGNUP__CLEAR_DATA:
      return state
        .set('data', Map({}));

    case signupActions.SIGNUP__CREATE_USER__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('userCreationIsInProgress', true);
    case signupActions.SIGNUP__CREATE_CODE__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('codeCreationIsInProgress', true);
    case signupActions.SIGNUP__AUTH_CODE__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('verificationIsInProgress', true);
    case signupActions.SUGNUP__DOES_EMAIL_REGISTERED__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('doesEmailRegisteredInProgress', true);
    case signupActions.SUGNUP__DOES_USERNAME_REGISTERED__SUBTYPES.START:
      return state
        .set('errors', Map({}))
        .set('result', Map({}))
        .set('doesUsernameRegisteredInProgress', true);

    case signupActions.SIGNUP__CREATE_USER__SUBTYPES.SUCCESS:
      return state
        .set('userCreationIsInProgress', false)
        .set('result', Map({
          ...action.payload,
        }));
    case signupActions.SIGNUP__CREATE_CODE__SUBTYPES.SUCCESS:
      return state
        .set('codeCreationIsInProgress', false);
    case signupActions.SIGNUP__AUTH_CODE__SUBTYPES.SUCCESS:
      return state
        .set('verificationIsInProgress', false);
    case signupActions.SUGNUP__DOES_EMAIL_REGISTERED__SUBTYPES.SUCCESS:
      return state
        .set('doesEmailRegistered', action.payload)
        .set('doesEmailRegisteredInProgress', false);
    case signupActions.SUGNUP__DOES_USERNAME_REGISTERED__SUBTYPES.SUCCESS:
      return state
        .set('doesUsernameRegistered', action.payload)
        .set('doesUsernameRegisteredInProgress', false);

    case signupActions.SIGNUP__CREATE_USER__SUBTYPES.FAIL:
      return state
        .set('userCreationIsInProgress', false)
        .set('errors', Map({ ...action.errors }));
    case signupActions.SIGNUP__CREATE_CODE__SUBTYPES.FAIL:
      return state
        .set('codeCreationIsInProgress', false)
        .set('errors', Map({ ...action.errors }));
    case signupActions.SIGNUP__AUTH_CODE__SUBTYPES.FAIL:
      return state
        .set('verificationIsInProgress', false)
        .set('errors', Map({ ...action.errors }));
    case signupActions.SUGNUP__DOES_EMAIL_REGISTERED__SUBTYPES.FAIL:
      return state
        .set('errors', Map({}))
        .set('doesEmailRegisteredInProgress', false);
    case signupActions.SUGNUP__DOES_USERNAME_REGISTERED__SUBTYPES.FAIL:
      return state
        .set('errors', Map({}))
        .set('doesUsernameRegisteredInProgress', false);

    default:
      return state;
  }
}
