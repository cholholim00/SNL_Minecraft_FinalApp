import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function ResultScreen({ route, navigation }) {
  const { answers } = route.params;

  return (
    <ImageBackground
      source={require('../assets/logo.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <Animatable.Text animation="zoomInDown" style={styles.title}>
        당신의 선택 결과
      </Animatable.Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {answers.map((ans, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 200}
            style={styles.resultBox}
          >
            <Text style={styles.question}>{`Q${index + 1}. ${ans.question}`}</Text>
            <Text style={styles.answer}>{`👉 ${ans.selected}`}</Text>
          </Animatable.View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>처음으로 돌아가기</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20
  },
  scrollContent: {
    paddingBottom: 100,
    alignItems: 'center'
  },
  resultBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    borderColor: '#4CAF50',
    borderWidth: 2
  },
  question: {
    fontFamily: 'Minecraft',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8
  },
  answer: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#FFC107'
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#689F38',
    padding: 12,
    borderRadius: 6
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: 16,
    color: '#fff'
  }
});
