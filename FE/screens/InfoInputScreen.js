import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  useWindowDimensions
} from 'react-native';

export default function InfoInputScreen({ navigation }) {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const { width, height } = useWindowDimensions();

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
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: height * 0.03,
          paddingHorizontal: width * 0.04
        }}
      >
        <View style={{ width: '100%', maxWidth: 460, alignItems: 'center' }}>
          {/* 🎮 타이틀 */}
          <Text style={[styles.title, { fontSize: width * 0.04 }]}>
            🎮 당신을 선택해주세요!
          </Text>

          {/* 👦👧 성별 선택 */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, { fontSize: width * 0.028 }]}>
              당신의 성별은?
            </Text>
            <View style={styles.row}>
              {[{ label: '남', image: require('../assets/boy_pixel.png') },
                { label: '여', image: require('../assets/girl_pixel.png') }].map((item) => (
                <TouchableOpacity key={item.label} onPress={() => setGender(item.label)}>
                  <Image
                    source={item.image}
                    style={{
                      width: width * 0.2,
                      height: width * 0.2,
                      marginHorizontal: 8,
                      borderWidth: 2,
                      borderRadius: 6,
                      borderColor: gender === item.label ? '#FFEB3B' : 'transparent'
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 📊 나이 선택 */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, { fontSize: width * 0.028 }]}>
              당신의 나이대를 선택해주세요
            </Text>
            <View style={[styles.row, { flexWrap: 'wrap' }]}>
              {['10대', '20~30대', '40~50대'].map((a) => (
                <TouchableOpacity
                  key={a}
                  onPress={() => setAge(a)}
                  style={{
                    backgroundColor: age === a ? '#689F38' : '#33691E',
                    paddingVertical: height * 0.01,
                    paddingHorizontal: width * 0.05,
                    borderRadius: 6,
                    margin: 4
                  }}
                >
                  <Text style={[styles.ageText, { fontSize: width * 0.025 }]}>
                    {a}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ✅ 다음 버튼 */}
          {gender && age && (
            <TouchableOpacity
              style={{
                backgroundColor: '#4CAF50',
                paddingVertical: height * 0.015,
                paddingHorizontal: width * 0.08,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#33691E',
                marginTop: height * 0.015
              }}
              onPress={handleNext}
            >
              <Text style={[styles.buttonText, { fontSize: width * 0.028 }]}>
                👉 다음으로
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: 'Minecraft',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  subtitle: {
    fontFamily: 'Minecraft',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center'
  },
  section: {
    marginBottom: 24,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ageText: {
    fontFamily: 'Minecraft',
    color: '#fff',
    textAlign: 'center'
  },
  buttonText: {
    fontFamily: 'Minecraft',
    color: '#fff',
    textAlign: 'center'
  }
});
