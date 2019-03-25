import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { manageGroupApis } from '../../../../../../scripts';
import Pie from './components/Pie';
import Members from './components/Members';
import { isOwnerOrAdmin, ALL_ROLES } from '../../../../../../constants/users/roles';
import { navigationPropTypes } from '../../../../../../constants/app/defaults';
import * as Colors from '../../../../../../constants/colors';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | ChartDetails -> ChartPage
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { func, shape, oneOf } = PropTypes;

class ChartDetails extends Component {
  static propTypes = {
    onDetails: func.isRequired,
    onSettingPressed: func.isRequired,
    group: shape({
      role: oneOf(ALL_ROLES).isRequired,
    }).isRequired,
    ...navigationPropTypes(PropTypes),
  };

  state = {
    loading: true,
  };

  componentWillMount() {
    this.loadCharts();
  }

  onDetails() {
    if (this.props.onDetails) this.props.onDetails();
  }

  onSettingPressed() {
    if (this.props.onSettingPressed) this.props.onSettingPressed();
  }


  loadCharts = async () => {
    this.setState({ loading: true });
    const { chargeRequestID } = this.props;
    const data = await manageGroupApis.summaryChargeRequest(chargeRequestID);
    this.setState({ data, loading: false });
  };
  addMemberToChargeGroup = () => {
    const { navigation, chargeRequestID } = this.props;
    const { data } = this.state;
    const navigateAction = NavigationActions.navigate({
      routeName: 'AddMemberToChargeGroup',
      params: { chargeRequestID, data },
    });

    navigation.dispatch(navigateAction);
  };

  render() {
    const { loading, data } = this.state;
    const { group, navigation } = this.props;

    if (loading) return <Spinner />;

    return (
      <ScrollView style={styles.chartDetailsContainer}>
        <Pie
          data={data}
          onSettingPressed={() => this.onSettingPressed()}
          groupRole={group.role}
        />
        <Members
          loadCharts={this.loadCharts}
          data={data}
          onDetails={() => this.onDetails()}
          groupRole={group.role}
        />
        { isOwnerOrAdmin(group.role) ?
          <TouchableOpacity
            style={{ backgroundColor: Colors.GREY, alignItems: 'center', borderRadius: 3, height: 30, marginBottom: 10, marginHorizontal: 10, justifyContent: 'center' }}
            onPress={this.addMemberToChargeGroup}
          >
            <Text style={styles.addMemberToCharge}>Charge another member</Text>
          </TouchableOpacity>
          : null}
      </ScrollView>
    );
  }
}

export default ChartDetails;
