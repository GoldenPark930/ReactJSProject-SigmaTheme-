export const DENIED = 'denied';
export const UNDEFINED = 'undefined';
export const AUTHORIZED = 'authorized';

const DEFAULT_TITLE = 'You did not allow "Payclub" to access your';
const DEFAULT_MESSAGE =
  'You need to navigate to Settings\n' +
  'find "Payclub" within this page and turn\n' +
  'the permission on to give the access';

export const CONTACTS_DENIED_MESSAGE = {
  title: `${DEFAULT_TITLE} contacts`,
  message: DEFAULT_MESSAGE,
};

export const LOCATION_DENIED_MESSAGE = {
  title: `${DEFAULT_TITLE} location`,
  message: DEFAULT_MESSAGE,
};

export const NOTIFICATIONS_DENIED_MESSAGE = {
  title: `${DEFAULT_TITLE} notifications`,
  message: DEFAULT_MESSAGE,
};

export const PHOTO_DENIED_MESSAGE = {
  title: `${DEFAULT_TITLE} photos`,
  message: DEFAULT_MESSAGE,
};

export const CAMERA_DENIED_MESSAGE = {
  title: `${DEFAULT_TITLE} camera`,
  message: DEFAULT_MESSAGE,
};
