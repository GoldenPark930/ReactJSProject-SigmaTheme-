import { StyleSheet } from 'react-native';

import { WHITE, BLACK, GREY, RED } from '../../../../constants/colors';
import { SEMIBOLD } from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 11,
    right: 11,
  },
  columnContainer: {
    paddingLeft: 12,
  },
  itemContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: WHITE,
    marginRight: 10,
  },
  item: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'right',
  },
  pendingCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: RED,
    paddingTop: 3,
    alignSelf: 'flex-end',
    fontFamily: SEMIBOLD,
  },
  pendingCountText: {
    width: 24,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: WHITE,
    fontFamily: SEMIBOLD,
  },
  myPendingTitle: {
    fontSize: 10,
    fontFamily: SEMIBOLD,
    color: GREY,
    paddingBottom: 5,
    textAlign: 'right',
  }
});
