import { StyleSheet } from 'react-native';

import { ROYAL, GREY } from 'src/constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'src/constants/dimensions';
import { REGULAR } from '../../constants/fonts';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingBottom: 7,
    paddingRight: 5,
    paddingLeft: 5,
  },
  symbol: {
    color: ROYAL,
    fontSize: 18,
    textAlign: 'right',
    alignItems: 'flex-start',
    fontFamily: REGULAR,
  },
  content: {
    color: ROYAL,
    fontSize: 10,
    alignItems: 'center',
    fontFamily: REGULAR,
  },
  decimal: {
    alignItems: 'flex-end',
    color: ROYAL,
    fontSize: 18,
    textAlign: 'left',
    fontFamily: REGULAR,
  },
  spacer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: GREY,
    marginTop: 7,
  },
});
