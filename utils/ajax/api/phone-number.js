import ajax from '../services';

export const doesPhoneRegistered = (phone) => {
  const encodedPhone = phone.replace('+', '%2B');
  return ajax.get(`/GrinkUsers/doesPhoneExist?phone=${encodedPhone}`);
};

