import { StyleSheet } from 'react-native';

import * as Colors from '../../../constants/colors';

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
      flex: 1,
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
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 20,
      color: Colors.ROYAL,
      textAlign: 'center',
      marginTop: 20,
    },
    imageContainer: {
      alignSelf: 'center',
      height: 80,
      width: '35%',
      marginTop: 20,
    },
    pikerContainer: {
      width: '100%',
      borderBottomColor: Colors.CALM,
      borderBottomWidth: 1,
      marginHorizontal: 5,
      marginTop: 20,
    },
    inputContainer: {
      paddingLeft: 10,
      flexDirection: 'row',
      marginTop: 20,
    },
    inputCodeText: {
      width: 60,
      fontSize: 16,
    },
    inputNumberText: {
      flex: 1,
      fontSize: 16,
    },
    buttonContainer: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      borderRadius: 10,
      backgroundColor: Colors.CALM,
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
      // TODO: use elevation only on android
      elevation: 1,
    },
    buttonText: {
      color: Colors.WHITE,
    },

    formControl: {
      marginTop: 25,
    },

    formControlUnderline: {
      height: 2,
      marginTop: 15,
      marginLeft: 10,
      backgroundColor: Colors.CALM,
      opacity: 0.2,
    },

    selectedValueStyles: {
      fontSize: 18,
    },
  }),

  colors: Colors,

  common: StyleSheet.create({
    flexOne: {
      flex: 1,
    },
  }),
};
