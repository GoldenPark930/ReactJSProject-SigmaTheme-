import { connect } from 'react-redux';

import MyFeed from './view';

import { acceptCharge } from '../../../../store/actions/charges';
import {
  acceptedChargeId,
  acceptChargesIsInProgress,
} from '../../../../store/selectors/charges';
import { selectCurrentGroupID } from '../../../../store/selectors/current-group';

/**
 |--------------------------------------------------------------------------
 | MyFeed
 |
 | Redux connection
 |--------------------------------------------------------------------------
 */

const mapStateToProps = state => ({
  currentGroupId: selectCurrentGroupID(state),
  acceptedChargeId: acceptedChargeId(state),
  acceptChargesInProgress: acceptChargesIsInProgress(state),
});

const mapDispatchToProps = {
  acceptCharge,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyFeed);
