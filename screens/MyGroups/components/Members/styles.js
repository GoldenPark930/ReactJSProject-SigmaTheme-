import { StyleSheet } from 'react-native';

import { WHITE, BLACK, GREY } from '../../../../constants/colors';
import { REGULAR } from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  columnContainer: {
    paddingLeft: 12,
  },
  itemContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: WHITE,
    marginRight: 10,
  },
  item: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  additionalMemberCount: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: WHITE,
    marginRight: 10,
    borderWidth: 1,
    borderColor: BLACK,
    paddingTop: 6,
  },
  additionalMemberCountText: {
    width: 30,
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: REGULAR,
  },
  membersTitle: {
    fontSize: 10,
    fontFamily: REGULAR,
    color: GREY,
    paddingBottom: 5,
  }
});
