export const OWNER = 'owner';
export const ADMIN = 'admin';
export const MODERATOR = 'moderator';
export const MEMBER = 'member';

export const isOwner = role => role === OWNER;
export const isOwnerOrAdmin = role => role === OWNER || role === ADMIN;

export const ALL_ROLES = [
  OWNER,
  ADMIN,
  MODERATOR,
  MEMBER,
];

/*

The `ROLES` (now it's `ALL_ROLES`) export is used in PropTypes validation.
This is not a default export where we usually export everything.

-----

Example:
  import { ALL_ROLES } from 'src/constants/users/roles';

  propTypes = {
    role: oneOf(ALL_ROLES).isRequired,
  };

Where `oneOf` rule accepts an array of values and user role can't be a function.

-----

Old version

export const ROLES = [
  OWNER,
  ADMIN,
  MODERATOR,
  MEMBER,
  isOwner,
  isOwnerOrAdmin,
];

 */
