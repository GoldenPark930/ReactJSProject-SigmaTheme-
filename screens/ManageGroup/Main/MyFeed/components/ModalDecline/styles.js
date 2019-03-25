import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../../constants/colors';

export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),

  content: StyleSheet.create({
    wrapper: {
      justifyContent: 'space-between',
      backgroundColor: Colors.WHITE,
      width: '90%',
      height: 170,
      borderRadius: 3,
    },
    header: {
      height: 50,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      marginHorizontal: 20,
    },
    footer: {
      height: 50,
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    redText: {
      color: Colors.RED,
      fontSize: 16,
    },
    button: {
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),

  colors: Colors,
};
