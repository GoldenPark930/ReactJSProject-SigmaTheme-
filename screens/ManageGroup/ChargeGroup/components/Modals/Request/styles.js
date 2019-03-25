import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../../constants/colors';
import { SCREEN_WIDTH } from '../../../../../../constants/dimensions';


export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),

  header: StyleSheet.create({
    thumbnail: {
      position: 'absolute',
      top: (227 / 210 * (SCREEN_WIDTH * 0.25)) / 2,
      zIndex: 1,
      height: 227 / 210 * (SCREEN_WIDTH * 0.25),
      width: SCREEN_WIDTH * 0.25,
    },
  }),

  content: StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.WHITE,
      width: 280,
      alignItems: 'center',
      paddingTop: 20,
      borderRadius: 3,
    },
    buttonRequest: {
      width: 180,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.WHITE,
      borderColor: Colors.LIGHT_GREY,
      borderWidth: 1,
      borderRadius: 3,
      marginTop: 10,
      paddingLeft: 5,
    },
    thumbnail: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
    },
    textRequest: {
      color: Colors.ROYAL,
      fontWeight: 'bold',
    },
    text: {
      color: Colors.ROYAL,
      textAlign: 'center',
    },
    textBold: {
      color: Colors.ROYAL,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
    },
    textBig: {
      color: Colors.ROYAL,
      fontSize: 16,
      textAlign: 'center',
    },
    textBigBold: {
      color: Colors.ROYAL,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 5,
    },
    validateButton: {
      width: 180,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.CALM,
      borderRadius: 3,
      marginTop: 10,
      marginBottom: 20,
    },
    validateText: {
      color: Colors.WHITE,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }),
};
