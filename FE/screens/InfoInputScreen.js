import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
      source={require('../assets/info_input_bg.png')}
      style={styles.container}
      resizeMode="contain"
      imageStyle={{ opacity: 0.8 }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}> {/* ✅ inner View로 wrap */}
          <Text style={styles.title}>🎮 당신을 선택해주세요!</Text>

          <View style={styles.section}>
            <Text style={styles.subtitle}>당신의 성별은?</Text>
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
            <Text style={styles.subtitle}>당신의 나이대를 선택해주세요</Text>
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
        </View>
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
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  inner: {
    minHeight: height * 0.9, // ✅ 스크롤에 최소 높이 보장
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 22,
    color: '#fff',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center'
  },
  section: {
    marginBottom: 30,
    alignItems: 'center'
  },
  subtitle: {
    fontFamily: 'Minecraft',
    fontSize: 16,
    color: '#fff',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  character: {
    width: width * 0.25,
    height: width * 0.25,
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: '#FFEB3B'
  },
  ageBox: {
    backgroundColor: '#33691E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderRadius: 6
  },
  selectedBox: {
    backgroundColor: '#689F38'
  },
  ageText: {
    fontFamily: 'Minecraft',
    fontSize: 14,
    color: '#fff'
  },
  nextBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10
  },
  nextText: {
    fontFamily: 'Minecraft',
    fontSize: 16,
    color: '#fff'
  }
});
