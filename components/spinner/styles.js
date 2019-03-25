import { StyleSheet } from 'react-native';

import { WHITE } from 'src/constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
  },

  spinner: {
    flex: 1,
  },
});
