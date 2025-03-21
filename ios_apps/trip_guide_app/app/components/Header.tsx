import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';

type HeaderProps = {
  onProfilePress?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onProfilePress }) => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options).toUpperCase();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.todayText}>Today</Text>
      </View>
      <TouchableOpacity onPress={onProfilePress}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={responsiveSize(24)} color={colors.text.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(10),
    paddingBottom: responsiveSize(5),
  },
  dateText: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.sm),
  },
  todayText: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.h1),
    fontWeight: 'bold',
  },
  profileIcon: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(18),
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header; 