import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;