import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function PersonalityResultScreen({ route, navigation }) {
  const { answers } = route.params;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const res = await fetch('http://192.168.100.184:5000/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answers })
        });

        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error('성격 분석 실패:', error);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonality();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>당신의 성격을 분석 중입니다...</Text>
      </View>
    );
  }

  if (!result) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>분석에 실패했습니다. 다시 시도해주세요.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.retryText}>← 결과 화면으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/logo.png')}
      resizeMode="contain"
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>
              당신의 성격 유형은 무엇일까요?
        </Animatable.Text>

        <Animatable.Image
          animation="zoomIn"
          delay={300}
          source={{ uri: result.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        <Animatable.View animation="fadeInUp" delay={600} style={styles.textBox}>
          <Text style={styles.resultTitle}>알고보면 난....?</Text> 
          <Text>{result.title} 이잖아!!</Text>
          <Text style={styles.description}>{result.description}</Text>
        </Animatable.View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Intro')}
        >
          <Text style={styles.buttonText}>다시 시작하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.06,
    color: '#fff',
    marginBottom: height * 0.02,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: height * 0.03
  },
  textBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: width * 0.05,
    marginBottom: height * 0.04
  },
  resultTitle: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.05,
    color: '#FFC107',
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.04,
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#689F38',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    marginBottom: height * 0.05
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: width * 0.045,
    color: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  loadingText: {
    marginTop: 20,
    fontFamily: 'Minecraft',
    color: '#fff',
    fontSize: 16
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  errorText: {
    color: '#f88',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Minecraft'
  },
  retryText: {
    color: '#ccc',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});
