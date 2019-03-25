import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../../../../constants/colors';
import {
  REGULAR,
  SEMIBOLD,
} from '../../../../../../../../constants/fonts';


export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  pieContainer: {
    height: 150,
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  title: {
    alignSelf: 'stretch',
    paddingBottom: 3,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: REGULAR,
    color: Colors.BLACK,
  },
  text: {
    color: Colors.BLACK,
    fontSize: 15,
    fontFamily: REGULAR,
    textAlign: 'center',
  },
  date: {
    color: Colors.BLACK,
    fontSize: 12,
    fontFamily: REGULAR,
    textAlign: 'center',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  icon: {
    color: Colors.ROYAL,
    fontSize: 22,
  },
  statsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  stats: {
    color: Colors.CALM,
    fontSize: 36,
    fontFamily: REGULAR,
    fontWeight: '700',
    left: 2,
  },
  percentSymbol: {
    color: Colors.CALM,
    fontSize: 22,
    fontFamily: REGULAR,
    fontWeight: '700',
    position: 'relative',
    top: -9,
    left: 2,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: Colors.WHITE,
  },
  detailsSideColumnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsMiddleColumnContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: Colors.LIGHT_GREY,
    borderRightColor: Colors.LIGHT_GREY,
  },
  detailsTitleText: {
    fontSize: 10,
    fontFamily: SEMIBOLD,
  },
  detailsNumbersText: {
    fontSize: 22,
    fontFamily: SEMIBOLD,
  },
});
