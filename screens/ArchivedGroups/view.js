import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { WHITE } from '../../constants/colors';
import styles from './styles';
import Header from '../../components/NewHeader';
import SearchBar from './SearchBar';

const ArchivedGroupsView = ({ leftAction, keyExtractor, renderGroupItem, groupsData, onSearchHandle, isPending }) => (
  <View style={styles.mainContainer}>
    <Spinner
      visible={isPending}
      textStyle={WHITE}
    />
    <Header
      title="Archived Clubs"
      leftActionIcon="ios-arrow-back"
      leftAction={leftAction}
    />
    <SearchBar
      onSearchHandle={onSearchHandle}
    />
    <View style={styles.container}>
      <FlatList
        data={groupsData}
        extraData={this.props}
        keyExtractor={keyExtractor}
        renderItem={renderGroupItem}
      />
    </View>
  </View>
);

ArchivedGroupsView.propTypes = {
  leftAction: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  renderGroupItem: PropTypes.func.isRequired,
  groupsData: PropTypes.array.isRequired,
  onSearchHandle: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};

export default ArchivedGroupsView;
