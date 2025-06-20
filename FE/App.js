import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   'Minecraft': require('./assets/fonts/Minecraft.ttf'),
  // });

  // if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'AI 밸런스 생성기' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: '나 🍜?' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: '결과 화면' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
