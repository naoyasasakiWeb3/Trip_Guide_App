import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';

type GameItemProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  price?: string;
  isFree?: boolean;
  onPress?: () => void;
};

const GameItem: React.FC<GameItemProps> = ({
  imageUrl,
  title,
  subtitle,
  price,
  isFree = false,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.gameItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image 
        source={{ uri: imageUrl }}
        style={styles.gameIcon} 
        resizeMode="cover"
      />
      <View style={styles.gameDetails}>
        <Text style={styles.gameTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.gameSubtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
      
      {isFree ? (
        <TouchableOpacity style={styles.getButton} onPress={onPress}>
          <Text style={styles.getButtonText}>GET</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(16),
    marginTop: responsiveSize(8),
  },
  gameIcon: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    borderRadius: borderRadius.small,
  },
  gameDetails: {
    flex: 1,
    marginLeft: responsiveSize(12),
  },
  gameTitle: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.lg),
    fontWeight: '500',
  },
  gameSubtitle: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.sm),
  },
  priceTag: {
    backgroundColor: colors.secondary,
    paddingVertical: responsiveSize(4),
    paddingHorizontal: responsiveSize(12),
    borderRadius: borderRadius.medium,
  },
  priceText: {
    color: colors.primary,
    fontSize: fontScale(typography.fontSizes.md),
  },
  getButton: {
    backgroundColor: colors.primary,
    paddingVertical: responsiveSize(4),
    paddingHorizontal: responsiveSize(12),
    borderRadius: borderRadius.medium,
  },
  getButtonText: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.md),
    fontWeight: 'bold',
  },
});

export default GameItem; 