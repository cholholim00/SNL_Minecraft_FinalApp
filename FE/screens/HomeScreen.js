import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [keywords, setKeywords] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await fetch('http://192.168.100.166:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords })
      });
      const data = await res.json();
      if (data.question) {
        navigation.navigate('Game', { question: data.question });
      } else {
        Alert.alert('⚠️ 질문 생성 실패', '서버 응답이 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('❌ 서버와 연결할 수 없습니다:', err);
      Alert.alert('❌ 오류', '서버와 연결할 수 없습니다.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      resizeMode="cover"
     style={styles.background} // 여기 주목
    >
      <text style={styles.title}>S.N.L = Seriously Nonsense League  - 쓸모없음의 끝에서 만나는 진지함</text>
      <View style={styles.innerContainer}> {/* padding은 여기에 */}
      <Text style={styles.title}>🎮 내 인생에 왜 이런 게 필요하지? 월드컵</Text>
      <TextInput
        value={keywords}
        onChangeText={setKeywords}
        placeholder="키워드를 입력하세요"
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, !keywords && { opacity: 0.5 }]}
        onPress={handleGenerate}
        disabled={!keywords}
      >
        <Text style={styles.buttonText}>🎲 질문 생성</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: 30
  },
  input: {
    backgroundColor: '#D7CCC8',
    borderWidth: 4,
    borderColor: '#3E2723',
    fontFamily: 'Minecraft',
    fontSize: 18,
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  button: {
    backgroundColor: '#689F38',
    borderWidth: 3,
    borderColor: '#33691E',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  buttonText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff'
  }
});
