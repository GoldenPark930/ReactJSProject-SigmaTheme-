import { StyleSheet } from 'react-native';

import { CALM } from 'src/constants/colors';

export default StyleSheet.create({
  backButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },

  backButtonLabel: {
    fontSize: 12,
    color: CALM,
  },

  monsterIcon: {
    width: 24,
    height: 25,
  },
});
