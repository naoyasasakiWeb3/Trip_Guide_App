import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors, typography, borderRadius } from '../utils/theme';
import { fontScale, responsiveSize } from '../utils/responsive';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import AnimatedItem from '../components/AnimatedItem';
import { usePathname } from 'expo-router';

// Google Maps APIキーは後で環境変数などから安全に取得する方法に変更する必要があります
const GOOGLE_MAPS_API_KEY = '';

// 背景画像の参照
const backgroundImage = require('../../assets/images/sorasak-_UIN-pFfJ7c-unsplash.jpg');

export default function PlanScreen() {
  // ルーティング情報
  const currentPath = usePathname();
  
  // 状態管理
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('場所を選択してください');
  const [interest, setInterest] = useState<string>('');
  const [interestCount, setInterestCount] = useState<number>(0);
  const [region, setRegion] = useState<Region>({
    latitude: 35.6585, // 東京タワー周辺
    longitude: 139.7454,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 35.6585,
    longitude: 139.7454,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('make-plan');
  const [resetKey, setResetKey] = useState(Date.now()); // アニメーションリセット用のキー

  // 日本の有名な観光地のデモデータ
  const demoLocations = [
    { name: '東京タワー', region: { latitude: 35.6586, longitude: 139.7454 } },
    { name: '浅草寺', region: { latitude: 35.7147, longitude: 139.7966 } },
    { name: '東京スカイツリー', region: { latitude: 35.7100, longitude: 139.8107 } },
    { name: '渋谷スクランブル交差点', region: { latitude: 35.6595, longitude: 139.7004 } },
    { name: '京都・金閣寺', region: { latitude: 35.0394, longitude: 135.7292 } },
    { name: '大阪城', region: { latitude: 34.6873, longitude: 135.5262 } },
    { name: 'ユニバーサルスタジオジャパン', region: { latitude: 34.6654, longitude: 135.4323 } },
    { name: '沖縄美ら海水族館', region: { latitude: 26.6939, longitude: 127.8781 } },
    { name: '富士山', region: { latitude: 35.3606, longitude: 138.7274 } },
    { name: '札幌時計台', region: { latitude: 43.0622, longitude: 141.3540 } }
  ];

  // パスが変更されたときにアニメーションをリセット
  useEffect(() => {
    setResetKey(Date.now());
  }, [currentPath]);

  // 位置情報の許可
  useEffect(() => {
    // 位置情報リクエスト
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === 'granted');
        
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setMarkerCoordinate({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      } catch (error) {
        console.log('位置情報の取得に失敗しました:', error);
      }
    })();
  }, []);

  // 日付選択処理
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // 時間選択処理
  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  // 逆ジオコーディング処理（座標から住所を取得）
  const getLocationFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true);
      
      if (!GOOGLE_MAPS_API_KEY) {
        // APIキーが設定されていない場合はデモデータを使用
        setTimeout(() => {
          // 選択した場所に最も近い観光地を選ぶ
          let closestLocation = demoLocations[0];
          let minDistance = Number.MAX_VALUE;
          
          demoLocations.forEach(location => {
            const distance = calculateDistance(
              latitude, 
              longitude, 
              location.region.latitude, 
              location.region.longitude
            );
            
            if (distance < minDistance) {
              minDistance = distance;
              closestLocation = location;
            }
          });
          
          setLocation(closestLocation.name);
          setIsLoading(false);
        }, 500);
        return;
      }

      try {
        // Expoの位置情報APIを使用した逆ジオコーディング
        const [geocodedLocation] = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
        
        if (geocodedLocation) {
          const address = [
            geocodedLocation.name,
            geocodedLocation.street,
            geocodedLocation.city,
            geocodedLocation.region,
            geocodedLocation.country
          ]
            .filter(Boolean)
            .join(', ');
            
          setLocation(address);
        } else {
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      } catch (error) {
        console.error('Expo Geocoding error:', error);
        // Expoの位置情報取得に失敗した場合はGoogle APIを試みる
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}&language=ja`
        );
        
        const data = await response.json();
        
        if (data.status === 'OK' && data.results.length > 0) {
          // 最も関連性の高い結果を取得
          const formattedAddress = data.results[0].formatted_address;
          
          // 地名や著名なランドマークがあれば優先
          let placeName = '';
          const pointOfInterest = data.results.find(
            (result: any) => result.types.includes('point_of_interest') || 
                           result.types.includes('establishment')
          );
          
          if (pointOfInterest) {
            placeName = pointOfInterest.name || pointOfInterest.formatted_address;
          } else {
            // ポイントオブインタレストがない場合は最初の結果の短い住所を使用
            placeName = formattedAddress.split(',')[0];
          }
          
          setLocation(placeName);
        } else {
          // エラーが発生した場合は座標を表示
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          console.error('Geocoding error:', data.status);
        }
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      Alert.alert('エラー', '位置情報の取得に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  // 2点間の距離を計算（ヒュベニの式、単位はkm）
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // 地球の半径（km）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
  };

  // マップタップ処理
  const onMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoordinate({ latitude, longitude });
    
    // 逆ジオコーディングで住所を取得
    getLocationFromCoordinates(latitude, longitude);
  };

  // テキスト入力処理
  const onInterestChange = (text: string) => {
    setInterest(text);
    setInterestCount(text.length);
  };

  // フォーマット関数
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '/');
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // AIリクエストの送信
  const sendAIRequest = () => {
    // この関数は後で実装します
    console.log('AIリクエスト送信', {
      date: formatDate(date),
      time: formatTime(time),
      location,
      interest,
    });
  };

  // 必須項目が入力されているかチェック
  const isFormValid = () => {
    return location !== '場所を選択してください';
  };

  // マップが利用可能かどうかをチェック
  const renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={onMapPress}
        >
          <Marker
            coordinate={markerCoordinate}
            title="Selected Location"
            pinColor={colors.primary}
          />
        </MapView>
        <View style={styles.mapOverlay}>
          <Text style={styles.mapHint}>地図をタップして場所を選択</Text>
        </View>
      </View>
    );
  };

  return (
    <Layout 
      activeTab={activeTab} 
      statusBarStyle="light"
      backgroundImage={backgroundImage}
      overlayOpacity={0.45}
    >
      {/* ヘッダー - PageHeaderコンポーネント */}
      <PageHeader
        title="Make New Plan"
        subtitle="What you want to do ?"
        transparent={true}
      />
      
      {/* メインコンテンツ */}
      <AnimatedItem 
        delay={150} 
        resetKey={resetKey} 
        forceReset={true}
        style={styles.card}
      >
        {/* 日付選択 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date*</Text>
          <TouchableOpacity 
            style={styles.inputField}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        
        {/* 時間選択 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time *</Text>
          <TouchableOpacity 
            style={styles.inputField}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.inputText}>{formatTime(time)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
        
        {/* ロケーション選択 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location *</Text>
          <View style={styles.locationContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={[styles.inputText, styles.loadingText]}>場所を特定中...</Text>
              </View>
            ) : (
              <Text style={styles.inputText}>{location}</Text>
            )}
          </View>
          {/* マップを安全に描画 */}
          {renderMap()}
        </View>
        
        {/* 興味のある項目 */}
        <View style={styles.interestContainer}>
          <Text style={styles.label}>What your Interesting</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline
              placeholder="Type Here"
              value={interest}
              onChangeText={onInterestChange}
              maxLength={225}
            />
            <Text style={styles.counter}>{interestCount} / 225</Text>
          </View>
        </View>
        
        {/* 送信ボタン */}
        <TouchableOpacity 
          style={[
            styles.button,
            !isFormValid() && styles.buttonDisabled
          ]}
          onPress={sendAIRequest}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>SEND AI</Text>
        </TouchableOpacity>
      </AnimatedItem>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Platform.OS === 'ios' 
      ? 'rgba(28, 28, 30, 0.85)' // iOS用スタイル（半透明+ブラー）
      : 'rgba(28, 28, 30, 0.95)', // Android用スタイル（より不透明に）
    borderRadius: borderRadius.medium,
    padding: responsiveSize(20), // 内側の余白を少し増やす
    marginBottom: responsiveSize(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    ...(Platform.OS === 'ios' ? { backdropFilter: 'blur(10px)' } : {}), // iOSのみ適用
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // 微かな境界線
    marginHorizontal: 0, // 左右のマージンを0にして左端を揃える
  },
  inputContainer: {
    marginBottom: responsiveSize(20), // セクション間の余白を増やす
  },
  label: {
    fontSize: fontScale(typography.fontSizes.md),
    fontWeight: '400',
    color: colors.text.secondary,
    marginBottom: responsiveSize(8),
  },
  inputField: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.small,
    padding: responsiveSize(12),
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputText: {
    fontSize: fontScale(typography.fontSizes.md),
    color: colors.text.primary,
  },
  locationContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.small,
    padding: responsiveSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: responsiveSize(8),
    minHeight: responsiveSize(48),
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: responsiveSize(8),
    color: colors.text.secondary,
  },
  mapContainer: {
    height: responsiveSize(200),
    borderRadius: borderRadius.small,
    overflow: 'hidden',
    marginBottom: responsiveSize(16),
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: responsiveSize(10),
    right: responsiveSize(10),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(5),
    borderRadius: borderRadius.small,
  },
  mapHint: {
    color: colors.text.primary,
    fontSize: fontScale(typography.fontSizes.xs),
  },
  interestContainer: {
    marginBottom: responsiveSize(24),
  },
  textAreaContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: colors.border,
    padding: responsiveSize(12),
  },
  textArea: {
    fontSize: fontScale(typography.fontSizes.md),
    color: colors.text.primary,
    height: responsiveSize(120),
    textAlignVertical: 'top',
  },
  counter: {
    fontSize: fontScale(typography.fontSizes.xs),
    color: colors.text.secondary,
    textAlign: 'right',
    marginTop: responsiveSize(4),
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
    padding: responsiveSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: responsiveSize(8), // ボタン上部の余白を追加
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0.1, // 無効状態ではシャドウを弱める
  },
  buttonText: {
    color: colors.text.onPrimary,
    fontSize: fontScale(typography.fontSizes.md),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1, // 文字間隔を少し広げる
  },
}); 