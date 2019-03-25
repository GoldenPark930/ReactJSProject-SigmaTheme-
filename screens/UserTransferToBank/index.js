import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TouchableOpacity,
  View, StyleSheet,
  ListView,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Text,
} from 'native-base';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import LinearGradient from 'react-native-linear-gradient';

import { navigationPropTypes } from '../../constants/app/defaults';
import { resetNavWorkaroundState } from '../../store/actions/nav-workaround';
import globalColors from '../../GlobalCss/globalColors';
import GradientHeader from '../../components/gradientHeader';
import CurrencyInput from '../../components/currencyInput';
import TransferModule from './components/transfer-module';
import Spinner from '../../components/spinner';
import {
  selectUserData,
  selectUserBanksList,
  selectUserAvailableBalance,
  selectUserBalanceDetail,
  selectTransferToBankProgressStatus,
  selectFetchingUserBanksListProgressStatus,
  selectFetchingUserBalanceDetailProgressStatus,
} from '../../store/selectors/user';
import {
  getUserBalanceDetails,
  getUserBanksAccountsList,
  makeWithdrawFromUserToBank,
} from '../../store/actions/user';
import { getTransferAmountValidationError } from './components/transfer-module/utils/helpers';

import { REGULAR } from '../../constants/fonts';
import NavigationService from '../../utils/helpers/navigation-service';
import styles from './styles';

const global = styleSheet => StyleSheet.flatten(styleSheet);

const { bool, string, shape, func } = PropTypes;

class UserTransferToBank extends React.Component {
  static propTypes = {
    // Data
    userData: shape({
      firstName: string.isRequired,
      balance: string.isRequired,
      groupsBalance: string.isRequired,
      email: string.isRequired,
      emailVerified: bool.isRequired,
      username: string.isRequired,
      profileImage: shape({
        uri: string.isRequired,
      }).isRequired,
    }).isRequired,
    resendEmailVerification: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  static navigationOptions = () => ({
    header: null,
  });

  constructor() {
    super();

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      amount: 0.00,
      error: null,
    };
  }

  componentDidMount() {
    // Get user's balance detail
    this.props.getUserBalanceDetails();
    // Get user's banks accounts list
    this.props.getUserBanksAccountsList();
  }

  onPressTransactionHistory = () => {
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce('TransactionHistory');
  }
  onCurrencyChange = (value) => {
    const { userBalanceDetail } = this.props;
    this.setState({
      amount: value,
      error: getTransferAmountValidationError(value, userBalanceDetail && userBalanceDetail.available),
    });
  }

  handleOnPress = (data) => {
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce(upperFirst(camelCase(data)));
  };


  render() {
    const {
      navigation,
      userBalance,
      banksAccountsList,
      makeWithdrawFromUserToBank,
      fetchingBanksListInProgress,
    } = this.props;
    const { firstName, lastName, username, balance } = this.props.userData;
    const { userBalanceDetail } = this.props;
    const { amount, error } = this.state;
    return (
      <LinearGradient
        colors={['#007ed2', '#3497db']}
        style={styles.lineraGradient}
      >
        <ScrollView style={styles.scrollView} >
          <View style={styles.mainContainer}>
            <GradientHeader
              navigation={this.props.navigation}
              closeButtonPosition={0}
              onCloseHandler={() => this.props.navigation.navigate('DrawerOpen')}
            />
            <View style={{ justifyContent: 'center', paddingBottom: 20, marginTop: 50 }}>

              <TouchableOpacity onPress={() => this.handleOnPress('Notifications')}>
                <Text numberOfLines={2} style={global([globalColors.white, { fontSize: 18, textAlign: 'center', fontWeight: '700' }])}>

                  {firstName} {lastName}
                </Text>
                <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 12, textAlign: 'center', fontWeight: '100', fontFamily: REGULAR }])}>
                @{username}
                </Text>
                <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 20, paddingTop: 20, textAlign: 'center', fontFamily: REGULAR }])}>
                Transfer My Balance
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bankListcontainer}>
              <View style={styles.linkItem}>
                <View>
                  <CurrencyInput onCurrencyChange={this.onCurrencyChange} limit={userBalanceDetail && userBalanceDetail.available} color="#fff" />
                  <View style={error === null ? {} : styles.errorContainer}>
                    <Text style={styles.error}>
                      {`${error === null ? ' ' : error}`}
                    </Text>
                  </View>

                  <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 12, textAlign: 'center', fontWeight: '100', fontFamily: REGULAR }])}>
              Total in Payclub Balance: ${userBalanceDetail && userBalanceDetail.present}
                  </Text>
                  <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 12, textAlign: 'center', fontWeight: '100', fontFamily: REGULAR }])}>
                  ${userBalanceDetail && userBalanceDetail.pendingIn} is currently pending
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
                    banksAccountsList={banksAccountsList}
                    userBalance={userBalance}
                    amount={`$${amount}`}
                    makeWithdraw={makeWithdrawFromUserToBank}
                    refreshUserBalanceDetails={getUserBalanceDetails}
                    navigation={navigation}
                    color="#FFF"
                  />
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  userData: selectUserData(state),
  banksAccountsList: selectUserBanksList(state),
  userBalance: selectUserAvailableBalance(state),
  transferToBankInProgress: selectTransferToBankProgressStatus(state),
  fetchingBanksListInProgress: selectFetchingUserBanksListProgressStatus(state),
  fetchingUserBalanceDetailInProgress: selectFetchingUserBalanceDetailProgressStatus(state),
  userBalanceDetail: selectUserBalanceDetail(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    resetNavWorkaroundState,
    getUserBalanceDetails,
    getUserBanksAccountsList,
    makeWithdrawFromUserToBank,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserTransferToBank);
