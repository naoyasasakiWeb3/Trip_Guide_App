import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { usePathname } from 'expo-router';

type AnimatedItemProps = {
  children: React.ReactNode;
  index?: number; // アイテムのインデックス（スタガー効果のため）
  delay?: number; // 基本遅延（ms）
  style?: ViewStyle | ViewStyle[];
  resetKey?: any; // このキーが変わると、アニメーションがリセットされる
  forceReset?: boolean; // 強制的にアニメーションをリセットするフラグ
};

/**
 * アイテムをフェードインとスライドアップでアニメーションさせるコンポーネント
 * スタガー効果のためのインデックスベースの遅延を含む
 */
const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  index = 0,
  delay = 0,
  style,
  resetKey,
  forceReset = false,
}) => {
  // 現在のパスを取得
  const currentPath = usePathname();
  
  // アニメーション用の値
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  
  // 前回のアニメーション時刻を追跡
  const lastAnimTimeRef = useRef(0);
  
  useEffect(() => {
    const now = Date.now();
    
    // 前回のアニメーションから一定時間経過しているか、強制リセットが指定されている場合にアニメーションをリセット
    if (forceReset || now - lastAnimTimeRef.current > 200) {
      // 値をリセット
      fadeAnim.setValue(0);
      translateYAnim.setValue(20);
      
      // インデックスに基づいた遅延を計算（スタガー効果）
      const itemDelay = delay + (index * 50);
      
      // アニメーションの開始
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          delay: itemDelay,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          delay: itemDelay,
          useNativeDriver: true,
        })
      ]).start();
      
      // 現在の時刻を記録
      lastAnimTimeRef.current = now;
    }
  }, [index, delay, resetKey, currentPath, forceReset]); // パスの変更も監視

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedItem; 