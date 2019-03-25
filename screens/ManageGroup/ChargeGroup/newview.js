import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import round from 'lodash/round';

import CurrencyInput from '../../../components/currencyInput';
import EachButton from './components/EachButton';
import Header from './components/Header';
import Currency from '../../../components/currency';
import MembersList from './components/MembersList';


import { retrieveUser } from '../../../common/localStorage';
import { manageGroupApis } from '../../../scripts';
import { navigationPropTypes } from '../../../constants/app/defaults';
import ModalRequest from './components/Modals/Request';
import { MODES } from './constants';
import NavigationService from '../../../utils/helpers/navigation-service';

import {
  CALM,
  LIGHT_GREY,
  BLACK,
} from '../../../constants/colors';
import styles from './newstyle';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;

class ChargeGroup extends Component {
  static propTypes = {
    ...navigationPropTypes(PropTypes),
  };

  constructor(props) {
    super(props);
    this.state = {
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
  }

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

    if (amount === '.') {
      return;
    }
    
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
    this.hideModal();
    this.props.navigation.goBack(null);
    this.setState({ loading: false, data });
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

    const newMembersShown = membersShown.slice(0);
    newMembersShown[index].selected = !newMembersShown[index].selected;

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

    const count = members.filter(member => member.selected).length;
    const total = this.getTotal();
    return (
      <View style={styles.container}>
        <Header
          title={this.props.group.name}
          closed={this.props.group.enableBalance}
          imageUrl={this.props.group.imageUrl}
          onLeftPress={() => {
            this.props.navigation.goBack(null);
          }}
        />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={styles.reasonInput}
            onChangeText={text => this.onValueChange('description', text)}
            autoCapitalize="none"
            authCorrect={false}
            underlineColorAndroid="transparent"
            selectionColor={CALM}
            placeholderTextColor={LIGHT_GREY}
            placeholder="What's it is for?"
          />
          {/* <Text style={styles.underReasonNoteText}>
            Due Now
          </Text> */}

          <CurrencyInput
            style={styles.moneyInput}
            onCurrencyChange={value => this.onValueChange('amount', value)}
            numberSize={isSmall ? 60 : 58}
          />

          <EachButton
            each={mode === MODES.EACH}
            onEachPress={() => { this.toggleModeHandler(MODES.EACH); }}
            onTotalPress={() => { this.toggleModeHandler(MODES.TOTAL); }}
          />

          <Text style={styles.hintText}>
            (Or press and hold any member for custom amount)
          </Text>

          <MembersList
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

          <TouchableOpacity
            style={styles.addMemberButtonContainer}
            onPress={() => { NavigationService.navigateWithDebounce('InviteMoreFriends'); }}
          >
            <Text style={styles.addMemberButtonText}>
                Invite New Members
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.requestButtonContainer}
            onPress={() => this.onRequest()}
          >
            <Text style={styles.requestButtonText}>
              Request
            </Text>
          </TouchableOpacity>
          <View style={styles.totalAmountContainer}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalAmountText}>
                  Total:
              </Text>
              <Currency
                color={BLACK}
                amount={total % 1 === 0 ?
                  total :
                  total.toFixed(2)}
                numberSize={16}
              />
            </View>
            {/*  <Text style={styles.totalAmountNote}>
                  Members + Charges
            </Text> */}
          </View>
        </View>
        <ModalRequest
          visible={isModalVisible}
          loading={this.state.loading}
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
