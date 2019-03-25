import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toLower } from 'lodash';

import GroupItem from './GroupItem';
import ArchivedGroupsView from './view';
import { getArchivedGroups } from '../../store/actions/my-groups';
import {
  selectArchivedGroupsData,
  selectArchivedGroupsRequestProgressStatus,
} from '../../store/selectors/my-groups';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';


class ArchivedGroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchGroups: [],
    };
  }

  componentDidMount() {
    this.props.getArchivedGroups();
  }

  onSearchHandle = (searchText) => {
    const searchGroups = this.props.archivedGroups
      .filter(({ group }) => toLower(group.name)
        .indexOf(toLower(searchText).trim()) !== -1);

    this.setState({
      searchGroups,
      searchText,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  keyExtractor = item => item.group.id;

  renderGroupItem = ({ item }) =>
    (<GroupItem
      data={item}
    />)

  render() {
    const { searchText, searchGroups } = this.state;
    const { archivedGroups, isPending } = this.props;
    return (
      <ArchivedGroupsView
        onSearchHandle={this.onSearchHandle}
        groupsData={searchText === '' ? archivedGroups : searchGroups}
        keyExtractor={this.keyExtractor}
        renderGroupItem={this.renderGroupItem}
        leftAction={this.goBack}
        isPending={isPending}
      />
    );
  }
}

ArchivedGroupsContainer.propTypes = {
  getArchivedGroups: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  archivedGroups: PropTypes.array.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  archivedGroups: selectArchivedGroupsData(state),
  isPending: selectArchivedGroupsRequestProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getArchivedGroups,
  }, dispatch);

const withSafeArea = withSafeAreaView(ArchivedGroupsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

