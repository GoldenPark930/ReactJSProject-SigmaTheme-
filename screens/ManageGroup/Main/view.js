import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { Container } from 'native-base';
import ActionButton from 'react-native-action-button';

import { navigationPropTypes } from '../../../constants/app/defaults';
import { isOwnerOrAdmin } from '../../../constants/users/roles';
import CustomIcon from '../../../constants/fonts/custom_icons';
import ChartPage from './ChartPage';
import GroupFeed from './GroupFeed';
import MyFeed from './MyFeed';
import TabGroup from './components/tab-group';
import styles, { CALM, WHITE } from './styles';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';
import NavigationService from '../../../utils/helpers/navigation-service';
import { REGULAR } from '../../../constants/fonts';
import isIPhoneX from '../../../utils/helpers/is-iphone-x';
const isIphoneX = isIPhoneX();

/**
 |------------------------------------------------------------------------------
 | Group settings -> Main
 |
 | Content view
 |------------------------------------------------------------------------------
 */

class MainScreenView extends Component {
  static propTypes = {
    ...navigationPropTypes(PropTypes),
  };

  state = {
    selectedIndex: 0,
    fontLoaded: false,
  };

  /* eslint-disable react/sort-comp */
  tabsMap = {
    ChartPage: 0,
    GroupFeed: 1,
    MyFeed: 2,
  };

  componentWillMount() {
    this.props.navigation.selectedChartIndex = -1;
    const { linked, subRouteName } = this.props.linking;
    if (linked && subRouteName === 'charges') {
      this.switchTab(2);
    }
  }


  getTabStyles = type => [
    styles.tabs[type],
    this.isTabActive(type) ? styles.color.calm : styles.color.royal,
  ];

  isTabActive = type =>
    this.state.selectedIndex === this.tabsMap[type];

  switchTab(tabIndex) {
    this.setState({ selectedIndex: tabIndex });
  }

  inviteMoreFriends = () => {
    NavigationService.navigateWithDebounce('InviteMoreFriends', this.props.group);
  };

  chargeGroup = () => {
    NavigationService.navigateWithDebounce('ChargeGroup');
  };

  groupSetting = () => {
    NavigationService.navigateWithDebounce('GroupSettings', this.props.group);
  };

  addPaymentMethod = () => {
    NavigationService.navigateWithDebounce('BanksAndCards', { parentRoute: 'ManageGroup' });
  };

  couldCharge = group =>
    (!group.enableBalance ? true : isOwnerOrAdmin(group.role))

  render() {
    StatusBar.setBarStyle('dark-content', false);

    const { selectedIndex } = this.state;
    const { group } = this.props;
    const { navigation } = this.props;
    const { content } = styles;
    const keys = Object.keys(group);

    if (keys.length === 0) {
      return <View />;
    }

    return (
      <Container style={content.wrapper}>
        <TabGroup
          style
          onPressHandler={index => this.switchTab(index)}
          selectedIndex={selectedIndex}
          buttons={[
            <CustomIcon
              name="pie-chart"
              style={this.getTabStyles('ChartPage')}
            />,
            <CustomIcon
              name="group"
              style={this.getTabStyles('GroupFeed')}
            />,
            <View>
              <CustomIcon
                name="dollar"
                style={this.getTabStyles('MyFeed')}
              />
              {
                group.charges.totalCount !== 0 &&
                <View style={content.chargesLabelContainer}>
                  <Text style={content.chargesLabelText}>
                    {group.charges.totalCount}
                  </Text>
                </View>
              }
            </View>,
          ]}
        />

        {this.isTabActive('ChartPage') &&
        <ChartPage
          navigation={navigation}
          group={group}
          couldCharge={this.couldCharge(group)}
          onSetting={() => this.groupSetting()}
        />}

        {this.isTabActive('GroupFeed') &&
        <GroupFeed group={group} />}

        {this.isTabActive('MyFeed') &&
        <MyFeed
          addPaymentMethod={() => this.addPaymentMethod()}
          navigation={navigation}
        />}

        {this.couldCharge(group) &&
        <TouchableOpacity
          style={{ backgroundColor: CALM, alignItems: 'center', borderRadius: 25, height: 50, marginBottom: isIphoneX ? 34 : 10, width: '80%', marginHorizontal: '10%', justifyContent: 'center' }}
          onPress={this.chargeGroup}
        >
          <Text style={{ color: WHITE, fontSize: 25, fontFamily: REGULAR }}>New Charge</Text>
        </TouchableOpacity>}
      </Container>
    );
  }
}
export default MainScreenView;

