import { StyleSheet } from 'react-native';

import { ROYAL, GREY } from 'src/constants/colors';
import { REGULAR } from '../../constants/fonts';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  input: {
    color: GREY,
    width: 150,
    fontSize: 40,
    fontStyle: 'italic',
    fontFamily: REGULAR,
    padding: 0,
    display: 'none',
  },
});
