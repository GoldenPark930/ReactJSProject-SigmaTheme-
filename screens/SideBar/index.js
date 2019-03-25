import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

import {
  selectUserData,
  selectVerificationMailSendedBack,
  selectFetchingUserDataProgressStatus,
  selectUserBalanceDetail,
} from '../../store/selectors/user';
import { selectNotificationsCount } from '../../store/selectors/notifications';
import { resetNavWorkaroundState } from '../../store/actions/nav-workaround';
import {
  getUserData,
  resendEmailVerification,
  getUserBalanceDetails,
} from '../../store/actions/user';
import { setLinkingState } from '../../store/actions/linking';
import { navigationPropTypes } from '../../constants/app/defaults';
import {
  setCurrentlyViewedGroup,
} from '../../store/actions/current-group';

import Fade from '../../components/fade';
import GradientHeader from '../../components/gradientHeader';
import Currency from '../../components/currency';
import NavigationButton from './components/NavigationButton';
import VerificationMessage from './components/VerificationMessage';
import NavigationService from '../../utils/helpers/navigation-service';
import styles from './styles';

class SideBar extends React.Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getUserBalanceDetails();
  }
  shouldComponentUpdate(nextProps) {
    const { notificationsCount, userData, emailSendedBack, userBalanceDetail } = this.props;

    if (notificationsCount !== nextProps.notificationsCount) return true;

    if (emailSendedBack !== nextProps.emailSendedBack) return true;

    if (userData.balance !== nextProps.userData.balance) return true;

    if (userData.groupsBalance !== nextProps.userData.groupsBalance) return true;

    if (userData.pendingCharges && userData.pendingCharges.rows.length !== nextProps.userData.pendingCharges.rows.length) return true;

    if (userBalanceDetail !== nextProps.userBalanceDetail) return true;

    return false;
  }

  onPressTransactionHistory = () => {
    NavigationService.navigateWithDebounce('TransactionHistory');
  }
  onVerifyDocument = () => {
    NavigationService.navigateWithDebounce('UploadVerificationDocument');
  }

  onVerifyAccount = () => {
    NavigationService.navigateWithDebounce('VerifyMyAccount');
  }

  handleOnPress = (data) => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: 'MainApp',
            params: {},
            action: NavigationActions.navigate({ routeName: upperFirst(camelCase(data)) }),
          }),
        ],
      }),
    );
  };

  resendEmailButtonOnPressHandler = () => {
    this.props.resendEmailVerification();
  };

  renderEmailNotVerifiedNotification = () => {
    const { emailSendedBack, userData: { firstName, email, emailVerified } } = this.props;
    if (emailVerified) {
      return null;
    }

    const props = {
      message: `Hi ${firstName}, We are unable to verify your email address. Please click here to verify:`,
      buttonTitle: 'Resend Email',
      onPress: this.resendEmailButtonOnPressHandler,
    };
    if (emailSendedBack) {
      props.message = `An email has been sent to ${email} for you to confirm!`;
      props.onPress = null;
    }

    return (
      <Fade visible={!emailSendedBack} delay={3000} duration={300} >
        <VerificationMessage {...props} />
      </Fade>
    );
  };

  renderVerifyDocumentNotification = () => {
    const { status } = this.props.userData;
    if (status !== 'document') {
      return null;
    }
    const message = `For us to verify your account, we will need a picture of one of the following: Driver's License,
     Passport, or I.D. Card.`;

    return (
      <VerificationMessage
        message={message}
        buttonTitle="Verify My Account"
        onPress={this.onVerifyDocument}
      />
    );
  };

  renderUnpaidSection = () => {
    const { userData: { pendingCharges } } = this.props;
    if (!pendingCharges || pendingCharges.rows.length === 0) {
      return null;
    }
    const filteredCharges = {};
    pendingCharges.rows.map((row, index) => {
      if (!filteredCharges[row.chargeRequest.id]) {
        filteredCharges[row.chargeRequest.id] = [];
      }
      row.index = index;
      row.isLast = index === pendingCharges.rows.length - 1;
      filteredCharges[row.chargeRequest.id].push(row);
      return false;
    });
    return (
      <View style={styles.unpaidSection}>
        <View style={styles.unpaidSectionTitleView}>
          <View style={styles.unpaidSectionTitleLine} />
          <Text style={styles.unpaidSectionTitle}>UNPAID BALANCES</Text>
          <View style={styles.unpaidSectionTitleLine} />
        </View>
        {
          Object.keys(filteredCharges).map(keyName => (
            <View style={styles.unpaidClubItem}>
              {
                filteredCharges[keyName].map(chargeItem =>
                  (
                    <View style={{ alignItems: 'center' }}>
                      <View style={styles.unpaidChargeItem}>
                        <View style={styles.chargeDetail}>
                          <Text style={styles.unpaidClubNameText}>{filteredCharges[keyName][0].chargeRequest.group.name}</Text>
                          <Text style={styles.chargeDescriptionText}>{chargeItem.chargeRequest.description}</Text>
                          <Text style={styles.chargeSmallText}>Requested: {moment(chargeItem.chargeRequest.creationDate).fromNow()}</Text>
                          <Text style={styles.chargeSmallText}>Due: {moment(chargeItem.chargeRequest.dueDate !== null ? chargeItem.chargeRequest.dueDate : chargeItem.chargeRequest.creationDate).fromNow()}</Text>
                        </View>
                        <View>
                          <View style={styles.chargeCurrency}>
                            <Currency
                              color="#FFF"
                              amount={chargeItem.amount.toFixed(2)}
                              numberSize={23}
                            />
                          </View>
                          <View style={styles.payNowButtonView}>
                            <TouchableOpacity
                              style={styles.payNowButtonContainer}
                              onPress={() => this.goToPendingChargeScreen(chargeItem.chargeRequest.group)}
                            >
                              <Text
                                numberOfLines={1}
                                style={styles.payNowButtonText}
                              >
                                Pay Now
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      { !chargeItem.isLast ?
                        <View style={styles.horizontalDiv} />
                        : null }
                    </View>
                  ))
              }
            </View>
          ))
        }

      </View>
    );
  }

  getRefreshControll = () => (
    <RefreshControl
      refreshing={this.props.fetchingUserDataInProgress}
      onRefresh={this.props.getUserData}
    />
  );

  goToPendingChargeScreen = async (group) => {
    await this.props.setCurrentlyViewedGroup(Object.assign(group, {}));
    await this.props.setLinkingState({
      linked: true,
      routeName: 'MyClub',
      subRouteName: 'charges',
      params: group.id,
    });
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'ManageGroup',
      }),
    );
  }

  renderVerifyAccountNotification = () => {
    const { status } = this.props.userData;
    if (status !== 'retry') {
      return null;
    }
    const message = 'It looks like we need a little bit more information...';

    return (
      <VerificationMessage
        message={message}
        buttonTitle="Verify My Account"
        onPress={this.onVerifyAccount}
      />
    );
  };

  render() {
    const { userData: { firstName, lastName, username, groupsBalance }, userBalanceDetail } = this.props;
    return (
      <LinearGradient
        colors={['#007ed2', '#3497db']}
        style={styles.lineraGradient}
      >
        <ScrollView
          style={styles.scrollContainer}
          refreshControl={this.getRefreshControll()}
        >
          <View style={styles.container}>
            <GradientHeader
              navigation={this.props.navigation}
              imageLink={'Edit Profile'}
            />

            <TouchableOpacity
              style={styles.usernameContainer}
              onPress={() => this.handleOnPress('Notifications')}
            >
              <Text
                numberOfLines={2}
                style={styles.nameText}
              >
                {firstName} {lastName}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.usernameText}
              >
                @{username}
              </Text>
            </TouchableOpacity>


            <View style={styles.middleSectionContainer}>
              <View style={styles.middlePartsContainer}>
                <TouchableOpacity
                  onPress={() => this.handleOnPress('TransactionHistory')}
                  style={styles.rightMiddleContainer}
                >
                  <Currency
                    color="#FFF"
                    amount={userBalanceDetail && userBalanceDetail.present}
                    decimalSize={18}
                    numberSize={32}
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.balanceText}
                  >
                    Personal Balance
                  </Text>
                </TouchableOpacity>
                <Button
                  onPress={() => this.handleOnPress('Transfer To Bank')}
                  full
                  style={styles.middleButtonContainer}
                >
                  <Text style={styles.middleButtonText}>
                    Transfer to Bank
                  </Text>
                </Button>
              </View>

              <View style={styles.middlePartsContainer}>
                <TouchableOpacity
                  onPress={this.onPressTransactionHistory}
                  style={styles.leftMiddleContainer}
                >
                  <Currency
                    color="#FFF"
                    amount={groupsBalance}
                    decimalSize={18}
                    numberSize={32}
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.balanceText}
                  >
                    In Your Private Clubs
                  </Text>
                </TouchableOpacity>
                <Button
                  onPress={() => this.handleOnPress('My Groups')}
                  full
                  style={styles.middleButtonContainer}
                >
                  <Text style={styles.middleButtonText}>
                    My Clubs
                  </Text>
                </Button>
              </View>
            </View>

            {this.renderEmailNotVerifiedNotification()}
            {this.renderVerifyAccountNotification()}
            {this.renderVerifyDocumentNotification()}
            {this.renderUnpaidSection()}


            <View style={styles.navigationButtonsContainer}>
              <NavigationButton
                title="Transaction History"
                onPress={() => this.handleOnPress('TransactionHistory')}
              />
              {/* //after we fix the invite button to make it actually open the correct text message
              <NavigationButton
                title="Invite Friends"
                onPress={() => this.handleOnPress('Invite Friends')}
              />
              */}

              <NavigationButton
                title="My Settings"
                onPress={() => this.handleOnPress('SettingsNavigator')}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const { bool, string, shape, func, number } = PropTypes;
SideBar.propTypes = {
  notificationsCount: number.isRequired,
  emailSendedBack: bool.isRequired,
  fetchingUserDataInProgress: bool.isRequired,
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
  ...navigationPropTypes(PropTypes),
};

const mapStateToProps = state => ({
  userData: selectUserData(state),
  notificationsCount: selectNotificationsCount(state),
  emailSendedBack: selectVerificationMailSendedBack(state),
  fetchingUserDataInProgress: selectFetchingUserDataProgressStatus(state),
  userBalanceDetail: selectUserBalanceDetail(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    resetNavWorkaroundState,
    resendEmailVerification,
    getUserData,
    setLinkingState,
    setCurrentlyViewedGroup,
    getUserBalanceDetails,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
