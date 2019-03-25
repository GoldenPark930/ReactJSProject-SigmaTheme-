import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../constants/colors';
import { elementWidth, elementHeight, margin } from './constants';

export const GradientColors = ['transparent', 'rgba(0,0,0,0.2)'];

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    marginTop: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  searchContainer: {
    flex: 1,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.CALM,
    borderBottomWidth: 1,
  },
  icon: {
    color: Colors.ROYAL,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 45,
    color: Colors.ROYAL,
  },
  button: {
    height: 35,
    width: 90,
    marginLeft: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.FACEBOOK,
  },
  textButton: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  sectionTitle: {
    color: Colors.ROYAL,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  plusContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: elementHeight,
    width: elementWidth,
    margin,
    zIndex: 1,
    paddingTop: 10,
    marginTop: -10,
  },
});
