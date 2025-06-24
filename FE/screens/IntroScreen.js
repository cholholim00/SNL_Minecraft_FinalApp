import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.introText}>밸런스 게임의 세계에 오신 것을 환영합니다!</Text>

      <TouchableOpacity style={styles.tapArea} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.tapText}>탭하여 시작</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: height * 0.1
  },
  introText: {
    fontFamily: 'Minecraft',
    fontSize: Platform.OS === 'web' ? 24 : 20,
    color: '#fff',
    textAlign: 'center',
    padding: width * 0.1
  },
  tapArea: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8
  },
  tapText: {
    fontFamily: 'Minecraft',
    fontSize: Platform.OS === 'web' ? 20 : 16,
    color: '#fff'
  }
});
