import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Intro'); // 다음 스크린으로 자동 이동
    }, 2500); // 2.5초 후 이동

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/splash_unique.png')} // 유니크한 시작 이미지
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.title}>AI 밸런스 게임</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 28,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  }
});
