import { StyleSheet } from 'react-native';

import { WHITE, LIGHT_GREY, ROYAL } from 'src/constants/colors';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: WHITE,
    borderBottomColor: LIGHT_GREY,
    borderBottomWidth: 2,
  },

  title: {
    color: ROYAL,
    fontSize: 16,
  },

  menuButtonIcon: {
    color: ROYAL,
  },
});
