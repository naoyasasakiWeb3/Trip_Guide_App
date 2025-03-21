/**
 * トリップガイドアプリ - ホーム画面
 * 
 * 主な変更点:
 * 1. UI/UXの改善:
 *   - 美しいビーチの夕焼け背景画像の追加
 *   - 背景画像のオーバーレイ透明度調整でテキスト可読性向上
 *   - 半透明カードデザインで背景とコンテンツの調和
 * 
 * 2. コンポーネント構造の最適化:
 *   - Layoutコンポーネントを活用した統一的なページデザイン
 *   - PageHeaderとの統合によるヘッダー表示の一貫性確保
 *   - アニメーション効果の追加で画面遷移体験向上
 * 
 * 3. レスポンシブ対応:
 *   - 画面方向（縦/横）の変化に対応
 *   - 様々なデバイスサイズでの表示最適化
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

// カスタムコンポーネント
import TripCard from '../components/TripCard';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

// ユーティリティ
import { recalculateScreenSize } from '../utils/responsive';
import { colors } from '../utils/theme';

// 背景画像の参照
const backgroundImage = require('../../assets/images/sean-oulashin-KMn4VEeEPR8-unsplash.jpg');

export default function HomeScreen() {
  const router = useRouter();
  const currentPath = usePathname();
  const [activeTab, setActiveTab] = useState('home');
  const [resetKey, setResetKey] = useState(Date.now()); // アニメーションリセット用キー
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    Dimensions.get('window').width < Dimensions.get('window').height ? 'portrait' : 'landscape'
  );
  
  // デモ用旅行データ
  const tripData = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      datetime: '2025/03/25, 16:00-',
      location: 'Frankfurt City',
      point: 'Germany main city, especially finance area',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      datetime: '2025/03/25, 16:00-',
      location: 'Frankfurt',
      point: 'Germany main city, especially finance area',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      datetime: '2025/03/25, 16:00-',
      location: 'Frankfurt Main Station',
      point: 'Germany main city, especially finance area',
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      datetime: '2025/03/25, 16:00-',
      location: 'Frankfurt Christmas Market',
      point: 'Germany main city, especially finance area',
    },
  ];

  // パスの変更を監視してアニメーションをリセット
  useEffect(() => {
    setResetKey(Date.now());
  }, [currentPath]);

  // 画面回転時の対応
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width < height ? 'portrait' : 'landscape');
      recalculateScreenSize();
    };

    // イベントリスナー登録
    Dimensions.addEventListener('change', updateOrientation);

    // クリーンアップ関数
    return () => {
      // React Native 0.65以降の場合はこちら
      // Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);

  // ハンドラー関数
  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  // 現在の日付を取得
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <Layout 
      activeTab={activeTab} 
      statusBarStyle="light"
      backgroundImage={backgroundImage}
      overlayOpacity={0.25} // オーバーレイの透明度を調整
    >
      {/* ヘッダー */}
      <PageHeader
        title="Today"
        subtitle={getCurrentDate()}
        showProfileButton={true}
        onProfilePress={handleProfilePress}
        transparent={true} // 透明背景にしてImageBackgroundの背景が見えるようにする
      />

      {/* 旅行カードリスト */}
      {tripData.map((trip, index) => (
        <TripCard
          key={trip.id}
          imageUrl={trip.imageUrl}
          datetime={trip.datetime}
          location={trip.location}
          point={trip.point}
          index={index}
          resetKey={resetKey}
          forceReset={index === 0} // 最初のカードは強制リセット
        />
      ))}
    </Layout>
  );
}

const styles = StyleSheet.create({});

