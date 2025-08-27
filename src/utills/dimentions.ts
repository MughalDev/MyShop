import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 14 Pro's scale (393 x 852)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export function scale(size: number) {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
}

export function verticalScale(size: number) {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
}

export function moderateScale(size: number, factor = 0.5) {
  return size + (scale(size) - size) * factor;
}