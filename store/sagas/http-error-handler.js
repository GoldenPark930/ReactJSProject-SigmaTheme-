import { put } from 'redux-saga/effects';
import { NetInfo } from 'react-native';

import { clearStorage } from '../../common/localStorage';
import LogoutTypes from '../constants/action-types/logout';
import { resetDataLoadingInterval } from '../../store/actions/interval';
import NavigatorService from '../../utils/helpers/navigation-service';
import ToastHelper from '../../utils/helpers/toast-helper';

/*
|-------------------------------------------------------------------------------
| Handle http requests errors 
|-------------------------------------------------------------------------------
*/

const NO_SERVER_CONNECTION = 503;
const INVALID_TOKEN = 401;

// Add the setTimeout because of conflicts 
// with Spinner from 'react-native-loading-spinner-overlay'
export default function* handleHttpErrors(error) {
  console.log('CommonSaga:handleHttpErrors: ', error, '\n', error.response);
  const { response } = error;
  if (response !== undefined) {
    switch (response.status) {
      case INVALID_TOKEN:
        clearStorage();
        yield put({ type: LogoutTypes.LOGOUT__LOGOUT__SUBTYPES.START });
        yield put(resetDataLoadingInterval());

        // setTimeout(() => {
        //   Alert.alert(
        //     'Session expired',
        //     'This session has been already expired, please login again',
        //     [
        //       { text: 'Navigate to Login', onPress: () => NavigatorService.reset('Auth') },
        //     ],
        //     { cancelable: false },
        //   );
        // }, 0);
        break;
      case NO_SERVER_CONNECTION:
        setTimeout(() => {
          ToastHelper.showErrorMessage('Can\'t connect to the Payclub server');
        }, 0);
        break;
      default:
        setTimeout(() => {
          ToastHelper.showErrorMessage('Something went wrong');
        }, 0);
    }
  } else {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none') {
        setTimeout(() => {
          ToastHelper.showErrorMessage('You are not connected to the internet');
        }, 0);
      }
    });
  }
}
