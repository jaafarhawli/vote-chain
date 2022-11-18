import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import {useFonts} from 'expo-font'
import BottomTabNavigator from './navigations/BottomTabNavigator';
import * as SecureStore from 'expo-secure-store';
import { viewUser } from './api/viewUser';
import {Provider} from 'react-redux';
import { store } from './redux/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import 'react-native-gesture-handler';
import DrawerNavigator from './navigations/DrawerNavigator';
import { StatusBar } from 'expo-status-bar';
import { colors } from './constants';

export default function App() {
  
  const client = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState();

  const checkToken = async () => {
    const result = await SecureStore.getItemAsync('token');
    const data = await viewUser(result);
    if(data.data) {
      setIsAuthenticated(data.data);
      await SecureStore.setItemAsync('id', String(data.data.data._id));
      await SecureStore.setItemAsync('username', String(data.data.data.username));
    }
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
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <StatusBar backgroundColor={colors.black[200]} style="light" />
        <NavigationContainer>
          {isAuthenticated ?
          <DrawerNavigator />
          :
          <AuthNavigator />
          }
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}


