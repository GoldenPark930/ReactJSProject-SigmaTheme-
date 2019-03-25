import {
  StyleSheet,
} from 'react-native';
import {
  CALM,
  ROYAL,
  LIGHT_GREY,
  GREY,
} from '../../../constants/colors';

import { REGULAR } from '../../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: REGULAR,
    fontSize: 14,
    color: ROYAL,
  },
  lock: {
    paddingRight: 5,
  },
  friendsText: {
    fontFamily: REGULAR,
    fontSize: 14,
    color: GREY,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: CALM,
  },
  star: {
    backgroundColor: 'transparent',
  },
});

export default styles;

