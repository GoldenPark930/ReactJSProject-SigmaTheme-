import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';
import * as Dimensions from 'src/constants/dimensions';

export default {
  global: StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },
    
  }),

  header: StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.WHITE,
      borderBottomWidth: 0,
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
      paddingHorizontal: 40,
    },
    title: {
      fontSize: 18,
      color: Colors.ROYAL,
      textAlign: 'left',
      fontWeight: '800',
      position: 'relative',
      top: 23 + Dimensions.SCREEN_WIDTH * 0.4,
      left: 44,
    },
    imageContainer: {
      height: 204 / 412 * (Dimensions.SCREEN_WIDTH * 0.6),
      width: Dimensions.SCREEN_WIDTH * 0.6,
      margin: 0,
      marginLeft: 40,
      marginTop: Dimensions.SCREEN_WIDTH * 0.4
    },
    buttonContainer: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      borderRadius: 10,
      backgroundColor: Colors.ROYAL,
      marginTop: 20,
    },
    buttonText: {
      color: Colors.WHITE,
    },
    imageHeaderContainer: {
      height: 724 / 750 * (Dimensions.SCREEN_WIDTH),
      width: Dimensions.SCREEN_WIDTH,
    },
    imageFooterContainer: {
      position: 'absolute',
      bottom: 0,
      height: 147 / 750 * (Dimensions.SCREEN_WIDTH),
      width: Dimensions.SCREEN_WIDTH,
    },
    timeToCollect: {
      textAlign: 'left',
      paddingTop: (Dimensions.SCREEN_WIDTH * 0.2),
      paddingBottom: (Dimensions.SCREEN_WIDTH * 0.2),
    }
  }),

  colors: Colors,

  common: StyleSheet.create({
    flexOne: {
      flex: 1,
    },
  }),
};
