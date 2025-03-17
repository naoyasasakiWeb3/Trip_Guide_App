import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabOneScreen() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        {/* ヘッダー部分 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.todayText}>Today</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={24} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* 朝の情報収集術カード */}
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
            style={styles.cardImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>忙しい朝の情報収集術</Text>
              <Text style={styles.cardSubtitle}>天気や食事の摂り方などを素早く見つけるために賢く情報収集</Text>
            </View>
          </LinearGradient>
        </View>

        {/* STAY HOMEカード */}
        <View style={styles.stayHomeSection}>
          <Text style={styles.sectionLabel}>STAY HOME</Text>
          <View style={styles.stayHomeCard}>
            <View style={styles.stayHomeContent}>
              <Text style={styles.stayHomeTitle}>筋力トレーニングに{'\n'}チャレンジ</Text>
              <Text style={styles.stayHomeSubtitle}>運動不足を解消しましょう。{'\n'}習慣は必要ありません！</Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }}
              style={styles.stayHomeImage}
            />
          </View>
        </View>

        {/* GAMESセクション */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionLabel}>GAMES</Text>
          <Text style={styles.sectionTitle}>Top Apple{'\n'}Arcade Games</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }}
            style={styles.gameSectionImage}
          />
        </View>

        {/* THE DAILY LISTセクション */}
        <View style={styles.dailyListSection}>
          <Text style={styles.sectionLabel}>THE DAILY LIST</Text>
          <Text style={styles.sectionTitle}>Defy gravity</Text>
          
          {/* ゲームリストアイテム */}
          <View style={styles.gameItem}>
            <Image 
              source={{ uri: 'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/5e/9b/41/5e9b41d7-9a3d-3c1b-1f73-9d5bb6b731a0/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.png' }}
              style={styles.gameIcon} 
            />
            <View style={styles.gameDetails}>
              <Text style={styles.gameTitle}>Dandara Trail of Fear Edition</Text>
              <Text style={styles.gameSubtitle}>A metroidvania adventure...</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>¥730</Text>
            </View>
          </View>
          
          <View style={styles.gameItem}>
            <Image 
              source={{ uri: 'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/a1/a9/a9/a1a9a9e5-9e67-f481-6c12-7a3a1df775e4/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.png' }}
              style={styles.gameIcon} 
            />
            <View style={styles.gameDetails}>
              <Text style={styles.gameTitle}>Piloteer</Text>
              <Text style={styles.gameSubtitle}>Adventure</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>¥370</Text>
            </View>
          </View>
          
          <View style={styles.gameItem}>
            <Image 
              source={{ uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/90/83/2c/90832c02-a23a-2845-3f8f-91b6e3a2e0d5/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.png' }}
              style={styles.gameIcon} 
            />
            <View style={styles.gameDetails}>
              <Text style={styles.gameTitle}>Grab Lab</Text>
              <Text style={styles.gameSubtitle}>Silly Gravity Arcade Puzzler</Text>
            </View>
            <TouchableOpacity style={styles.getButton}>
              <Text style={styles.getButtonText}>GET</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.gameItem}>
            <Image 
              source={{ uri: 'https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/6d/62/76/6d6276d8-fd32-93f0-4cee-c5c68af237b4/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.png' }}
              style={styles.gameIcon} 
            />
            <View style={styles.gameDetails}>
              <Text style={styles.gameTitle}>Teslagrad Lab</Text>
              <Text style={styles.gameSubtitle}>A hard science magnetic puzzle</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>¥610</Text>
            </View>
          </View>
        </View>
        
        {/* HOWTOセクション */}
        <View style={styles.howtoSection}>
          <Text style={styles.sectionLabel}>HOWTO</Text>
          <View style={styles.howtoCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }}
              style={styles.howtoImage} 
            />
            <View style={styles.howtoContent}>
              <Text style={styles.howtoTitle}>安全で簡単な{'\n'}パスワード管理</Text>
              <Text style={styles.howtoSubtitle}>パスワード管理アプリを利用して{'\n'}ユーザーにとって安全なパスワードを設定しよう</Text>
            </View>
          </View>
        </View>
        
        {/* 下部のスペース */}
        <View style={styles.bottomSpace} />
      </ScrollView>
      
      {/* タブバー（実際は別のコンポーネントとして実装されますが、参考用に） */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="today" size={24} color="#0a84ff" />
          <Text style={[styles.tabText, styles.activeTab]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="rocket" size={24} color="#8e8e93" />
          <Text style={styles.tabText}>Games</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="apps" size={24} color="#8e8e93" />
          <Text style={styles.tabText}>Apps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="game-controller" size={24} color="#8e8e93" />
          <Text style={styles.tabText}>Arcade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="search" size={24} color="#8e8e93" />
          <Text style={styles.tabText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  dateText: {
    color: '#8e8e93',
    fontSize: 12,
  },
  todayText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 400,
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
    borderRadius: 16,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#8e8e93',
    fontSize: 12,
    marginLeft: 16,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 4,
  },
  stayHomeSection: {
    paddingBottom: 16,
  },
  stayHomeCard: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1e',
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
  },
  stayHomeContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  stayHomeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stayHomeSubtitle: {
    color: '#8e8e93',
    fontSize: 14,
  },
  stayHomeImage: {
    width: '50%',
    height: '100%',
  },
  gamesSection: {
    backgroundColor: '#1c1c1e',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 16,
  },
  gameSectionImage: {
    width: '100%',
    height: 200,
    marginTop: 12,
  },
  dailyListSection: {
    backgroundColor: '#1c1c1e',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 16,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  gameIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  gameDetails: {
    flex: 1,
    marginLeft: 12,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  gameSubtitle: {
    color: '#8e8e93',
    fontSize: 12,
  },
  priceTag: {
    backgroundColor: '#323236',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  priceText: {
    color: '#0a84ff',
    fontSize: 14,
  },
  getButton: {
    backgroundColor: '#0a84ff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  getButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  howtoSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  howtoCard: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
  },
  howtoImage: {
    width: '50%',
    height: '100%',
  },
  howtoContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  howtoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  howtoSubtitle: {
    color: '#8e8e93',
    fontSize: 12,
  },
  bottomSpace: {
    height: 80,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderTopWidth: 0.5,
    borderTopColor: '#3a3a3c',
    paddingBottom: 20,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#8e8e93',
    fontSize: 10,
    marginTop: 4,
  },
  activeTab: {
    color: '#0a84ff',
  },
});
