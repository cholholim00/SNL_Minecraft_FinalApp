import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function GameScreen({ route, navigation }) {
  const { gender, age, relationship, tone } = route.params;
  const [round, setRound] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const soundRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/click.mp3')
      );
      soundRef.current = sound;
    };
    loadSound();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://192.168.100.164:5000/scenario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gender,
            age_group: age,
            relationship,
            tone
          })
        });
        const data = await res.json();
        console.log("질문 데이터:", data);
        setQuestions(data.rounds);
      } catch (err) {
        console.error("질문 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelect = async (option) => {
    try {
      await soundRef.current?.replayAsync();
      Haptics.selectionAsync();
    } catch {}

    const newSelections = [...selectedOptions, option];
    setSelectedOptions(newSelections);

    if (round < 4) {
      setRound(round + 1);
    } else {
      navigation.navigate('Result', {
        results: newSelections,
        allQuestions: questions
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={{ flex: 1 }} />;
  }

  const { scenario, choiceA, choiceB } = questions[round] || {};

  return (
    <ImageBackground source={require('../assets/Game.png')} style={styles.container} resizeMode="cover">
      <Text style={styles.round}>ROUND {round + 1} / 5</Text>
      <Text style={styles.question}>{scenario}</Text>
      <TouchableOpacity style={styles.choice} onPress={() => handleSelect(choiceA)}>
        <Text style={styles.choiceText}>{choiceA}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.choice} onPress={() => handleSelect(choiceB)}>
        <Text style={styles.choiceText}>{choiceB}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  round: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff',
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
