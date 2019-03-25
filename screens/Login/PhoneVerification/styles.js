import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as Colors from '../../../constants/colors';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;

export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.DARK_GREY,
    },
  }),

  header: StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.WHITE,
      borderBottomColor: Colors.LIGHT_GREY,
      borderBottomWidth: 2,
    },
    content: {
      flex: 4,
      alignItems: 'center',
    },
    text: {
      color: Colors.ROYAL,
      fontSize: 16,
    },
    iconColor: {
      color: Colors.ROYAL,
    },
  }),

  content: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 20,
      color: Colors.ROYAL,
      marginTop: 20,
    },
    number: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.CALM,
      marginTop: 15,
    },
    info: {
      fontSize: 14,
      color: Colors.ROYAL,
      marginTop: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      marginTop: 25,
    },
    inputCodeText: {
      width: 60,
      fontSize: 16,
      textAlign: 'center',
    },
    buttonContainer: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      borderRadius: 10,
      backgroundColor: Colors.CALM,
      marginTop: isSmall ? 58 : 78,
      marginLeft: 30,
      marginRight: 30,
      // TODO: use elevation only on android
      elevation: 1,
    },
    buttonText: {
      color: Colors.WHITE,
    },

    resendButtonWrapper: {
      flexDirection: 'row',
      marginTop: 10,
    },

    resendLabel: {
      fontSize: 15,
      color: Colors.ROYAL,
      marginTop: 10,
    },
    resendText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.CALM,
      marginTop: 10,
    },
  }),

  colors: Colors,

  common: StyleSheet.create({
    flexOne: {
      flex: 1,
    },
  }),
};
