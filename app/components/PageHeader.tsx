import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';
import { usePathname } from 'expo-router';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  onBackPress?: () => void;
  onProfilePress?: () => void;
  transparent?: boolean;
};

/**
 * 共通ページヘッダーコンポーネント
 * Planページのデザインをベースにした統一されたヘッダーレイアウト
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  showProfileButton = false,
  onBackPress,
  onProfilePress,
  transparent = false,
}) => {
  // 現在のパスを取得して、ルート変更を検知
  const currentPath = usePathname();
  
  // アニメーション用の値
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(10)).current;
  
  // コンポーネントがマウントされたとき、またはpropsが変更されたときにアニメーションを実行
  useEffect(() => {
    // 値をリセット
    fadeAnim.setValue(0);
    translateYAnim.setValue(10);
    
    // フェードインアニメーション（ページ全体のアニメーションより少し遅らせる）
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350, // やや長めの持続時間
        delay: 100,    // 100msの遅延を追加
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        delay: 50,
        useNativeDriver: true,
      })
    ]).start();
  }, [title, subtitle, currentPath]); // パスの変更も検知

  return (
    <View style={[
      styles.header,
      transparent && styles.transparentHeader
    ]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress}
          >
            <Ionicons 
              name="chevron-back" 
              size={responsiveSize(24)} 
              color={transparent ? 'white' : colors.text.primary} 
            />
          </TouchableOpacity>
        )}
      </View>

      <Animated.View
        style={[
          styles.titleContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
          }
        ]}
      >
        <Text style={[
          styles.title,
          transparent && styles.titleLight
        ]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[
            styles.subtitle,
            transparent && styles.subtitleLight
          ]}>
            {subtitle}
          </Text>
        )}
      </Animated.View>

      <View style={styles.rightContainer}>
        {showProfileButton && (
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={onProfilePress}
          >
            <Ionicons 
              name="person" 
              size={responsiveSize(20)} 
              color={transparent ? 'white' : colors.text.primary} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(24),
    paddingHorizontal: responsiveSize(0), // 左右のパディングを減らす
  },
  transparentHeader: {
    // 透明背景用スタイル
  },
  leftContainer: {
    width: responsiveSize(0),
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: responsiveSize(40),
    alignItems: 'flex-end',
  },
  title: {
    fontSize: fontScale(typography.fontSizes.h1),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: responsiveSize(8),
  },
  titleLight: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: fontScale(typography.fontSizes.sm),
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  subtitleLight: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    padding: responsiveSize(6),
    borderRadius: borderRadius.circle,
  },
  profileButton: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(18),
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PageHeader; 