import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function GameScreen({ route, navigation }) {
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
      await soundRef.current?.replayAsync();
      Haptics.selectionAsync();
    } catch (err) {
      console.warn("사운드/진동 실패:", err);
    }

    navigation.navigate('Result', {
      selectedOption: option,
      question: question_
    });
  };

  return (
    <ImageBackground
      source={require('../assets/Game.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',       // 화면 전체 너비
    height: '100%',      // 화면 전체 높이
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
