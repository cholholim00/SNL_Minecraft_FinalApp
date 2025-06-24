import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function SituationScreen({ route, navigation }) {
  const { gender, age } = route.params;

  const [relation, setRelation] = useState(null);
  const [tone, setTone] = useState(null);

  const handleNext = () => {
    if (!relation || !tone) return;

    // 이후 GameScreen으로 이동하면서 모든 선택값 전달
    navigation.navigate('Game', {
      gender,
      age,
      relation,
      tone
    });
  };

  return (
    <ImageBackground
      source={require('../assets/logo.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>상황을 선택하세요</Text>

      <Text style={styles.subTitle}>관계</Text>
      <View style={styles.row}>
        {['친구', '연인', '가족', '직장동료'].map(rel => (
          <TouchableOpacity
            key={rel}
            style={[styles.choice, relation === rel && styles.selected]}
            onPress={() => setRelation(rel)}
          >
            <Text style={styles.text}>{rel}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>분위기</Text>
      <View style={styles.row}>
        {['웃긴', '애매한', '슬픈', '어이없는'].map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.choice, tone === t && styles.selected]}
            onPress={() => setTone(t)}
          >
            <Text style={styles.text}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !(relation && tone) && { opacity: 0.4 }]}
        onPress={handleNext}
        disabled={!(relation && tone)}
      >
        <Text style={styles.text}>🎮 밸런스 질문 받기</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    marginBottom: 8
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 },
  choice: {
    backgroundColor: '#eee',
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8
  },
  selected: { backgroundColor: '#4CAF50' },
  text: {
    fontFamily: 'Minecraft',
    fontSize: 16,
    color: '#000'
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#689F38',
    padding: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#33691E'
  }
});
