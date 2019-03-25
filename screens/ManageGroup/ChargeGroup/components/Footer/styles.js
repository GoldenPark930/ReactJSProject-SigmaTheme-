import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.CALM,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 35,
    width: 140,
    borderRadius: 3,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
  },
  textTotal: {
    color: Colors.ROYAL,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    marginLeft: 25,
  },
});
