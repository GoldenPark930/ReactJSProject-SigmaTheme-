import { call, takeEvery, put } from 'redux-saga/effects';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { facebookProfile } from './../../utils/ajax/api/facebook';
import FacebookActions from '../constants/action-types/facebook';


/*
|-------------------------------------------------------------------------------
| Get Facebook profile
|-------------------------------------------------------------------------------
*/

function* getFacebookProfile(action) {
  const { onCallback } = action;
  yield put({
    type: FacebookActions.FACEBOOK__PROFILE__START,
  });

  try {
    // Check permission
    const permissions = ['public_profile', 'email', 'user_friends'];
    const permissionResult = yield call(LoginManager.logInWithReadPermissions, permissions);

    if (permissionResult.isCancelled) {
      return onCallback(null, null);
    }

    // Get accessToken
    const tokenResult = yield call(AccessToken.getCurrentAccessToken);
    const { accessToken } = tokenResult;

    const profileResult = yield call(facebookProfile, accessToken);

    // Parse server response data
    const parsedResult = yield profileResult.data;

    const payload = {
      firstName: parsedResult.first_name,
      lastName: parsedResult.last_name,
      email: parsedResult.email,
      identity: {
        type: 'facebook',
        providerId: parsedResult.id,
        data: {
          accessToken,
          profilePicture: `https://graph.facebook.com/${parsedResult.id}/picture?height=500&width=500`,
          coverPicture: parsedResult.cover && parsedResult.cover.source
            ? parsedResult.cover.source : null,
        },
      },
    };

    // Logout
    yield call(LoginManager.logOut);

    // Dispatch profile success
    yield put({
      type: FacebookActions.FACEBOOK__PROFILE__SUCCESS,
      payload,
    });

    return onCallback(null, accessToken);
  } catch (errors) {
    // Dispatch profile error
    yield put({
      type: FacebookActions.FACEBOOK__PROFILE__FAIL,
      errors,
    });
    return onCallback(errors, null);
  }
}

/*
|-------------------------------------------------------------------------------
| Export sagas
|-------------------------------------------------------------------------------
*/

export default function* () {
  yield takeEvery(
    FacebookActions.FACEBOOK__LOGIN,
    getFacebookProfile,
  );
}
