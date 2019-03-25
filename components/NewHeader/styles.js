import {
  StyleSheet,
  Platform,
} from 'react-native';
import {
  LIGHT_GREY,
  ROYAL,
  CALM,
  WHITE,
} from '../../constants/colors';

import { REGULAR } from '../../constants/fonts';

const styles = StyleSheet.create({
  headerMainContainer: {
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 64 : 56, // 86 for IPhone X
    paddingTop: Platform.OS === 'ios' ? 15 : 0, // 40 for IPhone X
    paddingHorizontal: 10,
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
    borderBottomColor: LIGHT_GREY,
    elevation: 3,
    backgroundColor: WHITE,
  },
  headerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'center',
    fontFamily: REGULAR,
    fontSize: 18,
    color: ROYAL,
  },
  leftButton: {
    width: 50,
  },
  rightButton: {
    width: 50,
  },
  rightButtonText: {
    fontSize: 15,
    fontFamily: REGULAR,
    color: CALM,
  },
});

export default styles;

