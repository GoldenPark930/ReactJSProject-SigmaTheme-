import { call, takeEvery, put } from 'redux-saga/effects';
import { GoogleSignin } from 'react-native-google-signin';
import GoogleActions from '../constants/action-types/google';

const googleAuth = {
  scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
  webClientId: '867036754897-kccitq3bib8q704c438ejt8udn0s83ss.apps.googleusercontent.com',
  offlineAccess: false,
};

/*
|-------------------------------------------------------------------------------
| Get Google profile
|-------------------------------------------------------------------------------
*/

function* getGoogleProfile(action) {
  const { onCallback } = action;
  yield put({
    type: GoogleActions.GOOGLE__PROFILE__START,
  });

  try {
    // initialize google service
    yield call([GoogleSignin, GoogleSignin.hasPlayServices], { autoResolve: true });
    yield call([GoogleSignin, GoogleSignin.configure], googleAuth);

    // Signin process
    yield call([GoogleSignin, GoogleSignin.signIn]);

    // get profile
    const profile = yield call([GoogleSignin, GoogleSignin.currentUserAsync]);

    const payload = {
      firstName: profile.givenName,
      lastName: profile.familyName,
      email: profile.email,
      identity: {
        type: 'google',
        providerId: profile.id,
        data: {
          accessToken: profile.accessToken,
          profilePicture: profile.photo,
        },
      },
    };

    // SignOut
    yield call([GoogleSignin, GoogleSignin.signOut]);

    // Dispatch profile success
    yield put({
      type: GoogleActions.GOOGLE__PROFILE__SUCCESS,
      payload,
    });

    onCallback(null, payload);
  } catch (errors) {
    // Dispatch profile error
    yield put({
      type: GoogleActions.GOOGLE__PROFILE__FAIL,
      errors,
    });

    onCallback(errors, null);
  }
}

/*
|-------------------------------------------------------------------------------
| Export sagas
|-------------------------------------------------------------------------------
*/

export default function* () {
  yield takeEvery(
    GoogleActions.GOOGLE__LOGIN,
    getGoogleProfile,
  );
}
