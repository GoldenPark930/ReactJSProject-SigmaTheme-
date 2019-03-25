import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  complete: {
    fontSize: 17,
    color: Colors.CALM,
  },

  inProgress: {
    height: 14,
    width: 14,
    borderColor: Colors.CALM,
    borderWidth: 2.5,
    borderRadius: 10,
  },

  pending: {
    height: 10,
    width: 10,
    margin: 2,
    borderColor: Colors.TRANSPARENT_CALM,
    borderWidth: 2.5,
    borderRadius: 10,
  },

  separator: {
    height: 1,
    width: 10,
    backgroundColor: Colors.LIGHT_GREY,
    margin: 5,
  },
});
