import { connect } from 'react-redux';

import {
  addUserBank,
  getUserBanksAccountsList,
} from '../../../../../../../store/actions/user';

import PlaidView from './view';

/**
 |--------------------------------------------------------------------------
 | Plaid
 |
 | Redux connection
 |--------------------------------------------------------------------------
 */

const mapDispatchToProps = {
  addUserBank,
  getUserBanksAccountsList,
};

export default connect(null, mapDispatchToProps)(PlaidView);
