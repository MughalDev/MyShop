import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const baseWidth = 375;

export const responsiveFont = (fontSize: number) => {
  const scale = width / baseWidth;
  const newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};