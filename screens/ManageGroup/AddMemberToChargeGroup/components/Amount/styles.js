import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../constants/colors';
import { BOLD } from '../../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  textDollar: {
    color: Colors.GREY,
    fontSize: 40,
    textAlign: 'right',
    marginLeft: 50,
  },

  input: {
    color: Colors.GREY,
    width: 100,
    fontSize: 40,
    fontStyle: 'italic',
    padding: 0,
  },

  textEach: {
    color: Colors.ROYAL,
    flex: 1,
    fontSize: 13,
    textAlign: 'left',
    alignSelf: 'flex-end',
  },

  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },

  modeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 30,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.CALM,
  },

  activeButton: {
    backgroundColor: Colors.CALM,
  },

  activeButtonLabel: {
    color: Colors.WHITE,
  },

  modeButtonLabel: {
    color: Colors.CALM,
    fontWeight: BOLD,
  },
});
