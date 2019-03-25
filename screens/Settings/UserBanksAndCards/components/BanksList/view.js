import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  toLower,
  startCase,
} from 'lodash';
import {
  View,
  FlatList,
  RefreshControl,
} from 'react-native';

import Spinner from '../../../../../components/list-loading-spinner';
import ListItemSeparator from '../../../../../components/list-item-separator';
import PlaceholderData from '../../../../../store/constants/hardcoded-data/banks';
import SingleBanksModel from './components/single-banks-model';
import EmptyBanksList from './components/empty-banks-list';
import NavigationService from '../../../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | User settings -> Banks & Cards
 |
 | Banks list
 |------------------------------------------------------------------------------
 */

const { number, string, func, oneOfType, shape, arrayOf, bool } = PropTypes;

class BanksList extends Component {
  static propTypes = {
    // Data
    banks: arrayOf(shape({
      id: oneOfType([number, string]).isRequired,
      name: string.isRequired,
      mask: string.isRequired,
      bankName: string.isRequired,
    })),
    // Functions
    addingBankAccountIsInProgress: bool.isRequired,
    getUserBanksAccountsList: func.isRequired,
    fetchingIsInProgress: bool.isRequired,
    onLinkPress: func.isRequired,
    color: string,
  };

  static defaultProps = {
    banks: PlaceholderData,
    color: '#000',
  };

  componentDidMount() {
    this.props.getUserBanksAccountsList();
  }

  onPressPlaceholder = () => this.props.onLinkPress();

  onPressListItem = (item) => {
    const { name, bankName, id, mask } = item;

    NavigationService.navigateWithDebounce('BankDetails', {
      bankName: startCase(toLower(bankName)),
      bankId: id,
      name,
      cardNumber: mask,
    });
  }

  renderItem = data => (
    <SingleBanksModel
      data={data.item}
      onPress={this.onPressListItem}
      color={this.props.color}
    />
  )

  render() {
    const { fetchingIsInProgress, banks, getUserBanksAccountsList, addingBankAccountIsInProgress } = this.props;
    return (
      <View style={styles.wrapper}>
        {((fetchingIsInProgress) && banks.length === 0) && (
          <Spinner.View />
        )}
        {
          banks.length !== 0 ?

            <FlatList
              data={banks}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={(addingBankAccountIsInProgress || fetchingIsInProgress)}
                  onRefresh={getUserBanksAccountsList}
                />
              }
              ItemSeparatorComponent={() => <ListItemSeparator />}
              onEndReached={this.onEndReachedEventHandler}
              onEndReachedThreshold={0.7}
            /> :

            <EmptyBanksList />
        }

      </View>
    );
  }
}

export default BanksList;
