import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TouchableOpacity,
  View, StyleSheet,
  ListView,
  TouchableWithoutFeedback,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Text,
  Button,
  Thumbnail,
} from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import LinearGradient from 'react-native-linear-gradient';

import { navigationPropTypes } from '../../../constants/app/defaults';
import { selectUserData } from '../../../store/selectors/user';
import { resetNavWorkaroundState } from '../../../store/actions/nav-workaround';
import globalColors from '../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../GlobalCss/globalBackgroundColors';
import GradientHeader from '../../../components/gradientHeader';
import Plaid from './components/BanksList/components/Plaid';
import BanksList from './components/BanksList';
import styles from './styles';
import { getLocalImage } from 'src/utils/helpers';
import NavigationService from '../../../utils/helpers/navigation-service';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;


const global = styleSheet => StyleSheet.flatten(styleSheet);

const { bool, string, shape, func } = PropTypes;

class SideBar extends React.Component {
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
      plaid: false,
      isSafeModalVisible: false,
    };
  }

  onPressTransactionHistory = () => {
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce('TransactionHistory');
  }

  handleOnPress = (data) => {
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce(upperFirst(camelCase(data)));
  };

  hidePlaid = () => this.setState({ plaid: false });
  showPlaid = () => this.setState({ plaid: true });
  showModal = () => this.setState({ isSafeModalVisible: true });
  hideModal = () => this.setState({ isSafeModalVisible: false });

  onCloseHandler = () => {
    if (this.props.navigation.state.params.parentRoute === 'Settings') {
      this.props.navigation.goBack();
    } else if (this.props.navigation.state.params.parentRoute === 'ManageGroup') {
      NavigationService.navigateWithDebounce('ManageGroup');
    }
  }


  render() {
    const { plaid, isSafeModalVisible } = this.state;
    const { firstName, lastName, username } = this.props.userData;
    const headerProps = this.props.navigation.state.params ? { onCloseHandler: this.onCloseHandler } : {};
    return (
      <View style={styles.scrollView}>
        <Modal isVisible={isSafeModalVisible}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>

                <Text style={styles.safeTextTop}>
                      YOUR INFORMATION IS SAFE
                </Text>
                <Text style={styles.safeTextBottom}>
                Payclub does not store your information, and all information is sent securely and encrypted over a Secure Socket Layer (SSL).
                </Text>
                <Text style={styles.safeTextBottom}>
                  Payclub uses Plaid (the same banking verification as Robinhood, Stripe, and Venmo), to communicate with your bank. Communication between Plaid infrastructure and financial institutions is transmitted over encrypted tunnels. Our banking partner Dwolla uses strong cryptography with 256-bit keys, Galois Counter Mode, and practice consistent key rotation.
                </Text>
                <View style={styles.safeTextBottom}>
                  <Text style={styles.safeTextLegal}>
                    {'Please visit our '}
                  </Text>
                  <Text
                    style={styles.safeTextLegalLink}
                    onPress={() => Linking.openURL('https://www.payclub.co/terms-of-service/')}
                  >
                    {'Terms of Service '}
                  </Text>
                  <Text style={styles.safeTextLegal}>
                    {'and '}
                  </Text>
                  <Text
                    style={styles.safeTextLegalLink}
                    onPress={() => Linking.openURL('https://www.payclub.co/privacy-policy/')}
                  >
                    {'Privacy Policy '}
                  </Text>
                  <Text style={styles.safeTextLegal}>
                    {'or our partner Dwolla\'s '}
                  </Text>
                  <Text
                    style={styles.safeTextLegalLink}
                    onPress={() => Linking.openURL('https://www.dwolla.com/legal/tos/')}
                  >
                    {'Terms of Service'}
                  </Text>
                  <Text style={styles.safeTextLegal}>
                    {' and '}
                  </Text>
                  <Text
                    style={styles.safeTextLegalLink}
                    onPress={() => Linking.openURL('https://www.dwolla.com/legal/privacy/')}
                  >
                    {'Privacy Policy '}
                  </Text>
                  <Text style={styles.safeTextLegal}>
                    {'for more info.'}
                  </Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#007ed2', justifyContent: 'center', marginVertical: 30, paddingHorizontal: 30, borderRadius: 15, height: 30 }} onPress={this.hideModal}>
                  <Text style={{ textAlign: 'center', color: '#FFF', fontFamily: 'Proxima Nova', fontWeight: '700' }}>Close</Text>
                </TouchableOpacity>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <LinearGradient
          colors={['#007ed2', '#3497db']}
          style={styles.lineraGradient}
        >
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <Plaid isVisible={plaid} onClose={this.hidePlaid} />
            <View style={styles.mainContainer}>
              <GradientHeader
                navigation={this.props.navigation}
                closeButtonPosition={0}
                onCloseHandler={
                  () => {
                    this.props.navigation.goBack(null);
                  }
                }
                {...headerProps}
              />
              <View style={{ justifyContent: 'center', paddingBottom: 20, marginTop: 50 }}>

                <TouchableOpacity onPress={() => this.handleOnPress('Notifications')}>
                  <Text numberOfLines={2} style={global([globalColors.white, { fontSize: 24, textAlign: 'center', fontWeight: '100', fontFamily: 'Proxima Nova' }])}>
                    {firstName} {lastName}
                  </Text>
                  <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 12, textAlign: 'center', fontWeight: '100', fontFamily: 'Proxima Nova' }])}>
              @{username}
                  </Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={global([globalColors.white, { fontSize: 20, paddingTop: 20, textAlign: 'center', fontFamily: 'Proxima Nova' }])}>
              BANK ACCOUNTS
                </Text>
                <Text style={global([globalColors.white, { fontSize: 12, textAlign: 'center', paddingTop: 10, paddingHortizontal: 40, fontFamily: 'Proxima Nova' }])}>
              Bank accounts are used to when there is not enough in your personal balance. There are no fees to use your bank account.
                </Text>

              </View>

              <View style={styles.bankListcontainer}>
                <View style={styles.linkItem}>
                  <Text style={[styles.linkText, styles.linkTitle]}>ATTACHED ACCOUNTS</Text>
                </View>
                <BanksList
                  onLinkPress={this.showPlaid}
                  navigate={NavigationService.navigateWithDebounce}
                  color="#FFF"
                />
              </View>

              <View style={styles.linkListContainer}>
                <View style={styles.linkItem} >
                  <Button
                    onPress={() => this.showPlaid()}
                    style={
                      global([globalBackgroundColors.white,
                        { marginVertical: 15, width: '100%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }])}
                  >
                    <Text style={global([globalColors.white, { fontSize: 14, textAlign: 'center', color: '#007ed2', fontFamily: 'Proxima Nova', fontWeight: '700' }])}>
                  Link Your Bank Account
                    </Text>
                  </Button>
                </View>
                <View style={{
                  width: '80%',
                  marginLeft: '10%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 10 }}
                >
                  <Thumbnail
                    style={{ width: isSmall ? 74 : 76, margin: 10, borderRadius: 0 }}
                    source={getLocalImage('bankLockIcon')}
                  />
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text numberOfLines={1} style={styles.linkText}>
                         YOUR INFORMATION IS SAFE
                      </Text>
                      <TouchableOpacity onPress={this.showModal}>
                        <FontAwesome style={{
                          marginLeft: 5,
                          fontSize: isSmall ? 16 : 18,
                          color: '#FFF' }}
                        >{Icons.questionCircle}
                        </FontAwesome>
                      </TouchableOpacity>
                    </View>
                    <Text style={global([globalColors.white,
                      {
                        fontSize: isSmall ? 10 : 12,
                        paddingHortizontal: 20,
                        paddingVertical: 5,
                        fontFamily: 'Proxima Nova' }])}
                    >
              Payclub does not store your information, and all information is sent securely and encrypted over a Secure Socket Layer (SSL).
                    </Text>
                  </View>
                </View>
              </View>


            </View>
          </ScrollView>
        </LinearGradient>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: selectUserData(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    resetNavWorkaroundState,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
