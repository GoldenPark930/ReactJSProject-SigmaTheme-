import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectUserBanksList,
  selectAddingBankAccountProgressStatus,
  selectFetchingUserBanksListProgressStatus,
} from '../../../../../store/selectors/user';
import {
  getUserBanksAccountsList,
} from '../../../../../store/actions/user';
import BanksScreenView from './view';

/**
 |------------------------------------------------------------------------------
 | Banks
 |
 | Redux connection
 |------------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  fetchingIsInProgress: selectFetchingUserBanksListProgressStatus(state),
  addingBankAccountIsInProgress: selectAddingBankAccountProgressStatus(state),
  banks: selectUserBanksList(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserBanksAccountsList,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BanksScreenView);
