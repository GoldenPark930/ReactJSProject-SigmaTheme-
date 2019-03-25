import ajax from '../services';

export const createVerificationCode = data =>
  ajax.post('/PhoneVerifications/create', data);

export const verifyAndAuthenticate = data =>
  ajax.post('/PhoneVerifications/auth', data);

export const verifyCode = data =>
  ajax.post('/PhoneVerifications/verify', data);

export const facebookAuthenticate = accessToken =>
  ajax.post(`/Identities/facebook/auth?accessToken=${accessToken}`);

export const doesEmailRegistered = email =>
  ajax.get(`/GrinkUsers/doesEmailExist?email=${email}`);

export const doesUsernameRegistered = username =>
  ajax.get(`/GrinkUsers/doesUsernameExist?username=${username}`);
