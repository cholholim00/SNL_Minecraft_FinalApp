import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function ResultScreen({ route, navigation }) {
  const { selectedOption } = route.params;

  return (
    <ImageBackground
      source={require('../assets/Result.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <Animatable.Text animation="zoomInDown" style={styles.result}>
        당신의 선택은...
      </Animatable.Text>
      <Animatable.Text animation="bounceIn" delay={500} style={styles.option}>
        {selectedOption}
      </Animatable.Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>처음으로</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: {
    flex: 1,
    width: '100%',        // 전체 너비
    height: '100%',       // 전체 높이
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  result: {
    fontSize: 24,
    fontFamily: 'Minecraft',
    color: '#fff',
    marginBottom: 20
  },
  option: {
    fontSize: 36,
    fontFamily: 'Minecraft',
    color: '#4CAF50',
    marginBottom: 40
  },
  button: {
    padding: 12,
    backgroundColor: '#689F38',
    borderRadius: 8
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff'
  }
});
