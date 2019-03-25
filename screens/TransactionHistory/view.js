import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import Spinner from '../../components/spinner';
import { navigationPropTypes } from '../../constants/app/defaults';
import styles from './styles';
import SingleTransactionModel from './components/SingleTransactionModel';
import EmptyTransactionList from './components/EmptyTransactionList';
import NavigationService from '../../utils/helpers/navigation-service';


/**
 |------------------------------------------------------------------------------
 | Transaction History
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { bool, number, func, shape, arrayOf, string } = PropTypes;

class TransactionHistoryView extends Component {
  static propTypes = {
    // Flags
    fetchingTransactionHistoryListInProgress: bool.isRequired,
    // Data
    transactionHistoryList: arrayOf(shape({})).isRequired,
    getUserTransactionHistoryList: func.isRequired,
    userData: shape({
      id: number.isRequired,
      firstName: string.isRequired,
      balance: number.isRequired,
      email: string.isRequired,
      emailVerified: bool.isRequired,
      username: string.isRequired,
      profileImage: shape({
        uri: string.isRequired,
      }).isRequired,
    }).isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    // Get user's transaction history
    this.props.getUserTransactionHistoryList();
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */
  renderList() {
    const { userData,
      transactionHistoryList } = this.props;

    return transactionHistoryList && transactionHistoryList.length
      ? transactionHistoryList.map((item, index) => (
        <SingleTransactionModel userData={userData} data={item} key={index} /> // We need to have "id" in transaction
      ))
      : <EmptyTransactionList />;
  }

  render() {
    const {
      navigation,
      fetchingTransactionHistoryListInProgress,
    } = this.props;

    // Render loading spinner if fetching group banks request is in progress
    if (fetchingTransactionHistoryListInProgress) {
      return <Spinner visible />;
    }

    return (
      <View style={styles.contentWrapper}>
        <View style={styles.componentWrapper}>
          <View style={styles.innerWrapper}>
            <View style={styles.userWrapper}>
              <Thumbnail
                style={styles.bigThumbnail}
                source={this.props.userData.profileImage}
              />
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>
                  {this.props.userData.firstName} {this.props.userData.lastName}
                </Text>
                <Text style={styles.usernameText}>
                  @{this.props.userData.username}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>
                  ${this.props.userData.balance}
                </Text>
                <TouchableOpacity onPress={() => { NavigationService.navigateWithDebounce('TransferToBank'); }}>
                  <View style={[styles.button, styles.buttonActive]}>
                    <Text style={styles.buttonLabel}>
                    Transfer to Bank
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <ScrollView >
              {this.renderList()}
            </ScrollView>
          </View>
        </View>

      </View>
    );
  }
}

export default TransactionHistoryView;
