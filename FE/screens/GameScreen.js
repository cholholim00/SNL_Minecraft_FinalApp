import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

const TOTAL_ROUNDS = 5;

export default function GameScreen({ route, navigation }) {
  const { questions } = route.params; // questions: Array<{question, optionA, optionB}>
  const [round, setRound] = useState(0);
  const [answers, setAnswers] = useState([]);
  const soundRef = useRef(null);

  const current = questions[round] || {};
  const optionA_ = current.optionA || '선택지 A';
  const optionB_ = current.optionB || '선택지 B';
  const question_ = current.question || `ROUND ${round + 1}`;

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
      console.warn('사운드/진동 실패:', err);
    }

    const newAnswers = [...answers, { round: round + 1, question: question_, selected: option }];
    if (round + 1 < TOTAL_ROUNDS) {
      setAnswers(newAnswers);
      setRound(round + 1);
    } else {
      navigation.navigate('Result', { answers: newAnswers });
    }
  };

  return (
    <ImageBackground source={require('../assets/Game.png')} resizeMode="cover" style={styles.container}>
      <Text style={styles.roundText}>ROUND {round + 1} / {TOTAL_ROUNDS}</Text>
      <Text style={styles.question}>{question_}</Text>

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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  roundText: {
    fontSize: 16,
    color: '#ccc',
    fontFamily: 'Minecraft',
    marginBottom: 10
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
