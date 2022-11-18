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
    
    console.log(data);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Election" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;