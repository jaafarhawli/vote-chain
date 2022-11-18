import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Vote" component={VoteScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} /> */}
    </Tab.Navigator>
  );
}
export default BottomTabNavigator
