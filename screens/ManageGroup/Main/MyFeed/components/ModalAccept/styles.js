import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as colors from '../../../../../../constants/colors';
import { LIGHT, SEMIBOLD } from '../../../../../../constants/fonts';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.92,
    height: height * 0.8,
    borderRadius: 3,
    backgroundColor: colors.WHITE,
  },
  bankListContainer: {
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 30,
  },
  titleText: {
    paddingVertical: 32,
    fontSize: 20,
    color: colors.DARK_BLUE,
    fontFamily: LIGHT,
  },
  orText: {
    fontSize: 19,
    color: colors.LIGHT_GREY,
  },
  payButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 3,
    backgroundColor: colors.CALM,
  },
  payButtonDisabled: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 3,
    backgroundColor: colors.LIGHT_GREY,
  },
  payButtonText: {
    fontSize: 17,
    color: colors.WHITE,
    fontFamily: SEMIBOLD,
  },
  descriptionText: {
    fontSize: 13,
    color: colors.ROYAL,
    marginBottom: 10,
  },
  verifyButton: {
    paddingVertical: 10,
    borderRadius: 3,
    backgroundColor: colors.CALM,
    paddingHorizontal: 10,
  },
  addNewButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderRadius: 3,
    borderColor: colors.CALM,
  },
  addNewButtonText: {
    fontSize: 17,
    color: colors.CALM,
    fontFamily: SEMIBOLD,
  },
});

export default styles;
