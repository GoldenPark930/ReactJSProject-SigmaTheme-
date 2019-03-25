import {
  StyleSheet,
} from 'react-native';
import {
  CALM,
  LIGHT_GREY,
} from '../../../constants/colors';
import { REGULAR } from '../../../constants/fonts';


const styles = StyleSheet.create({
  searchBarContainer: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: CALM,
  },
  searchInput: {
    width: '90%',
    padding: 0,
    marginLeft: 10,
    fontFamily: REGULAR,
    fontSize: 16.5,
  },
});

export default styles;

