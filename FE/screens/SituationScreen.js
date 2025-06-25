import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SituationInputScreen({ navigation, route }) {
  const { gender, age } = route.params;

  const [relation, setRelation] = useState(null);
  const [mood, setMood] = useState(null);

  const handleNext = () => {
    if (relation && mood) {
      navigation.navigate('Game', {
        gender,
        age,
        relationship: relation,
        tone: mood
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Situation.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>관계를 선택하세요</Text>
        <View style={styles.options}>
          {['👯‍♂️친구', '💑연인', '👨‍👩‍👧‍👦가족', '🧑‍💼직장동료'].map((item) => (
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
          {['😂웃긴', '🤯어이없는', '😢슬픈', '🤔애매한'].map((item) => (
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
            <Text style={styles.nextText}>👉 다음</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.08,
    paddingHorizontal: width * 0.05,
    minHeight: height * 0.95
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.05, // 반응형 텍스트
    color: '#fff',
    marginVertical: height * 0.015,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: height * 0.02
  },
  button: {
    backgroundColor: '#33691E',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.06,
    margin: width * 0.02,
    borderRadius: 8,
    minWidth: width * 0.3,
    alignItems: 'center'
  },
  selected: {
    backgroundColor: '#689F38'
  },
  text: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.04,
    color: '#fff'
  },
  nextBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 8,
    marginTop: height * 0.02
  },
  nextText: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.045,
    color: '#fff'
  }
});
