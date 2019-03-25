import { StyleSheet } from 'react-native';

import * as Colors from '../../../constants/colors';

export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },
  }),

  tabs: StyleSheet.create({
    'md-pie': {
      fontSize: 20,
    },
    'ios-people': {
      fontSize: 25,
    },
    'logo-usd': {
      fontSize: 20,
    },
  }),

  content: StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    buttonGroupContainer: {
      backgroundColor: Colors.WHITE,
      borderColor: Colors.CALM,
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      height: 35,
    },
    footerButton: {
      color: Colors.CALM,
      fontSize: 20,
    },
  }),

  color: StyleSheet.create({
    royal: {
      color: Colors.ROYAL,
    },
    white: {
      color: Colors.WHITE,
    },
    calm: {
      color: Colors.CALM,
    },
  }),

  common: StyleSheet.create({
    flexOne: {
      flex: 1,
    },
  }),
};
