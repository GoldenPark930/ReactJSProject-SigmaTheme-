import { createSelector } from 'reselect';
import lowerCase from 'lodash/lowerCase';
import head from 'lodash/head';
import uniqBy from 'lodash/uniqBy';

import { CONTACT_USER } from 'src/constants/users/types';
import { FULL_MODEL, CROPPED_MODEL } from 'src/constants/app/globals';
import { CONTACTS_LIST } from '../constants/store/upper-level-keys';

export const selectContactsListRequestProgressStatus = state =>
  state[CONTACTS_LIST].get('requestIsInProgress');

const selectContactsListFullModel = state =>
  state[CONTACTS_LIST].get('contacts').toJS();

const selectContactsListCroppedModel = createSelector(
  selectContactsListFullModel,
  contacts => contacts
  // Select only needed properties
    .map(contact => ({
      type: CONTACT_USER,
      id: contact.recordID,

      firstName: contact.givenName,
      lastName: contact.familyName,
      username: contact.middleName,

      // Select the first found email
      // TODO {Maksym}: re-think about this
      email: contact.emailAddresses.length
        ? head(contact.emailAddresses).email
        : '',

      image: contact.hasThumbnail ? contact.thumbnailPath : undefined,
      // Re-structure contact's phone numbers and select unique ones
      phones: uniqBy(
        contact.phoneNumbers.map(phone => ({
          label: phone.label,
          text: phone.number.match(/^\(?\d{3}\)?-\d{3}-\d{4}$/m) ?
            phone.number.replace(/(\d)/, '($1').replace(/-/, ') ') :
            phone.number,
          number: phone.number.replace(/\D/g, ''),
        })),
        'number',
      ).filter(phone => phone.number && phone.number.length >= 10),
    }))
    // Filter out contacts without phone numbers
    .filter(contact => contact.phones.length),
);

export const selectContactsList = (state, modelType = FULL_MODEL) => {
  if (modelType === CROPPED_MODEL) {
    return selectContactsListCroppedModel(state);
  }

  return selectContactsListFullModel(state);
};
