import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../utils/helpers';
import { CALM, ROYAL, LIGHT_GREY, WHITE } from '../../../constants/colors';
import { CONTENT_HEIGHT } from '../../../constants/dimensions';

const TABBAR_HEIGHT = 90;

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: WHITE,
  },
  container: {
    width: '70%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: verticalScale(5),
  },
  title: {
    fontSize: scale(14),
    color: ROYAL,
  },
  description: {
    fontSize: scale(10),
    color: ROYAL,
  },
  button: {
    backgroundColor: CALM,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 240,
    borderRadius: 3,
    marginTop: 40,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
  },
  longContainer: {
    width: '90%',
    marginTop: 10,
  },
  cameraIconContainer: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
  },
  photoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
