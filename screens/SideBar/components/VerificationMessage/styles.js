import { StyleSheet } from 'react-native';

import {
  WHITE,
  RED,
} from '../../../../constants/colors';
import { SEMI_BOLD } from '../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  verificationMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    padding: 10,
    backgroundColor: RED,
    borderRadius: 4,
    marginBottom: 5,
  },
  notificationText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: SEMI_BOLD,
    color: WHITE,
  },
  resendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 25,
    marginTop: 7.5,
    borderRadius: 12.5,
    backgroundColor: WHITE,
    paddingLeft: 10,
    paddingRight: 10,
  },
  resendButtonLabel: {
    fontSize: 10,
    fontWeight: SEMI_BOLD,
    color: RED,
  },
});
