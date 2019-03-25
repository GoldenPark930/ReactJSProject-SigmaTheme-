module.exports = {
  // User bank account routes
  userListBankAccounts: '/GrinkUsers/BankAccounts',
  userAddBankAccount: '/GrinkUsers/BankAccounts',
  userRemoveBankAccount: '/GrinkUsers/BankAccounts/{bankAccountId}',
  // Group bank account routes
  groupListBankAccounts: '/Groups/{groupId}/BankAccounts',
  groupAddBankAccount: '/Groups/{groupId}/BankAccounts',
  groupRemoveBankAccount: '/Groups/{groupId}/BankAccounts/{bankAccountId}',
};
