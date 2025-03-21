import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';

type GamingSectionProps = {
  imageUrl: string;
  title?: string;
  onPress?: () => void;
};

const GamingSection: React.FC<GamingSectionProps> = ({
  imageUrl,
  title = 'Top Apple\nArcade Games',
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.gamesSection}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={styles.sectionLabel}>GAMES</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Image
        source={{ uri: imageUrl }}
        style={styles.gameSectionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gamesSection: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(8),
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    paddingBottom: responsiveSize(16),
  },
  sectionLabel: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.sm),
    marginLeft: responsiveSize(16),
    marginTop: responsiveSize(24),
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.h3),
    fontWeight: 'bold',
    marginLeft: responsiveSize(16),
    marginTop: responsiveSize(4),
  },
  gameSectionImage: {
    width: '100%',
    height: responsiveSize(200),
    marginTop: responsiveSize(12),
  },
});

export default GamingSection; 