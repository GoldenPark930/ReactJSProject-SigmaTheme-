import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View, StyleSheet,
} from 'react-native';
import {
  Text,
  Container,
} from 'native-base';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import SideMenuWrapper from 'react-native-side-menu';
import LinearGradient from 'react-native-linear-gradient';

import { ALL_ROLES, isOwnerOrAdmin } from '../../../../../constants/users/roles';

import { navigationPropTypes } from '../../../../../constants/app/defaults';
import globalColors from '../../../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../../../GlobalCss/globalBackgroundColors';
import GradientHeader from '../../../../../components/gradientHeader';
import Currency from '../../../../../components/currency';
import NavigationService from '../../../../../utils/helpers/navigation-service';

import { REGULAR } from '../../../../../constants/fonts';
import styles, { SIDE_MENU_BASE_WIDTH } from './styles';

const global = styleSheet => StyleSheet.flatten(styleSheet);

const { bool, string, shape, oneOf, func, number } = PropTypes;

class SideBar extends React.Component {
  static propTypes = {
    // Flags
    isOpen: bool.isRequired,
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
    // Functions
    onChange: func.isRequired,
    closeMenu: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  static navigationOptions = () => ({
    header: null,
  });

  getSideMenuContent = () => {
    const color = '#01b8a4';
    const borderColor = 'transparent';
    const { groupData: { enableBalance, name, topic, balance, count, role, imageUrl, members: { totalCount } }, closeMenu } = this.props;
    const memberCount = totalCount;
    return (
      <View style={{ flex: 1 }}>
        <Container style={global([globalBackgroundColors.transparent, { opacity: 1 }])}>
          <LinearGradient colors={['#01b8a4', '#00dca9']} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
          <GradientHeader
            navigation={this.props.navigation}
            closeButtonPosition={0}
            onCloseHandler={closeMenu}
            isGroup
          />
          <View style={{ backgroundColor: 'transparent', justifyContent: 'center', paddingBottom: 20, marginTop: 50 }}>
            <Text
              numberOfLines={2}
              style={
                global([globalColors.white, {
                  fontSize: 28,
                  textAlign: 'center',
                  fontWeight: '100',
                  fontFamily: REGULAR,
                }])}
            >
              {name}
            </Text>
            { topic ?
              <Text
                numberOfLines={2}
                style={
                  global([globalColors.white, {
                    marginTop: 10,
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: '100',
                    fontFamily: REGULAR }])}
              >
                {topic}
              </Text>
              : null}

          </View>

          {enableBalance ?
            isOwnerOrAdmin(role) ?
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <View
                    style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRightColor: globalBackgroundColors.lightgrey, borderRightWidth: 0 }}
                  >
                    <Currency amount={balance} decimalSize={18} color="#FFF" numberSize={32} />
                    <Text
                      numberOfLines={1}
                      style={global([globalColors.royal, {
                        fontSize: 12,
                        textAlign: 'center',
                        fontWeight: '100',
                        fontFamily: REGULAR,
                        color: '#FFF'
                      }])}
                    >
                      Club Balance
                    </Text>

                  </View>
                  <TouchableOpacity
                    style={{ alignItems: 'center', width: '40%', padding: 7, borderRadius: 30, backgroundColor: '#FFF', marginTop: 15 }}
                    onPress={() => this.handleOnPress('GroupTransferBalance')}
                  >
                    <Text
                      numberOfLines={1}
                      style={global([globalColors.white, {
                        fontSize: 12,
                        textAlign: 'center',
                        fontWeight: '700',
                        fontFamily: REGULAR,
                        color
                      }])}
                    >
                      Transfer Balance
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              : null
            : null}


          <View style={{ justifyContent: 'center', marginTop: 40, flexDirection: 'row', borderTopWidth: 10, borderTopColor: borderColor }}>
            <TouchableOpacity
              style={{ alignItems: 'center', width: '80%', padding: 15, borderRadius: 30, backgroundColor: '#FFF' }}
              onPress={() => this.handleOnPress('ManageFriends')}
            >
              <Text
                numberOfLines={1}
                style={global([globalColors.white, {
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '700',
                  fontFamily: REGULAR,
                  color,
                }])}
              >
                {memberCount} Members
              </Text>
            </TouchableOpacity>
          </View>

          {isOwnerOrAdmin(role) ?
            <View style={{ justifyContent: 'center', flexDirection: 'row', borderTopWidth: 10, borderTopColor: borderColor }}>
              <TouchableOpacity
                style={{ alignItems: 'center', width: '80%', borderRadius: 30, padding: 15, backgroundColor: '#FFF' }}
                onPress={() => this.handleOnPress('InviteMoreFriends')}
              >
                <Text
                  numberOfLines={1}
                  style={global([globalColors.white, {
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: '700',
                    fontFamily: REGULAR,
                    color,
                  }])}
                >
                  Add Members
                </Text>
              </TouchableOpacity>
            </View>
            : null}

          <View style={{ justifyContent: 'center', flexDirection: 'row', borderTopWidth: 10, borderTopColor: borderColor, borderBottomWidth: 10, borderBottomColor: borderColor }}>
            <TouchableOpacity
              style={{ alignItems: 'center', width: '80%', borderRadius: 30, padding: 15, backgroundColor: '#FFF' }}
              onPress={() => this.handleOnPress('GroupInnerSettings')}
            >
              <Text
                numberOfLines={1}
                style={global([globalColors.white, {
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '700',
                  fontFamily: REGULAR,
                  color,
                }])}
              >
                Club Settings
              </Text>
            </TouchableOpacity>
          </View>

        </Container>
      </View>
    );
  };

  handleOnPress = (data) => {
    // Close side menu
    this.props.closeMenu();

    // Open target screen
    NavigationService.navigateWithDebounce(upperFirst(camelCase(data)));
    /*
    this.props.resetNavWorkaroundState();
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
    */
  };


  render() {
    const { isOpen, onChange } = this.props;

    return (
      <SideMenuWrapper
        isOpen={isOpen}
        onChange={onChange}
        menuPosition="right"
        bounceBackOnOverdraw
        openMenuOffset={SIDE_MENU_BASE_WIDTH}
        menu={this.getSideMenuContent()}
      >
        {this.props.children}
      </SideMenuWrapper>
    );
  }
}

export default SideBar;
