const ERROR_LEY_PREFIX = '@ModalPicker.componentErrors.';

export default {
  keyExtractor: {
    key: `${ERROR_LEY_PREFIX}keyExtractor`,
    text: 'keyExtractor should return a unique child value that will be used as a "key" prop.',
  },
};
