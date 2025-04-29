import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize, isLandscape } from '../utils/responsive';

type HowToCardProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const HowToCard: React.FC<HowToCardProps> = ({
  imageUrl,
  title,
  subtitle,
  onPress
}) => {
  // 横向きの場合は画像サイズを調整
  const imageWidth = isLandscape() ? '40%' : '50%';

  return (
    <View style={styles.howtoSection}>
      <Text style={styles.sectionLabel}>HOWTO</Text>
      <TouchableOpacity 
        style={styles.howtoCard}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Image 
          source={{ uri: imageUrl }}
          style={[styles.howtoImage, { width: imageWidth }]}
          resizeMode="cover"
        />
        <View style={styles.howtoContent}>
          <Text style={styles.howtoTitle}>{title}</Text>
          <Text style={styles.howtoSubtitle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  howtoSection: {
    marginTop: responsiveSize(24),
    marginBottom: responsiveSize(16),
  },
  sectionLabel: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.sm),
    marginLeft: responsiveSize(16),
    marginTop: responsiveSize(24),
  },
  howtoCard: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(8),
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    height: responsiveSize(160),
  },
  howtoImage: {
    height: '100%',
  },
  howtoContent: {
    flex: 1,
    padding: responsiveSize(16),
    justifyContent: 'center',
  },
  howtoTitle: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.xl),
    fontWeight: 'bold',
    marginBottom: responsiveSize(8),
  },
  howtoSubtitle: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.sm),
  },
});

export default HowToCard; 