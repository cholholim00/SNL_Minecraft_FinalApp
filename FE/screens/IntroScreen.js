// screens/IntroScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function IntroScreen({ navigation }) {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate('Select')}
    >
      <ImageBackground
        source={require('../assets/splash_intro.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.title}>AI 밸런스 게임</Text>
        <Text style={styles.tapToStart}>탭하여 시작!</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 32,
    color: '#fff',
    marginBottom: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tapToStart: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#eee',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8
  }
});
