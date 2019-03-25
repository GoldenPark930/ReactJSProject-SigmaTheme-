import ajax from '../services';

export const getUserData = () =>
  ajax.get('GrinkUsers/me');

export const getUserDataById = userId =>
  ajax.get(`GrinkUsers/${userId}`);

export const updateUserDataById = (userId, params) =>
  ajax.patch(`GrinkUsers/${userId}`, params);

export const updateUserDocument = (params) => {
  const { file: { uri, fileName, type }, documentType } = params;
  const data = new FormData();
  data.append('file', { uri, name: fileName, type });
  data.append('documentType', documentType);
  return ajax.post('GrinkUsers/documents', data, { 'Content-Type': 'multipart/form-data' });
};

export const retryUserVerification = params =>
  ajax.post('GrinkUsers/retry', params);

export const updateUserProfileImage = params =>
  ajax.post('GrinkUsers/image', params);

export const logout = params =>
  ajax.post('GrinkUsers/logout', {}, params);

export const signup = data =>
  ajax.post('GrinkUsers/signup', data);

export const getBalanceDetails = () =>
  ajax.get('GrinkUsers/balance');

export const getBanksAccountsList = () =>
  ajax.get('GrinkUsers/BankAccounts');

export const addBankAccount = banksData =>
  ajax.post('/GrinkUsers/BankAccounts', banksData);

export const getTransactionHistoryList = () =>
  ajax.get('GrinkUsers/me/transactions');

export const removeUserBank = bankId =>
  ajax.del(`GrinkUsers/BankAccounts/${bankId}`);

export const makeWithdraw = payload =>
  ajax.post('GrinkUsers/banks/transfer', payload);

export const submitSupport = payload =>
  ajax.post('Supports', payload);

export const resendEmailVerification = payload =>
  ajax.post('EmailVerifications/create', payload);
