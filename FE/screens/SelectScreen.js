// screens/InfoInputScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function SelectScreen({ navigation }) {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);

  const handleNext = () => {
    if (gender && age) {
      navigation.navigate('Situation', { gender, age });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/select.png')} // 이미지 이름은 수정 가능
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>성별을 선택하세요</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, gender === '남' && styles.selected]} onPress={() => setGender('남')}>
          <Text style={styles.buttonText}>남</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, gender === '여' && styles.selected]} onPress={() => setGender('여')}>
          <Text style={styles.buttonText}>여</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>연령대를 선택하세요</Text>
      <View style={styles.column}>
        {['10대', '20~30대', '40~50대'].map((a) => (
          <TouchableOpacity
            key={a}
            style={[styles.button, age === a && styles.selected]}
            onPress={() => setAge(a)}
          >
            <Text style={styles.buttonText}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {gender && age && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>다음</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  column: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#33691E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 8,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#689F38',
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff',
  },
  nextBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  nextText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff',
  }
});
