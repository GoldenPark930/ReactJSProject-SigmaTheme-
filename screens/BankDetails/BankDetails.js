import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TouchableOpacity,
  View, StyleSheet,
  ListView,
  TouchableWithoutFeedback,
  Linking,
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

import CommonQuestionModal from '../../components/common-question-modal';
import { navigationPropTypes } from '../../constants/app/defaults';
import { selectUserData } from '../../store/selectors/user';
import { resetNavWorkaroundState } from '../../store/actions/nav-workaround';
import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import GradientHeader from '../../components/gradientHeader';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import styles from './styles';
import { getLocalImage } from 'src/utils/helpers';
import NavigationService from '../../utils/helpers/navigation-service';


const global = styleSheet => StyleSheet.flatten(styleSheet);

const { bool, string, shape, func } = PropTypes;

class BankDetails extends React.Component {
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
    // Navigation
    ...navigationPropTypes(PropTypes),
    cardNumber: string.isRequired,
    isPending: bool.isRequired,
    bankName: string.isRequired,
    onBackPress: func.isRequired,
    onRemovePress: func.isRequired,
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
      removeBankQuestionModalVisible: false,
    };
  }


  handleOnPress = (data) => {
    this.props.resetNavWorkaroundState();
    NavigationService.navigateWithDebounce(upperFirst(camelCase(data)));
  };

  removeBankButtonOnPressHandler = () => {
    this.setState({ removeBankQuestionModalVisible: true });
  };

  closeQuestionModal = () => {
    this.setState({ removeBankQuestionModalVisible: false });
  };

  removeBankOnSubmitEventHandler = () => {
    this.closeQuestionModal();
    this.props.onRemovePress();
  }

  render() {
    const { firstName, lastName, username } = this.props.userData;
    const { bankName, cardNumber } = this.props;
    const { removeBankQuestionModalVisible } = this.state;
    return (
      <View style={styles.scrollView}>
        <CommonQuestionModal
          visible={removeBankQuestionModalVisible}
          onRequestCloseHandler={this.closeQuestionModal}
          onSubmitQuestionHandler={this.removeBankOnSubmitEventHandler}
        >
          <Text style={styles.questionText}>
            Are you sure?
          </Text>
        </CommonQuestionModal>
        <LinearGradient
          colors={['#007ed2', '#3497db']}
          style={styles.lineraGradient}
        >
          <View style={styles.mainContainer}>
            <GradientHeader navigation={this.props.navigation} onCloseHandler={this.props.onBackPress} closeButtonPosition={0} />
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
                {bankName} ** {cardNumber}
              </Text>
              <Text style={global([globalColors.white, { fontSize: 12, textAlign: 'center', paddingTop: 10, fontFamily: 'Proxima Nova', marginHorizontal: 20 }])}>
              To transfer your balance to this bank account, click on "tranfer bank" in the main menu
              </Text>

            </View>

            <View style={styles.linkListContainer}>
              <View style={{ width: '80%', marginLeft: '10%', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.bottomText}>
                  All transfers are subject to Payclub's
                  <Text
                    style={[styles.bottomText, { fontWeight: '700' }]}
                    onPress={() => Linking.openURL('https://www.payclub.co/terms-of-service/')}
                  >
                    {' Terms of Service '}
                  </Text>
                   and
                  <Text
                    style={[styles.bottomText, { fontWeight: '700' }]}
                    onPress={() => Linking.openURL('https://www.payclub.co/privacy-policy/')}
                  >
                    {' Privacy Policy '}
                  </Text>
                  , as well as our partner Dwolla\'s
                  <Text
                    style={[styles.bottomText, { fontWeight: '700' }]}
                    onPress={() => Linking.openURL('https://www.dwolla.com/legal/tos/')}
                  >
                    {' Terms of Service '}
                  </Text>
                   and
                  <Text
                    style={[styles.bottomText, { fontWeight: '700' }]}
                    onPress={() => Linking.openURL('https://www.dwolla.com/legal/privacy/')}
                  >
                    {' Privacy Policy '}
                  </Text>
                </Text>
              </View>
              <View style={styles.linkItem} >
                <Button
                  onPress={this.removeBankButtonOnPressHandler}
                  style={{ marginVertical: 15, width: '100%', height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#FFF', borderWidth: 2, backgroundColor: 'transaparent' }}
                >
                  <Text style={global([globalColors.white, { fontSize: 14, textAlign: 'center', color: '#FFF', fontFamily: 'Proxima Nova', fontWeight: '700' }])}>
                  Remove bank account
                  </Text>
                </Button>
              </View>
            </View>


          </View>
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

// const withSafeArea = withSafeAreaView(BankDetails, 'top');

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
