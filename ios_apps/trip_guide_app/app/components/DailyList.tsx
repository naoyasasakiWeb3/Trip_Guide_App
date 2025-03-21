import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';
import GameItem from './GameItem';

export type GameData = {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  price?: string;
  isFree?: boolean;
};

type DailyListProps = {
  title: string;
  games: GameData[];
  onGamePress?: (game: GameData) => void;
};

const DailyList: React.FC<DailyListProps> = ({
  title,
  games,
  onGamePress
}) => {
  return (
    <View style={styles.dailyListSection}>
      <Text style={styles.sectionLabel}>THE DAILY LIST</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      {games.map((game) => (
        <GameItem
          key={game.id}
          imageUrl={game.imageUrl}
          title={game.title}
          subtitle={game.subtitle}
          price={game.price}
          isFree={game.isFree}
          onPress={() => onGamePress && onGamePress(game)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dailyListSection: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(24),
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
    marginBottom: responsiveSize(8),
  },
});

export default DailyList; 