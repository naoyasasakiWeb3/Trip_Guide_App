import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../utils/theme';
import { fontScale, responsiveSize, isIPad } from '../utils/responsive';

type TabItemProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isActive?: boolean;
  onPress?: () => void;
};

type TabBarProps = {
  activeTab: string;
  onTabPress: (tabName: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({ label, icon, isActive = false, onPress }) => {
  // アニメーション用の値
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.7)).current;

  // アクティブ状態が変更されたときにアニメーション
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isActive ? 1 : 0,
        duration: isActive ? 300 : 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
      {/* アクティブインジケーター */}
      <Animated.View 
        style={[
          styles.activeIndicator, 
          { 
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim
          }
        ]} 
      />
      
      <Animated.View style={{ opacity: opacityAnim }}>
        <Ionicons 
          name={icon} 
          size={responsiveSize(24)} 
          color={isActive ? colors.primary : colors.text.tertiary} 
        />
      </Animated.View>
      
      <Animated.Text 
        style={[
          styles.tabText, 
          isActive && styles.activeTab,
          { opacity: opacityAnim }
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const tabItems: { name: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: 'home', label: 'Home', icon: 'home' },
    { name: 'make-plan', label: 'Make Plan', icon: 'calendar' },
    { name: 'plan-lists', label: 'Plan Lists', icon: 'list' },
    { name: 'settings', label: 'Settings', icon: 'settings' },
    { name: 'search', label: 'Search', icon: 'search' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabItems.map((item) => (
        <TabItem
          key={item.name}
          label={item.label}
          icon={item.icon}
          isActive={activeTab === item.name}
          onPress={() => onTabPress(item.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.tabBar,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingBottom: isIPad() ? responsiveSize(25) : responsiveSize(20),
    paddingTop: responsiveSize(10),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: responsiveSize(4),
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: responsiveSize(4),
    height: responsiveSize(4),
    borderRadius: responsiveSize(2),
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.text.tertiary,
    fontSize: fontScale(typography.fontSizes.xs),
    marginTop: responsiveSize(4),
  },
  activeTab: {
    color: colors.primary,
  },
});

export default TabBar; 