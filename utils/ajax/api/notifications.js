import ajax from '../services';

// Get all user's notifications
export const fetchAll = params =>
  ajax.get('Notifications', { params });

export const getCount = params =>
  ajax.get('Notifications/count', { params });

  // TEMPLATE FOR FUTURE REQUEST
export const updateAllNotificationsStatusAsRead = () =>
  ajax.post('Notifications/read');
