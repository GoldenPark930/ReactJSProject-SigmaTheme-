import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';

export const SEMI_GREY = Colors.SEMI_GREY;
export const TRANSPARENT = Colors.TRANSPARENT;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  formContainer: {
    width: '100%',
  },

  formControl: {
    width: '100%',
    marginTop: 25,
  },

  formControlUnderline: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: Colors.LIGHT_GREY,
  },

  input: {
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    color: Colors.ROYAL,
  },

  buttonContainer: {
    marginTop: 32,
  },
});
