import { Alert } from 'react-native';

import NavigatorService from './navigation-service';
import ReduxService from './redux-service';

import { clearStorage } from '../../common/localStorage';
import LogoutTypes from '../../store/constants/action-types/logout';
import { resetDataLoadingInterval } from '../../store/actions/interval';
import ToastHelper from '../helpers/toast-helper';

const NO_SERVER_CONNECTION = 503;
const INVALID_TOKEN = 401;

function handleTokenInvalidation() {
  clearStorage();
  ReduxService.dispatchAction({ type: LogoutTypes.LOGOUT__LOGOUT__SUBTYPES.START });
  ReduxService.dispatchAction(resetDataLoadingInterval);

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
}

export default function handleHttpError(status) {
  switch (status) {
    case NO_SERVER_CONNECTION:
      setTimeout(() => {
        ToastHelper.showErrorMessage('Can\'t connect to the Payclub server');
      }, 0);
      break;
    case INVALID_TOKEN:
      handleTokenInvalidation();
      break;
    default:
      setTimeout(() => {
        ToastHelper.showErrorMessage('Something went wrong');
      }, 0);
  }
}

