import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Input from '../../components/Input';
import { images } from '../../constants';

const Login = () => {
  return (
    <View style={styles.container}>
        <Image source={images.whiteLogo} style={styles.image} fadeDuration={1000} />
        <Input placeholder="Email" />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3D3C3C',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    },
    text: {
      color: 'white'
    },
    image: {
      width: 250,
      height: 250
    }
  });