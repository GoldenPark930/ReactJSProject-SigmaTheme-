import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankDetails from './BankDetails';
import {
  removeUserBank,
  getUserBanksAccountsList,
} from '../../store/actions/user';
import { selectRemovingUserBankProgressStatus } from '../../store/selectors/user';

class BankDetailsContainer extends Component {
  onBackPress = () => {
    this.props.navigation.goBack();
  }

  onPaymentToFriendsPress = () => {
  }

  onAuthorizedMerchPress = () => {
  }

  onRemovePress = () => {
    this.props.removeUserBank(this.props.navigation.state.params.bankId, () => {
      this.props.getUserBanksAccountsList();
      this.onBackPress();
    },
    );
  }

  render() {
    return (
      <BankDetails
        bankName={this.props.navigation.state.params.bankName}
        cardNumber={this.props.navigation.state.params.cardNumber}
        onBackPress={this.onBackPress}
        onPaymentToFriendsPress={this.onPaymentToFriendsPress}
        onAuthorizedMerchPress={this.onAuthorizedMerchPress}
        onRemovePress={this.onRemovePress}
        isPending={this.props.isPending}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => ({
  isPending: selectRemovingUserBankProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    removeUserBank,
    getUserBanksAccountsList,
  }, dispatch);

BankDetailsContainer.propTypes = {
  isPending: PropTypes.bool.isRequired,
  removeUserBank: PropTypes.func.isRequired,
  getUserBanksAccountsList: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsContainer);
