import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectTransactionHistoryList,
  selectFetchingTransactionHistoryListProgressStatus,
  selectUserData,
} from '../../store/selectors/user';
import {
  getUserTransactionHistoryList,
} from '../../store/actions/user';
import TransactionHistoryWrapper from './wrapper';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Transaction History
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  transactionHistoryList: selectTransactionHistoryList(state),
  fetchingTransactionHistoryListInProgress: selectFetchingTransactionHistoryListProgressStatus(state),
  userData: selectUserData(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserTransactionHistoryList,
  }, dispatch);


const withSafeArea = withSafeAreaView(TransactionHistoryWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

