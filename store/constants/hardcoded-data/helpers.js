import images from './images';

// Generate random int value between min and max
const randomIntFromInterval = (min = 1, max = 10) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Returns random image url address
export const getRandomImage = (size = 75) =>
  images[size][randomIntFromInterval(0, images[size].length - 1)];

// Generates random ID. For example it can
// be used to generate userId, postId, etc.
export const getRandomId = (max = 1000000) =>
  randomIntFromInterval(1, max);
