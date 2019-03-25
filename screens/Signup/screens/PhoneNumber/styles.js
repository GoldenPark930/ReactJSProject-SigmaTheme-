import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';
import { REGULAR } from '../../../../constants/fonts';

export const SEMI_GREY = Colors.SEMI_GREY;
export const TRANSPARENT = Colors.TRANSPARENT;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  formControl: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 25,
  },

  optionText: {
    fontFamily: REGULAR,
    color: Colors.ROYAL,
  },

  checkboxContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
  },

  formControlUnderline: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: Colors.LIGHT_GREY,
  },

  input: {
    width: '100%',
    color: Colors.ROYAL,
    paddingLeft: 10,
  },

  buttonContainer: {
    marginTop: 24,
  },
});
