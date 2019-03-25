import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';
import { SEMI_BOLD } from 'src/constants/fonts/weight-map';

export default StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pickerSelectedValue: {
    paddingLeft: 10,
    fontSize: 15,
    color: Colors.ROYAL,
  },

  pickerArrow: {
    position: 'absolute',
    fontSize: 20,
    right: 10,
    color: Colors.ROYAL,
  },

  modalContainer: {
    width: '85%',
    height: '70%',
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
  },

  scrollViewContainer: {
    flex: 1,
    marginVertical: 9,
    paddingHorizontal: 9,
  },

  scrollViewItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 30,
    paddingHorizontal: 10,
  },

  borderedContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GREY,
  },

  scrollViewItemLabel: {
    maxWidth: '86%',
    fontSize: 12,
    fontWeight: SEMI_BOLD,
    color: Colors.ROYAL,
  },

  scrollViewItemIcon: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.ROYAL,
  },

  empty: {},
});
