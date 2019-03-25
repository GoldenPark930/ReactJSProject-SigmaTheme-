import {
  FacebookActions,
  GoogleActions,
} from '../constants/action-types';

/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

/*
|-------------------------------------------------------------------------------
| Redux actions
|-------------------------------------------------------------------------------
*/

export const facebookLogin = onCallback => ({
  type: FacebookActions.FACEBOOK__LOGIN,
  onCallback,
});

export const googleLogin = onCallback => ({
  type: GoogleActions.GOOGLE__LOGIN,
  onCallback,
});
