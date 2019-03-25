const imageTypes = [
  'animals',
  'arch',
  'nature',
  'people',
  'tech',
  'tech/grayscale',
  'tech/sepia',
  'any',
];

const generateListOfPlaceholderImages = size =>
  imageTypes.reduce((result, imageType) => {
    result.push(`https://placeimg.com/${size}/${size}/${imageType}`);
    return result;
  }, []);

export default {
  75: generateListOfPlaceholderImages(75),
};
