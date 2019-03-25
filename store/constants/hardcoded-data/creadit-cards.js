import { getRandomId } from './helpers';

const HardcodedData = [
  {
    id: getRandomId(),
    type: 'visa',
    number: 'XXXX-XXXX-XXXX-2572',
    expiring: '10/07/2017',
  },
  {
    id: getRandomId(),
    type: 'mastercard',
    number: 'XXXX-XXXX-XXXX-8970',
    expiring: false,
  },
];

// export default [];
export default HardcodedData;
