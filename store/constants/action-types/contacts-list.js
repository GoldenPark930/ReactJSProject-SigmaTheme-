/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

export default {
  /*
  |-----------------------------------------------------------------------------
  | Redux actions types
  |-----------------------------------------------------------------------------
  */

  CONTACTS_LIST__RESET_STATE: 'ContactsList.resetState',
  CONTACTS_LIST__FETCH_ALL_CONTACTS: 'ContactsList.fetchAllContacts',
  CONTACTS_LIST__TRY_TO_FETCH_ALL_CONTACTS: 'ContactsList.tryToFetchAllContacts',

  CONTACTS_LIST__CHECK_PERMISSIONS__START: 'ContactsList.checkPermissions:start',
  CONTACTS_LIST__CHECK_PERMISSIONS__DENIED: 'ContactsList.checkPermissions:denied',
  CONTACTS_LIST__CHECK_PERMISSIONS__UNDEFINED: 'ContactsList.checkPermissions:undefined',
  CONTACTS_LIST__CHECK_PERMISSIONS__FAIL: 'ContactsList.checkPermissions:fail',

  CONTACTS_LIST__REQUEST_PERMISSIONS__START: 'ContactsList.requestPermissions:start',
  CONTACTS_LIST__REQUEST_PERMISSIONS__DENIED: 'ContactsList.requestPermissions:denied',
  CONTACTS_LIST__REQUEST_PERMISSIONS__FAIL: 'ContactsList.requestPermissions:fail',

  CONTACTS_LIST__GET_ALL__START: 'ContactsList.getAll:start',
  CONTACTS_LIST__GET_ALL__SUCCESS: 'ContactsList.getAll:success',
  CONTACTS_LIST__GET_ALL__FAIL: 'ContactsList.getAll:fail',
};
