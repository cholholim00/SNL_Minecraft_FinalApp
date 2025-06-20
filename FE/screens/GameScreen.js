import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function GameScreen({ route }) {
  const { question, optionA, optionB } = route.params;

  const optionA_ = optionA || '선택지 A';
  const optionB_ = optionB || '선택지 B';
  const question_ = question || '질문이 없습니다.';

  const soundRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../assets/click.mp3'));
      soundRef.current = sound;
    };
    loadSound();
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  const handleSelect = async (option) => {
    try {
      await soundRef.current?.replayAsync();  // 효과음 재생
      Haptics.selectionAsync();               // 진동 피드백
    } catch (err) {
      console.warn("사운드/진동 실패:", err);
    }

    Alert.alert("🟩 선택됨", `당신의 선택: ${option}`);
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.question} numberOfLines={3} adjustsFontSizeToFit>
        {question_}
      </Text>

      <TouchableOpacity style={styles.choice} onPress={() => handleSelect(optionA_)}>
        <Text style={styles.choiceText}>{optionA_}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.choice} onPress={() => handleSelect(optionB_)}>
        <Text style={styles.choiceText}>{optionB_}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

// ... styles 그대로 유지


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  question: {
    fontFamily: 'Minecraft',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30
  },
  choice: {
    backgroundColor: '#689F38',
    borderColor: '#33691E',
    borderWidth: 3,
    padding: 12,
    marginVertical: 8,
    width: '80%',
    borderRadius: 6
  },
  choiceText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
});
