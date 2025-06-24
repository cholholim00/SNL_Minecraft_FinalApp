import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/start_bg.png')}  // 배경 이미지가 있다면
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>AI 밸런스 게임</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro')}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 28,
    color: '#fff',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff'
  }
});
