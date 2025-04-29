// アプリケーション全体で使用するテーマ設定

export const colors = {
  // 基本色
  primary: '#0a84ff',
  secondary: '#323236',
  background: '#000',
  cardBackground: '#1c1c1e',
  
  // テキスト色
  text: {
    primary: '#fff',
    secondary: '#ddd',
    tertiary: '#8e8e93',
    onPrimary: '#fff',  // 主要背景色の上にあるテキスト
  },
  
  // ボーダー色
  border: '#3a3a3c',
  
  // ボタン色
  button: {
    primary: '#0a84ff',
    text: '#fff',
  },
  
  // 入力関連
  inputBackground: '#2c2c2e',  // 入力フィールドの背景色
  disabled: '#636366',  // 無効化状態の色
  
  // 透明度付き色
  overlay: 'rgba(0,0,0,0.8)',
  tabBar: 'rgba(30, 30, 30, 0.95)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  small: 8,
  medium: 16,
  large: 24,
  circle: 50,
};

export const typography = {
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    h3: 22,
    h2: 24,
    h1: 32,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 16,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
}; 