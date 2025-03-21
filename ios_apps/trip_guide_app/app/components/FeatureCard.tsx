import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';

type FeatureCardProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  imageUrl, 
  title, 
  subtitle, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', colors.overlay]}
        style={styles.gradient}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: responsiveSize(16),
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    height: responsiveSize(400),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderRadius: borderRadius.medium,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    padding: responsiveSize(20),
  },
  cardTitle: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.xxl),
    fontWeight: 'bold',
    marginBottom: responsiveSize(8),
  },
  cardSubtitle: {
    color: colors.text.secondary,
    fontSize: fontScale(typography.fontSizes.lg),
    marginBottom: responsiveSize(16),
  },
});

export default FeatureCard; 