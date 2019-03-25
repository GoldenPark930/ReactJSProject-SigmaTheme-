import { DEFAULT_LIMIT } from 'src/constants/app/defaults';

export default (payload) => {
  // Server returned more entities
  if (payload.length > DEFAULT_LIMIT) {
    // Slice the payload so it will have length equal to default limit
    return {
      content: payload.slice(0, DEFAULT_LIMIT),
      isLastPage: false,
    };
  }

  // End the pagination and return all receive entities
  return {
    content: payload,
    isLastPage: true,
  };
};
