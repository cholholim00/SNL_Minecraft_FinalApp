import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default function InfoInputScreen({ navigation }) {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);

  const handleNext = () => {
    if (gender && age) {
      navigation.navigate('SituationInput', { gender, age });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/info_input_bg.png')} // 픽셀 아트 배경
      style={styles.container}
      resizeMode="cover"
      width={'100%'}
      height={'100%'}
      imageStyle={{ opacity: 0.8 }} // 배경 이미지 투명도 조절
      
    >
      <Text style={styles.title}>🎮 당신을 선택해주세요!</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>성별</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setGender('남')}>
            <Image
              source={require('../assets/boy_pixel.png')}
              style={[
                styles.character,
                gender === '남' && styles.selected
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('여')}>
            <Image
              source={require('../assets/girl_pixel.png')}
              style={[
                styles.character,
                gender === '여' && styles.selected
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>연령대</Text>
        <View style={styles.row}>
          {['10대', '20~30대', '40~50대'].map((a) => (
            <TouchableOpacity
              key={a}
              style={[
                styles.ageBox,
                age === a && styles.selectedBox
              ]}
              onPress={() => setAge(a)}
            >
              <Text style={styles.ageText}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {gender && age && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>👉 다음으로</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 26,
    color: '#fff',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  section: {
    marginBottom: 30,
    alignItems: 'center'
  },
  subtitle: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  character: {
    width: 100,
    height: 100,
    marginHorizontal: 12,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: '#FFEB3B'
  },
  ageBox: {
    backgroundColor: '#33691E',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 6
  },
  selectedBox: {
    backgroundColor: '#689F38'
  },
  ageText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff'
  },
  nextBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20
  },
  nextText: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#fff'
  }
});
// 이 파일은 사용자의 성별과 연령대를 입력받는 화면을 담당합니다.
// 사용자가 선택한 정보는 다음 화면으로 전달됩니다.