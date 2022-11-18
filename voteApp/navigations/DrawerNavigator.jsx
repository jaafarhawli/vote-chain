import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios/axios';
import * as SecureStore from 'expo-secure-store';
import { colors } from '../constants';



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

  return (
    <Drawer.Navigator 
        screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: colors.white,
            headerTitleStyle: {
                color: colors.white
            },
            headerStyle: {
                backgroundColor: colors.black[200],
                elevation: 0,
                shadowOpacity: 0,
        },
      }}>
        <Drawer.Screen name='Home' component={BottomTabNavigator} />
        {data?.map((election) => (
          <Drawer.Screen name={election.election_id} key={election.election_id} options={{title: election.election_title,}}>
                {() => <BottomTabNavigator voterId={election.voter_id} electionId={election.election_id}  />}
          </Drawer.Screen> 
        ))}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;