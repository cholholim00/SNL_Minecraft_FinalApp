import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function IntroScreen({ navigation }) {
  const handleStart = () => {
    navigation.replace('InfoInput'); // 다음 화면으로 이동 (뒤로가기 제거)
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleStart}>
      <ImageBackground
        source={require('../assets/splash_intro.png')} // 생성한 인트로 이미지 사용
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.tapText}>👆 탭하여 시작 👆</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    paddingBottom: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    alignItems: 'center',
  },
  tapText: {
    fontFamily: 'Minecraft',
    fontSize: 22,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
// 이 파일은 앱의 인트로 화면을 담당합니다.
// 사용자가 화면을 탭하면 다음 화면으로 이동합니다.