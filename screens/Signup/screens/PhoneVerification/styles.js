import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';
import { SEMI_BOLD, BOLD } from 'src/constants/fonts/weight-map';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 24,
  },

  internationalFormatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },

  internationalFormat: {
    fontSize: 18,
    fontWeight: SEMI_BOLD,
    color: Colors.CALM,
  },

  input: {
    position: 'absolute',
    top: 0,
    left: -100,
  },

  verificationCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 35,
    backgroundColor: Colors.WHITE,
  },

  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 42.5,
    marginHorizontal: 4,
  },

  placeholderDigit: {
    fontSize: 15,
    color: '#BDBDBD',
  },

  digit: {
    fontSize: 18,
    fontWeight: SEMI_BOLD,
    color: Colors.ROYAL,
  },

  underline: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.CALM,
  },

  digitUnderline: {
    marginTop: 11,
  },

  placeholderUnderline: {
    marginTop: 15,
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },

  resendQuestion: {
    fontSize: 12,
    color: Colors.ROYAL,
  },

  resendLink: {
    fontSize: 12,
    fontWeight: BOLD,
    color: Colors.CALM,
  },

  buttonContainer: {
    marginTop: 16,
  },
});
