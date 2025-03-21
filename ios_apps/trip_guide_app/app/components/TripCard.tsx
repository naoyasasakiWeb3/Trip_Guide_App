/**
 * TripCard コンポーネント
 * 
 * 主な変更点と特徴:
 * 1. デザイン改善:
 *   - 丸みを帯びたコーナーと洗練された影効果
 *   - 上部に画像、下部に情報を配置した明確なレイアウト
 *   - 半透明効果とiOS向けブラー効果による視覚的な深み
 * 
 * 2. 視認性とUX向上:
 *   - 背景画像との調和を考慮したカラースキーム
 *   - 情報セクション間の繊細な区切り線
 *   - 適切なパディングとマージンによる読みやすさの向上
 * 
 * 3. アニメーション統合:
 *   - AnimatedItemコンポーネントとの連携
 *   - 画面表示時のフェードインとスライド効果
 *   - 画面遷移時のアニメーションリセット機能
 */

import React from 'react';
import { StyleSheet, View, Text, Image, ViewStyle, TextStyle, ImageStyle, Platform } from 'react-native';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';
import AnimatedItem from './AnimatedItem';

type TripCardProps = {
  imageUrl: string;
  datetime: string;
  location: string;
  point: string;
  index?: number;
  resetKey?: any;
  forceReset?: boolean;
};

const TripCard: React.FC<TripCardProps> = ({ 
  imageUrl, 
  datetime, 
  location, 
  point, 
  index = 0,
  resetKey,
  forceReset
}) => {
  return (
    <AnimatedItem 
      index={index} 
      delay={150}
      resetKey={resetKey}
      forceReset={forceReset}
      style={styles.cardContainer}
    >
      {/* 画像部分 */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      
      {/* コンテンツ部分 */}
      <View style={styles.contentContainer}>
        {/* 日時 */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date & Time</Text>
          <Text style={styles.infoValue}>{datetime}</Text>
        </View>
        
        {/* 区切り線 */}
        <View style={styles.divider} />
        
        {/* 場所 */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{location}</Text>
        </View>
        
        {/* 区切り線 */}
        <View style={styles.divider} />
        
        {/* ポイント */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Point</Text>
          <Text style={styles.infoValue}>{point}</Text>
        </View>
      </View>
    </AnimatedItem>
  );
};

type Styles = {
  cardContainer: ViewStyle;
  cardImage: ImageStyle;
  contentContainer: ViewStyle;
  infoRow: ViewStyle;
  infoLabel: TextStyle;
  infoValue: TextStyle;
  divider: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  cardContainer: {
    marginHorizontal: 0,
    marginBottom: responsiveSize(20),
    borderRadius: responsiveSize(20),
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // 若干透明にして背景とブレンド
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    marginVertical: responsiveSize(8),
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    ...(Platform.OS === 'ios' ? { 
      // iOSの場合はブラー効果を追加
      backdropFilter: 'blur(8px)', 
    } : {}),
  },
  cardImage: {
    width: '100%',
    height: responsiveSize(140), // 画像の高さを調整
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
  },
  contentContainer: {
    backgroundColor: 'transparent', // 透明にする
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(16),
    borderBottomLeftRadius: responsiveSize(20),
    borderBottomRightRadius: responsiveSize(20),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveSize(6),
  },
  infoLabel: {
    color: '#333',
    fontSize: fontScale(typography.fontSizes.sm),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  infoValue: {
    color: '#555',
    fontSize: fontScale(typography.fontSizes.xs),
    textAlign: 'right',
    maxWidth: '70%',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // より繊細な区切り線
    marginVertical: responsiveSize(2),
  },
});

export default TripCard; 