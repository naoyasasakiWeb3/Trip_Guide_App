import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  StatusBar as RNStatusBar, 
  Platform, 
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, usePathname } from 'expo-router';
import TabBar from './TabBar';
import { colors } from '../utils/theme';
import { responsiveSize } from '../utils/responsive';

type LayoutProps = {
  children: React.ReactNode;
  activeTab: string;
  backgroundImage?: any;  // 背景画像のソース
  overlayOpacity?: number; // オーバーレイの透明度（0.0〜1.0）
  statusBarStyle?: 'light' | 'dark';
  showTabBar?: boolean;  // タブバーを表示するかどうか
  noPadding?: boolean;   // パディングを無効にするオプション
};

/**
 * アプリケーション全体で共通のレイアウトを提供するコンポーネント
 * SafeAreaView、StatusBar、背景画像、TabBarを含み、コンテンツをchildren propsとして受け取ります
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab,
  backgroundImage,
  overlayOpacity = 0.45,
  statusBarStyle = 'light',
  showTabBar = true,
  noPadding = false
}) => {
  const router = useRouter();
  const currentPath = usePathname();
  
  // アニメーション用のステート
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [lastNavigationTime, setLastNavigationTime] = useState(0);
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // パスが変更されたとき、またはactiveTabが変更されたときにアニメーションをリセットする
  useEffect(() => {
    const isFirstRender = !lastNavigationTime;
    const now = Date.now();
    
    // 前回のナビゲーションから300ms以上経過している場合のみアニメーションを実行
    // これにより連続した高速なナビゲーションでもアニメーションが正しく動作する
    if (!isFirstRender && now - lastNavigationTime > 300) {
      startTabTransition(activeTab);
    } else if (isFirstRender) {
      // 初回レンダリング時は現在のタブを記録するだけ
      setCurrentTab(activeTab);
    }
    
    // 現在の時刻を記録
    setLastNavigationTime(now);
  }, [activeTab, currentPath]);

  // タブ遷移アニメーションを開始
  const startTabTransition = (newTab: string) => {
    if (transitioning || newTab === currentTab) return;
    
    setTransitioning(true);
    setPendingTab(newTab);
    
    // 現在のビューをフェードアウト
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // フェードアウト完了後、新しいタブに切り替えてフェードイン
      setCurrentTab(newTab);
      setPendingTab(null);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTransitioning(false);
      });
    });
  };

  // タブ押下時の処理
  const handleTabPress = (tabName: string) => {
    // 現在のタブと同じ場合は何もしない
    if (tabName === currentTab || transitioning) return;
    
    // 遷移時刻を記録
    setLastNavigationTime(Date.now());
    
    // タブに基づいてナビゲーション
    switch (tabName) {
      case 'home':
        router.replace('/');
        break;
      case 'make-plan':
        router.replace('/plan');
        break;
      case 'plan-lists':
        // 将来的に実装される予定
        console.log('Plan Lists (未実装)');
        break;
      case 'settings':
        // 将来的に実装される予定
        console.log('Settings (未実装)');
        break;
      case 'search':
        // 将来的に実装される予定
        console.log('Search (未実装)');
        break;
      default:
        break;
    }
  };

  // iOS 13以上でのStatusBar設定（ダークモード対応）
  if (Platform.OS === 'ios') {
    RNStatusBar.setBarStyle(statusBarStyle === 'light' ? 'light-content' : 'dark-content');
  }

  // メインコンテンツをレンダリング
  const renderContent = () => {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ScrollView 
            contentContainerStyle={[
              styles.scrollContent,
              noPadding && styles.noPadding
            ]}
            style={styles.scrollView}
          >
            {children}
            
            {/* タブバーの下のスペース確保 */}
            {showTabBar && <View style={styles.bottomSpace} />}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  };

  // コンテンツに背景画像をつける場合
  if (backgroundImage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={statusBarStyle} />
        <ImageBackground 
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* 背景画像のオーバーレイ */}
          <View style={[styles.overlay, { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }]} />
          
          <View style={styles.container}>
            {renderContent()}
            
            {/* 下部のタブバー */}
            {showTabBar && <TabBar activeTab={currentTab} onTabPress={handleTabPress} />}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // 背景画像なしの場合
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={statusBarStyle} />
      <View style={styles.container}>
        {renderContent()}
        
        {/* 下部のタブバー */}
        {showTabBar && <TabBar activeTab={currentTab} onTabPress={handleTabPress} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    padding: responsiveSize(16),
    paddingTop: responsiveSize(32),
    paddingHorizontal: responsiveSize(20), // 統一された左右のパディング
  },
  noPadding: {
    padding: 0,
    paddingTop: 0,
  },
  bottomSpace: {
    height: 80, // タブバーの高さ分の余白
  },
});

export default Layout; 