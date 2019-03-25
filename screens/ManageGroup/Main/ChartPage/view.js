import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, FlatList, ScrollView, View } from 'react-native';
import { navigationPropTypes } from '../../../../constants/app/defaults';
import ChartInfo from './components/ChartInfo';
import ChartDetails from './components/ChartDetails';
import EmptyChartList from './components/EmptyChartList';
import NavigationService from '../../../../utils/helpers/navigation-service';
import styles from './styles';

// TODO: Use Redux to fetch feeds
import { manageGroupApis } from '../../../../scripts';

/**
 |------------------------------------------------------------------------------
 | ChartPage -> Main
 |
 | Content view
 |------------------------------------------------------------------------------
 */

class ChartPage extends Component {
  static propTypes = {
    onSetting: PropTypes.func.isRequired,
    ...navigationPropTypes(PropTypes),
    couldCharge: PropTypes.bool.isRequired,
  };

  state = {
    summary: [],
    isFetching: true,
    selectedIndex: -1,
  };


  componentDidMount() {
    this.loadCharts();
  }

  onSettingPressed() {
    this.props.onSetting();
  }

  getRefreshControlConfig = () => (
    <RefreshControl
      refreshing={this.state.isFetching}
      onRefresh={this.fetchAllCharts}
    />
  );
  fetchAllCharts = () => {
    this.loadCharts();
  };

  toggleDetails(selectedIndex) {
    this.props.navigation.selectedChartIndex = selectedIndex;
    this.setState({ selectedIndex });
  }

  chargeGroup = () => {
    const { navigation } = this.props;
    NavigationService.navigateWithDebounce('ChargeGroup', navigation.state.params);
  };

  loadCharts = async () => {
    this.setState({ isFetching: true });
    const { group } = this.props;
    const groupID = group.id;
    const summary = await manageGroupApis.summaryChargeRequests(groupID);
    this.setState({ summary, isFetching: false });
  };
  chartPageBack = () => {
    this.setState({ selectedIndex: -1 });
  }

  renderItem = item => (
    <ChartInfo
      group={this.props.group}
      key={item.item.id}
      data={item.item}
      onDetails={() => this.toggleDetails(item.index)}
    />
  )

  renderList = items => (
    <ScrollView refreshControl={this.getRefreshControlConfig()}>
      {
        items.length || this.state.isFetching
          ? <FlatList
            data={items}
            initialNumToRender={4}
            extraData={this.props}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />
          : <EmptyChartList
            couldCharge={this.props.couldCharge}
            onChargeGroup={() => this.chargeGroup()}
          />
      }
    </ScrollView>
  );


  renderContent = () => {
    const { summary, selectedIndex } = this.state;
    const { group } = this.props;
    this.props.navigation.chartPageBack = this.chartPageBack;

    return selectedIndex === -1
      ? this.renderList(summary)
      : <ChartDetails
        chargeRequestID={summary[selectedIndex].id}
        group={group}
        onSettingPressed={() => this.onSettingPressed()}
        onDetails={() => this.toggleDetails(-1)}
        navigation={this.props.navigation}
      />;
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderContent()}
      </View>
    );
  }
}

export default ChartPage;
