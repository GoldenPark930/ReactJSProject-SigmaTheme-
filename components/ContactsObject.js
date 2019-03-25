// import Expo, { Contacts } from "expo";

import Contacts from 'react-native-contacts';

export default class ContactsObject {
  constructor() {
    this.contacts = [];
    this.isLoading = false;
    this.endReached = false;
  }

  checkPermission() {
    return new Promise((resolve, reject) => {
      Contacts.checkPermission((err, permission) => {
        if (err) return reject(err);
        return resolve(permission);
      });
    });
  }

  loadContacts() {
    return new Promise((resolve, reject) => {
      Contacts.getAll((err, contacts) => {
        if (err) return reject(err);
        return resolve(contacts);
      });
    });
  }

  async getContactsAsync() {
    this.setIsLoading(true);
    const permission = await this.checkPermission();
    if (permission !== 'authorized') {
      this.setIsLoading(false);
      return;
    }
    const contacts = await this.loadContacts();
    const result = [];
    for (let i = 0; i < contacts.length; i += 1) {
      if (contacts[i].phoneNumbers.length > 0) {
        contacts[i].selected = false;
        result.push(contacts[i]);
      }
    }
    result.sort((a,b) => (a.givenName > b.givenName) ? 1 : ((b.givenName > a.givenName) ? -1 : 0));
    this.setContacts(result);
    this.setIsLoading(false);
  }

  setContacts(newContacts) {
    this.contacts = newContacts;
  }

  getContacts() {
    return this.contacts;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  getIsLoading() {
    return this.isLoading;
  }
}
