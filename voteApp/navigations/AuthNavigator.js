import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;