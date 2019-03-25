import { StyleSheet } from 'react-native';

import { ROYAL } from 'src/constants/colors';
import { BOLD } from 'src/constants/fonts/weight-map';

export default StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    marginLeft: 10,
  },

  line: {
    fontSize: 18,
    fontWeight: '400',
    color: ROYAL,
  },
});
