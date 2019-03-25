// https://blog.solutotlv.com/size-matters/
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on iPhone 6, 6s, 7, 8
const guidelineBaseWidth = 375; // 750px
const guidelineBaseHeight = 667; // 1334px

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// TODO {Maksym}: test on different device types
export default {
  scale: v => parseInt(scale(v), 10),
  verticalScale: v => parseInt(verticalScale(v), 10),
  moderateScale: v => parseInt(moderateScale(v), 10),
};
