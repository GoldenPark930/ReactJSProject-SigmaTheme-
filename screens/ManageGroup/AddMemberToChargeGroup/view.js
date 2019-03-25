import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import round from 'lodash/round';

import { retrieveUser } from '../../../common/localStorage';
import { manageGroupApis } from '../../../scripts';
import { navigationPropTypes } from '../../../constants/app/defaults';
import Description from './components/Description';
import Amount from './components/Amount';
import Members from './components/Members';
import Footer from './components/Footer';
import ModalRequest from './components/Modals/Request';
import { MODES } from './constants';
import styles from './styles';
import Header from '../../../components/NewHeader';

class ChargeGroup extends Component {
  static propTypes = {
    ...navigationPropTypes(PropTypes),
  };

  state = {
    isModalVisible: false,
    selectedMembers: [],
    members: [],
    customAmounts: {},
    membersShown: [],
    description: '',
    amount: 0,
    total: 0,
    loading: false,
    selectAllPressed: false,
    mode: MODES.EACH,
    newTotal: 0,
    newAmount: 0,
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    const { id } = this.props.group;
    this.props.getCurrentGroupMembers(id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.members !== nextProps.members) {
      let { members } = nextProps;
      members = members.map((member) => {
        const m = member;
        m.selected = true;
        if (!m.registered) m.firstName = this.formatNumber(m.phone);
        return m;
      });
      this.setState({ members, membersShown: members, selectedMembers: members });
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onValueChange(element, value) {
    const members = element === 'members' ? value : this.state.members;
    const amount = element === 'amount' ? value : this.state.amount;
    const count = members.filter(member => member.selected).length;
    this.setState({ [element]: value, total: amount * count }, function () {
      this.onCustomAmountUpdate();
    });
  }

  onRequest() {
    const { members, amount, description } = this.state;
    const selectedMembers = members.filter(member => member.selected);
    if (amount === 0) return Alert.alert('', 'you can\'t charge for $0');
    if (description === '') return Alert.alert('', 'Description can\'t be blank');
    if (selectedMembers.length === 0) return Alert.alert('', 'Please select one member at least');
    return this.showModal();
  }

  onCustomAmountUpdate = (type, member, amount) => {
    let customAmounts = Object.assign({}, this.state.customAmounts);
    let mode = type;
    if (!mode) {
      mode = this.state.mode;
    }
    const { members } = this.state;
    if (mode !== MODES.CUSTOM) {
      const newCustomAmounts = {};
      // we need to initialize the customAmounts array with selected members.
      const selectedMembers = members.filter(memberItem => memberItem.selected);
      const defaultAmount = this.getAmountForEachSelectedMember(mode);
      selectedMembers.forEach((sMember) => {
        newCustomAmounts[sMember.id] = defaultAmount;
      });

      // This is for total - value difference 
      if (mode === MODES.TOTAL && selectedMembers.length > 0) {
        newCustomAmounts[selectedMembers[selectedMembers.length - 1].id] += round(this.state.amount - selectedMembers.length * defaultAmount, 2);
      }
      customAmounts = newCustomAmounts;
    }
    if (member && member.id) {
      customAmounts[member.id] = amount;
    }
    this.setState({ customAmounts });
    this.setState({ mode });
  }

  getAmountForEachSelectedMember = (type) => {
    let mode = type;
    if (!mode) {
      mode = this.state.mode;
    }
    const { members, amount } = this.state;
    const amountFloat = parseFloat(amount);

    // Mode 'Each'
    if (mode === MODES.EACH) {
      return round(amountFloat, 2);
    }

    // Mode 'Total'
    const count = members
      .filter(member => member.selected)
      .length;

    return round(amountFloat / count, 2);
  };

  getTotal = () => {
    const { mode, total, amount, customAmounts } = this.state;
    if (mode === MODES.CUSTOM) {
      let ctotal = 0;

      if (customAmounts !== undefined) {
        Object.keys(customAmounts).forEach((key) => {
          ctotal += parseFloat(customAmounts[key]);
        });
      }
      return round(ctotal, 2);
    }
    return mode === MODES.EACH ? round(total, 2) : round(amount, 2);
  };

  createChargeRequest = async () => {
    const { members, description, customAmounts } = this.state;
    const selectedMembers = members.filter(member => member.selected);
    this.setState({ loading: true });
    const grinkUserId = await retrieveUser();
    const groupId = this.props.group.id;
    const charges = selectedMembers.map(user => ({
      grinkUserId: user.id,
      amount: customAmounts[user.id] ? customAmounts[user.id] : `${this.getAmountForEachSelectedMember()}`,
      status: 'pending',
    }));
    const data = {
      description,
      groupId,
      grinkUserId,
      charges,
    };

    await manageGroupApis.createChargeRequest(data);
    this.setState({ loading: false, data });
    this.props.navigation.goBack(null);
    return null;
  };

  formatNumber = (phone) => {
    if (!phone) {
      return '';
    }
    const phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
    const newPhone = phone.trim();
    const results = phoneTest.exec(newPhone);
    if (results !== null && results.length > 8) {
      return `(${results[3]}) ${results[4]}-${results[5]}${typeof results[8] !== 'undefined' ? ` x${results[8]}` : ''}`;
    }
    return newPhone;
  }

  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });

  handleSearch(value) {
    const { members } = this.state;
    const toFind = value.toLowerCase();
    const searchResults = [];
    for (let i = 0; i < members.length; i += 1) {
      let fn = `${members[i].firstName}`;
      let ln = `${members[i].lastName}`;
      fn = fn.toLowerCase();
      ln = ln.toLowerCase();
      if (((fn) && (fn.includes(toFind))) || ((ln) && (ln.includes(toFind)))) {
        searchResults.push(members[i]);
      }
    }
    this.setState({ membersShown: searchResults });
  }

  handleOnSelect(index) {
    const { membersShown, members, amount, mode, customAmounts } = this.state;

    // TODO: You can't mutate state directly
    membersShown[index].selected = !membersShown[index].selected;
    if (mode === MODES.CUSTOM) {
      const newCustomAmounts = Object.assign({}, customAmounts);
      if (!membersShown[index].selected) {
        newCustomAmounts[membersShown[index].id] = 0;
      }
      this.setState({ membersShown, customAmounts: newCustomAmounts });
      return;
    }
    // Count Total
    const count = members.filter((member => member.selected)).length;
    this.setState({ membersShown, total: amount * count }, function () {
      this.onCustomAmountUpdate();
    });
  }

  selectAll() {
    const { members, amount } = this.state;
    for (let i = 0; i < members.length; i += 1) {
      members[i].selected = true;
    }
    const count = members.filter((member => member.selected)).length;
    this.setState({ members, total: amount * count });
  }

  toggleModeHandler = (type) => {
    this.onCustomAmountUpdate(type);
    if (this.state.mode !== type) {
      this.setState({ mode: type });
    }
  };


  render() {
    const { loading, isModalVisible, members,
      membersShown, mode, customAmounts } = this.state;
    const { global, content } = styles;
    const count = members.filter(member => member.selected).length;
    const total = this.getTotal();

    return (
      <View style={global.wrapper}>
        <Spinner
          visible={loading}
          textContent="Loading..."
          textStyle={{ color: '#FFF' }}
        />
        <View style={content.wrapper} >
          <Header
            title={this.props.group.name}
            leftActionIcon="ios-arrow-back"
            leftAction={() => {
              this.props.navigation.goBack(null);
            }}
          />
          <Description onValueChange={(type, value) => this.onValueChange(type, value)} />
          <Amount
            onValueChange={(type, value) => this.onValueChange(type, value)}
            eachModeButtonOnPressHandler={() => this.toggleModeHandler(MODES.EACH)}
            totalModeButtonOnPressHandler={() => this.toggleModeHandler(MODES.TOTAL)}
            mode={mode}
          />
          <Members
            members={membersShown}
            amount={this.getAmountForEachSelectedMember()}
            handleOnSelect={index => this.handleOnSelect(index)}
            handleSearch={text => this.handleSearch(text)}
            selectAll={() => this.selectAll()}
            mode={mode}
            customAmounts={customAmounts}
            onCustomAmountUpdate={(member, amount) => this.onCustomAmountUpdate(MODES.CUSTOM, member, amount)}
            navigation={this.props.navigation}
          />
          <Footer total={total} onRequest={() => this.onRequest()} />
        </View>
        <ModalRequest
          visible={isModalVisible}
          onClose={() => this.hideModal()}
          onValidate={() => this.createChargeRequest()}
          groupName={`${this.props.group.name}`}
          total={this.getTotal()}
          selectedMemberCount={count}
          description={this.state.description}
        />
      </View>
    );
  }
}

export default ChargeGroup;
