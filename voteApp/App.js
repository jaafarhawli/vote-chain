import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo5.png')} style={styles.image} fadeDuration={1000} />
      <Text style={styles.text}>Hello React Native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3C3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  },
  image: {
    width: 250,
    height: 250
  }
});
