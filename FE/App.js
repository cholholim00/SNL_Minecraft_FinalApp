import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import IntroScreen from './screens/IntroScreen';  // ✅ 새로 추가
import SelectScreen from './screens/SelectScreen';
import SituationScreen from './screens/SituationScreen'; // 다음에 만들 화면
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen'; // 결과 화면도 포함
// 추후 SelectScreen 등도 여기에 추가

const Stack = createNativeStackNavigator();

export default function App() {

   return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Intro">
  <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
  <Stack.Screen name="Select" component={SelectScreen} options={{ title: '정보 입력' }} />
  <Stack.Screen name="Situation" component={SituationScreen} options={{ title: '상황 선택' }} />
  <Stack.Screen name="Game" component={GameScreen} options={{ title: '게임 시작' }} />
  <Stack.Screen name="Result" component={ResultScreen} options={{ title: '결과' }} />
  {/* 추후 다른 화면들도 여기에 추가 */}
</Stack.Navigator>
    </NavigationContainer>
  );
}