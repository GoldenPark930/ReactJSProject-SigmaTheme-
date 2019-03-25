import { StyleSheet } from 'react-native';

import { LIGHT_GREY } from '../../../../../constants/colors';

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 3,
  },
  listDevider: {
    flex: 1,
    height: 0.5,
    marginLeft: 60,
    marginRight: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GREY,
  },
});
