import { StyleSheet } from 'react-native';

import * as Colors from '../../../constants/colors';
import * as FontWeight from '../../../constants/fonts/weight-map';

export default StyleSheet.create({
  globalWrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  scrollView: {
    marginVertical: 10,
  },

  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },

  buttonContainer: {
    width: '90%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  buttonActive: {
    borderColor: Colors.RED,
  },

  buttonDisabled: {
    borderColor: Colors.LIGHT_GREY,
  },

  buttonLabel: {
    fontWeight: FontWeight.SEMI_BOLD,
    fontSize: 12,
  },

  buttonLabelActive: {
    color: Colors.RED,
  },

  buttonLabelDisabled: {
    color: Colors.LIGHT_GREY,
  },

  buttonHint: {
    width: '60%',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 9,
    fontStyle: 'italic',
    fontWeight: FontWeight.THIN,
    color: Colors.RED,
  },

  questionText: {
    color: Colors.ROYAL,
    fontWeight: FontWeight.BOLD,
  },
});
