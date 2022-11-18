import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import {useFonts} from 'expo-font'
import BottomTabNavigator from './navigations/BottomTabNavigator';
import * as SecureStore from 'expo-secure-store';

export default function App() {

  const [token, setToken] = useState();

  const checkToken = async () => {
    let result = await SecureStore.getItemAsync('token')
    setToken(result)
  }

  useEffect(() => {
    checkToken();
  }, []);
  
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
      {token ?
      <BottomTabNavigator />
      :
      <AuthNavigator />
      }
    </NavigationContainer>
  );
}


