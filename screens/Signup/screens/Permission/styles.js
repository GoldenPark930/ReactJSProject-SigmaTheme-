import { StyleSheet } from 'react-native';

import { SEMI_BOLD } from 'src/constants/fonts/weight-map';
import * as Colors from 'src/constants/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },

  noteContainer: {
    width: '100%',
    marginTop: 9,
    marginBottom: 15,
  },

  noteText: {
    fontSize: 12,
    color: Colors.ROYAL,
    marginLeft: 10,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '76%',
    height: 50,
    marginTop: 20,
    borderRadius: 5,
  },

  buttonEnabled: {
    backgroundColor: Colors.CALM,
  },

  buttonDisabled: {
    backgroundColor: Colors.LIGHT_GREY,
  },

  buttonLabel: {
    fontSize: 15,
    fontWeight: SEMI_BOLD,
    color: Colors.WHITE,
  },
});
