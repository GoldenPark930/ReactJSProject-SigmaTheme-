import { StyleSheet } from 'react-native';

import { WHITE, ROYAL, CALM } from '../../../../constants/colors';
import { SEMI_BOLD, THIN } from '../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  globalWrapper: {
    flex: 1,
    backgroundColor: WHITE,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },

  imageContainer: {
    marginVertical: 22.5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  inputContainer: {
    justifyContent: 'space-between',
    width: '90%',
    height: 50,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: SEMI_BOLD,
    color: ROYAL,
  },

  defaultInputText: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.7)',
  },

  changedInputText: {
    fontSize: 18,
    color: ROYAL,
  },

  separator: {
    width: '100%',
    height: 1.5,
    backgroundColor: CALM,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 40,
    marginVertical: 25,
    borderRadius: 3,
    backgroundColor: CALM,
  },

  buttonLabel: {
    fontSize: 15,
    color: WHITE,
    fontWeight: SEMI_BOLD,
  },

  statusMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },

  statusMessageText: {
    textAlign: 'center',
    fontSize: 9,
    fontStyle: 'italic',
    fontWeight: THIN,
    color: ROYAL,
  },
});
