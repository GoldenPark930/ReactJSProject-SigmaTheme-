import { StyleSheet } from 'react-native';

import { GREY, CALM } from '../../../../../constants/colors';
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
  listItemNameText: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: REGULAR,
    fontSize: 15,
    color: GREY,
  },
});
