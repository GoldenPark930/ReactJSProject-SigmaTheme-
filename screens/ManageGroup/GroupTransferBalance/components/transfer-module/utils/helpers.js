// Validate transfer amount and return an
// error message or `null` if amount is valid
export const getTransferAmountValidationError = (transferAmount, availableBalance) => {
  // String to number
  const amount = +transferAmount;
  const balance = (+availableBalance).toFixed(2);

  // Just in case somehow this situation is possible
  if (amount < 0) {
    return 'sorry, you can not transfer negative amount';
  }

  // No point in showing this error when user inputs zero. You can't withdraw
  // zero money anyway because the button is disabled in this case.
  if (balance === 0 && amount > 0) {
    return 'sorry, you do not have money to transfer';
  }

  if (amount > balance) {
    return `sorry, you can not transfer more then $${balance}`;
  }

  return null;
};
