import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';

export default StyleSheet.create({
  wrapper: {
    width: '85%',
    height: 175,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },

  questionContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },

  controlsButton: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },

  controlsNoButton: {
    backgroundColor: Colors.CALM,
  },

  controlsNoLabel: {
    color: Colors.WHITE,
  },

  controlsYesButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.CALM,
  },

  controlsYesLabel: {
    color: Colors.CALM,
  },
});
