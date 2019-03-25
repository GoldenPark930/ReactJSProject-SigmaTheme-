import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, ScrollView, View, Text, ListView, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';

import SelectedMember from './SelectedMember';
import styles, { GradientColors } from './styles';
import ModalEditAmount from './ModalEditAmount';
import * as Colors from '../../../../../constants/colors';
import { navigationPropTypes } from '../../../../../constants/app/defaults';

/**
 |------------------------------------------------------------------------------
 | Create charge Members list
 |------------------------------------------------------------------------------
 */

const { number, func, object, arrayOf } = PropTypes;

class Members extends Component {
  static propTypes = {
    handleOnSelect: func.isRequired,
    handleSearch: func.isRequired,
    selectAll: func.isRequired,
    members: arrayOf(object).isRequired,
    amount: number.isRequired,
    onCustomAmountUpdate: func.isRequired,
    customAmounts: arrayOf(number).isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      member: null,
      amount: 0,
    };
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.amount !== this.props.amount) {
      this.setState({ amount: nextProps.amount });
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */


  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */
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

  renderMember(member, sectionID, rowID) {
    const amount = this.props.customAmounts[member.id] ? this.props.customAmounts[member.id] : this.state.amount;
    return (
      <SelectedMember
        amount={amount}
        member={member}
        handleOnLongPress={() => this.handleOnLongPress(member)}
        handleOnSelect={() => this.handleOnSelect(rowID)}
      />
    );
  }
  renderPlus = () => (
    <View style={styles.plusContainer}>
      <ActionButton
        size={50}
        buttonColor={Colors.CALM}
        position="center"
        onPress={() => this.props.navigation.navigate('InviteMoreFriends')}
      />
    </View>
  )

  render() {
    const { members } = this.props;
    const memberCount = members.length;


    return (
      <View style={styles.wrapper}>
        <ModalEditAmount
          visible={this.state.isModalVisible}
          onClose={() => this.hideModal()}
          amount={this.state.amount}
          member={this.state.member}
          onCustomAmountUpdate={(member, amount) => this.onCustomAmountUpdate(member, amount)}
        />
        { memberCount >= 25 ?
          <View style={styles.rowContainer}>
            <View style={styles.searchContainer}>
              <Icon name="ios-search" style={styles.icon} />
              <TextInput
                placeholder="search friends"
                placeholderTextColor="#AAA"
                underlineColorAndroid="transparent"
                style={styles.input}
                onChangeText={this.handleSearch}
              />
            </View>
            <TouchableOpacity onPress={this.selectAll} style={styles.button} >
              <Text style={styles.textButton} >select all</Text>
            </TouchableOpacity>
          </View>
          : null }
        <ScrollView style={styles.scroll}>
          <ListView
            contentContainerStyle={styles.listContainer}
            enableEmptySections
            dataSource={this.dataSource.cloneWithRows(members)}

            renderRow={(member, sectionID, rowID) => this.renderMember(member, sectionID, rowID)}
            renderFooter={() => this.renderPlus()}
          />
        </ScrollView>
        <LinearGradient colors={GradientColors} style={styles.shadow} />
      </View>
    );
  }
}

export default Members;
