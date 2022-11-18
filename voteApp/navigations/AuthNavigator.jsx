import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login/Login';
import Register from '../screens/Auth/Register/Register';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;