import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, VoteScreen, ResultsScreen } from '../screens';
import { Entypo, MaterialCommunityIcons, Foundation  } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../components/Complex/EmptyState/EmptyState';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

  const election = useSelector((state) => state.election.value);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={election.id == '' ? EmptyState : HomeScreen} empty={election.id == ''}
        options={{
            tabBarIcon: () => (
                <Entypo name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen name="Vote" component={election.id == '' ? EmptyState : VoteScreen}
        options={{
            tabBarIcon: () => (
                <MaterialCommunityIcons name="vote" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen name="Results" component={election.id == '' ? EmptyState : ResultsScreen}
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
