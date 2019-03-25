import {
  getAll,
  checkPermission,
  requestPermission,
} from 'react-native-contacts';
import { takeEvery, put } from 'redux-saga/effects';
import ContactsListActions from '../constants/action-types/contacts-list';

/*
|-------------------------------------------------------------------------------
| Check permission
|-------------------------------------------------------------------------------
*/

const AUTHORIZED = 'authorized';
const DENIED = 'denied';
const UNDEFINED = 'undefined';

// Promise wrapper for `ContactsList.checkPermission`
function checkPermissionPromise() {
  return new Promise((resolve, reject) => {
    checkPermission((error, permission) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(permission);
    });
  });
}

function* checkPermissionForRetrievingContactsList(args) {
  const { askForPermission = true } = args;

  // Start the process
  yield put({
    type: ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__START,
  });

  try {
    // Check permission for retrieving contacts list
    const permission = yield checkPermissionPromise();

    switch (permission) {
      case UNDEFINED:
        // Ask for permission or stop the process
        yield put({
          type: askForPermission
            ? ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__START
            : ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__UNDEFINED,
        });
        break;

      case AUTHORIZED:
        // Get contacts list
        yield put({
          type: ContactsListActions.CONTACTS_LIST__GET_ALL__START,
        });
        break;

      case DENIED:
        // Stop the process
        yield put({
          type: ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__DENIED,
        });
        break;

      default:
        // Store unexpected permission type as an error to Redux
        yield put({
          type: ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__FAIL,
          errors: {
            file: 'sagas/contacts-list.js',
            saga: 'checkPermissionForRetrievingContactsList',
            message: `unexpected permission type: "${permission}"`,
          },
        });
    }
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__FAIL,
      errors,
    });
  }
}

/*
|-------------------------------------------------------------------------------
| Request permission
|-------------------------------------------------------------------------------
*/

// Promise wrapper for `ContactsList.requestPermission`
function requestPermissionPromise() {
  return new Promise((resolve, reject) => {
    requestPermission((error, permission) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(permission);
    });
  });
}

function* requestPermissionForRetrievingContactsList() {
  try {
    // Request permission
    const permission = yield requestPermissionPromise();

    switch (permission) {
      case DENIED:
        // Stop the process
        yield put({
          type: ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__DENIED,
        });
        break;

      case AUTHORIZED:
        // Get contacts list
        yield put({
          type: ContactsListActions.CONTACTS_LIST__GET_ALL__START,
        });
        break;

      default:
        // Store unexpected permission type as an error to Redux
        yield put({
          type: ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__FAIL,
          errors: {
            file: 'sagas/contacts-list.js',
            saga: 'requestPermissionForRetrievingContactsList',
            message: `unexpected permission type: "${permission}"`,
          },
        });
    }
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__FAIL,
      errors,
    });
  }
}

/*
|-------------------------------------------------------------------------------
| Get all contacts list data
|-------------------------------------------------------------------------------
*/

// Promise wrapper for `ContactsList.getAll`
function getAllPromise() {
  return new Promise((resolve, reject) => {
    getAll((error, payload) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(payload);
    });
  });
}

function* getAllContactsListData() {
  try {
    // Get all contacts
    const payload = yield getAllPromise();

    // Store contacts list to the Redux
    yield put({
      type: ContactsListActions.CONTACTS_LIST__GET_ALL__SUCCESS,
      payload,
    });
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: ContactsListActions.CONTACTS_LIST__GET_ALL__FAIL,
      errors,
    });
  }
}

/*
|-------------------------------------------------------------------------------
| Export sagas
|-------------------------------------------------------------------------------
*/

export default function* () {
  yield takeEvery(
    ContactsListActions.CONTACTS_LIST__FETCH_ALL_CONTACTS,
    checkPermissionForRetrievingContactsList,
  );

  yield takeEvery(
    ContactsListActions.CONTACTS_LIST__TRY_TO_FETCH_ALL_CONTACTS,
    checkPermissionForRetrievingContactsList,
    { askForPermission: false },
  );

  yield takeEvery(
    ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__START,
    requestPermissionForRetrievingContactsList,
  );

  yield takeEvery(
    ContactsListActions.CONTACTS_LIST__GET_ALL__START,
    getAllContactsListData,
  );
}

// TODO {Maksym}: refactor and use new approach from `./permission.js`
