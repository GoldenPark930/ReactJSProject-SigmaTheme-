import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../../constants/dimensions';
import { ROYAL, LIGHT_GREY, GREY } from '../../../../../constants/colors';
import { LIGHT } from '../../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 10,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
  chipsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 8,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chipWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    height: 26,
    borderRadius: 13,
    backgroundColor: LIGHT_GREY,
  },
  chipAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  chipLabel: {
    marginLeft: 7,
    marginRight: 3,
    fontSize: 8,
    color: ROYAL,
  },
  emptyListPlaceholder: {
    fontSize: 13,
    fontWeight: LIGHT,
    color: GREY,
  },
  removeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    marginRight: 3,
    borderRadius: 18,
    backgroundColor: GREY,
  },
  search: {
    flex: 1,
    height: 26,
    minWidth: 115,
    marginBottom: 5,
    padding: 0,
    fontSize: 14,
  },
});
