import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Thumbnail } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { navigationPropTypes } from '../../../constants/app/defaults';
import Header from '../../../components/header';
import CustomIcon from '../../../constants/fonts/custom_icons';

import headerStyles from '../../../GlobalCss/header-styles';
import { ALL_ROLES } from '../../../constants/users/roles';
import SideMenu from './components/SideMenu';
import MainScreenView from './view';
import { REGULAR } from '../../../constants/fonts';
import NavigationService from '../../../utils/helpers/navigation-service';
import styles from './styles';


export default class MainScreenWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }

  onSideMenuStateChangeHandler = (isMenuOpened) => {
    this.setState({ isMenuOpened });
  };


  settingsButtonOnPressHandler = () => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };

  backButtonOnPressHandler = () => {
    if (this.props.navigation.selectedChartIndex === -1) {
      NavigationService.navigateWithDebounce('MyGroups');
    } else {
      this.props.navigation.selectedChartIndex = -1;
      this.props.navigation.chartPageBack();
    }
  };

  closeSideMenu = () => {
    this.setState({ isMenuOpened: false });
  };


  render() {
    const { isMenuOpened } = this.state;
    const { navigation, groupData, linking } = this.props;
    return (
      <View style={styles.global.wrapper}>
        <SideMenu
          navigation={navigation}
          isOpen={isMenuOpened}
          onChange={this.onSideMenuStateChangeHandler}
          closeMenu={this.closeSideMenu}
          groupData={groupData}
        >
          <Header
            styles={styles.header.wrapper}
            left={
              <TouchableOpacity
                style={headerStyles.buttonWrapper}
                onPress={this.backButtonOnPressHandler}
              >
                <CustomIcon
                  name="back"
                  style={headerStyles.backButton}
                />
              </TouchableOpacity>
            }
            middle={
              <Text style={headerStyles.text}>                
                <Text style={[headerStyles.text, { fontFamily: REGULAR }]}>
                  {groupData.name}
                </Text>
                <Text> </Text>
                <FontAwesome>
                  {groupData.enableBalance ?
                    Icons.lock :
                    Icons.unlock}
                </FontAwesome>
              </Text>
            }
            right={
              <TouchableOpacity
                style={headerStyles.buttonWrapper}
                onPress={this.settingsButtonOnPressHandler}
              >
                <Thumbnail
                  circular
                  style={styles.header.thumbnail}
                  source={{ uri: groupData.imageUrl }}
                />
              </TouchableOpacity>
            }
          />
          <MainScreenView
            navigation={navigation}
            group={groupData}
            linking={linking}
          />
        </SideMenu>
      </View>
    );
  }
}

MainScreenWrapper.defaultProps = {
  linking: {
    linked: false,
  },
};

const { bool, number, string, shape, oneOf } = PropTypes;
MainScreenWrapper.propTypes = {
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
  resetLinkingState: PropTypes.func.isRequired,
  getGroupData: PropTypes.func.isRequired,
  linking: shape({
    linked: bool.isRequired,
    routeName: string.isRequired,
    subRouteName: string.isRequired,
    params: string.isRequired,
  }),
  ...navigationPropTypes(PropTypes),
};
