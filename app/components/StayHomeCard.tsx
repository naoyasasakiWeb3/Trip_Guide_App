import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize, isLandscape } from '../utils/responsive';

type StayHomeCardProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const StayHomeCard: React.FC<StayHomeCardProps> = ({
  imageUrl,
  title,
  subtitle,
  onPress
}) => {
  // 横向きの場合は画像サイズを調整
  const imageWidth = isLandscape() ? '40%' : '50%';

  return (
    <View style={styles.stayHomeSection}>
      <Text style={styles.sectionLabel}>STAY HOME</Text>
      <TouchableOpacity 
        style={styles.stayHomeCard} 
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View style={styles.stayHomeContent}>
          <Text style={styles.stayHomeTitle}>{title}</Text>
          <Text style={styles.stayHomeSubtitle}>{subtitle}</Text>
        </View>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.stayHomeImage, { width: imageWidth }]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stayHomeSection: {
    paddingBottom: responsiveSize(16),
  },
  sectionLabel: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.sm),
    marginLeft: responsiveSize(16),
    marginTop: responsiveSize(24),
  },
  stayHomeCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    margin: responsiveSize(16),
    marginTop: responsiveSize(8),
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    height: responsiveSize(180),
  },
  stayHomeContent: {
    flex: 1,
    padding: responsiveSize(20),
    justifyContent: 'center',
  },
  stayHomeTitle: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.xxl),
    fontWeight: 'bold',
    marginBottom: responsiveSize(8),
  },
  stayHomeSubtitle: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.md),
  },
  stayHomeImage: {
    height: '100%',
  },
});

export default StayHomeCard; 