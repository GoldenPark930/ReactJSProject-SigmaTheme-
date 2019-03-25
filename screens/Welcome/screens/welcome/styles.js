import { StyleSheet } from 'react-native';

import * as Colors from '../../../../constants/colors';
import * as Dimensions from '../../../../constants/dimensions';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  logoContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    color: Colors.ROYAL,
    textAlign: 'left',
    fontWeight: '800',
    position: 'relative',
    top: 32,
    left: 2,
  },
  image: {
    height: 204 / 412 * (Dimensions.SCREEN_WIDTH * 0.6),
    width: Dimensions.SCREEN_WIDTH * 0.6,
    margin: 0,
  },
  collectAndManageContainer: {
    flex: 2,
    textAlign: 'left',
  },
  collectAndManageText: {
    fontSize: 16,
    color: Colors.ROYAL,
  },
  facebookButtonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.ROYAL,
  },
  facebookButtonText: {
    color: Colors.WHITE,
  },
  signupButtonContainer: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  signUpButtonText: {
    fontSize: 12,
    color: Colors.ROYAL,
  },
  loginContainer: {
    paddingTop: 50,
  },
  loginText: {
    fontSize: 14,
    color: Colors.CALM,
    textAlign: 'center',
  },
});
export default styles;
