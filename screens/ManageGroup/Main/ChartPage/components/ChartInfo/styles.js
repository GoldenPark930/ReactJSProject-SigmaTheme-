import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../../constants/colors';
import { REGULAR } from '../../../../../../constants/fonts';
import { LIGHT_GREY } from '../../../styles';


export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 15,
    marginTop: 15,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  pieContainer: {
    height: 80,
    width: 80,
    marginLeft: 0,
  },
  infoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginLeft: 0,
  },
  title: {
    color: Colors.ROYAL,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: REGULAR,
    textAlign: 'center',
  },
  chartItem: {
    width: '33%',
    alignItems: 'center',
    borderColor: LIGHT_GREY,
    borderRightWidth: 2,
  },
  text: {
    color: Colors.ROYAL,
    fontSize: 13,
    fontFamily: REGULAR,
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
    fontSize: 18,
    fontFamily: REGULAR,
    fontWeight: '700',
    left: 2,
  },
  percentSymbol: {
    color: Colors.CALM,
    fontSize: 11,
    fontFamily: REGULAR,
    fontWeight: '700',
    position: 'relative',
    top: -4.5,
    left: 1,
  },
});
