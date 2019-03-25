import { NAV_WORKAROUND } from '../constants/store/upper-level-keys';

export const selectNavWorkaround = (state, key) => state[NAV_WORKAROUND][key] || false;
