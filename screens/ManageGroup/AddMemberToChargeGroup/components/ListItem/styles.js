import { StyleSheet } from 'react-native';

import { GREY, CALM, WHITE, RED } from '../../../../../constants/colors';
import { REGULAR } from '../../../../../constants/fonts';

export default StyleSheet.create({
  listContainer: {
    paddingVertical: 15,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  listItemImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  listItemCheckContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 52,
    top: 6,
    zIndex: 1,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: CALM,
  },
  listItemPaidContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 6,
    zIndex: 1,
    width: 45,
    height: 15,
    borderRadius: 6,
    backgroundColor: CALM,
    borderColor: WHITE,
    borderWidth: 1,
  },
  listItemDeniedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 6,
    zIndex: 1,
    width: 45,
    height: 15,
    borderRadius: 6,
    borderColor: WHITE,
    borderWidth: 1,
    backgroundColor: RED,
  },
  listItemText: {
    color: WHITE,
    fontSize: 10,
  },
  listItemNameText: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: REGULAR,
    fontSize: 15,
    color: GREY,
  },
});
