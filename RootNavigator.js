import React from 'react';
import {
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SplashScreen from 'react-native-splash-screen';
import { Branch } from 'react-native-branch';


import { StackNavigatorStyles } from './constants/app/defaults';
import SideBar from './screens/SideBar';

// Login
import PhoneNumber from './screens/Login/PhoneNumber';
import PhoneVerification from './screens/Login/PhoneVerification';

// Sign up
import Name from './screens/Signup/screens/Name';
import Email from './screens/Signup/screens/Email';
import Username from './screens/Signup/screens/Username';
import Congratulation from './screens/Signup/screens/Congratulation';
import Permission from './screens/Signup/screens/Permission';
import SignupPhoneNumber from './screens/Signup/screens/PhoneNumber';
import SignupPhoneVerification from './screens/Signup/screens/PhoneVerification';

// Side bar menu views
import MyGroups from './screens/MyGroups';
import InviteFriends from './screens/InviteFriends/InviteFriends';
import GetHelp from './screens/Help/GetHelp';
import TransferToBank from './screens/UserTransferToBank';
import Settings from './screens/Settings';
import Notifications from './screens/Notifications';
import TransactionHistory from './screens/TransactionHistory';

// Manage Group views
import Main from './screens/ManageGroup/Main';
import ChargeGroup from './screens/ManageGroup/ChargeGroup';
import AddMemberToChargeGroup from './screens/ManageGroup/AddMemberToChargeGroup';
import ChargeDetails from './screens/ManageGroup/ChargeDetails';
import ManageFriends from './screens/ManageGroup/ManageFriends';
import InviteMoreFriends from './screens/ManageGroup/InviteMoreFriends';
import GroupBanksAndCards from './screens/ManageGroup/GroupBanksAndCards';
import GroupTransferBalance from './screens/ManageGroup/GroupTransferBalance';
import GroupInnerSettings from './screens/ManageGroup/GroupInnerSettings';
import GroupInnerSettingsChangeGroupName from './screens/ManageGroup/GroupInnerSettings/ChangeGroupName';
import GroupInnerSettingsTransferGroupOwnership from './screens/ManageGroup/GroupInnerSettings/TransferGroupOwnership';

// Create Group views
import NameNewGroup from './screens/CreateGroup/NameNewGroup';
import InviteFriendsToGroup from './screens/CreateGroup/InviteMoreFriends';

// Settings views
import EditProfile from './screens/Settings/EditProfile';
import UserBanksAndCards from './screens/Settings/UserBanksAndCards/';
import AccountSettings from './screens/Settings/AccountSettings';
import DeactivateAccount from './screens/Settings/DeactivateAccount';
import VerifyMyAccount from './screens/Settings/VerifyMyAccount';
import UploadVerificationDocument from './screens/Settings/UploadVerificationDocument';
import Logout from './screens/Settings/Logout';
import BankDetails from './screens/BankDetails';
import ArchivedGroups from './screens/ArchivedGroups';
import Legal from './screens/Settings/Legal';

import Welcome from './screens/Welcome';

import NavigationService from './utils/helpers/navigation-service';
import { setLinkingState, resetLinkingState } from './store/actions/linking';
import { getGroupData, setCurrentlyViewedGroup } from './store/actions/current-group';
import { selectUserData } from './store/selectors/user';
import { StoreUserAccountInfo } from './common/localStorage';

const navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

const lockDrawerNavOptions = {
  drawerLockMode: 'locked-closed',
  header: null,
};

const SignUpNavigator = StackNavigator(
  {
    Name: { screen: Name },
    PhoneNumber: { screen: SignupPhoneNumber },
    PhoneVerification: { screen: SignupPhoneVerification },
    Email: { screen: Email },
    Username: { screen: Username },
    Permission: { screen: Permission },
    Congratulation: { screen: Congratulation },
  },
  {
    navigationOptions,
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

const LoginNavigator = StackNavigator(
  {
    PhoneNumber: { screen: PhoneNumber },
    PhoneVerification: { screen: PhoneVerification },
  },
  {
    navigationOptions,
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

const AuthNavigator = StackNavigator(
  {
    Welcome: { screen: Welcome },
    Login: { screen: LoginNavigator },
    Signup: { screen: SignUpNavigator },
  },
  {
    navigationOptions,
  });

const ManageGroupsNavigator = StackNavigator(
  {
    Main: { screen: Main },
    ChargeGroup: { screen: ChargeGroup },
    AddMemberToChargeGroup: { screen: AddMemberToChargeGroup },
    ChargeDetails: { screen: ChargeDetails },
    ManageFriends: { screen: ManageFriends },
    InviteMoreFriends: { screen: InviteMoreFriends },
    GroupBanksAndCards: { screen: GroupBanksAndCards },
    GroupTransferBalance: { screen: GroupTransferBalance },
    GroupInnerSettings: { screen: GroupInnerSettings },
    GroupInnerSettingsChangeGroupName: { screen: GroupInnerSettingsChangeGroupName },
    GroupInnerSettingsTransferGroupOwnership: { screen: GroupInnerSettingsTransferGroupOwnership },
  },
  {
    navigationOptions,
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

const CreateGroupNavigator = StackNavigator(
  {
    NameNewGroup: { screen: NameNewGroup },
    InviteFriendsToGroup: { screen: InviteFriendsToGroup },
  },
  {
    navigationOptions,
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

const SettingsNavigator = StackNavigator(
  {
    Settings: { screen: Settings },
    EditProfile: { screen: EditProfile },
    AccountSettings: { screen: AccountSettings },
    ArchivedGroups: { screen: ArchivedGroups },
    Legal: { screen: Legal },
    BankDetails: { screen: BankDetails },
    DeactivateAccount: { screen: DeactivateAccount },
    VerifyMyAccount: { screen: VerifyMyAccount },
    UploadVerificationDocument: { screen: UploadVerificationDocument },
    BanksAndCards: { screen: UserBanksAndCards },
    Logout: { screen: Logout },
  },
  {
    navigationOptions,
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

const SideBarNavigator = DrawerNavigator(
  {
    MyGroups: { screen: MyGroups },
    ManageGroup: { screen: ManageGroupsNavigator, navigationOptions: lockDrawerNavOptions },
    CreateGroup: { screen: CreateGroupNavigator },
    InviteFriends: { screen: InviteFriends, navigationOptions },
    GetHelp: { screen: GetHelp, navigationOptions },
    TransferToBank: { screen: TransferToBank },
    Notifications: { screen: Notifications },
    TransactionHistory: { screen: TransactionHistory },
    SettingsNavigator: { screen: SettingsNavigator, navigationOptions: lockDrawerNavOptions },
  },
  {
    drawerWidth: Dimensions.get('window').width,
    contentComponent: props => <SideBar {...props} />,
  },
);

let branchSub = null;

class RootNavigatorContainer extends React.Component {
  async componentDidMount() {
    SplashScreen.hide();

    await StoreUserAccountInfo(this.props.userData);

    const branch = new Branch();
    branch.initSessionTtl = 10000;
    branchSub = branch.subscribe(this.branchNavigation);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (branchSub) {
      branchSub();
      branchSub = null;
    }
  }

  branchNavigation = async ({ error, params }) => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      if (error) return;
      if (params['+non_branch_link']) return;
      if (!params['+clicked_branch_link']) return;
      if (!params.deepLinkPath) return;

      const route = params.deepLinkPath;
      const splitedRoute = route.split('/');

      if (route.match(/TransactionHistory$/m) !== null) NavigationService.navigate('TransactionHistory');
      if (route.match(/VerifyMyAccount$/g) !== null) NavigationService.navigate('VerifyMyAccount');
      if (route.match(/UploadVerificationDocument$/g) !== null) NavigationService.navigate('UploadVerificationDocument');
      if (route.match(/MyClubs$/g) !== null) NavigationService.navigate('MyGroups');
      if (route.match(/MyClub\/\d+$/m) !== null) {
        const groupId = splitedRoute[1];
        this.props.resetLinkingState();
        this.props.getGroupData(groupId, () => {
          NavigationService.navigate('ManageGroup');
        });
      }
      if (route.match(/MyClub\/\d+\/charges$/m) !== null) {
        const groupId = splitedRoute[1];
        const routeName = splitedRoute[0];
        const subRouteName = splitedRoute[2];
        this.props.setLinkingState({
          linked: true,
          routeName,
          subRouteName,
          params: groupId,
        });

        this.props.getGroupData(groupId, () => {
          NavigationService.navigate('ManageGroup');
        });
      }
      if (route.match(/EmailVerification$/m) !== null) {
        const param = splitedRoute[0];
        this.props.setLinkingState({
          linked: true,
          params: param,
        });
      }
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const RootNavigator = StackNavigator(
      {
        Auth: { screen: AuthNavigator },

        MainApp: { screen: SideBarNavigator },
      },
      {
        navigationOptions: { header: null },
        initialRouteName: isLoggedIn ? 'MainApp' : 'Auth',
      },
    );
    return (
      <RootNavigator
        ref={(navigationRef) => { NavigationService.setNavigator(navigationRef); }}
      />
    );
  }
}

RootNavigatorContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLinkingState: PropTypes.func.isRequired,
  resetLinkingState: PropTypes.func.isRequired,
  getGroupData: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  userData: selectUserData(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setLinkingState,
    resetLinkingState,
    getGroupData,
    setCurrentlyViewedGroup,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigatorContainer);

