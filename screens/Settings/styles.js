import { StyleSheet } from 'react-native';

import * as Colors from '../../constants/colors';
import * as Dimensions from '../../constants/dimensions';

export default {
  global: StyleSheet.create({
    wrapper: {
      height: Dimensions.SCREEN_HEIGHT - 76,
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
    },
    title: {
      fontSize: 25,
      color: Colors.ROYAL,
      marginTop: 65,
      textAlign: 'center',
    },
    buttonContainer: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      borderRadius: 3,
      backgroundColor: Colors.CALM,
      marginTop: 20,
    },
    buttonText: {
      color: Colors.WHITE,
    },
    imageContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 352 / 409 * (Dimensions.SCREEN_WIDTH * 0.5),
      width: Dimensions.SCREEN_WIDTH * 0.5,
    },
    textInfo: {
      fontSize: 15,
      color: Colors.ROYAL,
      marginTop: 10,
      textAlign: 'center',
    },
  }),

  steps: StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    validatedIcon: {
      fontSize: 17,
      color: Colors.CALM,
    },
    inProgress: {
      height: 14,
      width: 14,
      borderColor: Colors.CALM,
      borderWidth: 2.5,
      borderRadius: 10,
    },
    pending: {
      height: 10,
      width: 10,
      margin: 2,
      borderColor: '#B9F4E8',
      borderWidth: 2.5,
      borderRadius: 10,
    },
    separator: {
      height: 1,
      width: 10,
      backgroundColor: Colors.LIGHT_GREY,
      margin: 5,
    },
  }),

  colors: Colors,

  common: StyleSheet.create({
    flexOne: {
      flex: 1,
    },
  }),
};
