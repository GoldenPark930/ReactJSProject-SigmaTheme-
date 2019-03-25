import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StatusBar,
  Text,
  StyleSheet,
  AsyncStorage,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  Button,
  Container,
  Body,
  Header,
  Left,
  Right,
  Icon,
  Item,
  Input,
  View,
} from 'native-base';

import { tryToGetContactsListData } from '../../store/actions/contacts-list';
import {
  getAllGroups,
  getFirstStepOfAllGroups,
} from '../../store/actions/groups';
import {
  setCurrentlyViewedGroup,
  clearCurrentlyViewedGroup,
} from '../../store/actions/current-group';
import {
  selectStep,
  selectSkip,
  selectAllGroups,
  selectAllGroupsTotalCount,
  selectGetAllGroupsDataProgessStatus,
  selectGetFirstStepOfAllGroupsProgressStatus,
} from '../../store/selectors/groups';
import { resetLinkingState } from '../../store/actions/linking';
import { selectLinkingObj } from '../../store/selectors/linking';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import globalBorderColors from '../../GlobalCss/globalBorderColors';
import { getLocalImage, getLocalIcon } from '../../utils/helpers';
import { navigationPropTypes } from '../../constants/app/defaults';
import GroupItem from './components/GroupItem';
import * as Colors from '../../constants/colors';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import { REGULAR } from '../../constants/fonts';
import NavigationService from '../../utils/helpers/navigation-service';
import styles from './styles';

const codeLength = 4;
const limit = 8;

class MyGroupsNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupsShown: [],
      username: '',
      firstname: '',
      lastname: '',
      status: '',
      userId: null,
      fetchingGroupList: false,
      inviteCode: new Array(codeLength).fill(''),
      invited: false,
      emailModal: true,
      timer: 0,
    };
    setTimeout(() => {
      this.setState({
        timer: 1,
      });
    });

    // Try to get contacts list in the background
    // props.tryToGetContactsListData();
  }

  async componentDidMount() {
    this.props.clearCurrentlyViewedGroup();
    this.props.getFirstStepOfAllGroups(this.props.step);
    await this.loadProfileInfo();
  }

  onSearchHandle = (value) => {
    const { groups } = this.props;

    const toFind = value.toLowerCase();
    const searchResults = [];
    for (let i = 0; i < groups.length; i += 1) {
      let n = `${groups[i].group.name}`;
      n = n.toLowerCase();
      if ((n) && (n.includes(toFind))) {
        searchResults.push(groups[i]);
      }
    }
    this.setState({ groupsShown: searchResults });
  };

  onSingleGroupPressHandler = (item) => {
    this.goToGroup(item);
  };

  onInviteCodeValueChange = (index, text) => {
    const code = text.slice(-1);
    const { inviteCode } = this.state;
    inviteCode[index] = code;
    this.setState({ inviteCode });
    inviteCode[index] = code;

    if (index < codeLength - 1 && code !== '') this[`input_${index + 1}`].focus();
    else if (index === 3) {
      this.verifyInviteCode();
    }
  };

  onVerifyDocumentPress = () => {
    NavigationService.navigateWithDebounce('UploadVerificationDocument');
  }

  onVerifyAccountPress = () => {
    NavigationService.navigateWithDebounce('VerifyMyAccount');
  }

  onGroupListRefreshHandler = async () => {
    // Show pull to refresh spinner
    this.setState({ fetchingGroupList: true });

    this.props.getFirstStepOfAllGroups(this.props.step);
    // Hide pull to refresh spinner and store fetched groups
    this.setState({
      fetchingGroupList: false,
    });
  };

  loadProfileInfo = async () => {
    const profileInfo = await AsyncStorage.multiGet(['username', 'firstname', 'lastname', 'id', 'invited', 'status']);
    if (profileInfo[0][0] != null) {
      const username = profileInfo[0][1];
      const firstname = profileInfo[1][1];
      const lastname = profileInfo[2][1];
      const userId = profileInfo[3][1];
      const status = profileInfo[5][1];

      // we need to store this info on localstorage
      const invited = profileInfo[4][1] === null ? false : profileInfo[4][1];

      this.setState({ username, firstname, lastname, userId, invited, status });
    }
  }

  loadMoreContentAsync = async () => {
    const { groups, groupsTotalCount, isFetching, isFirstFetching } = this.props;

    if (groups.length < groupsTotalCount && !isFetching && !isFirstFetching) {
      this.props.getAllGroups(this.props.step, this.props.skip);
    }
  }

  verifyInviteCode = () => {
    const { inviteCode } = this.state;
    if (inviteCode.toString() === '1,9,1,3') {
      this.setState({ invited: true });
      AsyncStorage.setItem('invited', 'true');
    }
  }

  async goToGroup(group) {
    await this.props.setCurrentlyViewedGroup(group);

    NavigationService.navigateWithDebounce('ManageGroup');
  }


  renderSingleGroup = ({ item }) => (
    <GroupItem
      item={item}
      onSingleGroupPressHandler={this.onSingleGroupPressHandler}
    />
  )

  render() {
    const { username, groupsShown, invited, inviteCode, userId, status } = this.state;
    const { groups, groupsTotalCount, isFetching, linking } = this.props;
    const { navigate } = this.props.navigation;

    const keyboardAvoidingProps = Platform.OS === 'ios' ?
      { behavior: 'padding', keyboardVerticalOffset: 75 } : {};

    return (
      <Container style={styles.inviteOnlyCodeBackgroundContainer}>

        <StatusBar barStyle={'dark-content'} style={StyleSheet.flatten([globalBackgroundColors.blue])} />
        <Header style={StyleSheet.flatten([globalBackgroundColors.blue, styles.myClubsHeader])}>
          <LinearGradient
            colors={['#007ed2', '#1c9cdb']}
            style={{ flex: 1, flexDirection: 'row', marginLeft: -10, marginRight: -10, paddingLeft: 10, paddingRight: 5 }}
          >
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                onPress={() => {
                  Keyboard.dismiss();
                  navigate('DrawerOpen', { username });
                }}
              >
                <Image
                  resizeMode="contain"
                  style={styles.profileIcon}
                  source={getLocalIcon('profileIcon')}
                />
              </Button>
            </Left>
            <Body style={{ flex: 1, alignItems: 'center' }}>
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={getLocalImage('payClubLogoWhite')}
              />
            </Body>
            <Right style={{ flex: 1 }}>
              <Button
                transparent
                onPress={() => NavigationService.navigateWithDebounce('CreateGroup')}
              >
                <Image
                  resizeMode="contain"
                  style={styles.addIcon}
                  source={getLocalIcon('addIcon')}
                />
              </Button>
            </Right>
          </LinearGradient>
        </Header>
        <Container style={StyleSheet.flatten([globalBackgroundColors.white, { marginVertical: 0 }])}>
          {groupsTotalCount >= 10000 ? // we need to put this back to 10 once we create the ajax search
      <Header
        noShadow
        searchBar
        style={StyleSheet.flatten([globalBackgroundColors.white])}
      >
        <Item
          regular
          style={StyleSheet.flatten([globalBorderColors.white, { backgroundColor: Colors.WHITE, height: 40 }])}
        >
          <Icon name={'ios-search'} />
          <Input
            placeholder={'Search clubs'}
            placeholderTextColor={Colors.LIGHT_GREY}
            style={{ padding: 0, fontFamily: REGULAR }}
            onChangeText={value => this.onSearchHandle(value)}
          />
        </Item>
      </Header>
            : null}

          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
            {...keyboardAvoidingProps}
          >
            {(groups.length > 0 && this.state.timer === 1) &&
              <FlatList
                initialNumToRender={4}
                onEndReached={this.loadMoreContentAsync}
                onEndReachedThreshold={0.1}
                data={groupsShown.length === 0 ? groups : groupsShown}
                keyExtractor={item => item.groupId}
                renderItem={this.renderSingleGroup}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.fetchingGroupList}
                    onRefresh={this.onGroupListRefreshHandler}
                  />
                }
              />
            }
            {
              groups.length === 0 && (
                <View style={{ width: '100%', padding: 30, marginTop: '90%' }}>
                  <Button
                    style={{ backgroundColor: '#2172c2', borderRadius: 30, width: '100%', height: 60, textAlign: 'center' }}
                    onPress={() => NavigationService.navigateWithDebounce('CreateGroup')}
                  >
                    <Text style={{ color: '#fff', textAlign: 'center', width: '90%', marginLeft: '5%', fontWeight: '700', background: 'transparent', fontFamily: REGULAR, fontSize: 18 }}>Start Your First Club</Text>
                  </Button>
                </View>
              )
            }
          </KeyboardAvoidingView>

        </Container>


        <Modal isVisible={false && !invited && isFetching === false && userId !== null}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>

                <View>
                  <Text style={styles.inviteOnlyTextTop}>
                    You must have an invite code to join Payclub.
                  </Text>
                </View>

                <View style={styles.inviteOnlyInputContainer}>
                  {
                    inviteCode.map((code, index) => (
                      <TextInput
                        ref={(ref) => { this[`input_${index}`] = ref; }}
                        key={`input:${index}`}
                        returnKeyType={index < codeLength - 1 ? 'next' : 'done'}
                        autoFocus={index === 0}
                        placeholder={'X'}
                        placeholderTextColor={Colors.LIGHT_GREY}
                        underlineColorAndroid={Colors.CALM}
                        onChangeText={text => this.onInviteCodeValueChange(index, text)}
                        keyboardType="phone-pad"
                        style={styles.inviteOnlyInputCodeText}
                        value={code}
                        onSubmitEditing={() => {
                          if (index < codeLength - 1) this[`input_${index + 1}`].focus();
                        }}
                      />
                    ))
                  }
                </View>
                <View>
                  <Text style={styles.inviteOnlyTextBottom}>
                    Enter your secret code above.
                  </Text>
                  <Text style={styles.inviteOnlyTextBottomSmall}>
                    (Don't have a code? Invites will be sent soon. Otherwise, ask your friends for a code)
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal isVisible={linking.linked && linking.params === 'EmailVerification' && this.state.emailModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.emailModalText}>
                Thank you for verifying your email!
              </Text>
              <TouchableOpacity
                style={styles.emailModalButtonContainer}
                onPress={() => {
                  this.setState({
                    emailModal: false,
                  });
                  this.props.resetLinkingState();
                }}
              >
                <Text style={styles.emailModalButtonText}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}
const { func, number, objectOf, any } = PropTypes;
MyGroupsNavigator.propTypes = {
  linking: objectOf(any).isRequired,
  groupsTotalCount: number.isRequired,
  skip: number.isRequired,
  step: number.isRequired,
  getAllGroups: func.isRequired,
  resetLinkingState: func.isRequired,
  getFirstStepOfAllGroups: func.isRequired,
  setCurrentlyViewedGroup: func.isRequired,
  tryToGetContactsListData: func.isRequired,
  clearCurrentlyViewedGroup: func.isRequired,
  ...navigationPropTypes(PropTypes),
};

const mapStateToProps = state => ({
  skip: selectSkip(state),
  step: selectStep(state),
  groups: selectAllGroups(state),
  linking: selectLinkingObj(state),
  groupsTotalCount: selectAllGroupsTotalCount(state),
  isFetching: selectGetAllGroupsDataProgessStatus(state),
  isFirstFetching: selectGetFirstStepOfAllGroupsProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getAllGroups,
    resetLinkingState,
    setCurrentlyViewedGroup,
    tryToGetContactsListData,
    clearCurrentlyViewedGroup,
    getFirstStepOfAllGroups,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupsNavigator);
