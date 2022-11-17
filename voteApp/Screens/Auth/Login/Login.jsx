import React from 'react'
import { View, Image } from 'react-native';
import Input from '../../../components/input';
import { images, colors } from '../../../constants';
import { styles } from './LoginStyles';
import CustomizedButton from '../../../components/button';
import MyAppText from '../../../components/MyAppText';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  return (
    <LinearGradient style={styles.container} colors={[colors.primary[100], colors.white]}>
        <Image source={images.whiteLogoText} style={styles.image} fadeDuration={1000} />
        <MyAppText style={styles.title}>Join Election</MyAppText>
        <View style={styles.inputsContainer}>
            <Input placeholder="Election Code" style={styles.input} />
            <Input placeholder="ID" style={styles.input} />
            <Input placeholder="Key" style={styles.input} />
            <CustomizedButton title="Join" />
        </View>
    </LinearGradient>
  )
}

export default Login

