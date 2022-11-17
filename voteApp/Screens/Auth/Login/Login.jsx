import React from 'react'
import { Text, View, Image, Button } from 'react-native';
import Input from '../../../components/input';
import { images } from '../../../constants';
import { styles } from './LoginStyles';
import CustomizedButton from '../../../components/button';

const Login = () => {
  return (
    <View style={styles.container}>
        <Image source={images.whiteLogoText} style={styles.image} fadeDuration={1000} />
        <Text style={styles.title}>Join Election</Text>
        <View style={styles.inputsContainer}>
            <Input placeholder="Election Code" style={styles.input} />
            <Input placeholder="ID" style={styles.input} />
            <Input placeholder="Key" style={styles.input} />
            <CustomizedButton title="Join" />
        </View>
    </View>
  )
}

export default Login

