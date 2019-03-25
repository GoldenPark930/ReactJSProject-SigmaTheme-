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
    innerWrapper: {
      alignItems: 'center',
    },
    thumbnail: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 0,
      marginTop: 20,
    },
    name: {
      color: Colors.ROYAL,
      fontSize: 20,
      marginTop: 15,
      textAlign: 'center',
    },

    amountContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 15,
    },
    textDollar: {
      color: Colors.GREY,
      fontSize: 35,
      textAlign: 'left',
      marginLeft: 0,
    },

    input: {
      alignSelf: 'center',
    },
    cancelButton: {
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.WHITE,
      borderColor: Colors.CALM,
      borderWidth: 1,
      borderRadius: 3,
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 5,
    },
    updateButton: {
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.CALM,
      borderRadius: 3,
      marginTop: 10,
      marginBottom: 20,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: 15,
      marginBottom: 30,
      width: 200,
      height: 40,
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
    updateText: {
      color: Colors.WHITE,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelText: {
      color: Colors.CALM,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }),
};
