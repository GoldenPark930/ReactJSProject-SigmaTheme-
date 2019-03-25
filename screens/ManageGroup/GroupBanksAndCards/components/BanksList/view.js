import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, FlatList, RefreshControl } from 'react-native';

import Spinner from '../../../../../components/list-loading-spinner';
import ListItemSeparator from '../../../../../components/list-item-separator';
import PlaceholderData from '../../../../../store/constants/hardcoded-data/banks';
import SingleBanksModel from './components/single-banks-model';
import EmptyBanksList from './components/empty-banks-list';
import styles from './styles';

/**
 |--------------------------------------------------------------------------
 | Group settings -> Banks & Cards
 |
 | Banks list
 |--------------------------------------------------------------------------
 */

const { arrayOf, shape, func, number, string, bool } = PropTypes;

class BanksList extends Component {
  static propTypes = {
    fetchingIsInProgress: bool.isRequired,

    getGroupBanksAccountsList: func.isRequired,
    clearCurrentGroupBanksAccountsList: func.isRequired,
    onLinkPress: func.isRequired,

    currentGroupId: number.isRequired,

    banks: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
    })),
  };

  static defaultProps = {
    banks: PlaceholderData,
  };

  constructor(props) {
    super(props);

    // Start fetching banks from remote server
    props.getGroupBanksAccountsList(props.currentGroupId);
  }

  /*
   |--------------------------------------------------------------------------
   | Component lifecycle methods
   |--------------------------------------------------------------------------
   */

  shouldComponentUpdate(nextProps) {
    const { fetchingIsInProgress } = this.props;

    // Re-render component only when fetching processes change their status
    return fetchingIsInProgress !== nextProps.fetchingIsInProgress;
  }

  componentWillUnmount() {
    // Clear group banks accounts list when user leaves the screen
    this.props.clearCurrentGroupBanksAccountsList();
  }

  /*
   |--------------------------------------------------------------------------
   | Actions handlers
   |--------------------------------------------------------------------------
   */

  onPressPlaceholder = () => this.props.onLinkPress();

  /*
   |--------------------------------------------------------------------------
   | Helper functions
   |--------------------------------------------------------------------------
   */

  renderList = (items) => {
    const {
      currentGroupId,
      fetchingIsInProgress,
      getGroupBanksAccountsList,
    } = this.props;

    // `Pull-to-refresh` feature configuration
    const refreshControlProps = {
      refreshing: fetchingIsInProgress,
      onRefresh: () => getGroupBanksAccountsList(currentGroupId),
    };

    return (
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={data => <SingleBanksModel data={data.item} />}
        refreshControl={<RefreshControl {...refreshControlProps} />}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        onEndReached={this.onEndReachedEventHandler}
        onEndReachedThreshold={0.7}
      />
    );
  };

  renderContent = () => {
    const { banks, fetchingIsInProgress } = this.props;

    if (fetchingIsInProgress) {
      return <Spinner.View />;
    }

    return banks.length
      ? this.renderList(banks)
      : <EmptyBanksList />;
  };

  /*
   |--------------------------------------------------------------------------
   | RENDER
   |--------------------------------------------------------------------------
   */

  render() {
    return (
      <View style={styles.wrapper}>

        <Text style={styles.title}>
          bank accounts
        </Text>

        {this.renderContent()}

        <View style={styles.linkButtonWrapper}>
          <TouchableWithoutFeedback onPress={this.onPressPlaceholder}>
            <View style={styles.linkButton}>
              <Text style={styles.linkButtonLabel}>
                link bank account
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default BanksList;
