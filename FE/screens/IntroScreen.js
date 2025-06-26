import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function IntroScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/splash_unique.png')}
      style={styles.container}
      resizeMode="contain"
    >
      <Text style={styles.title}>너라면 뭘 고를래?</Text>

      {/* 시작하기 버튼 */}
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>🎮 시작하기</Text>
      </TouchableOpacity>

      {/* 저장 리스트 버튼 */}
      <TouchableOpacity
        style={styles.rightButton}
        onPress={() => navigation.navigate('SavedList')}
      >
        <Text style={styles.buttonText}>📂 저장 리스트</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#1B1B1B',
    width: '100%',
    height: '100%',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.08
  },
    title: {
    position: 'absolute',
    top: height * 0.3,
    fontFamily: 'Minecraft',
    fontSize: Platform.OS === 'web' ? 30 : 26,
    color: '#fff',
    width: '100%',                    // ✅ 전체 가로 기준으로
    textAlign: 'center',             // ✅ 가운데 정렬
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  leftButton: {
    position: 'absolute',
    bottom: height * 0.11,
    left: width * 0.20,
    width: width * 0.32,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightButton: {
    position: 'absolute',
    bottom: height * 0.11,
    right: width * 0.26,
    width: width * 0.32,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
 buttonText: {
  fontFamily: 'Minecraft',
  fontSize: Platform.OS === 'web' ? 18 : 16,
  color: '#fff',
  textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,

  paddingHorizontal: 12,  // ✅ 양 옆 여백 추가
  textAlign: 'left'       // ✅ 왼쪽 정렬 (필요 시만)
}

});
