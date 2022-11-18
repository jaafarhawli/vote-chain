import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen/HomeScreen';
import ResultsScreen from '../screens/Home/ResultsScreen/ResultsScreen';
import VoteScreen from '../screens/Home/VoteScreen/VoteScreen';
import { Entypo, MaterialCommunityIcons, Foundation  } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

  const election = useSelector((state) => state.election.value);

  // useEffect(() => {
  //   console.log(SecureStore.getItemAsync('id'));
  // }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={HomeScreen} 
        options={{
            tabBarIcon: () => (
                <Entypo name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen name="Vote" component={VoteScreen}
        options={{
            tabBarIcon: () => (
                <MaterialCommunityIcons name="vote" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen name="Results" component={ResultsScreen}
        options={{
            tabBarIcon: () => (
                <Foundation name="graph-bar" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator
