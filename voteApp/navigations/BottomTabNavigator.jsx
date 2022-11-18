import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, VoteScreen, ResultsScreen } from '../screens';
import { Entypo, MaterialCommunityIcons, Foundation  } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../components/Complex/EmptyState/EmptyState';
import { colors } from '../constants';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

  const election = useSelector((state) => state.election.value);

  return (
    <Tab.Navigator screenOptions={
      ({route}) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.black[100],
        tabBarIcon: ({color}) => {
          let icon;
          if (route.name === 'Main') {
            return icon = <Entypo name="home" size={24} color={color} />
          } else if (route.name === 'Vote') {
            return icon = <MaterialCommunityIcons name="vote" size={24} color={color} />
          } else if (route.name === 'Results') {
            return icon = <Foundation name="graph-bar" size={24} color={color} />
          }}
      })
    }>
      <Tab.Screen name="Main" component={election.id == '' ? EmptyState : HomeScreen} empty={election.id == ''} />
      <Tab.Screen name="Vote" component={election.id == '' ? EmptyState : VoteScreen} />
      <Tab.Screen name="Results" component={election.id == '' ? EmptyState : ResultsScreen} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator
