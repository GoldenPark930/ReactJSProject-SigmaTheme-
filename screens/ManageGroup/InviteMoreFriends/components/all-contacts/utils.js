import toLower from 'lodash/toLower';

export const contactMatch = (userModel, searchFilter) => {
  // List of keys to check the search match
  const tUserModel = {
  	email: userModel.email,
  	name: `${userModel.firstName} ${userModel.lastName}`,
    username: userModel.username,
    phone: userModel.phone,
  };
  const keys = ['email', 'name', 'username','phone'];

  return keys.reduce(
    (match, key) => match || toLower(tUserModel[key]).indexOf(toLower(searchFilter)) > -1,
    false,
  );
};
