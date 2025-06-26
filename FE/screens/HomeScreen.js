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

export default function HomeScreen({ navigation }) {
  return (
   <ImageBackground
  source={require('../assets/Home.png')}
  style={{
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }}
  resizeMode="contain"  // 또는 'contain'
>
  <Text style={styles.title}>AI 밸런스 게임</Text>
  <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('InfoInput')}>
    <Text style={styles.startText}>시작하기</Text>
  </TouchableOpacity>
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 28,
    fontFamily: 'Minecraft',
   textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: height * 0.03,
    textAlign: 'center'
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#33691E',
    marginBottom: height * 0.25,
  },
  startText: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontFamily: 'Minecraft',
    color: '#fff'
  }
});
