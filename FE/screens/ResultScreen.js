import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro')}>
        <Text style={styles.buttonText}>처음으로 돌아가기</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('PersonalityResult', { answers })}
>
  <Text style={styles.buttonText}>성격 결과 보기</Text>
</TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.07,
    paddingBottom: height * 0.03
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.06,
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.03,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  scrollContent: {
    paddingBottom: height * 0.1,
    alignItems: 'center'
  },
  resultBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: width * 0.04,
    marginVertical: 6,
    width: '100%',
    borderColor: '#4CAF50',
    borderWidth: 2
  },
  question: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.04,
    color: '#fff',
    marginBottom: 6
  },
  answer: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.045,
    color: '#FFC107'
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#689F38',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    marginTop: height * 0.02
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.045,
    color: '#fff'
  }
});
