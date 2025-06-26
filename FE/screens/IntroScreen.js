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

      {/* 시작하기 버튼 */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('InfoInput')}
      >
        <Text style={styles.startText}>🎮 시작하기</Text>
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
 startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#33691E',
    marginBottom: height * 0.05,
  },
  startText: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
     fontFamily: 'Minecraft',
    color: '#fff'
  }
});
