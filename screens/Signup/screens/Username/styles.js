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

  noteContainer: {
    width: '100%',
    marginTop: 32,
  },

  noteText: {
    fontSize: 12,
    color: Colors.ROYAL,
    marginLeft: 10,
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
