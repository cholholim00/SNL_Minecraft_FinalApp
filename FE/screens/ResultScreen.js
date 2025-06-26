import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function ResultScreen({ route, navigation }) {
  const { answers } = route.params;

  return (
    <ImageBackground
      source={require('../assets/Home.png')} // 🎨 적절한 배경 이미지 사용
      resizeMode="cover"
      style={styles.container}
    >
      {/* 🎯 로고 + 타이틀 */}
      <Animatable.View animation="zoomInDown" style={styles.titleRow}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>당신의 선택 결과</Text>
      </Animatable.View>

      {/* ✅ 스크롤 가능한 결과 목록 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {answers.map((ans, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 150}
            style={styles.resultBox}
          >
            <Text style={styles.question}>{`Q${index + 1}. ${ans.question}`}</Text>
            <Text style={styles.answer}>{`👉 ${ans.selected}`}</Text>
          </Animatable.View>
        ))}
      </ScrollView>

      {/* ✅ 버튼들 */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro')}>
        <Text style={styles.buttonText}>처음으로 돌아가기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PersonalityResult', { answers })}
      >
        <Text style={styles.buttonText}>성격 결과 보기가기</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.03
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03
  },
  logoIcon: {
    width: width * 0.10,
    height: width * 0.10,
    marginRight: 10
  },
  titleText: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.06,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  scrollContent: {
    paddingBottom: height * 0.08,
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
    marginTop: height * 0.015
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.045,
    color: '#fff'
  }
});
