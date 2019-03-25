import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import ModalEditAmount from '../Members/ModalEditAmount';
import { navigationPropTypes } from '../../../../../constants/app/defaults';

import ListItem from '../../components/ListItem';
import styles from './styles';

class MembersList extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      member: null,
      amount: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.amount !== this.props.amount) {
      this.setState({ amount: nextProps.amount });
    }
  }

      onCustomAmountUpdate = (member, amount) => {
        this.props.onCustomAmountUpdate(member, amount);
        this.hideModal();
        return true;
      }
      showModal = () => this.setState({ isModalVisible: true });
      hideModal = () => this.setState({ isModalVisible: false });

      selectAll = () => {
        this.props.selectAll();
      };

      handleSearch = (text) => {
        this.props.handleSearch(text);
      };

      handleOnSelect = (rowID) => {
        this.props.handleOnSelect(rowID);
      };

      handleOnLongPress = (member) => {
        const sMember = Object.assign({}, member);
        this.setState({
          amount: this.props.customAmounts[member.id],
        });
        this.setState({
          member: sMember,
        });
        this.showModal();
      }

    keyExtractor = item => item.id;

    renderItem = ({ item, index }) => {
      const amount = this.props.customAmounts[item.id];
      if (item.chargeStatus === 'collected' || item.chargeStatus === 'declined') {
        return (
          <ListItem
            item={item}
            amount={amount}
          />
        );
      }
      if (item.chargeStatus === 'uncollected') {
        return (
          <ListItem
            item={item}
            amount={amount}
            handleOnLongPress={() => this.handleOnLongPress(item)}
          />
        );
      }
      return (
        <ListItem
          item={item}
          amount={amount}
          handleOnLongPress={() => this.handleOnLongPress(item)}
          handleOnSelect={() => this.handleOnSelect(index)}
        />
      );
    }

    renderSeparator = () => (
      <View style={styles.listDevider} />
    )

    renderSeparator = () => (
      <View style={styles.listDevider} />
    )
    render() {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.listContainer}
            data={this.props.members}
            extraData={this.props}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <ModalEditAmount
            visible={this.state.isModalVisible}
            onClose={() => this.hideModal()}
            amount={this.state.amount}
            member={this.state.member}
            onCustomAmountUpdate={(member, amount) => this.onCustomAmountUpdate(member, amount)}
          />
        </View>
      );
    }
}

MembersList.propTypes = {
  handleOnSelect: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.number.isRequired,
  onCustomAmountUpdate: PropTypes.func.isRequired,
  customAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  ...navigationPropTypes(PropTypes),
};

export default MembersList;
