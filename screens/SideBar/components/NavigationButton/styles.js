import { StyleSheet } from 'react-native';

import { WHITE } from '../../../../constants/colors';
import { REGULAR } from '../../../../constants/fonts';

export default StyleSheet.create({
  navigationButtonContainer: {
    alignSelf: 'center',
    width: '80%',
    marginVertical: 5,
    padding: 15,
    borderRadius: 30,
    backgroundColor: WHITE,
  },
  navigationButtonText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: REGULAR,
    color: '#007ed2',
  },
});
