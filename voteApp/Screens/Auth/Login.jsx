import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Button } from 'react-native';
import Input from '../../components/Input';
import { images, colors } from '../../constants';

const Login = () => {
  return (
    <View style={styles.container}>
        <Image source={images.whiteLogoText} style={styles.image} fadeDuration={1000} />
        <Text style={styles.title}>Join Election</Text>
        <View style={styles.inputsContainer}>
            <Input placeholder="Election Code" style={styles.input} />
            <Input placeholder="ID" style={styles.input} />
            <Input placeholder="Key" style={styles.input} />
            <Button title="Join" />
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black[200],
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    },
    title: {
      color: 'white',
      fontSize: 24,
      marginBottom: 20,
      color: colors.primary[200]
    },
    image: {
      width: 300,
      height: 200
    },
    inputsContainer: {
        width: '100%',
    },
    input: {
        marginBottom: 10,
        // selectionColor: colors.primary[100]
    }
  });