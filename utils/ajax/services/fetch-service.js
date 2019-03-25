import { NetInfo } from 'react-native';

import handleHttpError from '../../helpers/fetch-http-request-error-handler';
import ToastHelper from '../../helpers/toast-helper';

async function customFetch(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      handleHttpError(response.status);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (e) {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none') {
        setTimeout(() => {
          ToastHelper.showErrorMessage('You are not connected to the internet');
        }, 0);
      }
    });
  }
}

export default { customFetch };
