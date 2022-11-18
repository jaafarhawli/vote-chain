import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import {useQuery} from '@tanstack/react-query';
import axios from '../../../api/axios/axios';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

    const {data} = useQuery([], async () => {
        const id = await SecureStore.getItemAsync('id');
        const token = await SecureStore.getItemAsync('token');
        return axios.get(`app/${id}`, {
            headers: {
                Authorization: `bearer ${token}`
        }}).then((res) => res.data.data);
    })
    
    const viewElection = async (electionId, voterId) => {
        console.log(electionId, voterId);
    }

  return (
    <Drawer.Navigator>
        {data?.map((election) => (
          <ElectionCard key={election.election_id} title={election.election_title} electionId={election.election_id} voterId={election.voter_id} onPress={viewElection} />
        ))}
      <Drawer.Screen name="Election" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;