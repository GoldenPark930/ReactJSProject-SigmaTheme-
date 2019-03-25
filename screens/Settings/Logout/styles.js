import { StyleSheet } from 'react-native';

import * as Colors from '../../../constants/colors';
import * as Dimensions from '../../../constants/dimensions';

export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },
  }),

  content: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      paddingVertical: 100,
    },
    spinnerWrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textCalm: {
      color: Colors.CALM,
      textAlign: 'center',
      fontSize: 20,
    },
    imageContainer: {
      alignSelf: 'center',
      height: 551 / 569 * (Dimensions.SCREEN_WIDTH * 0.8),
      width: Dimensions.SCREEN_WIDTH * 0.8,
      marginVertical: 20,
    },
    textRoyal: {
      color: Colors.ROYAL,
      textAlign: 'center',
      fontSize: 20,
    },
    buttonContainer: {
      alignSelf: 'center',
      height: 45,
      width: '50%',
      borderRadius: 3,
      backgroundColor: Colors.CALM,
      marginTop: 30,
    },
    buttonText: {
      color: Colors.WHITE,
    },
  }),
};
