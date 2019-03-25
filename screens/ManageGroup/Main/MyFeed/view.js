import React from 'react';
import { ListView, Alert, ScrollView, RefreshControl, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ModalAccept from './components/ModalAccept';
import ModalDecline from './components/ModalDecline';
import SingleChargeModel from './components/SingleChargeModel';
import EmptyChargeList from './components/EmptyChargeList';
import { getUserData } from '../../../../store/actions/user';
import styles from './styles';

import { manageGroupApis, bankAndCardApis } from '../../../../scripts';


/**
 |------------------------------------------------------------------------------
 | Feed screen view
 |------------------------------------------------------------------------------
 */

class MyFeed extends React.Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      charges: [],
      banks: [],
      isFetching: true,
      acceptCharge: -1,
      declineCharge: -1,
    };
  }

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  async componentWillMount() {
    await this.loadBankAccounts();
    await this.loadChargeList();
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handler
  |-----------------------------------------------------------------------------
  */

  hideModals = async () => this.setState({ acceptCharge: -1, declineCharge: -1 });

  showModals = (action, index, item) => this.setState({
    acceptCharge: action === 'accept' ? index : -1,
    declineCharge: action === 'decline' ? index : -1,
    amount: item.amount,
  });

  acceptValidate = (command) => {
    const { charges, acceptCharge } = this.state;
    const chargeId = charges[acceptCharge].id;
    switch (command.action) {
      case 'balance':
        this.acceptChargeRequest(chargeId, 'grinkAccount');
        this.hideModals();
        break;
      case 'bank':
        this.acceptChargeRequest(chargeId, 'bankAccount', command.id);
        this.hideModals();
        break;
      default:
        this.hideModals();
        break;
    }
  }

  declineConfirm = (cause) => {
    const { charges, declineCharge } = this.state;
    const chargeId = charges[declineCharge].id;
    this.rejectChargeRequest(chargeId, cause);
    this.hideModals();
  }

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

 getRefreshControlConfig = () => (
   <RefreshControl
     refreshing={this.state.isFetching}
     onRefresh={this.loadChargeList}
   />
 );

  loadChargeList = async () => {
    this.setState({ isFetching: true });
    const { currentGroupId } = this.props;
    const charges = await manageGroupApis.listCharges(currentGroupId);
    this.setState({ charges, isFetching: false, acceptCharge: -1, declineCharge: -1 });
  }

  loadBankAccounts = async () => {
    const banks = await bankAndCardApis.getUserBankAccounts();
    this.setState({ banks });
  }

  acceptChargeRequest = async (chargeId, action, accountId) => {
    this.props.acceptCharge(chargeId, { action, accountId }, () => {
      this.props.getUserData();
      this.loadChargeList();
    });

    // const result = await manageGroupApis.acceptCharge(data);
    // if (result.error) return this.handleChargeError(result);
  }

  rejectChargeRequest = async (chargeId, cause) => {
    const data = { chargeId, cause };
    const result = await manageGroupApis.declineCharge(data);
    if (result.error) return this.handleChargeError(result);
    return this.loadChargeList();
  }

  addPaymentMethod = () => this.props.addPaymentMethod();

  handleChargeError = async result => Alert.alert(result.error.name, result.error.message);

  renderModal() {
    const { acceptCharge, declineCharge, amount } = this.state;

    if (acceptCharge !== -1 && this.state) {
      return (<ModalAccept
        visible
        onClose={this.hideModals}
        onValidate={this.acceptValidate}
        banks={this.state.banks}
        amount={amount}
        addPaymentMethod={this.addPaymentMethod}
        navigation={this.props.navigation}
      />);
    }

    if (declineCharge !== -1) {
      return (<ModalDecline
        visible
        onClose={this.hideModals}
        onValidate={this.declineConfirm}
      />);
    }

    return null;
  }

  renderItem = item => (
    <SingleChargeModel
      data={item.item}
      key={item.item.id}
      acceptChargesInProgress={this.props.acceptChargesInProgress}
      acceptedChargeId={this.props.acceptedChargeId}
      onPress={action => this.showModals(action, item.index, item.item)}
    />
  )

  renderList() {
    const { charges, isFetching } = this.state;

    return charges.length || isFetching
      ? <FlatList
        data={charges}
        initialNumToRender={4}
        extraData={this.props}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
      />
      : <EmptyChargeList />;
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderModal()}

        <ScrollView refreshControl={this.getRefreshControlConfig()}>
          {this.renderList()}
        </ScrollView>
      </View>
    );
  }
}

MyFeed.propTypes = {
  getUserData: PropTypes.func.isRequired,
  addPaymentMethod: PropTypes.func.isRequired,
  acceptCharge: PropTypes.func.isRequired,
  acceptChargesInProgress: PropTypes.bool.isRequired,
  acceptedChargeId: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserData,
  }, dispatch);

export default connect(null, mapDispatchToProps)(MyFeed);
