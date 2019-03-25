import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View, StyleSheet,
} from 'react-native';
import {
  Text,
} from 'native-base';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import LinearGradient from 'react-native-linear-gradient';

import { ALL_ROLES } from '../../../constants/users/roles';

import { navigationPropTypes } from '../../../constants/app/defaults';
import globalColors from '../../../GlobalCss/globalColors';
import GradientHeader from '../../../components/gradientHeader';
import CurrencyInput from '../../../components/currencyInput';

import { REGULAR } from '../../../constants/fonts';

import styles from './styles';
import Spinner from '../../../components/spinner';
import { getTransferAmountValidationError } from './components/transfer-module/utils/helpers';
import TransferModule from './components/transfer-module';
import NavigationService from '../../../utils/helpers/navigation-service';

const global = styleSheet => StyleSheet.flatten(styleSheet);

const { bool, string, shape, oneOf, number } = PropTypes;

class GroupTransferBalanceScreenWrapper extends React.Component {
  static propTypes = {
  // Flags
    transferIsInProgress: bool.isRequired,
    // Data
    groupData: shape({
      enableBalance: bool.isRequired,
      balance: number.isRequired,
      role: oneOf(ALL_ROLES).isRequired,
      owner: shape({
        firstName: string.isRequired,
        lastName: string.isRequired,
        image: number.isRequired,
        username: string.isRequired,
        phone: string.isRequired,
        id: number.isRequired,
      }).isRequired,
      imageUrl: string.isRequired,
      members: shape({
        totalCount: number.isRequired,
      }).isRequired,
      charges: shape({
        totalCount: number.isRequired,
      }).isRequired,
    }).isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  static navigationOptions = () => ({
    header: null,
  });
  constructor() {
    super();

    this.state = {
      amount: 0.00,
      error: null,
    };
  }
  onCurrencyChange = (value) => {
    this.setState({
      amount: value,
      error: getTransferAmountValidationError(value, this.props.groupBalance),
    });
  }
  handleOnPress = (data) => {
    // Open target screen
    NavigationService.navigateWithDebounce(upperFirst(camelCase(data)));
  };


  render() {
    const { groupData: { name, balance } } = this.props;
    const {
      groupId,
      navigation,
      groupBalance,
      banksAccountList,
      transfertToOwnerBank,
      transfertToOwnerBalance,
      refreshCurrentGroupData,
      fetchingBanksListInProgress,
    } = this.props;
    const { amount, error } = this.state;
    return (
      <LinearGradient
        colors={['#01b8a4', '#00dca9']}
        style={styles.lineraGradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContainer}>
            <GradientHeader
              navigation={this.props.navigation}
              closeButtonPosition={0}
              onCloseHandler={() => this.props.navigation.goBack()}
              isGroup
            />
            <View style={{ backgroundColor: 'transparent', justifyContent: 'center', marginTop: 50 }}>
              <Text
                numberOfLines={2}
                style={
                  global([globalColors.white, { fontSize: 28,
                    textAlign: 'center',
                    fontWeight: '700',
                    fontFamily: REGULAR }])}
              >
                {name}
              </Text>

              <Text
                numberOfLines={1}
                style={
                  global([globalColors.white, { fontSize: 24,
                    marginTop: 30,
                    textAlign: 'center',
                    fontWeight: '400',
                    fontFamily: REGULAR }])}
              >
              TRANSFER CLUB BALANCE
              </Text>

            </View>


            <View style={styles.bankListcontainer}>
              <View style={styles.linkItem}>
                <View>
                  <CurrencyInput onCurrencyChange={this.onCurrencyChange} limit={balance} color="#FFF" />
                  <Text style={styles.error}>
                    {`${error === null ? ' ' : error}`}
                  </Text>

                  <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 12, textAlign: 'center', fontWeight: '100', fontFamily: REGULAR }])}>
              Total in Club Balance: ${balance}
                  </Text>
                  <View style={styles.separator} />
                </View>
              </View>
              <View style={styles.linkItem}>
                <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 12, textAlign: 'center', fontWeight: '100', fontFamily: REGULAR }])}>
              to
                </Text>
                {fetchingBanksListInProgress ?
                  <Spinner visible />
                  :
                  <TransferModule
                    groupId={groupId}
                    banksAccountList={banksAccountList}
                    groupBalance={groupBalance}
                    transfer={{
                      balance: transfertToOwnerBalance,
                      bank: transfertToOwnerBank,
                    }}
                    amount={`$${amount}`}
                    refreshCurrentGroupData={refreshCurrentGroupData}
                    navigation={navigation}
                    colir="#FFF"
                  />
                }
              </View>
            </View>
            <Spinner
              visible={this.props.transferIsInProgress}
              textContent="Transferring the money. Please wait..."
              overlayColor="rgba(0, 0, 0, 0.25)"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default GroupTransferBalanceScreenWrapper;
