import ContactsListActions from '../constants/action-types/contacts-list';

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

export const getAllContactsListData = () => ({
  type: ContactsListActions.CONTACTS_LIST__FETCH_ALL_CONTACTS,
});

export const tryToGetContactsListData = () => ({
  type: ContactsListActions.CONTACTS_LIST__TRY_TO_FETCH_ALL_CONTACTS,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga API call actions
|-------------------------------------------------------------------------------
*/
