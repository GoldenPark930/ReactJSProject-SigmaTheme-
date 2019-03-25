import { StyleSheet } from 'react-native';

import { scale } from '../../../../../../../../utils/helpers';
import * as Colors from '../../../../../../../../constants/colors';
import { REGULAR } from '../../../../../../../../constants/fonts';

export default {
  default: StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(92.5),
      marginTop: scale(10),
      marginRight: scale(10),
    },
  }),

  pending: StyleSheet.create({
    globalWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    acceptWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(105),
      height: scale(32),
      marginTop: scale(16),
      marginRight: scale(5),
      backgroundColor: Colors.CALM,
      borderRadius: 15,
    },
    declineWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(105),
      height: scale(32),
      marginTop: scale(16),
      marginRight: scale(10),
      backgroundColor: Colors.RED,
      borderRadius: 15,
      fontFamily: REGULAR,
    },
    text: {
      fontSize: 13,
      fontWeight: '700',
      color: Colors.WHITE,
      fontFamily: REGULAR,
    },
  }),

  accepted: StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(92.5),
      height: scale(30),
      marginVertical: scale(10),
      marginRight: scale(10),
      backgroundColor: Colors.WHITE,
      borderColor: Colors.CALM,
      borderRadius: 5,
      borderWidth: 1,
    },
    text: {
      fontSize: 13,
      color: Colors.CALM,
    },
  }),

  declined: StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(92.5),
      height: scale(30),
      marginVertical: scale(10),
      marginRight: scale(10),
      backgroundColor: Colors.WHITE,
      borderColor: Colors.RED,
      borderRadius: 5,
      borderWidth: 1,
    },
    text: {
      fontSize: 13,
      color: Colors.RED,
    },
  }),
};
