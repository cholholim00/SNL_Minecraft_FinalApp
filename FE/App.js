import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from './screens/IntroScreen';
import InfoInputScreen from './screens/InfoInputScreen';
import SituationScreen from './screens/SituationScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import PersonalityResultScreen from './screens/PersonalityResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="InfoInput" component={InfoInputScreen} options={{ title: '정보 입력' }} />
        <Stack.Screen name="SituationInput" component={SituationScreen} options={{ title: '상황 선택' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: '게임 시작' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: '결과' }} />
        <Stack.Screen name="PersonalityResult" component={PersonalityResultScreen} options={{ title: '성격 결과' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}