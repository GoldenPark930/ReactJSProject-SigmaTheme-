import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { LIGHT_GREY, ROYAL, CALM } from '../../../constants/colors';
import styles from './styles';

const SearchBar = ({ onSearchHandle }) => (
  <View style={styles.searchBarContainer}>
    <View style={styles.searchBar}>
      <Icon
        name="ios-search"
        backgroundColor={ROYAL}
        size={20}
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={onSearchHandle}
        placeholder="search groups"
        placeholderTextColor={LIGHT_GREY}
        selectionColor={CALM}
        maxLength={35}
        underlineColorAndroid="transparent"
      />
    </View>
  </View>
);

SearchBar.propTypes = {
  onSearchHandle: PropTypes.func.isRequired,
};

export default SearchBar;
