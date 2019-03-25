import { Platform } from 'react-native';
import Toast from 'react-native-toast-native';

import { RED, WHITE } from '../../constants/colors';

const styles = {
  error: {
    height: Platform.OS === ('ios') ? 40 : 110,
    yOffset: 40,
    borderRadius: Platform.OS === 'ios' ? 5 : 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: WHITE,
    backgroundColor: RED,
  },
};

function showErrorMessage(message) {
  const width = Platform.OS === 'ios' ? message.length * 9.5 : message.length * 25;
  const style = Object.assign({}, styles.error, { width });
  Toast.show(message, Toast.LONG, Toast.BOTTOM, style);
}

export default {
  showErrorMessage,
};
