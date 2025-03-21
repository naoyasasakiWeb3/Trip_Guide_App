import { Dimensions, Platform, PixelRatio } from 'react-native';

// letで宣言して再代入可能にする
let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// iPhoneX以降の基準サイズ（iPhone 12 Pro）を基準に設計
const baseWidth = 390;
const baseHeight = 844;

// 横幅に基づくスケーリング
export const widthPercentage = (size: number): number => {
  return (SCREEN_WIDTH * size) / baseWidth;
};

// 高さに基づくスケーリング
export const heightPercentage = (size: number): number => {
  return (SCREEN_HEIGHT * size) / baseHeight;
};

// フォントサイズの調整
export const fontScale = (size: number): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// レスポンシブなサイズ計算
export const responsiveSize = (size: number): number => {
  return widthPercentage(size);
};

// 画面の向き取得
export const isLandscape = (): boolean => {
  return SCREEN_WIDTH > SCREEN_HEIGHT;
};

// 画面サイズに応じた値を返す
export const getResponsiveValue = (phone: any, tablet: any): any => {
  // タブレット判定（幅が600以上を一般的なタブレットサイズと仮定）
  const isTablet = SCREEN_WIDTH >= 600;
  return isTablet ? tablet : phone;
};

// デバイスがiPadかどうか
export const isIPad = (): boolean => {
  return Platform.OS === 'ios' && Platform.isPad;
};

// スクリーンサイズの再計算（画面回転時などに呼び出す）
export const recalculateScreenSize = () => {
  const { width, height } = Dimensions.get('window');
  SCREEN_WIDTH = width;
  SCREEN_HEIGHT = height;
}; 