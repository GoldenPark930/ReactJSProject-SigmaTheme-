import { StyleSheet } from 'react-native';

import * as Colors from '../../../constants/colors';

export const CALM = Colors.CALM;
export const WHITE = Colors.WHITE;
export const LIGHT_GREY = Colors.LIGHT_GREY;

export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
    },
  }),

  header: StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.WHITE,
    },

    settingsIconWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    settingsIcon: {
      fontSize: 20,
      color: Colors.ROYAL,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lock: {
      color: Colors.ROYAL,
      backgroundColor: 'transparent',
      fontSize: 20,
      marginRight: 10,
    },
    thumbnail: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
    },
    textWrapper: {
      flexDirection: 'row',
    },
    icon: {
      flex: 1,
    },
    text: {
      flex: 1,
    },
  }),

  tabs: StyleSheet.create({
    ChartPage: {
      fontSize: 24,
    },
    GroupFeed: {
      fontSize: 24,
    },
    MyFeed: {
      fontSize: 24,
    },
  }),

  content: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },
    buttonGroupContainer: {
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 0,
      borderRadius: 0,
      height: 40,
      borderColor: Colors.WHITE,
      backgroundColor: Colors.WHITE,
    },
    footerButton: {
      color: Colors.CALM,
      fontSize: 20,
    },
    chargesLabelContainer: {
      position: 'absolute',
      left: 14,
      bottom: 14,
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 0,
      backgroundColor: Colors.RED,
    },
    chargesLabelText: {
      fontSize: 13,
      color: Colors.WHITE,
      backgroundColor: Colors.TRANSPARENT,
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

    empty: {},
  }),
};
