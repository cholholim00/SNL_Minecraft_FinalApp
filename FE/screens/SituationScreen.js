// screens/SituationInputScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function SituationInputScreen({ navigation, route }) {
  const { gender, age } = route.params;

  const [relation, setRelation] = useState(null);
  const [mood, setMood] = useState(null);

  const handleNext = () => {
    if (relation && mood) {
      navigation.navigate('Game', {
        gender,
        age,
        relation,
        mood
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/logo.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>관계를 선택하세요</Text>
      <View style={styles.options}>
        {['친구', '연인', '가족', '직장동료'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.button, relation === item && styles.selected]}
            onPress={() => setRelation(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>상황을 선택하세요</Text>
      <View style={styles.options}>
        {['웃긴', '어이없는', '슬픈', '애매한'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.button, mood === item && styles.selected]}
            onPress={() => setMood(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {relation && mood && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>다음</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center' },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 22,
    color: '#fff',
    marginVertical: 12
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16
  },
  button: {
    backgroundColor: '#33691E',
    padding: 10,
    margin: 6,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center'
  },
  selected: {
    backgroundColor: '#689F38'
  },
  text: {
    fontFamily: 'Minecraft',
    fontSize: 16,
    color: '#fff'
  },
  nextBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20
  },
  nextText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff'
  }
});
