import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
  },

  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  tabUnderline: {
    position: 'absolute',
    width: '100%',
    height: 2.5,
    bottom: 0,
    backgroundColor: Colors.CALM,
  },
});
