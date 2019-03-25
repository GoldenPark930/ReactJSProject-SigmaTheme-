import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectCurrentGroupID,
  selectCurrentGroupBalance,
  selectCurrentGroupData,
  selectCurrentGroupTransferringProcessStatus,
} from '../../../store/selectors/current-group';
import {
  transfertToOwnerBank,
  transfertToOwnerBalance,
  refreshCurrentGroupData,
} from '../../../store/actions/current-group';
import {
  selectUserBanksList,
  selectFetchingUserBanksListProgressStatus,
} from '../../../store/selectors/user';
import {
  getUserBanksAccountsList,
} from '../../../store/actions/user';
import GroupTransferBalanceScreenWrapper from './wrapper';
import withSafeAreaView from '../../../utils/helpers/safe-area-hoc';

/**
 |------------------------------------------------------------------------------
 | Connection to Redux, mapping functions, selectors
 | calls will be placed here if needed
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  groupId: selectCurrentGroupID(state),
  groupBalance: selectCurrentGroupBalance(state),
  groupData: selectCurrentGroupData(state),
  banksAccountList: selectUserBanksList(state),
  transferIsInProgress: selectCurrentGroupTransferringProcessStatus(state),
  fetchingBanksListInProgress: selectFetchingUserBanksListProgressStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    transfertToOwnerBank,
    transfertToOwnerBalance,
    refreshCurrentGroupData,
    getUserBanksAccountsList,
  }, dispatch);

const withSafeArea = withSafeAreaView(GroupTransferBalanceScreenWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(withSafeArea);

