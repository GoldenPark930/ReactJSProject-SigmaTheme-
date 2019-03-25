import { StyleSheet } from 'react-native';
import { REGULAR } from '../../../../../../constants/fonts';
import * as Colors from '../../../../../../constants/colors';


export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: Colors.WHITE,
  },
  pieContainer: {
    height: 80,
    width: 80,
    marginLeft: 10,
    marginTop: 15,
  },
  infoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginLeft: 15,
  },
  title: {
    color: Colors.ROYAL,
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.ROYAL,
    fontSize: 15,
  },
  date: {
    color: Colors.GREY,
    fontSize: 12,
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
  },
  stats: {
    color: Colors.CALM,
    fontSize: 14,
  },
  chartDetailsContainer: {
    height: '100%',
  },
  addMemberToCharge: { 
    color: Colors.WHITE, 
    fontSize: 12, 
    fontFamily: REGULAR,
  }
});
