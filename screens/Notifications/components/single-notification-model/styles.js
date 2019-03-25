import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../utils/helpers';
import * as Colors from '../../../../constants/colors';
import * as FontWeight from '../../../../constants/fonts/weight-map';

const minContainerHeight = 55;
const imageSize = scale(37.5);

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(minContainerHeight),
  },

  image: {
    marginLeft: scale(15),
    marginRight: scale(7.5),
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },

  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: scale(222.5),
    height: '100%',
  },

  workAround: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: 26.5, // two lines
    marginVertical: verticalScale(2),
    overflow: 'hidden',
  },

  descriptionNormal: {
    fontSize: scale(11),
    color: Colors.ROYAL,
    fontWeight: FontWeight.NORMAL,
  },

  descriptionBold: {
    fontSize: scale(11),
    color: Colors.ROYAL,
    fontWeight: FontWeight.BOLD,
  },

  newDescription: {
    maxHeight: 26.5, // two lines
    marginVertical: verticalScale(2),
    overflow: 'hidden',
    fontSize: scale(11),
    color: Colors.ROYAL,
  },

  time: {
    marginVertical: verticalScale(2),
    fontSize: scale(9),
    color: Colors.BLACK,
    opacity: 0.5,
  },

  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: scale(92.5),
    height: '100%',
    paddingHorizontal: scale(15),
  },

  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: scale(62.5),
    height: verticalScale(20),
    backgroundColor: Colors.CALM_V2,
    borderRadius: scale(1.5),
  },

  buttonLabel: {
    marginLeft: scale(10),
    marginRight: scale(5),
    lineHeight: scale(9),
    fontWeight: FontWeight.SEMI_BOLD,
    fontSize: scale(9),
    color: Colors.WHITE,
  },

  chevronRight: {
    marginRight: scale(10),
    fontSize: scale(7.5),
    color: Colors.WHITE,
  },

  arrowButton: {
    fontWeight: FontWeight.EXTRA_LIGHT,
    fontSize: scale(15),
    color: Colors.CALM_V2,
  },
});
