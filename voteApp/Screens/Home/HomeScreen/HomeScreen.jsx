import { Text, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '../../../components/Complex/EmptyState/EmptyState';

const HomeScreen = () => {

  const election = useSelector((state) => state.election.value);
  
  return (
    <View>
      {
      election.id == '' ?
      <EmptyState />
      : 
      <Text>HomeScreen</Text>
      }
    </View>
  )
}

export default HomeScreen

