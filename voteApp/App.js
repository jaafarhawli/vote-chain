import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import {useFonts} from 'expo-font'

export default function App() {

  const [fonts] = useFonts({
    AppFontBold: require('./assets/fonts/Quicksand-Bold.ttf'),
    AppFont: require('./assets/fonts/Quicksand-Regular.ttf'),
    AppFontMedium: require('./assets/fonts/Quicksand-Medium.ttf'),
    AppFontSemi: require('./assets/fonts/Quicksand-SemiBold.ttf'),
  })

  if(!fonts)
  return null;

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}


